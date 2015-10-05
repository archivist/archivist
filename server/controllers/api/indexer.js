var express = require('express')
  , Document = require('../../models/document.js')
  , setupIndexer = require('../indexer/setup')
  , indexQueue = require('../shared/queue.js')
  , api = express.Router()
  , interviews = require('../indexer/interviews');

var host = process.env.ARCHIVIST_HOST || 'localhost';
var index = process.env.INDEX || "false";

// Full search (including fragments)

var search = function(req, res, next) {
  console.time("search interviews")
  var query = {
    searchString: "",
    published: true,
    filters: {}
  };

  if(req.query.searchQuery) {
    query = JSON.parse(req.query.searchQuery);
    query.published = true;
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
    published: true,
    filters: {}
  };

  if(req.query) {
    query = JSON.parse(req.query);
    query.published = true;
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
  if(req.hostname == host && index == 'true') { 
    setupIndexer(function(err){
      if(err) return next(err);
      indexQueue.requestFullReindex();
      res.send(200);
    })
  } else {
    res.send(500);
  }
}

var requestReindex = function(req, res, next) {
  if(req.hostname == host && index == 'true') { 
    indexQueue.requestFullReindex();
    res.send(200);
  } else {
    res.send(500);
  }
}

var requestStatus = function(req, res, next) {
  if(req.hostname == host && index == 'true') { 
    indexQueue.printStatus();
    res.send(200);
  } else {
    res.send(500);
  }
}

var generateResources = function(req, res, next) {
  if(req.hostname == host) { 
    Document.generateResources();
    res.send(200);
  } else {
    res.send(500);
  }
}

api.route('/index/search')
  .get(search)

api.route('/index/search/document')
  .get(searchDocument)

// api.route('/index/seed')
//   .get(seedIndexes)

api.route('/index/reindex')
  .get(requestReindex)

// api.route('/index/status')
//   .get(requestStatus)

api.route('/index/resources')
  .get(generateResources)

module.exports = api;