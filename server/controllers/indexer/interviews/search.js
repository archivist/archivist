var elasticsearch = require('elasticsearch');
var config = require('../config');
var _ = require('underscore');
var getExtendedSubjects = require('./get_extended_subjects');
var searchEntities = require('./search_entities');

function buildQuery(options) {

  function _mustMatch(filters) {
    var terms = [];
    var result = {
      and: terms
    };
    var hasFilters = false;
    _.each(filters, function(values, facet) {
      if (values.length > 0) {
        _.each(values, function(value) {
          var term = {};
          term[facet] = value;
          terms.push({ term: term });
        });
        hasFilters = true;
      }
    });
    if (hasFilters) {
      return result;
    } else {
      return null;
    }
  }

  function _fragmentMatch(searchString/*, filters*/) {
    var should = [];
    var query;
    if (!searchString) {
      query = { "match_all": {} };
    } else {
      query = {
        "bool": {
          "should": should
        }
      };
      if (searchString) {
        should.push({ "match": { "content": { "query": searchString, "minimum_should_match": "75%" } } });
      }
    }
    return query;
  }

  function _query(searchString, options) {
    // either
    if (!searchString) {
      return {
        "match_all" : {}
      };
    } else {
      return {
        "bool": {
          "should": [
            {
              "has_child": {
                "type": "fragment",
                "score_mode" : "sum",
                "query": _fragmentMatch(searchString, options.extendedFilters)
              }
            },
            {
              "match": {
                "title": { "query": searchString, "minimum_should_match": "75%", "boost": 3.0 }
              }
            },
            {
              "match": {
                "short_summary": { "query": searchString, "minimum_should_match": "25%", "boost": 3.0 }
              }
            },
            {
              "match": {
                "short_summary_en": { "query": searchString, "minimum_should_match": "25%", "boost": 3.0 }
              }
            }
          ]
        }
      };
    }
  }

  var query = {
    index: 'interviews',
    type: 'interview',
    // only for debugging
    // explain: true,
    body: {
      "size": 100,
      // _source: false,
      "sort": [
        { "_score": { "order": "desc" } }
      ],
      "query": {
        "filtered": {
          "query": _query(options.searchString, options),
          "filter": _mustMatch(options.filters),
          // "filter": null
        }
      },
      "highlight": {
        "pre_tags" : ['<span class="query-string">'], "post_tags" : ["</span>"],
        "fields": {
          // NOTE: "number_of_fragments" : 0 is necessary to suppress lucene's automatic truncation of fragments
          "title": { "number_of_fragments" : 0 },
          "short_summary": { "number_of_fragments" : 0 },
          "short_summary_en": { "number_of_fragments" : 0 }
        }
      },
      "aggs": {
        subjects: {
          "nested" : {
            "path" : "subjects_count"
          },
          aggs: {
            "sum" : {
              terms : {
                "field": "subjects_count.id",
                "size": 5000
              },
              aggs: {
                occurrences: {
                  "sum" : { "field" : "subjects_count.count" }
                },
                count: {
                  "sum" : { "field" : "subjects_count.one" }
                }
              }
            }
          }
        },
        entities: {
          "nested" : {
            "path" : "entities_count"
          },
          aggs: {
            "sum" : {
              terms : {
                "field": "entities_count.id",
                "size": 5000
              },
              aggs: {
                occurrences: {
                  "sum" : { "field" : "entities_count.count" }
                },
                count: {
                  "sum" : { "field" : "entities_count.one" }
                }
              }
            }
          }
        }
      }
    }
  };
  if (!options.searchString) {
    query.body.sort = [{ "published_on": { "order": "desc" } }];
  }
  return query;
}

function getResult(res, options, suggestedEntities) {
  var result = {
  };
  var hits = res.hits;
  result.interviews = _.map(hits.hits, function(record) {
    var interview = _.omit(record._source, ["subjects", "entities", "subjects_count", "entities_count"]);
    interview.id = record._id;
    _.each(record.highlight, function(snippets, property) {
      interview[property] = snippets.join('<br>');
    });
    var facets = {};
    facets.subjects = {};
    var subjectStats = {};
    _.each(record._source.subjects_count, function(record) {
      subjectStats[record.id] = record.count;
    });
    facets.entities = {};
    var entityStats = {};
    _.each(record._source.entities_count, function(record) {
      entityStats[record.id] = record.count;
    });
    if (options.filters) {
      if (options.filters.subjects) {
        _.each(options.filters.subjects, function(id) {
          facets.subjects[id] = subjectStats[id];
        });
      }
      if (options.filters.entities) {
        _.each(options.filters.entities, function(id) {
          facets.entities[id] = entityStats[id];
        });
      }
    }
    interview.facets = facets;
    return interview;
  });
  var facets = {};
  _.each(["subjects", "entities"], function(facet) {
    var stats = {};
    var agg = res.aggregations[facet];
    _.each(agg.sum.buckets, function(bucket) {
      stats[bucket.key] = {
        count: bucket.count.value,
        occurrences: bucket.occurrences.value
      };
    });
    facets[facet] = stats;
  });
  result.facets = facets;
  result.count = hits.hits.length;

  result.suggestedEntities = {};
  _.each(suggestedEntities.hits.hits, function(record) {
    var id = record._id;
    var entity = {
      name: record._source.name,
      entity_type: record._source.entity_type,
      count: facets.entities[id].count,
      // description: record._source.description
    };
    result.suggestedEntities[id] = entity;
  });
  // don't need to transfer global stats for entities
  delete facets.entities;

  return result;
}

var searchArticles = function(options, cb) {
  options.searchString = options.searchString || options.searchStr;
  delete options.searchStr;
  console.log('### QUERY OPTIONS:', JSON.stringify(options, null, 2));
  options.filters = options.filters || {};

  getExtendedSubjects("children", options.filters.subjects, function(err, extendedSubjects) {
    if (err) return cb(err);
    options.extendedFilters = _.clone(options.filters);
    options.extendedFilters.subjects = extendedSubjects;

    searchEntities({
      searchString: options.searchString,
      threshold: 1.0
    }, function(err, suggestedEntities) {
      // console.log('###### ENTITIES', JSON.stringify(suggestedEntities, null, 2));
      var client = new elasticsearch.Client(_.clone(config));
      var query = buildQuery(options);
      // console.log("################################");
      // console.log(JSON.stringify(query, null, 2));
      // console.log("################################");
      client.search(query, function(err, res) {
        client.close();
        if (err) {
          cb(err);
        } else {
          // console.log(JSON.stringify(res, null, 2));
          var result = getResult(res, options, suggestedEntities);
          // var result = getResult(res, options, []);
          cb(null, result);
        }
      });
    });
  });
};

module.exports = searchArticles;
