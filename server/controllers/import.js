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
var index = require('./import/index');
var subjectsAnnotator = require('./import/subjects');
var toponymsAnnotator = require('./import/toponyms');
var prisonsAnnotator = require('./import/prisons');
var realitiesAnnotator = require('./import/realities');
var personsAnnotator = require('./import/persons');
var postProcessing = require('./import/post-process');


/*
  Run all importers one after another
*/

var prepareAnnotations = function(req, res, next) {
  req.socket.setTimeout(240000);
  var docId = req.params.id;
  var gsId = req.params.gsid;
  var columnId = req.params.gscolumn;
  async.series([
    function(callback){
      console.log('Running indentation cleaner...');
      indentationCleaner(docId, function(err, doc) {
        if(err) return callback(err);
        console.log('Indentation has been cleaned');
        callback(null, 'indentation');
      });
    },
    function(callback){
      console.log('Running triple spaces cleaner...');
      findAndReplace(docId, '   ', ' ', function(err, doc) {
        if(err) return callback(err);
        console.log('Triple spaces has been cleaned');
        callback(null, 'triple spaces');
      });
    },
    function(callback){
      console.log('Running double spaces cleaner...');
      findAndReplace(docId, '  ', ' ', function(err, doc) {
        if(err) return callback(err);
        console.log('Double spaces has been cleaned');
        callback(null, 'double spaces');
      });
    },
    function(callback){
      console.log('Updating index...');
      index.update(docId, function(err, doc) {
        if(err) return callback(err);
        console.log('Index has been updated');
        callback(null, 'update index');
      });
    },
    function(callback){
      console.log('Running timecode annotator...');
      timecodeAnnotator(docId, function(err, doc) {
        if(err) return callback(err);
        console.log('Timecodes has been annotated');
        callback(null, 'timecodes');
      });
    }
  ],
  // optional callback
  function(err, results){
    if(err) return res.status(500).json(err.message);
    console.log('Done!');
    res.status(200).json(results);
  });
}

importer.route('/:id/prepare/:gsid/:gscolumn')
  .get(prepareAnnotations)

var importAnnotations = function(req, res, next) {
  req.connection.setTimeout(800000);
  var docId = req.params.id;
  var gsId = req.params.gsid;
  var columnId = req.params.gscolumn;
  async.series([  
    function(callback){
      console.log('Running indentation cleaner...');
      indentationCleaner(docId, function(err, doc) {
        if(err) return callback(err);
        console.log('Indentation has been cleaned');
        callback(null, 'indentation');
      });
    },
    function(callback){
      console.log('Running triple spaces cleaner...');
      findAndReplace(docId, '   ', ' ', function(err, doc) {
        if(err) return callback(err);
        console.log('Triple spaces has been cleaned');
        callback(null, 'triple spaces');
      });
    },
    function(callback){
      console.log('Running double spaces cleaner...');
      findAndReplace(docId, '  ', ' ', function(err, doc) {
        if(err) return callback(err);
        console.log('Double spaces has been cleaned');
        callback(null, 'double spaces');
      });
    },
    function(callback){
      console.log('Updating index...');
      index.update(docId, function(err, doc) {
        if(err) return callback(err);
        console.log('Index has been updated');
        callback(null, 'update index');
      });
    },
    function(callback){
      console.log('Running timecode annotator...');
      timecodeAnnotator(docId, function(err, doc) {
        if(err) return callback(err);
        console.log('Timecodes has been annotated');
        callback(null, 'timecodes');
      });
    },  
    function(callback){
      console.log('Running subjects annotator...');
      subjectsAnnotator(docId, gsId, columnId, function(err, doc) {
        if(err) return callback(err);
        console.log('Subjects has been annotated');
        callback(null, 'subjects');
      });
    },
    function(callback){
      console.log('Running toponyms annotator...');
      toponymsAnnotator(docId, gsId, function(err, doc) {
        if(err) return callback(err);
        console.log('Toponyms has been annotated');
        callback(null, 'toponyms');
      });
    },
    function(callback){
      console.log('Running prisons annotator...');
      prisonsAnnotator(docId, gsId, function(err, doc) {
        if(err) return callback(err);
        console.log('Prisons has been annotated');
        callback(null, 'prisons');
      });
    },
    function(callback){
      console.log('Running abbreviations annotator...');
      var GSTableId = 'ow0uer7';
      realitiesAnnotator(docId, gsId, GSTableId, function(err, doc) {
        if(err) return callback(err);
        console.log('Abbreviations has been annotated');
        callback(null, 'abbreviations');
      });
    },
    function(callback){
      console.log('Running realities annotator...');
      var GSTableId = 'o4yren4';
      realitiesAnnotator(docId, gsId, GSTableId, function(err, doc) {
        if(err) return callback(err);
        console.log('Realities has been annotated');
        callback(null, 'realities');
      });
    },
    function(callback){
      console.log('Running persons annotator...');
      personsAnnotator(docId, gsId, function(err, doc) {
        if(err) return callback(err);
        console.log('Persons has been annotated');
        callback(null, 'persons');
      });
    }
  ],
  // optional callback
  function(err, results){
    if(err) return res.status(500).json(err.message);
    console.log('Done!');
    res.status(200).json(results);
  });
}

importer.route('/:id/all/:gsid/:gscolumn')
  .get(importAnnotations)

/*
  Separated methods for each importer
*/

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

var updateIndex = function(req, res, next) {
  var docId = req.params.id;

  index.update(docId, function(err) {
    if(err) return res.status(500).json(err.message);
    res.status(200).send('done');
  });
}

importer.route('/:id/updateindex')
  .get(updateIndex)

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
  req.socket.setTimeout(800000);
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

var postProcess = function(req, res, next) {
  var docId = req.params.id;
  postProcessing(docId, function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json('ok');
  });
}

importer.route('/:id/post')
  .get(postProcess)


module.exports = importer;