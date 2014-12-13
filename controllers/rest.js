/* The REST controller */
 
var db = require('./db.js')
	,	express = require('express')
  , rest = express.Router();


/* The Document REST controller */

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
  .post(createDocument)
  .get(listDocuments)

rest.route('/documents/:id')
  .get(readDocument)
  .put(updateDocument)
  .delete(deleteDocument)

module.exports = rest;