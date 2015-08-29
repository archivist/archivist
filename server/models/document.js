// The Substance Document model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , System = require('./system.js')
  , async = require('async')
  , _ = require('underscore')
  , elasticsearch = require('elasticsearch')
  , ESconfig = require('../controllers/indexer/config')
  , Interview = require('archivist-core/interview')
  , indexer = require('../controllers/indexer/interviews')
  , indexQueue = require('../controllers/shared/queue.js')
  , backup = require('../controllers/shared/backup.js')
  , util = require('../controllers/api/utils.js');

var documentSchema = new Schema({
  	_schema: [String]
  , nodes: Schema.Types.Mixed
  , resources: [String]
});

documentSchema.set('toJSON', { getters: true, virtuals: true });

// TODO: remove this variables as we have queue
// documentSchema.set('indexing', false);
// documentSchema.set('reindex', false);

documentSchema.index({'nodes.document.updated_at': 1}, {background: true});
documentSchema.index({'nodes.document.title': 1}, {background: true});

var documentShadowSchema = new Schema({}, {collection: 'documents_backup', strict: false, versionKey: false}),
		documentShadow = mongoose.model('documentShadow', documentShadowSchema);

documentSchema.plugin(backup, { shadow: documentShadow, fullbackup: false });

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
	var self = this;
  var docId = mongoose.Types.ObjectId();

	var emptyDocJson = {
    "_id": docId,
    "id": docId,
    "_schema": [
      "archivist-interview",
      "0.2.0"
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
        "published_on": "Enter publishing date in format YYYY-MM-DD",

        // Project related
        "project_name": "Enter project name",
        "project_location": "",
        "conductor": "Enter conductor's name",
        "operator": "Enter operator's name",
        "sound_operator": "Enter sound operator's name",
        "record_type": "video",
        "media_id": "",
        "interview_location": "Enter interview location name",
        "interview_date": "Enter interview date in format YYYY-MM-DD",
        "persons_present": "Enter person's names separated by comma",
        "interview_duration": "Enter interview duration in minutes",

        // Interview subject related
        "interviewee_bio": "Please enter respondent bio in russian",
        "interviewee_bio_en": "Please enter respondent bio in english",
        "interviewee_bio_de": "Please enter respondent bio in german",
        "interviewee_photo": "",
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
    if (err) return cb(err);
    indexQueue.add({type: 'document', op: 'add', id: docId});
    cb(err, emptyDoc);
  });
}

/** 
 * Gets Document record by unique id 
 *
 * @param {string} id - The unique id of target document record
 * @param {callback} cb - The callback that handles the results 
 */

documentSchema.statics.getRecord = function(id, cb) {
  this.findById(id, "_schema nodes __v", function(err, document) {
    if(err) return cb(err);
    if(_.isNull(document)) return cb('There is no such document, sorry...');
    doc = document.toJSON();
    if (doc.hasOwnProperty('_schema')) {
      delete doc._schema;
      doc.schema = document._schema;
    }
    cb(null, doc);
  });
}

/** 
 * Gets published document record by unique id
 *
 * @param {string} id - The unique id of target document record
 * @param {boolean} published - Whether or not restrict query to published
 * @param {callback} cb - The callback that handles the results 
 */

documentSchema.statics.getCleaned = function(id, published, cb) {
  var self = this;

  var query = {
    _id: id
  }
  if(published) query["nodes.document.published"] = true;
  this.find(query, "_schema nodes", function(err, document) {
    if(err) return cb(err);
    if( _.isEmpty(document)) return cb('There is no such document, sorry...');
    doc = document[0].toJSON();
    if (doc.hasOwnProperty('_schema')) {
      delete doc._schema;
      doc.schema = document[0]._schema;
    }
    self.clean(doc, function(err, cleaned) {
      cb(null, cleaned);
    })
  });
}

/** 
 * Gets metadata of document
 *
 * @param {string} id - The unique id of target document record
 * @param {callback} cb - The callback that handles the results 
 */

documentSchema.statics.getMetadata = function(id, cb) {
  var self = this;

  var query = this.find({ _id: id }).select('nodes.document _id _schema');
  query.exec(function (err, document) {
    if(err || _.isEmpty(document)) return cb('There is no such document, sorry...');
    doc = document[0].toJSON();
    if (doc.hasOwnProperty('_schema')) {
      delete doc._schema;
      doc.schema = document[0]._schema;
    }
    doc.nodes.content = {
      nodes: [],
      type: "container",
      id: "content"
    }
    self.clean(doc, function(err, cleaned) {
      cb(null, cleaned);
    })
  });
}

/** 
 * Gets document and cleans it from private data
 *
 * @param {string} doc - Document record
 * @param {callback} cb - The callback that handles the results 
 */

