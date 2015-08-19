var _ = require('underscore');
var elasticsearch = require('elasticsearch');
var config = require('../../config');
var client = new elasticsearch.Client(_.clone(config));

var indexEntity = function(entity, update, cb) {
  var shortData = {
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    entity_type: entity.type,
    name: entity.name,
    description: entity.description
  };

  if (update) shortData = {doc: shortData, upsert: shortData};
  
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

  var entry = {
    index: 'entities',
    type: 'entity',
    id: entity.id,
    body: shortData
  };

  var op = update ? 'update' : 'index';
  client[op](entry).then(function() {
    client.close();
    if(update) {
      console.log("Entity", entity.id, "index has been updated.");
    } else {
      console.log("Entity", entity.id, "has been added to index.");
    }
    cb(null);
  }, function(err) {
    console.error("Failed.", arguments);
    return cb(err);
  });
}

module.exports = indexEntity;