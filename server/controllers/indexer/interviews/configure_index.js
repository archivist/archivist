#!/usr/bin/env node

var elasticsearch = require('elasticsearch');
var _ = require('underscore');
var config = require('../config');
var indexConfiguration = require('./config');

var configureIndex = function(cb) {
  var client = new elasticsearch.Client(_.clone(config));
  client.indices.delete({
    index: ["interviews"],
    ignore: [404]
  }).then(function() {
    client.close();
    console.info('Configuring index...');
    createIndex(cb);
  }, function(err) {
    console.error("Failed.", arguments);
    client.close();
    cb(err);
  });
};

var createIndex = function(cb) {
  var client = new elasticsearch.Client(_.clone(config));
  client.indices.create(indexConfiguration).then(function() {
    client.close();
    cb(null);
  }, function(err) {
    console.error("Failed.", arguments);
    client.close();
    cb(err);
  });
}

module.exports = configureIndex;