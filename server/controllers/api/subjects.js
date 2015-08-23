var Subject = require('../../models/subject.js')
  , maintenance = require('../shared/maintenance.js')
  , indexQueue = require('../shared/queue.js')
  , interviews = require('../indexer/interviews')
  , auth = require('../auth/utils.js')
  , _ = require('underscore')
  , express = require('express')
  , api = express.Router();

/* Set CORS */

api.use(auth.allowCrossDomain);

/* The Subjects REST api */

var createSubject = function(req, res, next) {
  Subject.add(req.body, req.user, function(err, subject) {
    if (err) return next(err);
    res.json(subject);
  });
}

var readSubject = function(req, res, next) {
  Subject.getRecord(req.params.id, function(err, subject) {
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
    indexQueue.add({type: 'document', op: 'reindex', meta: false});
    res.json(200);
  });
}

var listSubjects = function(req, res, next) {
  console.time("list subjects")
  Subject.getDBVersion(function(err, DBVersion) {
    interviews.countSubjects(function(err, counter){
      if(err) return next(err);
      Subject.list(req.query, function(err, subjects) {
        if (err) return next(err);
        _.each(subjects, function(subject, id) {
          subjects[id] = subject.toJSON();
          subjects[id].counter = counter[subject._id] ? counter[subject._id].occurrences : 0;
        })
        console.timeEnd("list subjects")
        res.json({
          subjectDBVersion: DBVersion,
          subjects: subjects 
        });
      });
    });
  });
}

var getSubjectsChildren = function(req, res, next) {
  var subject = req.params.id;
  Subject.getChildren(subject, function(err, children) {
    if (err) return next(err);
    res.json(children);
  });
}

var mergeSubjects = function(req, res, next) {
  req.socket.setTimeout(800000);
  req.socket.addListener('timeout', function() {
    socket.destroy();
  });
  Subject.merge(req.query.one, req.query.into, function(err) {
    if (err) return next(err);
    indexQueue.add({type: 'document', op: 'reindex', meta: false});
    res.json(200);
  });
}

var moveSubjects = function(req, res, next) {
  Subject.move(req.query.oldparent, req.query.newparent, req.query.node, req.query.oldpos, req.query.newpos, req.user, function(err) {
    if (err) return res.status(500).send(err.stack);
    indexQueue.add({type: 'document', op: 'reindex', meta: true});
    res.json(200);
  });
}

var forceRepairSubjects = function(req, res, next) {
  Subject.repairAllLeafs(function(err) {
    if (err) return res.status(500).send(err.stack);
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

// force all subject leafs repairing
// api.route('/subjects/repair')
//   .get(maintenance.checkCurrentMode, forceRepairSubjects)

api.route('/subjects/children/:id')
  .get(maintenance.checkCurrentMode, getSubjectsChildren)

api.route('/subjects/:id')
  .get(maintenance.checkCurrentMode, readSubject)
  .put(maintenance.checkCurrentMode, auth.checkAuth, updateSubject)
  .delete(maintenance.checkCurrentMode, auth.checkAuth, auth.check_scopes, deleteSubject)

module.exports = api;