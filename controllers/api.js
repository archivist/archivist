var Document = require('../models/document.js')
  , Subject = require('../models/subject.js')
  , User = require('../models/user.js')
  , maintenance = require('./maintenance.js')
  , oauth = require('./oauth.js')
  , util = require('./util.js')
  , sUtil = require('substance-util')
  , _ = require('underscore')
  , express = require('express')
  , rest = express.Router();

var db = exports;


/* The Document REST api */

var createDocument = function(req, res, next) {
  Document.add(req.body, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

// var createEmptyDocument = function(req, res, next) {
//   Document.add(req.body, function(err) {
//     if (err) return next(err);
//     res.json(200);
//   });
// }


var readDocument = function(req, res, next) {
  Document.get(req.params.id, function(err, document) {
    if (err) return next(err);
    res.json(document);
  });
}


var updateDocument = function(req, res, next) {
  Document.update(req.params.id, req.body, function(err, document) {
    if (err) return next(err);
    res.json(document);
  });
}


var deleteDocument = function(req, res, next) {
  Document.delete(req.params.id, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}


var listDocuments = function(req, res, next) {
  Document.list(req.query, function(err, documents) {
    if (err) return next(err);
    res.json(documents);
  });
}

rest.route('/documents')
  .post(maintenance.checkCurrentMode, createDocument)
  .get(listDocuments)

rest.route('/documents/:id')
  .get(readDocument)
  .put(maintenance.checkCurrentMode, updateDocument)
  .delete(maintenance.checkCurrentMode, deleteDocument)



/* The Subject REST api */

var createSubject = function(req, res, next) {
  Subject.add(req.body, function(err, subject) {
    if (err) return next(err);
    res.json(subject);
  });
}

var readSubject = function(req, res, next) {
  Subject.get(req.params.id, function(err, subject) {
    if (err) return next(err);
    res.json(subject);
  });
}

var updateSubject = function(req, res, next) {
  Subject.update(req.params.id, req.body, function(err, subject) {
    if (err) return next(err);
    res.json(subject);
  });
}

var deleteSubject = function(req, res, next) {
  Subject.delete(req.params.id, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

var listSubjects = function(req, res, next) {
  Subject.list(req.query, function(err, subjects) {
    if (err) return next(err);
    res.json(subjects);
  });
}

var mergeSubjects = function(req, res, next) {
  Subject.merge(req.query.one, req.query.into, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

// Subjects metadata
var loadMetadata = function(req, res, next) {
  Subject.getDBVersion(function(err, DBVersion) {
    Subject.list(req.query, function(err, subjects) {
      if (err) return next(err);
      res.json({
        subjectDBVersion: DBVersion,
        subjects: subjects 
      });
    });
  });
}


rest.route('/subjects')
  .post(maintenance.checkCurrentMode, createSubject)
  .get(listSubjects)

// Provides all metadata for the client including version strings
rest.route('/metadata')
  .get(maintenance.checkCurrentMode, loadMetadata)

rest.route('/subjects/merge')
  .get(maintenance.checkCurrentMode, oauth.ensureSuperAuth, mergeSubjects)

rest.route('/subjects/:id')
  .get(maintenance.checkCurrentMode, readSubject)
  .put(maintenance.checkCurrentMode, updateSubject)
  .delete(maintenance.checkCurrentMode, oauth.ensureSuperAuth, deleteSubject)


/* The User api */

var readUser = function(req, res, next) {
  User.get(req.params.id, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
}

var updateUser = function(req, res, next) {
  User.update(req.params.id, req.body, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
}
var listUsers = function(req, res, next) {
  User.list(req.query, function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
}

rest.route('/users')
  .get(oauth.ensureSuperAuth, listUsers)

rest.route('/users/:id')
  .get(oauth.ensureSuperAuth, readUser)
  .put(oauth.ensureSuperAuth, updateUser)


module.exports = rest;