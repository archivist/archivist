var Subject = require('../../models/subject.js')
  , maintenance = require('../shared/maintenance.js')
  , auth = require('../auth/utils.js')
  , express = require('express')
  , api = express.Router();

/* The Subjects REST api */

var createSubject = function(req, res, next) {
  Subject.add(req.body, req.user, function(err, subject) {
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
  Subject.change(req.params.id, req.body, req.user, function(err, subject) {
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

var mergeSubjects = function(req, res, next) {
  req.socket.setTimeout(800000);
  Subject.merge(req.query.one, req.query.into, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

var moveSubjects = function(req, res, next) {
  Subject.move(req.query.oldparent, req.query.newparent, req.query.node, req.query.oldpos, req.query.newpos, req.user, function(err) {
    if (err) res.status(500).send(err.stack);
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


api.route('/subjects')
  .post(maintenance.checkCurrentMode, auth.checkAuth, createSubject)
  .get(listSubjects)

// Provides all metadata for the client including version strings
api.route('/metadata')
  .get(maintenance.checkCurrentMode, loadMetadata)

api.route('/subjects/merge')
  .get(maintenance.checkCurrentMode, auth.checkAuth, auth.check_scopes, mergeSubjects)

api.route('/subjects/move')
  .get(maintenance.checkCurrentMode, auth.checkAuth, moveSubjects)

api.route('/subjects/:id')
  .get(maintenance.checkCurrentMode, readSubject)
  .put(maintenance.checkCurrentMode, auth.checkAuth, updateSubject)
  .delete(maintenance.checkCurrentMode, auth.checkAuth, auth.check_scopes, deleteSubject)

module.exports = api;