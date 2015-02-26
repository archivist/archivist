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

/** 
 * Creates empty Document record from JSON
 *
 * @param {callback} cb - The callback that handles the results 
 */

documentSchema.statics.createEmpty = function(cb) {
	var docId = mongoose.Types.ObjectId();

	var emptyDocJson = {
	  "id": docId,
	  "_schema": [
	    "archivist-interview",
	    "0.1.0"
	  ],
	  "nodes": {
	    "document": {
	      "id": "document",
	      "type": "document",
	      "views": [
	        "content",
	        "citations",
	        "remarks",
	        "info"
	      ],
	      "license": "licence",
	      "guid": docId,
	      "creator": "",
	      "title": "Untitled",
	      "authors": [],
	      "abstract": "",
	      "abstract_en": "",
	      "created_at": new Date().toJSON(),
	      "updated_at": new Date().toJSON(),
	      "published_on": new Date().toJSON()
	    },
	    "cover": {
	      "id": "cover",
	      "type": "cover",
	      "authors": []
	    },
	    "content": {
	      "type": "view",
	      "id": "content",
	      "nodes": [
	        "cover",
	        "text1"
	      ]
	    },
	    "citations": {
	      "type": "view",
	      "id": "citations",
	      "nodes": []
	    },
	    "remarks": {
	      "type": "view",
	      "id": "remarks",
	      "nodes": []
	    },
	    "info": {
	      "type": "view",
	      "id": "info",
	      "nodes": [
	        "publication_info",
	        "interview_subject",
	        "interview_conductor",
	        "interview_operator",
	        "interview_sound_operator"
	      ]
	    },
	    "text1": {
	      "type": "text",
	      "id": "text1",
	      "content": "Please write interview here"
	    },
	    "publication_info": {
	      "id": "publication_info",
	      "type": "publication_info"
	    },
	    "interview_subject": {
	      "type": "interview_subject",
	      "id": "interview_subject",
	      "name": "The Interviewed",
	      "role": "Interview Subject",
	      "forced_labor": "intracamp work; earthworks (construction of barracks); digging tunnels for military factories",
	      "categories": [
	        "Ost arbeiter",
	        "Cocentration camp worker"
	      ],
	      "prisons": [
	        "location_komorn"
	      ],
	      "movement": [
	        "location_danzig:33",
	        "location_komorn:67"
	      ],
	      "description": "",
	      "image": ""
	    },
	    "interview_conductor": {
	      "type": "contributor",
	      "id": "interview_conductor",
	      "source_id": "",
	      "name": "Daniel Beilinson",
	      "role": "Interview Conductor",
	      "description": "",
	      "image": ""
	    },
	    "interview_operator": {
	      "type": "contributor",
	      "id": "interview_operator",
	      "source_id": "",
	      "name": "Oliver Buchtala",
	      "role": "Operator",
	      "description": "",
	      "image": ""
	    },
	    "interview_sound_operator": {
	      "type": "contributor",
	      "id": "interview_sound_operator",
	      "source_id": "",
	      "name": "Michael Aufreiter",
	      "role": "Sound Operator",
	      "description": "",
	      "image": ""
	    },
	    "license": {
	      "id": "license",
	      "type": "license",
	      "name": "None",
	      "code": "none",
	      "description": "",
	      "version": "1.0",
	      "url": ""
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

documentSchema.statics.update = function(id, data, cb) {
  var self = this;

  if (data.hasOwnProperty('schema')) {
    data._schema = data.schema;
    delete data.schema;
  }

  self.findById(id, "__v", function(err, currentDoc) {
    console.log('currentDoc.__v', currentDoc.__v, 'data', data.__v);
    // Perform version check
    if (currentDoc.__v !== data.__v) {
      return cb('Document can not be saved becuase your local version is outdated. Please open document in a new tab and re-apply your changes.');
    }

    delete data.__v; // clear __v property, so $inc can do its job

    self.findByIdAndUpdate(id, { $set: data, $inc: { __v: 1 } }, function (err, document) {
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
    self.find(query, 'nodes.document.title nodes.document.created_at nodes.document.updated_at nodes.document.authors id', options, function(err, records) {
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