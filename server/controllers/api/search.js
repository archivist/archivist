var Location = require('../../models/location.js')
  , Person = require('../../models/person.js')
  , Definition = require('../../models/definition.js')
  , maintenance = require('../shared/maintenance.js')
  , auth = require('../auth/utils.js')
  , async = require('async')
  , _ = require('underscore')
  , express = require('express')
  , api = express.Router();


var search = function(query, cb) {
  var type = query.type || false,
      result = {};
  if (!query.type) {
    plainSearch(query, function(err, searchResult){
      var total = searchResult.counter;
      if (total == 0) {
        plainSearch('', function(err, res) {
          result.state = "No results found, suggestions:";
          result.results = res.results;
          cb(null, result);
        })
      } else {
        result.state = total + ' items matching your query';
        result.results = searchResult.results;
        cb(null, result);
      }
    });
  } else {
    switch (type) {
      case 'location':
        Location.search(query, function (err, output, counter) {
          if (err) return callback(err);
          result.state = counter + ' locations matching your query';
          result.results = output;
          cb(null, result);
        });
        break;
      case 'person':
        Person.search(query, function (err, output, counter) {
          if (err) return callback(err);
          result.state = counter + ' persons matching your query';
          _.each(output, function(val, i){
            output[i] = output[i].toJSON();
            output[i].type = 'person';
          })
          result.results = output;
          cb(null, result);
        });
        break;
      case 'definition':
        Definition.search(query, function (err, output, counter) {
          if (err) return callback(err);
          result.state = counter + ' definitions matching your query';
          _.each(output, function(val, i){
            output[i] = output[i].toJSON();
            output[i].type = 'definition';
          })
          result.results = output;
          cb(null, result);
        });
        break;
      default:
        plainSearch(query, cb);
    }
  }
}

var plainSearch = function(query, cb) {
  if(!_.isUndefined(query.query)) {
    query.page = 1;
    query.per_page = 100;
    if (query.query.length > 2) query.per_page = 500;
  }

  async.parallel([
    function(callback){
      Location.search(query, function (err, output, counter) {
        if (err) return callback(err);
        var result = {
          counter: counter,
          results: output
        }
        callback(null, result);
      });
    },
    function(callback){
      Person.search(query, function (err, output, counter) {
        if (err) return callback(err);
        _.each(output, function(val, i){
          output[i] = output[i].toJSON();
          output[i].type = 'person';
        })
        var result = {
          counter: counter,
          results: output
        }
        callback(null, result);
      });
    },
    function(callback){
      Definition.search(query, function (err, output, counter) {
        if (err) return callback(err);
        _.each(output, function(val, i){
          output[i] = output[i].toJSON();
          output[i].type = 'definition';
        })
        var result = {
          counter: counter,
          results: output
        }
        callback(null, result);
      });
    }
  ],
  function(err, results){
    if (err) return cb(err);
    var sorted = _.sortBy(_.union(results[0].results, results[1].results, results[2].results), 'updatedAt').reverse();
    var result = {
      counter: results[0].counter + results[1].counter + results[2].counter,
      results: sorted
    }
    cb(null, result);
  });
}

var searchQuery = function(req, res, next) {
  search(req.query, function (err, output) {
    if (err) return next(err);
    res.json(output);
  });
}

api.route('/search')
  .get(maintenance.checkCurrentMode, auth.checkAuth, searchQuery)

module.exports = api;