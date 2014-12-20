/* The DB controller */
 
var Document = require('../models/document.js')
	,	Subject = require('../models/subject.js')
	,	util = require('./util.js');

var db = exports;

/* The Document REST api */

/** 
 * Creates Document record from JSON
 *
 * @param {string} document - JSON represenation of new document
 * @param {callback} cb - The callback that handles the results 
 */

db.createDocument = function(document, cb) {
	if (document.hasOwnProperty('schema')) {
		document._schema = document.schema;
		delete document.schema;
	}

	new Document(document).save(function(err) {
		cb(err);
	});
}


/** 
 * Gets Document record by unique id 
 *
 * @param {string} id - The unique id of target document record
 * @param {callback} cb - The callback that handles the results 
 */

db.getDocument = function(id, cb) {
	Document.findById(id, function(err, document) {
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

db.updateDocument = function(id, data, cb) {
	if (data.hasOwnProperty('schema')) {
		data._schema = data.schema;
		delete data.schema;
	}

	Document.findByIdAndUpdate(id, { $set: data }, function (err, document) {
		cb(err, document);
	});
}


/** 
 * Removes Document record by unique id 
 *
 * @param {string} id - The unique id of target document record
 * @param {callback} cb - The callback that handles the results 
 */

db.removeDocument = function(id, cb) {
  Document.findByIdAndRemove(id, function (err) {
    cb(err);
  });
}


/** 
 * List Documents
 *
 * @param {string} opt - The query options from request
 * @param {callback} cb - The callback that handles the results 
 */

db.listDocuments = function(opt, cb) {
	  var query = util.getQuery(opt.query),
	      options = util.getOptions(opt);

  Document.find(query, 'nodes.document.title nodes.document.created_at nodes.document.authors id', options, function(err, documents) {
    cb(err, documents);
  });
}



/* The Subject REST api */

/** 
 * Creates Subject record from JSON
 *
 * @param {string} subject - JSON represenation of new subject
 * @param {callback} cb - The callback that handles the results 
 */

db.createSubject = function(subject, cb) {
	new Subject(subject).save(function(err) {
		cb(err);
	});
}


/** 
 * Gets Subject record by unique id 
 *
 * @param {string} id - The unique id of target subject record
 * @param {callback} cb - The callback that handles the results 
 */

db.getSubject = function(id, cb) {
	Subject.findById(id, function(err, subject) {
		cb(err, subject);
	});
}


/** 
 * Updates Subject record unique JSON
 *
 * @param {string} id - The unique id of target subject record
 * @param {string} data - JSON with updated properties
 * @param {callback} cb - The callback that handles the results 
 */

db.updateSubject = function(id, data, cb) {
	Subject.findByIdAndUpdate(id, { $set: data }, function (err, subject) {
		cb(err, subject);
	});
}	


/** 
 * Removes Subject record by unique id 
 *
 * @param {string} id - The unique id of target subject record
 * @param {callback} cb - The callback that handles the results 
 */

db.removeSubject = function(id, cb) {
  Subject.findByIdAndRemove(id, function (err) {
    cb(err);
  });
}


/** 
 * List Subjects
 *
 * @param {string} opt - The query options from request
 * @param {callback} cb - The callback that handles the results 
 */

db.listSubjects = function(opt, cb) {
	  var query = util.getQuery(opt.query),
	      options = util.getOptions(opt);

  Subject.find(query, null, options, function(err, subjects) {
    cb(err, subjects);
  });
}