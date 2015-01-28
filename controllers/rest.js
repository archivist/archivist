/* The REST controller */
 
var db = require('./db.js')
  , mode = require('./mode.js')
	,	express = require('express')
  , rest = express.Router();


/* The Documents REST controller */

var createDocument = function(req, res, next) {
  db.createDocument(req.body, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

var readDocument = function(req, res, next) {
  db.getDocument(req.params.id, function(err, document) {
    if (err) return next(err);
    res.json(document);
  });
}

var updateDocument = function(req, res, next) {
  db.updateDocument(req.params.id, req.body, function(err, document) {
    if (err) return next(err);
    res.json(document);
  });
}

var deleteDocument = function(req, res, next) {
  db.removeDocument(req.params.id, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

var listDocuments = function(req, res, next) {
  db.listDocuments(req.query, function(err, documents) {
    if (err) return next(err);
    res.json(documents);
  });
}


rest.route('/documents')
  .post(mode.checkCurrentMode, createDocument)
  .get(listDocuments)

rest.route('/documents/:id')
  .get(readDocument)
  .put(mode.checkCurrentMode, updateDocument)
  .delete(mode.checkCurrentMode, deleteDocument)


/* The Subjects REST controller */

var createSubject = function(req, res, next) {
  db.createSubject(req.body, function(err, subject) {
    if (err) return next(err);
    res.json(subject);
  });
}

var readSubject = function(req, res, next) {
  db.getSubject(req.params.id, function(err, subject) {
    if (err) return next(err);
    res.json(subject);
  });
}

var updateSubject = function(req, res, next) {
  db.updateSubject(req.params.id, req.body, function(err, subject) {
    if (err) return next(err);
    res.json(subject);
  });
}

var deleteSubject = function(req, res, next) {
  db.removeSubject(req.params.id, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

var listSubjects = function(req, res, next) {
  db.listSubjects(req.query, function(err, subjects) {
    if (err) return next(err);
    res.json(subjects);
  });
}

var mergeSubjects = function(req, res, next) {
  db.mergeSubjects(req.query.one, req.query.into, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

var loadMetadata = function(req, res, next) {
  db.getSubjectDBVersion(function(err, subjectDBVersion) {
    db.listSubjects(req.query, function(err, subjects) {
      if (err) return next(err);
      res.json({
        subjectDBVersion: subjectDBVersion,
        subjects: subjects 
      });
    });
  });
}


rest.route('/subjects')
  .post(mode.checkCurrentMode, createSubject)
  .get(mode.checkCurrentMode, listSubjects)

// Provides all metadata for the client including version strings
rest.route('/metadata')
  .get(mode.checkCurrentMode, loadMetadata)

rest.route('/subjects/merge')
  .get(mode.checkCurrentMode, mergeSubjects)

rest.route('/subjects/:id')
  .get(mode.checkCurrentMode, readSubject)
  .put(mode.checkCurrentMode, updateSubject)
  .delete(mode.checkCurrentMode, deleteSubject)


module.exports = rest;