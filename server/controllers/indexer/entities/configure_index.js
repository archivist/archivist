#!/usr/bin/env node

var elasticsearch = require('elasticsearch');
var _ = require('underscore');
var config = require('../../config');
var indexConfiguration = require('./index_configuration');

var configureIndex = function(cb) {
  var client = new elasticsearch.Client(_.clone(config));
  client.indices.delete({
    index: ["entities"],
    ignore: [404]
  }).then(function() {
    console.info('Configuring index...');
    return client.indices.create(indexConfiguration);
  }).error(function(error, resp) {
    console.error(error);
    client.close();
    cb(error);
  }).done(function() {
    client.close();
    cb(null);
  });
};

module.exports = configureIndex;