#!/usr/bin/env node

var elasticsearch = require('elasticsearch');
var config = require('../../config');

var _ = require('underscore');
var getJSON = require('../get_json');

var seedIndex = function(cb) {
  var client = new elasticsearch.Client(_.clone(config));

  getJSON(config.archive + '/api/entities', function(err, json){
    if (err) return cb(err);
    var indexEntries = [];
    var entities = json[1];
    _.each(entities, function(entity){
      var shortData = {
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        entity_type: entity.type,
        name: entity.name,
        description: entity.description
      };
      
      if(entity.type == 'toponym' || entity.type == 'prison') {
        shortData.country = entity.country;
        shortData.point = entity.point;
        shortData.synonyms = entity.synonyms;
        if(entity.type == 'toponym') {
          shortData.current_name = entity.current_name;
        }
        if(entity.type == 'prison') {
          shortData.nearest_locality = entity.nearest_locality;
          shortData.prison_type = entity.prison_type;
        }
      } else if (entity.type == 'person') {
        if (!entity.global) return;
      } else if (entity.type == 'definition') {
        shortData.synonyms = entity.synonyms;
        definition_type = entity.definition_type;
      } else {
        return;
      }

      var shortEntry = { "index" : {
        _index: 'entities',
        _type: 'entity',
        _id: entity.id,
      }};
      indexEntries.push(shortEntry);
      indexEntries.push(shortData);
    });
    console.log('start entity indexing...');
    client.bulk({
      body: indexEntries
    }).then(function() {
      console.log('finish entity indexing...');
      client.close();
      cb(null);
    }).error(function(error) {
      console.error(error);
      client.close();
      cb(error);
    });
  });
};

module.exports = seedIndex;