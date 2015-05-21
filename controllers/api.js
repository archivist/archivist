var Document = require('../models/document.js')
  , Subject = require('../models/subject.js')
  , Location = require('../models/location.js')
  , Person = require('../models/person.js')
  , Definition = require('../models/definition.js')
  , User = require('../models/user.js')
  , maintenance = require('./maintenance.js')
  , oauth = require('./oauth.js')
  , getEntities = require('./entities.js')
  , searchQuery = require('./search.js')
  , util = require('./util.js')
  , sUtil = require('substance-util')
  , _ = require('underscore')
  , express = require('express')
  , rest = express.Router();

var db = exports;


/* The Document REST api */

var createDocument = function(req, res, next) {
  Document.add(req.user, function(err) {
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
  Document.change(req.params.id, req.body, req.user, function(err, document) {
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
  .get(oauth.ensureAuthenticated, readDocument)
  .put(maintenance.checkCurrentMode, oauth.ensureAuthenticated, updateDocument)
  .delete(maintenance.checkCurrentMode, deleteDocument)



/* The Subject REST api */

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


rest.route('/subjects')
  .post(maintenance.checkCurrentMode, createSubject)
  .get(listSubjects)

// Provides all metadata for the client including version strings
rest.route('/metadata')
  .get(maintenance.checkCurrentMode, loadMetadata)

rest.route('/subjects/merge')
  .get(maintenance.checkCurrentMode, oauth.ensureSuperAuth, mergeSubjects)

rest.route('/subjects/move')
  .get(maintenance.checkCurrentMode, oauth.ensureSuperAuth, moveSubjects)

rest.route('/subjects/:id')
  .get(maintenance.checkCurrentMode, readSubject)
  .put(maintenance.checkCurrentMode, updateSubject)
  .delete(maintenance.checkCurrentMode, oauth.ensureSuperAuth, deleteSubject)


/* The Person REST api */

var createPerson = function(req, res, next) {
  Person.add(req.body, req.user, function(err, person) {
    if (err) return next(err);
    res.json(person);
  });
}

var readPerson = function(req, res, next) {
  Person.get(req.params.id, function(err, person) {
    if (err) return next(err);
    res.json(person);
  });
}

var updatePerson = function(req, res, next) {
  Person.change(req.params.id, req.body, req.user, function(err, person) {
    if (err) return next(err);
    res.json(person);
  });
}

var deletePerson = function(req, res, next) {
  Person.delete(req.params.id, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

var listPersons = function(req, res, next) {
  Person.list(req.query, function(err, persons) {
    if (err) return next(err);
    res.json(persons);
  });
}

rest.route('/persons')
  .post(maintenance.checkCurrentMode, createPerson)
  .get(listPersons)

rest.route('/persons/:id')
  .get(maintenance.checkCurrentMode, readPerson)
  .put(maintenance.checkCurrentMode, updatePerson)
  .delete(maintenance.checkCurrentMode, oauth.ensureSuperAuth, deletePerson)


/* The definition REST api */

var createDefinition = function(req, res, next) {
  Definition.add(req.body, req.user, function(err, definition) {
    if (err) return next(err);
    res.json(definition);
  });
}

var readDefinition = function(req, res, next) {
  Definition.get(req.params.id, function(err, definition) {
    if (err) return next(err);
    res.json(definition);
  });
}

var updateDefinition = function(req, res, next) {
  Definition.change(req.params.id, req.body, req.user, function(err, definition) {
    if (err) return next(err);
    res.json(definition);
  });
}

var deleteDefinition = function(req, res, next) {
  Definition.delete(req.params.id, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

var listDefinitions = function(req, res, next) {
  Definition.list(req.query, function(err, definitions) {
    if (err) return next(err);
    res.json(definitions);
  });
}

rest.route('/definitions')
  .post(maintenance.checkCurrentMode, createDefinition)
  .get(listDefinitions)

rest.route('/definitions/:id')
  .get(maintenance.checkCurrentMode, readDefinition)
  .put(maintenance.checkCurrentMode, updateDefinition)
  .delete(maintenance.checkCurrentMode, oauth.ensureSuperAuth, deleteDefinition)


/* The Location REST api */

var createLocation = function(req, res, next) {
  Location.add(req.body, req.user, function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
}

var readLocation = function(req, res, next) {
  Location.get(req.params.id, function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
}

var updateLocation = function(req, res, next) {
  Location.change(req.params.id, req.body, req.user, function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
}

var deleteLocation = function(req, res, next) {
  Location.delete(req.params.id, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

var listLocations = function(req, res, next) {
  Location.list(req.query, function(err, locations) {
    if (err) return next(err);
    res.json(locations);
  });
}

var listPrisonLocations = function(req, res, next) {
  req.query.query = util.reduceQuery(req.query.query, {type: 'prison'});
  Location.list(req.query, function(err, locations) {
    if (err) return next(err);
    res.json(locations);
  });
}

var listToponymLocations = function(req, res, next) {
  req.query.query = util.reduceQuery(req.query.query, {type: 'toponym'});
  Location.list(req.query, function(err, locations) {
    if (err) return next(err);
    res.json(locations);
  });
}


rest.route('/locations')
  .post(maintenance.checkCurrentMode, createLocation)
  .get(listLocations)

rest.route('/locations/prisons')
  .get(listPrisonLocations)

rest.route('/locations/toponyms')
  .get(listToponymLocations)

rest.route('/locations/:id')
  .get(maintenance.checkCurrentMode, readLocation)
  .put(maintenance.checkCurrentMode, updateLocation)
  .delete(maintenance.checkCurrentMode, oauth.ensureSuperAuth, deleteLocation)

/* The User api */

var readUser = function(req, res, next) {
  User.get(req.params.id, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
}

var updateUser = function(req, res, next) {
  User.change(req.params.id, req.body, function(err, user) {
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

/* ENTITIES API */

var entitiesGetter = function(req, res, next) {
  var query = req.body,
      entityIds = query.entityIds || [];

  getEntities(entityIds, function (err, output) {
    if (err) return next(err);
    res.json({results: output});
  });
}

rest.route('/entities')
  .post(maintenance.checkCurrentMode, entitiesGetter)

/* SEARCH API */

var search = function(req, res, next) {
  // var query = '/' + req.query.search + '/';

  // var options = {
  //     limit: 10
  //   //, language: 'russian'
  // }
  // // Location.textSearch(query, options, function (err, output) {
  // //   if (err) return next(err);
  // //   res.json(output);
  // // });
  searchQuery(req.query, function (err, output) {
    if (err) return next(err);
    res.json(output);
  });
}

rest.route('/search')
  .get(maintenance.checkCurrentMode, search)

module.exports = rest;