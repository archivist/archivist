var Definition = require('../../models/definition.js')
  , maintenance = require('../shared/maintenance.js')
  , resourcesMapCache = require('./entities').cache
  , getReferences = require('./entities').references
  , auth = require('../auth/utils.js')
  , _ = require('underscore')
  , express = require('express')
  , api = express.Router();


/* The definition REST api */

var createDefinition = function(req, res, next) {
  Definition.add(req.body, req.user, function(err, definition) {
    if (err) return next(err);
    res.json(definition);
  });
}

var readDefinition = function(req, res, next) {
  Definition.getRecord(req.params.id, function(err, definition) {
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
    if (err) return next(err);
    resourcesMapCache.get(function(err, resources) {
      if(err) return next(err);
      _.each(definitions[1], function(entity, id) {
        definitions[1][id] = entity.toJSON();
        definitions[1][id].docCounter = resources[entity._id] ? resources[entity._id].length : 0;
      });
      res.json(definitions);
    });
  });
}

var getDefinitionsReferences = function(req, res, next) {
  var id = req.params.id;
  getReferences(id, function(err, docs){
    if(err) return next(err);
    res.json([{total_entries: docs.length}, docs]);
  })
}

api.route('/definitions')
  .post(maintenance.checkCurrentMode, auth.checkAuth, createDefinition)
  .get(listDefinitions);

api.route('/definitions/:id')
  .get(maintenance.checkCurrentMode, readDefinition)
  .put(maintenance.checkCurrentMode, auth.checkAuth, updateDefinition)
  .delete(maintenance.checkCurrentMode, auth.checkAuth, auth.check_scopes, deleteDefinition);

api.route('/definitions/:id/references')
  .get(getDefinitionsReferences)

module.exports = api;