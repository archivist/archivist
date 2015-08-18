var _ = require('underscore');
var elasticsearch = require('elasticsearch');
var config = require('../../config');
var client = new elasticsearch.Client(_.clone(config));

var removeEntity = function(entityId, cb) {
	client.delete({
    index: 'entities',
    type: 'entity',
    id: entityId,
  }).then(function() {
    client.close();
    console.log("Entity", entityId, "has been removed from index.");
    cb(null);
  }, function(err) {
    console.error("Failed.", arguments);
    return cb(err);
  });
}

module.exports = removeEntity;