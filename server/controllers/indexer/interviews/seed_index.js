#!/usr/bin/env node

var elasticsearch = require('elasticsearch');
var config = require('../config');

var _ = require('underscore');
var getJSON = require('./get_json');

var Interview = require('archivist-core/interview');
var indexInterview = require('./index_interview');

var idx = 0;
var count = 0;
var MAX_COUNT = -1;
var documentUrs = [];

function step(cb) {
  if (idx >= documentUrs.length || (MAX_COUNT > 0 && count >= MAX_COUNT)) {
    cb(null);
    return;
  }
  var url = documentUrs[idx++];

  getJSON(url, function(err, json){
    if (err) return cb(err);
    console.log('Indexing interview %s...', url);
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

  getJSON(config.archive + '/api/documents', function(err, json){
    if (err) return cb(err);
    var docs = json[1];
    _.each(docs, function(doc){
      var url = config.archive + '/api/documents/' + doc._id;
      documentUrs.push(url);
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
