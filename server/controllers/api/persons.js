var Person = require('../../models/person.js')
  , maintenance = require('../shared/maintenance.js')
  , resourcesMapCache = require('./entities').cache
  , getReferences = require('./entities').references
  , auth = require('../auth/utils.js')
  , _ = require('underscore')
  , express = require('express')
  , api = express.Router();


/* The Person REST api */

var createPerson = function(req, res, next) {
  Person.add(req.body, req.user, function(err, person) {
    if (err) return next(err);
    res.json(person);
  });
}

var readPerson = function(req, res, next) {
  Person.getRecord(req.params.id, function(err, person) {
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
    resourcesMapCache.get(function(err, resources) {
      if(err) return next(err);
      _.each(persons[1], function(entity, id) {
        persons[1][id] = entity.toJSON();
        persons[1][id].docCounter = resources[entity._id] ? resources[entity._id].length : 0;
      });
      res.json(persons);
    });
  });
}

var getPersonReferences = function(req, res, next) {
  var id = req.params.id;
  getReferences(id, function(err, docs){
    if(err) return next(err);
    res.json([{total_entries: docs.length}, docs]);
  })
}

api.route('/persons')
  .post(maintenance.checkCurrentMode, auth.checkAuth, createPerson)
  .get(listPersons)

api.route('/persons/:id')
  .get(maintenance.checkCurrentMode, readPerson)
  .put(maintenance.checkCurrentMode, auth.checkAuth, updatePerson)
  .delete(maintenance.checkCurrentMode, auth.checkAuth, auth.check_scopes, deletePerson)

api.route('/persons/:id/references')
  .get(getPersonReferences)

module.exports = api;