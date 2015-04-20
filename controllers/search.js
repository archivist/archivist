var Location = require('../models/location.js')
  , Person = require('../models/person.js')
  , Definition = require('../models/definition.js')
  , async = require('async')
  , _ = require('underscore');




var search = function(query, cb) {
  var type = query.type || false,
      result = [];
  if (!query.type) {
    plainSearch(query, function(err, searchResult){
      var total = searchResult.length;
      if (total == 0) {
        plainSearch('', function(err, res) {
          var total = searchResult.length;
          result.push({ state: "We didn't found anything matching your query, but here are our suggestions" });
          result.push(res);
          cb(null, result);
        })
      } else {
        result.push({ state: total + ' items matching your query' });
        result.push(searchResult);
        cb(null, result);
      }
    });
  } else {
    switch (type) {
      case 'location':
        Location.search(query, function (err, output) {
          if (err) return callback(err);
          var total = output.length;
          result.push({ state: total + ' locations matching your query' });
          result.push(output);
          cb(null, result);
        });
        break;
      case 'person':
        Person.search(query, function (err, output) {
          if (err) return callback(err);
          var total = output.length;
          result.push({ state: total + ' persons matching your query' });
          result.push(output);
          cb(null, result);
        });
        break;
      case 'definition':
        Definition.search(query, function (err, output) {
          if (err) return callback(err);
          var total = output.length;
          result.push({ state: total + ' definitions matching your query' });
          result.push(output);
          cb(null, result);
        });
        break;
      default:
        plainSearch(query, cb);
    }
  }
}

var plainSearch = function(query, cb) {
  async.parallel([
    function(callback){
      Location.search(query, function (err, output) {
        if (err) return callback(err);
        callback(null, output);
      });
    },
    function(callback){
      Person.search(query, function (err, output) {
        if (err) return callback(err);
        _.each(output, function(val, i){
          output[i] = output[i].toJSON();
          output[i].type = 'person';
        })
        callback(null, output);
      });
    },
    function(callback){
      Definition.search(query, function (err, output) {
        if (err) return callback(err);
        _.each(output, function(val, i){
          output[i] = output[i].toJSON();
          output[i].type = 'definition';
        })
        callback(null, output);
      });
    }
  ],
  function(err, results){
    if (err) return cb(err);
    var result = results[0].concat(results[1],results[2]);
    cb(null, result);
  });
}

module.exports = search;