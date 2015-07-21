// The Substance Document model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , System = require('./system.js')
  , async = require('async')
  , _ = require('underscore')
  , backup = require('../controllers/shared/backup.js')
  , util = require('../controllers/api/utils.js');

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
        "short_summary": "Short summary in russian",
        "short_summary_en": "Short summary in english",
        "abstract": "Russian abstract",
        "abstract_en": "Enter english abstract here",
        "abstract_de": "Enter german abstract here",
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
        "media_id": "",
        "interview_location": "respondent's apartment",
        "interview_date": "2005-07-16",
        "persons_present": "Nikolay Bogoslavec, Irina Ostrovskaya, Eduard Kechedjiyan, Alexey Bogoslavec",
        "interview_duration": "247",

        // Interview subject related
        "interviewee_bio": "Please enter respondent bio in russian",
        "interviewee_bio_en": "Please enter respondent bio in english",
        "interviewee_bio_de": "Please enter respondent bio in german",
        "interviewee_category": "",
        "interviewee_forced_labor_type": "",
        "interviewee_waypoints": [],

        // Workflow
        "transcripted": false,
        "verified": false,
        "finished": false,
        "published": false
      },
      "content": {
        "type": "container",
        "id": "content",
        "nodes": [
          "paragraph_1"
        ]
      },
      "paragraph_1": {
        "type": "paragraph",
        "id": "paragraph_1",
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
      console.log('fall update')
      return cb('Document can not be saved because your local version is outdated. Please open document in a new tab and re-apply your changes.');
    }

    delete data.__v; // clear __v property, so $inc can do its job

    // update document edition date and last author

    data.nodes.document.updated_at = new Date().toJSON();
    data.nodes.document.creator = user.name;
    self.findByIdAndUpdate(id, { $set: data, $inc: { __v: 1 } }, {new: true}, function (err, document) {
      if (err) return cb(err);
      self.getSubjectDBVersion(function(err, subjectDBVersion) {
        if (err) return cb(err);
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

documentSchema.statics.validateStructure = function(id, cb) {

  this.findById(id, function(err, document) {
    doc = document.toJSON();
    var nodes = doc.nodes.content.nodes;
    
    var duplicates = checkForDuplicates(nodes);
    var annotations = validateAnnotations(doc.nodes);

    var response = {
      result: duplicates + annotations
    }
    cb(err, response);
  });

  function checkForDuplicates(nodes) {
    var response;

    // Checks if conent nodes array is unique
    var isUnique = _.uniq(nodes, JSON.stringify).length === nodes.length;
    
    if(isUnique) {
      response = "Content container have no duplicates\n"
    } else {
      var duplicates = _.difference(nodes, _.uniq(nodes, JSON.stringify));
      response = "Content container have following duplicates: " + duplicates.join(', ') + '\n';
    }

    return response;
  }

  function validateAnnotations(tree) {
    var response = '';
    var nodes = tree.content.nodes;
    _.each(tree, function(leaf, id) {

      // Check if current annotation is multiparagraph one
      if(!_.isUndefined(leaf.startPath)) {
        if(!_.contains(nodes, leaf.startPath[0])) {
          response += 'Start path of ' + id + ' is belongs to ' + leaf.startPath[0] + ' which is outside of the content container\n';
        }

        if(_.isUndefined(tree[leaf.startPath[0]])) {
          response += 'Start path of ' + id + ' is belongs to ' + leaf.startPath[0] + ' which does not exists\n';
        }

        if(!_.contains(nodes, leaf.endPath[0])) {
          response += 'End path of ' + id + ' is belongs to ' + leaf.endPath[0] + ' which is outside of the content container\n';
        }

        if(_.isUndefined(tree[leaf.endPath[0]])) {
          response += 'End path of ' + id + ' is belongs to ' + leaf.endPath[0] + ' which does not exists\n';
        }

        if(leaf.startPath[1] != 'content') {
          response += 'Start path of ' + id + ' is not belongs to the content container\n';
        }

        if(leaf.endPath[1] != 'content') {
          response += 'End path of ' + id + ' is not belongs to the content container\n';
        }
      } else if (!_.isUndefined(leaf.path)) {
        // Check if current annotation is singlepararph one

        if(!_.contains(nodes, leaf.path[0])) {
          response += 'Path of ' + id + ' is belongs to ' + leaf.path[0] + ' which is outside of the content container\n';
        }

        if(_.isUndefined(tree[leaf.path[0]])) {
          response += 'Path of ' + id + ' is belongs to ' + leaf.path[0] + ' which does not exists\n';
        }

        if(leaf.startOffset > leaf.endOffset) {
          response += 'Start offset of ' + id + ' is after of the end offset\n';
        }

        if(leaf.path[1] != 'content') {
          response += 'Path of ' + id + ' is not belongs to the content container\n';
        }
      }
    })

    if(response == '') return 'All annotations are valid\n';

    return response;
  }
}
 
module.exports = mongoose.model('Document', documentSchema);