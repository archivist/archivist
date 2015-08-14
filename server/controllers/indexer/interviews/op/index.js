var Interview = require('archivist-core/interview');
var indexInterview = require('./index_interview.js');
var deleteInterview = require('./delete_interview.js');
var _ = require('underscore');
var elasticsearch = require('elasticsearch');
var config = require('../../config');

/**
 * Add Interview and all related fragments to index
 *
 * @param {string} id - Id of interview to add
 * @param {function} cb - The callback that handles the results 
 */

var addToIndex = function(id, cb) {
  var client = new elasticsearch.Client(_.clone(config));

  Document.getCleaned(id, false, function(err, json){
    if (err) return cb(err);
    console.log('Indexing interview %s...', id);
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
}

/**
 * Update Interview record inside index
 *
 * @param {string} id - Id of interview to update
 * @param {boolean} meta - Meta mode to update only Interview metadata, otherwise fragments will also updated 
 * @param {function} cb - The callback that handles the results 
 */

var updateIndex = function(id, meta, cb) {
  
}

/**
 * Removes Interview and all related fragments from index
 *
 * @param {string} id - Id of interview to remove
 * @param {function} cb - The callback that handles the results 
 */

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

module.exports = {
  update: updateIndex,
  remove: deleteFromIndex
}