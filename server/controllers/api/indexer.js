var express = require('express')
  , setupIndexer = require('../indexer/setup')
  , api = express.Router()
  , interviews = require('../indexer/interviews');

// Full search (including fragments)

var search = function(req, res, next) {
  console.time("search interviews")
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
    console.timeEnd("search interviews")
    if (error) {
      res.send('500', error.message);
    } else {
      res.send(result);
    }
  });
}

// Search fragments inside one interview

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

// Seed search indexes

var seedIndexes = function(req, res, next) {
  if(req.hostname == "localhost") {
    setupIndexer();
    res.send(200);
  } else {
    console(req.hostname)
    res.send(500);
  }
}

api.route('/index/search')
  .get(search)

api.route('/index/search/document')
  .get(searchDocument)

api.route('/index/seed')
  .get(seedIndexes)

module.exports = api;