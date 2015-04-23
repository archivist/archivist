// The Substance Document model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , System = require('./system.js')
  , async = require('async')
  , backup = require('../controllers/backup.js')
  , util = require('../controllers/util.js');

var documentSchema = new Schema({
  	_schema: [String]
  , nodes: Schema.Types.Mixed
});

documentSchema.set('toJSON', { getters: true, virtuals: true })

var documentShadowSchema = new Schema({}, {collection: 'documents_backup', strict: false}),
		documentShadow = mongoose.model('documentShadow', documentShadowSchema);

documentSchema.plugin(backup, { shadow: documentShadow });

/** 
 * Creates Document record from JSON
 *
 * @param {string} document - JSON represenation of new document
 * @param {callback} cb - The callback that handles the results 
 */

documentSchema.statics.add = function(document, cb) {
  if (document.hasOwnProperty('schema')) {
    document._schema = document.schema;
    delete document.schema;
    document._id = document.id;
    delete document.id;
  }

  var newDoc = new this(document);
  newDoc.save(function(err) {
    cb(err, newDoc);
  });
}

documentSchema.statics.createEmpty = function(user, cb) {
	var docId = mongoose.Types.ObjectId();

	var emptyDocJson = {
    "_id": docId,
    "id": docId,
    "schema": [
      "substance-interview",
      "0.1.0"
    ],
    "nodes": {
      "document": {
        "id": "document",
        "type": "document",
        "containers": [
          "content"
        ],
        "guid": docId,
        "creator": user.name,
        "title": "Untitled interview",
        "abstract": "Test",
        "abstract_en": "Enter english abstract here",
        "created_at": new Date().toJSON(),
        "updated_at": new Date().toJSON(),
        "published_on": "0000-00-00",

        // Project related
        "project_name": "Internationales Sklaven-und Zwangsarbeiter Befragungsprojekt",
        "project_location": "",
        "conductor": "Irina Ostrovskaya",
        "operator": "Eduard Kechedjiyan",
        "sound_operator": "Eduard Kechedjiyan",
        "record_type": "video",
        "interview_location": "respondent's apartment",
        "interview_date": "2005-07-16",
        "persons_present": "Nikolay Bogoslavec, Irina Ostrovskaya, Eduard Kechedjiyan, Alexey Bogoslavec",
        "interview_duration": "247",

        // Interview subject related
        "interviewee_bio": "Please enter interview subject bio.",
        "interviewee_category": "Ost-Arbeiter, concentration camp prisoner",
        "interviewee_prisons": [],
        "interviewee_forced_labor_type": "intracamp work, earthworks (construction of barracks), digging tunnels for military factories",
        "interviewee_waypoints": [],

        // Other
        "media_id": "",
        "transcripted": false,
        "verified": false,
        "finished": false
      },
      "content": {
        "type": "container",
        "id": "content",
        "nodes": [
          "text_1"
        ]
      },
      "text_1": {
        "type": "text",
        "id": "text_1",
        "content": 'Please write interview here...'
      }

    }
  };
	
	var emptyDoc = new this(emptyDocJson);
  emptyDoc.save(function(err, emptyDoc) {
    cb(err, emptyDoc);
  });
}

/** 
 * Gets Document record by unique id 
 *
 * @param {string} id - The unique id of target document record
 * @param {callback} cb - The callback that handles the results 
 */

documentSchema.statics.get = function(id, cb) {
  this.findById(id, function(err, document) {
    doc = document.toJSON();
    if (doc.hasOwnProperty('_schema')) {
      delete doc._schema;
      doc.schema = document._schema;
    }
    cb(err, doc);
  });
}

/** 
 * Updates Document record unique JSON
 *
 * @param {string} id - The unique id of target document record
 * @param {string} data - JSON with updated properties
 * @param {callback} cb - The callback that handles the results 
 */

documentSchema.statics.change = function(id, data, user, cb) {
  var self = this;

  if (data.hasOwnProperty('schema')) {
    data._schema = data.schema;
    delete data.schema;
  }

  self.findById(id, "__v", function(err, currentDoc) {
    if (err) return cb(err);

    console.log('currentDoc.__v', currentDoc.__v, 'data', data.__v);
    // Perform version check
    if (currentDoc.__v !== data.__v) {
      return cb('Document can not be saved because your local version is outdated. Please open document in a new tab and re-apply your changes.');
    }

    delete data.__v; // clear __v property, so $inc can do its job

    // update document edition date and last author

    data.nodes.document.updated_at = new Date().toJSON();
    data.nodes.document.creator = user.name;

    self.findByIdAndUpdate(id, { $set: data, $inc: { __v: 1 } }, {new: true}, function (err, document) {
      self.getSubjectDBVersion(function(err, subjectDBVersion) {
        cb(err, {
          documentVersion: document.__v,
          subjectDBVersion: subjectDBVersion
        });
      });
    });
  });
}

/** 
 * Removes Document record by unique id 
 *
 * @param {string} id - The unique id of target document record
 * @param {callback} cb - The callback that handles the results 
 */

documentSchema.statics.delete = function(id, cb) {
  this.findByIdAndRemove(id, function (err) {
    cb(err);
  });
}

/** 
 * List Documents
 *
 * @param {string} opt - The query options from request
 * @param {callback} cb - The callback that handles the results 
 */

documentSchema.statics.list = function(opt, cb) {
  var self = this,
  		query = util.getQuery(opt.query),
      options = util.getOptions(opt);

  self.count(query, function(err, counter) {
    if (err) return cb(err);
    self.find(query, 'nodes.document.title nodes.document.created_at nodes.document.updated_at nodes.document.creator id', options, function(err, records) {
      cb(err, [{total_entries: counter}, records]);
    });
  });
}

/**
 * Get subjects_db_version variable
 *
 * @param {callback} cb - The callback that handles the results 
 */

documentSchema.statics.getSubjectDBVersion = function(cb) {
  System.findOne({name: 'subjects_db_version'}, function(err, variable) {
    if (err) return err;
    cb(err, variable.get('version'));
  });
}
 
module.exports = mongoose.model('Document', documentSchema);