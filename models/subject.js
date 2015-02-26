// The Subject entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , async = require('async')
  , backup = require('../controllers/backup.js')
  , maintenance = require('../controllers/maintenance.js')
  , rest = require('../controllers/rest.js');

var subjectSchema = new Schema({
  	type: String
  ,	name: String
  , description: String
  , parent: String
});

subjectSchema.set('toJSON', { getters: true, virtuals: true })

var subjectShadowSchema = new Schema({}, {collection: 'subjects_backup', strict: false}),
		subjectShadow = mongoose.model('subjectShadow', subjectShadowSchema);

subjectSchema.plugin(backup, { shadow: subjectShadow });
subjectSchema.plugin(rest, { referenceType: 'subject_reference', systemCounter: 'subjects_db_version' });


/** 
 * List records
 *
 * @param {string} opt - The query options from request
 * @param {callback} cb - The callback that handles the results 
 */

subjectSchema.statics.list = function(opt, cb) {
  var query = util.getQuery(opt.query),
      options = util.getOptions(opt);

  this.find(query, null, options, function(err, records) {
    cb(err, records);
  });
}
  

/** 
 * Removes record by unique id 
 *
 * @param {string} id - The unique id of target record
 * @param {callback} cb - The callback that handles the results 
 */

subjectSchema.statics.delete = function(id, cb) {
  var self = this;
  // Unsave op (needs to be wrapped in a transaction)
  function updateDocsAndRemoveSubject(cb) {
	  self.propagateChange(id, {mode: "delete"}, function(err) {
	    if (err) return cb(err);
	    self.findByIdAndRemove(id, function (err) {
	      if (err) return cb(err);
	      self.incrementDBVersion(cb);
	    });
	  });
  }

  // Check if subject has children, if yes reject deletion
  self.find({parent: id}, 'id', {}, function(err, subjects) {

    if (subjects.length > 0) {
      return cb('can not delete subject that has child subjects');
    }

    maintenance.beginTransaction(function(err) {
      if (err) return cb(err);

      updateDocsAndRemoveSubject(function(err) {
        if (err) {
          maintenance.cancelTransaction(function(terr) {
            if (terr) return cb(terr);
            cb(err);
          });          
        } else {
          maintenance.commitTransaction(cb);
        }
      });
    });
  });
};

/** 
 * Merge Subjects
 *
 * @param {string} subjectId - Id of subject to merge
 * @param {string} newSubjectId - Id of subject to merge into
 * @param {callback} cb - The callback that handles the results 
 */

subjectSchema.statics.merge = function(subjectId, newSubjectId, cb) {
	var self = this;
	
  console.log("Let's merge " + subjectId + " into " + newSubjectId + "!");

  function updateDocsAndMergeSubjects(cb) {
    self.propagateChange(subjectId, {mode: "replace", newSubjectId: newSubjectId}, function(err) {
      if (err) return cb(err);
      self.findByIdAndRemove(subjectId, cb);
    });
  }

  // Check if subject has children, if yes reject deletion
  self.find({parent: subjectId}, 'id', {}, function(err, subjects) {
    if (subjects.length > 0) {
      return cb('can not merge subject that has child subjects');
    }

    maintenance.beginTransaction(function(err) {
      if (err) return cb(err);

      updateDocsAndMergeSubjects(function(err) {
        if (err) {
          maintenance.cancelTransaction(function(terr) {
            if (terr) return cb(terr);
            cb(err);
          });          
        } else {
          maintenance.commitTransaction(cb);
        }
      });
    });
  });
}

module.exports = mongoose.model('Subject', subjectSchema);