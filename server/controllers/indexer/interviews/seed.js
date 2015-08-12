#!/usr/bin/env node

var elasticsearch = require('elasticsearch');
var config = require('../config');

var _ = require('underscore');

var Document = require('../../../models/document.js');
var Interview = require('archivist-core/interview');
var indexInterview = require('./op/index_interview');

var idx = 0;
var count = 0;
var MAX_COUNT = -1;
var documentIds = [];

function step(cb) {
  if (idx >= documentIds.length || (MAX_COUNT > 0 && count >= MAX_COUNT)) {
    cb(null);
    return;
  }
  var docId = documentIds[idx++];

  Document.getCleaned(docId, false, function(err, json){
    if (err) return cb(err);
    console.log('Indexing interview %s...', docId);
    var interview = new Interview.fromJson(json);
    var client = new elasticsearch.Client(_.clone(config));
    indexInterview(client, interview, function(err) {
      client.close();
      if (err) return cb(err);
      count++;
      step(cb);
    });
  });
}

var seedIndex = function(options, cb) {
  MAX_COUNT = options.MAX_COUNT || -1;
  count = 0;

  Document.list({}, function(err, records){
    if (err) return cb(err);
    var docs = records[1];
    _.each(docs, function(doc){
      documentIds.push(doc._id);
    });

    step(function(err) {
      if(err) {
        console.error(err);
        cb(err);
      } else {
        cb(null);
      }
    });
  });
};

module.exports = seedIndex;