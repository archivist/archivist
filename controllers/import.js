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
  , Substance = require('Substance')
  , importer = express.Router();


var timecodeAnnotator = require('./import/timecodes');
var toponymAnnotator = require('./import/toponyms');
var prisonAnnotator = require('./import/prisons');

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
  toponymAnnotator(docId, gsId, function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/toponyms/:gsid')
  .get(annotateToponyms)

var annotatePrisons = function(req, res, next) {
  var docId = req.params.id;
  var gsId = req.params.gsid;
  prisonAnnotator(docId, gsId, function(err, doc) {
    if(err) return res.status(500).json(err.message);
    res.status(200).json(doc);
  });
}

importer.route('/:id/prisons/:gsid')
  .get(annotatePrisons)

var annotateInterview = function(req, res, next) {
  var interviewDBId = '55451f3d1871404a0c7dff95';
  var interviewColumnId = '14';
  var interviewInternalId = '7';


  Spreadsheet.load({
      debug: true,
      username: process.env.GUSER || '',
      password: process.env.GPASS || '',
      spreadsheetId: '1Wf3Zwhj_5cNaTUKNqayHrqiKgxpelfAOS7Nek77lgQE',
      worksheetId: 'opogbz4'
    }, function run(err, spreadsheet) {
      if(err) throw err;
      //receive all cells
      spreadsheet.receive({},function(err, rows, info) {
        var map = {};
        _.each(rows, function(row, n){
          if (n != 1) {
            var currentId = '';

            _.each(row, function(cell, column) {
              if(column == '1') {
                currentId = cell;
              }
              if(column == interviewColumnId && cell != '' && cell != ' ' && cell != '\n') {
                var cleared = cell.replace(/ /g, '');
                cleared = cleared.replace(/\n/g, '');
                var cleaner = new RegExp(interviewInternalId + ':{','g');
                cleared = cleared.replace(cleaner, '{');
                var path = cleared.split(';');
                _.each(path, function(val, i){
                  path[i] = val.split('-');
                })
                map[currentId] = path;
              }
            })
          }
        });
        var codes = {};
        _.each(map, function(path, subject) {
          _.each(path, function(subjectCodes){
            if(_.isUndefined(codes[subjectCodes])) {
              codes[subjectCodes] = [];
              codes[subjectCodes].push(subject);
            } else {
              codes[subjectCodes].push(subject);
            }
          });
        });
        Document.get(interviewDBId, function(err, doc){
          var interview = new Interview(doc);
          interview.version = doc.__v;
          var timecodesMap = {};
          var timecodes = interview.getIndex('type').get('timecode');
          var interviewContent = interview.get('content');
          _.each(timecodes, function(code, id){
            var content = interview.get(code.path);
            var timecode = content.substr(code.startOffset, code.endOffset);

            timecodesMap[timecode] = code;
          })
          _.each(codes, function(subjects, code){
            //console.log('Search for subject #' + subject);
            //console.log(path)
            var subjectCodes = code.split(',');
            console.log(subjectCodes)
            //_.each(path, function(subjectCodes){
              //console.log(subjectCodes)
            if(subjectCodes.length > 1) {
              //console.log('Starts with ' + timecodesMap[subjectCodes[0]].id)
              //console.log('Ends with ' + timecodesMap[subjectCodes[1]].id)
              var endNodeId = interviewContent.getComponent(timecodesMap[subjectCodes[1]].path[0]).content.previous.rootId;
              //console.log(timecodesMap[subjectCodes[0]].startPath,timecodesMap[subjectCodes[0]].endOffset,subject,[endNodeId, 'content'],interview.get(endNodeId).content.length - 1, Substance.uuid())
              var tx = interview.startTransaction();
              tx.create({
                type: "subject_reference",
                startPath: timecodesMap[subjectCodes[0]].startPath,
                startOffset: timecodesMap[subjectCodes[0]].endOffset,
                target: subjects,
                container: "content",
                id: 'subject_reference_' + Substance.uuid(),
                endPath: [endNodeId, 'content'],
                endOffset: interview.get(endNodeId).content.length
              })
              tx.save()
              tx.cleanup()
            } else {
              console.log('Some problems discovered, subject: #', code, ', code: ', subjectCodes);
            }
          })
          console.log(interview.version)
          var data = interview.toJSON();
          data._schema = data.schema;
          delete data.schema;
          Document.findByIdAndUpdate(interviewDBId, { $set: JSON.parse(JSON.stringify(data)), $inc: { __v: 1 } }, {new: true}, function(err, document) {
            if (err) return next(err);
            res.status(200).send(document);
          })
        })
      });
  });
}

importer.route('/interview')
  .get(annotateInterview)


var entitiesAnnotator = function(req, res, next) {
  getToponyms(function(err, toponyms){
    if(err) return next(err);
    console.log(toponyms);
  })
  res.json(200);
};

importer.route('/entities')
  .get(entitiesAnnotator)


module.exports = importer;