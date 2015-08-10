var Interview = require('archivist-core/interview');
var indexInterview = require('./index_interview.js');
var deleteInterview = require('./delete_interview.js');
var _ = require('underscore');
var request = require('superagent');
var elasticsearch = require('elasticsearch');
var config = require('../config');

var getJSON = function(url, cb) {
  request
    .get(url)
    .end(function(err, res){
      if(err) console.error(err);
      cb(err, res.body);
    });
}

var deleteFromIndex = function(id, cb) {
  var client = new elasticsearch.Client(_.clone(config));

  deleteInterview.removeFragments(client, id).error(function(err) {
    console.error("Failed.", arguments);
    return cb(err);
  }).then(function() {
    client.close();
    client = new elasticsearch.Client(_.clone(config));
    console.log("All fragments for", id, "has been removed.");
    deleteInterview.removeInterview(client, id).error(function(err) {
      console.error("Failed.", arguments);
      return cb(err);
    }).then(function() {
      client.close();
      console.log("Interview", id, "has been removed from index.");
      cb(null);
    });
  });
}

var updateIndex = function(id, cb) {
  var interviewUrl = config.archive + '/api/documents/' + id;
  var client = new elasticsearch.Client(_.clone(config));

  deleteFromIndex(id, function(err){
    if (err) return cb(err);
    getJSON(interviewUrl, function(err, json){
      if (err) return cb(err);
      console.log('Indexing interview %s...', interviewUrl);
      var interview = new Interview.fromJson(json);
      indexInterview(client, interview, function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log('Done.');
        }
        client.close();
        cb(err);
      });
    });
  });
}

module.exports = {
  update: updateIndex,
  remove: deleteFromIndex
}