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
    "_id": docId,
    "id": docId,
    "_schema": [
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
        "creator": "",
        "title": "New Composer Document!",
        "abstract": "Test",
        "created_at": "2015-03-04T10:56:18.229Z",
        "updated_at": "2015-03-04T10:56:47.425Z",
        "published_on": "2015-03-04T10:56:18.230Z"
      },
      "content": {
        "type": "container",
        "id": "content",
        "nodes": [
          "text_1",
          "text_2"
        ]
      },
      "text_1": {
        "type": "text",
        "id": "text_1",
        "content": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit. Praesent lacinia enim ex, sed pulvinar neque dictum ultricies. Sed est metus, bibendum sed suscipit ut, cursus ut mi. Pellentesque sagittis mi nisi, eu blandit metus congue id. Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut. Nulla enim dolor, pulvinar at odio vitae, sollicitudin eleifend ex. Maecenas eget ligula eget sem efficitur consectetur nec vel sem. In massa mauris, consequat vitae enim eget, vehicula aliquet turpis.'
      },
      
      "text_2": {
        "type": "text",
        "id": "text_2",
        "content": 'Proin in luctus sapien, ultrices commodo augue. Phasellus ultrices commodo augue, in blandit nibh euismod nibh vitae erat luctus ac. Aliquam euismod nibh vitae erat pulvinar, at semper libero tincidunt. Nulla finibus est ac consequat consequat. Sed at condimentum purus. Aliquam vulputate ipsum ut justo posuere, quis varius risus finibus. Ut scelerisque laoreet vehicula. Nullam gravida fringilla justo, nec efficitur nunc sagittis et. Suspendisse nibh ligula, imperdiet id interdum et, sollicitudin non mauris. Suspendisse potenti. Suspendisse luctus iaculis nulla sed efficitur. Nullam sed viverra metus. Etiam dictum blandit enim tincidunt maximus. Nullam tempus nibh at varius interdum.'
      },

      "entity_reference_1": {
        "id": "entity_reference_1",
        "type": "entity_reference",
        "path": [
          "text_2",
          "content"
        ],
        "target": "54ef1331afda2d3c024e4817", // this is an external object
        "range": [
          24,
          47
        ]
      },

      "subject_reference_1": {
        "id": "subject_reference_1",
        "type": "subject_reference",
        "path": [
          "text_2",
          "content"
        ],
        "target": ["54bae4cda868bc6fab4bcd0e", "54bae99ca868bc3ec7fb5ad8"], // these are external objects
        "range": [
          99,
          122
        ]
      },

      "subject_reference_2": {
        "id": "subject_reference_2",
        "type": "subject_reference",
        "path": [
          "text_2",
          "content"
        ],
        "target": ["54bae4d0a868bc6fab4bcd16", "54bae99ca868bc3ec7fb5ad8"], // these are external objects
        "range": [
          614,
          628
        ]
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
    if (err) return cb(err);

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