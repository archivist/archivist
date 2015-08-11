// The Subject entity model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , async = require('async')
  , _ = require('underscore')
  , backup = require('../controllers/shared/backup.js')
  , interviews = require('../controllers/indexer/interviews')
  , maintenance = require('../controllers/shared/maintenance.js')
  , rest = require('../controllers/shared/rest.js')
  , timestamps = require('mongoose-timestamp')
  , util = require('../controllers/api/utils.js');

/* Interview tree model */

var TreeModel = require('archivist-core/interview/tree');

var subjectSchema = new Schema({
  	type: String
  ,	name: String
  , workname: String
  , description: String
  , parent: String
  , position: Number
  , created: { type: Schema.Types.ObjectId, ref: 'User' }
  , edited: { type: Schema.Types.ObjectId, ref: 'User' }
});

subjectSchema.set('toJSON', { getters: true, virtuals: true })

var subjectShadowSchema = new Schema({}, {collection: 'subjects_backup', strict: false}),
		subjectShadow = mongoose.model('subjectShadow', subjectShadowSchema);

subjectSchema.plugin(backup, { shadow: subjectShadow });
subjectSchema.plugin(rest, { referenceType: 'subject_reference', systemCounter: 'subjects_db_version' });
subjectSchema.plugin(timestamps);

/** 
 * List records
 *
 * @param {string} opt - The query options from request
 * @param {callback} cb - The callback that handles the results 
 */

subjectSchema.statics.list = function(opt, cb) {
  var self = this;

  var query = util.getQuery(opt.query),
      options = util.getOptions(opt);

  interviews.countSubjects(function(err, counter){
    if(err) return cb(err);
    self.find(query, null, options, function(err, records) {
      _.each(records, function(subject, id) {
        records[id] = subject.toJSON();
        records[id].counter = counter[subject._id] ? counter[subject._id].occurrences : 0;
      })
      cb(err, records);
    });
  });
}

/** 
 * List records ids and parents
 *
 * @param {callback} cb - The callback that handles the results 
 */

subjectSchema.statics.listStructure = function(cb) {
  self.find({}, '_id parent name', cb);
}

/** 
 * Get children subject records
 *
 * @param {string} id - The unique id of target record
 * @param {callback} cb - The callback that handles the results 
 */

// TODO: remove this method
// subjectSchema.statics.getChildren = function(id, cb) {
//   var self = this;

//   self.find({}, '_id parent', function(err, records) {
//     if(err) return cb(err);
//     var tree = new TreeModel(records);
//     var filtered = tree.getAllChildren(id);
//     cb(err, filtered);
//   });
// }

/** 
 * Updates record unique JSON
 *
 * @param {string} id - The unique id of target record
 * @param {string} data - JSON with updated properties
 * @param {string} user - JSON represenation of user record
 * @param {callback} cb - The callback that handles the results 
 */

