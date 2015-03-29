var Location = require('../models/location.js')
  , Person = require('../models/person.js')
  , Definition = require('../models/definition.js')
  , async = require('async')
  , _ = require('underscore');


var getEntities = function(entities, cb) {
  var entitiesArray = [];

  if(_.isArray(entities)) {
    entitiesArray = entities;
  } else {
    entitiesArray = entities.split(',');
  }

  var query = {
    _id: {
      '$in': entitiesArray
    }
  }

  async.parallel([
    function(callback){
      Location.find(query, function (err, output) {
        if (err) return callback(err);
        callback(null, output);
      });
    },
    function(callback){
      Person.find(query, function (err, output) {
        if (err) return callback(err);
        _.each(output, function(val, i){
          output[i] = output[i].toJSON();
          output[i].type = 'person';
        })
        callback(null, output);
      });
    },
    function(callback){
      Definition.find(query, function (err, output) {
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

module.exports = getEntities;