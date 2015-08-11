var express = require('express')
  , api = express.Router()
  , interviews = require('../indexer/interviews/index');

// Full search (including fragments)

var search = function(req, res, next) {
  var query = {
    searchString: "",
    filters: {}
  };

  if(req.query.searchQuery) {
    query = JSON.parse(req.query.searchQuery);
    if (query.searchStr) {
      query.searchString = query.searchStr;
    }
  }
  interviews.findDocumentsWithContent(query, function(error, result) {
    if (error) {
      res.send('500', error.message);
    } else {
      res.send(result);
    }
  });
}

// Search fragments inside one intrview

var searchDocument = function(req, res, next) {
	var query = {
    documentId: req.query.documentId,
    searchString: "",
    filters: {}
  };

  if(req.query) {
    query = JSON.parse(req.query);
    if (query.searchStr) {
      query.searchString = query.searchStr;
    }
  }

  interviews.getDocumentPreview(query, function(error, result) {
    if (error) {
      res.send('500', error.message);
    } else {
      res.send(result);
    }
  });
}

api.route('/index/search')
  .get(search)

api.route('/index/search/document')
  .get(searchDocument)

module.exports = api;