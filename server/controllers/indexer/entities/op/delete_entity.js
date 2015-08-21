var _ = require('underscore');

var removeEntity = function(client, entityId, cb) {
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