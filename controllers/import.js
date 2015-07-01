var mongoose = require('mongoose')
  , Document = require('../models/document.js')
  , Location = require('../models/location.js')
  , Person = require('../models/person.js')
  , Definition = require('../models/definition.js')
  , Subject = require('../models/subject.js')
  , express = require('express')
  , _ = require('underscore')
  , async = require('async')
  , Spreadsheet = require('edit-google-spreadsheet')
  , Interview = require('./interview/index.js')
  , Substance = require('substance')
  , importer = express.Router();


var timecodeAnnotator = require('./import/timecodes');
var findAndReplace = require('./import/findAndReplace');
var indentationCleaner = require('./import/clearIndentation');
var subjectsAnnotator = require('./import/subjects');
var toponymsAnnotator = require('./import/toponyms');
var prisonsAnnotator = require('./import/prisons');
var realitiesAnnotator = require('./import/realities');
var personsAnnotator = require('./import/persons');

var removeDoubleSpaces = function(req, res, next) {
  var docId = req.params.id;
  findAndReplace(docId, '  ', ' ', function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/doublespaces')
  .get(removeDoubleSpaces)

var removeTripleSpaces = function(req, res, next) {
  var docId = req.params.id;
  findAndReplace(docId, '   ', ' ', function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/triplespaces')
  .get(removeTripleSpaces)

var removeIndentation = function(req, res, next) {
  var docId = req.params.id;
  indentationCleaner(docId, function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/indentation')
  .get(removeIndentation)

var annotateTimecodes = function(req, res, next) {
  var docId = req.params.id;
  timecodeAnnotator(docId, function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/timecodes')
  .get(annotateTimecodes)

var annotateToponyms = function(req, res, next) {
  var docId = req.params.id;
  var gsId = req.params.gsid;
  toponymsAnnotator(docId, gsId, function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/toponyms/:gsid')
  .get(annotateToponyms)

var annotatePrisons = function(req, res, next) {
  var docId = req.params.id;
  var gsId = req.params.gsid;
  prisonsAnnotator(docId, gsId, function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/prisons/:gsid')
  .get(annotatePrisons)

var annotateAbbrs = function(req, res, next) {
  var docId = req.params.id;
  var gsId = req.params.gsid;
  var GSTableId = 'ow0uer7';
  realitiesAnnotator(docId, gsId, GSTableId, function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/abbrs/:gsid')
  .get(annotateAbbrs)

var annotateRealities = function(req, res, next) {
  var docId = req.params.id;
  var gsId = req.params.gsid;
  var GSTableId = 'o4yren4';
  realitiesAnnotator(docId, gsId, GSTableId, function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/realities/:gsid')
  .get(annotateRealities)

var annotatePersons = function(req, res, next) {
  var docId = req.params.id;
  var gsId = req.params.gsid;
  personsAnnotator(docId, gsId, function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/persons/:gsid')
  .get(annotatePersons)


var annotateSubjects = function(req, res, next) {
  var docId = req.params.id;
  var gsId = req.params.gsid;
  var columnId = req.params.gscolumn;
  subjectsAnnotator(docId, gsId, columnId, function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/subjects/:gsid/:gscolumn')
  .get(annotateSubjects)


module.exports = importer;