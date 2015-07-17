var Definition = require('../../models/definition.js')
  , maintenance = require('../shared/maintenance.js')
  , auth = require('../auth/utils.js')
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

api.route('/definitions')
  .post(maintenance.checkCurrentMode, auth.checkAuth, createDefinition)
  .get(listDefinitions);

api.route('/definitions/:id')
  .get(maintenance.checkCurrentMode, readDefinition)
  .put(maintenance.checkCurrentMode, auth.checkAuth, updateDefinition)
  .delete(maintenance.checkCurrentMode, auth.checkAuth, auth.check_scopes, deleteDefinition);

module.exports = api;