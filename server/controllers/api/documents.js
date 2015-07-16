var Document = require('../models/document.js')
  , maintenance = require('./maintenance.js')
  , oauth = require('./oauth.js')
  , express = require('express')
  , api = express.Router();

var db = exports;


/* The Document REST api */

var createDocument = function(req, res, next) {
  Document.add(req.user, function(err) {
    if (err) return next(err);
    res.json(200);
  });
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
  .post(maintenance.checkCurrentMode, createDocument)
  .get(listDocuments)

api.route('/documents/:id')
  .get(readDocument) // dropped out oauth.ensureAuthenticated for reader
  .put(maintenance.checkCurrentMode, oauth.ensureAuthenticated, updateDocument)
  .delete(maintenance.checkCurrentMode, deleteDocument)

api.route('/documents/:id/validate')
  .get(validateDocument)

module.exports = api;