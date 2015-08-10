var express = require('express')
  , api = express.Router()
  , interviews = require('../indexer/interviews/queries');

  var _ = require('underscore');
var express = require('express');
var app = express();
var queries = require('./src/queries');
var index = require('./src/interview_op');


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

// Calculate subject frequency

var subjectFrequency = function(req, res, next) {
	interviews.countSubjects(function(err, result) {
    if (err) {
      res.send('500', err.message);
    } else {
      res.status(200).json(result);
    }
  });
}