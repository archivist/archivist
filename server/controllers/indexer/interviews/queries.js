
var _ = require('underscore');
var elasticsearch = require('elasticsearch');
var config = require("../config");
var queries = {};
var async = require('async');

var searchArticles = require("./search_interviews");

queries.findDocumentsWithContent = function(query, cb) {
  searchArticles(query, function(err, result) {
    if (err) return cb(err);
    // assuming openFiles is an array of file names
    async.each(result.interviews, function(record, cb) {
      queries.getDocumentPreview({
        documentId: record.id,
        searchString: query.searchString,
        filters: query.filters
      }, function(err, docPreview) {
        if (err) return cb(err);
        record.fragments = docPreview.fragments;
        cb(null);
      });
      // cb(null);
    }, function() {
      cb(null, result);
    });
  });
};

queries.getDocumentMetaById = function(id) {
  var client = new elasticsearch.Client(_.clone(config));
  return client.get({
    index: 'interviews',
    type: 'interview',
    id: id
  }).then(function(data) {
    client.close();
    return data;
  });
};

queries.getDocumentPreview = function(query, cb) {
  var documentId = query.documentId;
  var searchString = query.searchString;

  // Pagination
  var size = query.size || 2;
  var from = query.from || 0;
  var type = query.type || "boolean";

  // create a result that contains
  // - fragments
  // - TODO: all figures
  // - TODO: document meta data

  function createDocumentPreview(documentMeta, fragments) {
    var result = {};
    result.document = documentMeta;
    result.fragments = fragments || [];
    cb(null, result);
  }

  var _documentMeta;

  queries.getDocumentMetaById(documentId)
  .then(function(data) {
    _documentMeta = data._source;
    // Note: we do not get fragments for filters right now.
    // TODO: if we want to create a detailed preview we should add them
    // var filters = query.filters;
    var filters = null;
    return queries.findDocumentFragmentsWithContent(documentId, searchString, filters, from, size, type, 0.5);
  })
  .then(function(data) {
    var _fragments = [];
    if (data) {
      var fragments = data.hits.hits;
      // console.log(fragments);
      fragments.sort(function(a, b) {
        return a._source.position - b._source.position;
      });
      for (var i = 0; i < fragments.length; i++) {
        var fragmentData = fragments[i];
        var fragmentResult = fragments[i]._source;
        if (fragmentData.highlight) {
          for (var key in fragmentData.highlight) {
            var highlightedContent = fragmentData.highlight[key].join('');
            // console.log("Replacing:\n\t%s\n  with:\n\t%s", fragmentResult[key], highlightedContent);
            fragmentResult[key] = highlightedContent;
          }
        }
        _fragments.push(fragmentResult);
      }
    }
    createDocumentPreview(_documentMeta, _fragments);
  })
  .error(function(error) {
    console.error("Urg", error);
    cb(error);
  });
};

function _matchFragment(searchString, terms) {
  var should = [];
  if (searchString) {
    should.push({ "match": { "content": { "query": searchString, "minimum_should_match": "75%" } } });
  }
  _.each(terms, function(termValues, facet) {
    _.each(termValues, function(value) {
      var matchTerm = { "term": { } };
      matchTerm.term[facet] = value;
      should.push(matchTerm);
    });
  });
  return should;
}

queries.findDocumentFragmentsWithContent = function(documentId, searchString, terms, from, size, type, minScore) {
  // console.log("Asking for fragment in %s containing %s", documentId, searchString);
  var client = new elasticsearch.Client(_.clone(config));
  if (terms || searchString) {
    return client.search({
      index: 'interviews',
      type: 'fragment',
      body: {
        "size": size,
        "from": from,
        "min_score": minScore,
        "query": {
          "bool": {
            "must": [
              { "term":  { "_parent": documentId } },
            ],
            "should": _matchFragment(searchString, terms),
          }
        },
        "highlight": {
          "pre_tags" : ['<span class="query-string">'], "post_tags" : ["</span>"],
          "fields": {
            // NOTE: "number_of_fragments" : 0 is necessary to suppress lucene's automatic truncation of fragments
            "content": { "number_of_fragments" : 0 }
          }
        }
      }
    }).then(function(data) {
      client.close();
      return data;
    });
  } else {
    return null;
  }
};

queries.countSubjects = function(cb) {
  searchArticles({
    searchString: null,
    filters: null
  }, function(err, result) {
    if (err) return cb(err);
    cb(null, result.facets.subjects);
  });
};

module.exports = queries;
