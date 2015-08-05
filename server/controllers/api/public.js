var Document = require('../../models/document.js')
  , Subjects = require('../../models/subject.js')
  , EntitiesGetter = require('./entities.js').get
  , Interview = require('archivist-core/interview')
  , auth = require('../auth/utils.js')
  , _ = require('underscore')
  , async = require('async')
  , express = require('express')
  , api = express.Router();

/* Set CORS */

api.use(auth.allowCrossDomain);

/* The Public REST api */

var readDocument = function(req, res, next) {
  Document.getCleaned(req.params.id, true, function(err, document) {
    if (err) return next(err);
    cleanDocument(document, function(err, result) {
      if (err) return next(err);
      res.json(result);
    });
  });
}

var listDocuments = function(req, res, next) {
  if(!req.query.query) {
    req.query.query = {
      "nodes.document.published": true
    }
  } else {
    req.query.query["nodes.document.published"] = true;
  }
  Document.list(req.query, function(err, documents) {
    if (err) return next(err);
    res.json(documents);
  });
}

var cleanDocument = function(doc, cb) {
  var interview = new Interview.fromJson(doc);
  interview.FORCE_TRANSACTIONS = false;
  // Clean documents for public usage
  _.each(doc.nodes, function(node, id){
    if(node.type == "comment") {
      interview.delete(id);
    }
  });
  async.parallel([
    function(callback){
      getSubjects(interview, callback);
    },
    function(callback){
      getEntities(interview, callback);
    }
  ],
  function(err, results){
    if (err) return cb(err);
    var output = {
      document: interview.toJSON(),
      subjects: results[0],
      entities: results[1]
    }
    cb(err, output);
  });

}

var getSubjects = function(doc, cb) {
  Subjects.list({}, function(err, subjects) {
    if (err) return cb(err);
    var subjectsModel = new Interview.SubjectsModel(doc, subjects);
    var filtered = subjectsModel.getAllReferencedSubjectsWithParents();
    cb(null, filtered);
  });
}

var getEntities = function(doc, cb) {
  var entityRefs = doc.getIndex('type').get('entity_reference');
  var entities = _.pluck(entityRefs, 'target');
  entities = _.uniq(entities);
  EntitiesGetter(entities, function (err, output) {
    if (err) return cb(err);
    cb(null, output);
  });
}

api.route('/public/documents')
  .get(listDocuments);

api.route('/public/documents/:id')
  .get(readDocument);

module.exports = api;