var elasticsearch = require('elasticsearch');
var config = require('../config');
var _ = require('underscore');

var buildQuery = function(options) {

  var searchString = options.searchString || '';
  var threshold = options.threshold || 1.0;

  var query = {
    index: 'entities',
    type: 'entity',
    body: {
      "min_score": threshold,
      "query": {
        "bool": {
          "should": [
            {
              "match": {
                "name": { "query": searchString, "minimum_should_match": "25%", "boost": 5.0 }
              }
            },
            {
              "match": {
                "synonyms": { "query": searchString, "minimum_should_match": "25%", "boost": 3.0 }
              }
            },
            {
              "match": {
                "description": { "query": searchString, "minimum_should_match": "25%", "boost": 1.0 }
              }
            }
          ]
        }
      },
      "highlight": {
        "pre_tags" : ['<span class="query-string">'], "post_tags" : ["</span>"],
        "fields": {
          // NOTE: "number_of_fragments" : 0 is necessary to suppress lucene's automatic truncation of fragments
          "name": { "number_of_fragments" : 0 },
          "synonyms": { "number_of_fragments" : 0 },
          "description": { "number_of_fragments" : 0 }
        }
      }
    }
  }

  return query;
}

var searchEntities = function(options, cb) {
  var client = new elasticsearch.Client(_.clone(config));
  var query = buildQuery(options);

  // console.log("################################");
  // console.log(JSON.stringify(query, null, 2));
  // console.log("################################");

  client.search(query).then(function(body) {
    client.close();
    cb(null, body);
  }, function (error) {
    console.trace(error.message);
    client.close();
    cb(error);
  });
}

module.exports = searchEntities;