documentSchema.statics.clean = function(doc, cb) {
  doc.nodes.document.guid = doc.id;
  var interview = new Interview.fromJson(doc);
  interview.FORCE_TRANSACTIONS = false;
  // Clean documents for public usage
  _.each(doc.nodes, function(node, id){
    if(node.type == "comment") {
      interview.delete(id);
    }
  });
  cb(null, interview.toJSON());
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

    var resources = self.getResources(data);
    data.resources = resources;

    // update document edition date and last author

    data.nodes.document.updated_at = new Date().toJSON();
    data.nodes.document.creator = user.name;
    self.findByIdAndUpdate(id, { $set: data, $inc: { __v: 1 } }, {new: true}, function (err, document) {
      if (err) return cb(err);
      self.getSubjectDBVersion(function(err, subjectDBVersion) {
        if (err) return cb(err);
        indexQueue.add({type: 'document', op: 'update', id: id});
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
  var self = this;
  this.findByIdAndRemove(id, function (err) {
    if (err) return cb(err);
    indexQueue.add({type: 'document', op: 'remove', id: id});
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

/**
 * Gets array of unique references for document 
 *
 * @param {object} data - JSON representation of document
 */

documentSchema.statics.getResources = function(data) {
  var doc = new Interview.fromJson(data);
  var entityRefs = doc.getIndex('type').get('entity_reference');
  var entities = _.pluck(entityRefs, 'target');
  entities = _.uniq(entities);
  var subjectRefs = doc.getIndex('type').get('subject_reference');
  var subjects = _.pluck(subjectRefs, 'target');
  subjects = _.uniq(_.flatten(subjects));
  var result = _.union(entities, subjects);
  return result;
}

/**
 * Generates resources for all documents
 */

documentSchema.statics.generateResources = function() {
  var self = this;
  function _generateDocResources(id, cb) {
    console.log('Generating resources for doc', id);
    self.getRecord(id, function(err, doc) {
      if (err) return cb(err);
      doc.resources = self.getResources(doc);
      delete doc.__v;
      if (doc.hasOwnProperty('schema')) {
        doc._schema = doc.schema;
        delete doc.schema;
      }
      self.findByIdAndUpdate(id, { $set: doc, $inc: { __v: 1 } }, {new: true}, cb);
    });
  }
  self.find({}, 'id', {}, function(err, documents) {
    async.eachSeries(documents, function(doc, cb) {
      _generateDocResources(doc._id, cb);
    }, function(err) {
      console.log('Resources have been generated for all docs!');
    });
  });
}

/**
 * Generate map of resources to documents
 */

documentSchema.statics.generateResourcesMap = function(cb) {
  var self = this;
  self.find({}, 'resources', {}, function(err, documents) {
    if(err) return cb(err);
    var map = {};
    _.each(documents, function(doc){
      var resources = doc.resources;
      _.each(resources, function(id){
        if(!map[id]) map[id] = [];
        map[id].push(doc._id);
      });
    });
    cb(null, map);
  });
}

/* Indexer operations */

/**
 * Add Interview and all related fragments to index
 *
 * @param {object} client - Elasticsearch client instance
 * @param {string} id - Id of interview to add
 * @param {function} cb - The callback that handles the results 
 */

documentSchema.statics.addToIndex = function(client, id, cb) {
  this.getCleaned(id, false, function(err, json){
    if (err) return cb(err);
    console.log('Indexing interview %s...', id);
    var interview = new Interview.fromJson(json);
    indexer.create(client, interview, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Done.');
      }
      client.close();
      cb(err);
    });
  });
}

/**
 * Update Interview record inside index
 *
 * @param {object} client - Elasticsearch client instance
 * @param {string} id - Id of interview to update
 * @param {boolean} meta - Meta mode to update only Interview metadata, otherwise fragments will also updated 
 * @param {function} cb - The callback that handles the results 
 */

documentSchema.statics.updateIndex = function(client, id, meta, cb) {
  this.getCleaned(id, false, function(err, json){
    if (err) return cb(err);
    console.log('Updating index, interview %s...', id);
    var interview = new Interview.fromJson(json);
    indexer.update(client, interview, meta, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Done.');
      }
      client.close();
      cb(err);
    });
  });
}

/**
 * Removes Interview and all related fragments from index
 * 
 * @param {object} client - Elasticsearch client instance
 * @param {string} id - Id of interview to remove
 * @param {function} cb - The callback that handles the results 
 */

documentSchema.statics.removeFromIndex = function(client, id, cb) {
  indexer.remove.removeFragments(client, id).error(function(err) {
    console.error("Failed.", arguments);
    return cb(err);
  }).then(function() {
    client.close();
    client = new elasticsearch.Client(_.clone(ESconfig));
    console.log("All fragments for", id, "has been removed.");
    indexer.remove.removeInterview(client, id).error(function(err) {
      console.error("Failed.", arguments);
      return cb(err);
    }).then(function() {
      client.close();
      console.log("Interview", id, "has been removed from index.");
      cb(null);
    });
  });
}

// TODO: remove this thing, reindex handled by queue

// documentSchema.statics.reindex = function(meta) {
//   var self = this;

//   function _set(property, value) {
//     documentSchema.set(property, value);
//   }

//   function _get(property) {
//     return documentSchema.get(property);
//   }

//   function _requsetReindex(meta) {
//     console.log('Reindexing requested')
//     _set('reindex', {meta: meta});
//   }

//   function _reindex(meta) {
//     console.log('Running reindex, meta flag:', meta);
//     _set('reindex', false);
//     _set('indexing', true);
//     self.list({}, function(err, records) {
//       if (err) throw err;
//       var docs = records[1];
//       async.eachSeries(docs, function(doc, callback) {
//         var reindex = _get('reindex');
//         if(!reindex) {
//           console.log('Reindexing', doc._id);
//           self.updateIndex(doc._id, meta, callback);
//         } else if (reindex.meta || reindex.meta == meta) {
//           console.log('Aborting reindex, meta flag:', reindex.meta);
//           callback(true);
//         }
//       }, function(err) {
//         console.log('Reindexing finished');
//         _set('indexing', false);
//         var reindex = _get('reindex');
//         if(reindex) {
//           _reindex(reindex.meta);
//         }
//       });
//     });
//   }

//   var indexing = _get('indexing');
//   console.log('indexing flag:', indexing);
//   if(indexing) {
//     _requsetReindex(meta);
//   } else {
//     _reindex(meta);
//   }
// }
 
module.exports = mongoose.model('Document', documentSchema);