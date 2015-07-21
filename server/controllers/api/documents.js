var Document = require('../../models/document.js')
  , maintenance = require('../shared/maintenance.js')
  , auth = require('../auth/utils.js')
  , express = require('express')
  , api = express.Router();

var db = exports;


/* The Document REST api */

var createDocument = function(req, res, next) {
  Document.createEmpty(req.user, function(err, doc) {
    if (err) return next(err);
    res.json({id: doc._id});
  })
}


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


var validateDocument = function(req, res, next) {
  Document.validateStructure(req.params.id, function(err, result) {
    if (err) return next(err);
    res.json(result);
  });
}


var listDocuments = function(req, res, next) {
  Document.list(req.query, function(err, documents) {
    if (err) return next(err);
    res.json(documents);
  });
}

api.route('/documents')
  .get(auth.checkAuth, listDocuments);

api.route('/documents/new')
  .get(maintenance.checkCurrentMode, auth.checkAuth, createDocument)

api.route('/documents/:id')
  .get(readDocument) // dropped out auth.ensureAuthenticated for reader
  .put(maintenance.checkCurrentMode, auth.checkAuth, updateDocument)
  .delete(maintenance.checkCurrentMode, auth.checkAuth, auth.check_scopes, deleteDocument);

api.route('/documents/:id/validate')
  .get(auth.checkAuth, validateDocument);

module.exports = api;