subjectSchema.statics.change = function(id, data, user, cb) {
  var self = this;

  data.edited = user._id;
  data.updatedAt = new Date;

  delete data.__v;

  var update = function(data, cb) {
    self.findByIdAndUpdate(id, { $set: data }, { upsert: true, new: true }, function (err, record) {
      if (err) return err;
      self.incrementDBVersion(function(err) {
        cb(err, record);
      });
    });
  }

  if(!data.position && data.name == 'New Subject') {
    self.findOne({parent: data.parent}).sort({position: -1}).exec(function(err, res){
      if (!_.isNull(res)) {
        data.position = res.position + 1;
      } else {
        data.position = 0;
      }
      update(data, cb);
    });
  } else {
    update(data, cb);
  }
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
	    self.findByIdAndRemove(id, function (err, subject) {
        if (err) return cb(err);
        self.removeNode(subject.parent, subject.position, false, function(err) {
          if (err) return cb(err);
          console.log('Node has been removed from tree.');
          self.incrementDBVersion(cb);
        });
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
    self.propagateChange(subjectId, {mode: "replace", newReferenceId: newSubjectId}, function(err) {
      if (err) return cb(err);
      self.findByIdAndRemove(subjectId, function (err, subject) {
        if (err) return cb(err);
        self.removeNode(subject.parent, subject.position, false, cb);
      });
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

subjectSchema.statics.move = function(oldParentId, newParentId, nodeId, op, np, user, cb) {
  var self = this;

  if (oldParentId == '#') oldParentId = '';
  if (newParentId == '#') newParentId = '';

  if (oldParentId == newParentId) {
    self.removeNode(newParentId, op, true, function(err) {
      if (err) return cb(err);
      self.insertNode(newParentId, np, function(err) {
        if (err) return cb(err);
        self.updatePos(nodeId, np, cb);
      });
    });
  } else {
    self.removeNode(oldParentId, op, true, function(err){
      if (err) return cb(err);
      self.insertNode(newParentId, np, function(err){
        if (err) return cb(err);
        self.change(nodeId, { parent: newParentId, position: np }, user, cb);
      });
    });
  }
}

// Remove node from leaf
subjectSchema.statics.removeNode = function(parentId, pos, test, cb) {
  var self = this;
  self.update({
    parent: parentId,
    position: { 
      $gt: pos,
    } 
  }, { $inc: { position: -1 }}, { multi: true }).exec(function(err,rawResponse) {
    if (err) return cb(err);
    if (test) {
      self.checkLeaf(parentId, pos, function(err, valid){
        if (valid) {
          cb(null);
        } else {
          self.repairLeaf(parentId, cb);
        }
      });
    } else {
      cb(null);
    }
  });
}

// Insert node inside leaf
subjectSchema.statics.insertNode = function(parentId, pos, cb) {
  var self = this;

  self.update({
    parent: parentId,
    position: { 
      $gte: pos,
    } 
  }, { $inc: { position: 1 }}, { multi: true }).exec(cb);
}

// Update node position
subjectSchema.statics.updatePos = function(nodeId, pos, cb) {
  var self = this;

  self.update({ _id: nodeId }, { position: pos }).exec(cb);
}

// subjectSchema.statics.checkAndRepairMaybe = function(oldParentId, newParentId, cb) {
//   var self = this,
//       valid = true;

//   if (oldParentId) {
//     self.checkLeaf(oldParentId, function(err, valid) {
//       if(!valid) {
//         self.repairLeaf(oldParentId);
//         var err = new Error("Something goes wrong");
//         err.http_code = 500;
//         cb(err);
//       } else {
//         cb(null);
//       }
//     });
//   }

//   if (newParentId) {
//     self.checkLeaf(newParentId, function(err, valid) {
//       if(!valid) self.repairLeaf(newParentId);
//     });
//   }
// }

// Check if tree leaf is broken
subjectSchema.statics.checkLeaf = function(parentId, pos, cb) {
  var self = this,
      positions = [],
      valid = true;

  // var promise = self.find({parent: parentId}).select('position').sort('position').exec()

  // promise.then(function(subjects) {
  //   var ids = subjects.map(function (s) {
  //     positions.push(s.position)
  //   });
  // }).then(function () {
  self.find({parent: parentId}).select('position').sort('position').exec(function(err, subjects) {
    subjects.map(function (s) {
      positions.push(s.position)
    });
    positions.splice(pos,1);
    console.log(positions);
    for (var i = 0; i < positions.length; i++) {
      if (positions[i] != i) {
        valid = false;
        break;
      }
    };
    cb(null, valid);
  });
  //})
}

// Repair tree leaf
subjectSchema.statics.repairLeaf = function(parentId, cb) {
  var self = this;

  self.find({parent: parentId})
    .select('_id')
    .sort('position')
    .exec(function(err, subjects) {
      if (err) return cb(err);
      for (var i = 0; i < subjects.length; i++) {
        subjects[i].set('position', i);
        subjects[i].save(function(err, subject){
          if(err) {
            console.log(err.message);
          } else {
            console.log(subject._id, 'has been repaired');
          }
        });
      }
    })
    var err = new Error("Something goes wrong");
    err.http_code = 500;
    cb(err);
}

/** 
 * Get children subject records
 *
 * @param {string} id - The unique id of target record
 * @param {callback} cb - The callback that handles the results 
 */

subjectSchema.statics.repairAllLeafs = function(cb) {
  var self = this;

  self.find({}, '_id parent', function(err, records) {
    if(err) return cb(err);
    var tree = new TreeModel(records);
    var index = tree.parentIndex;
    _.each(index, function(item, idx) {
      if(idx != 'root') {
        self.repairLeaf(idx, function(err){
        })
      }
    })
    cb(err, {});
  });
}

module.exports = mongoose.model('Subject', subjectSchema);