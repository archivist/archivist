var Utility = require('./util.js');

var Entity = Utility.model.extend({
  urlRoot: "/api/entities"
})
exports.entity = Entity

var Entities = Utility.collection.extend({
  model: Entity,
  url: "/api/entities",
  state: {
    pageSize: 20,
    sortKey: "_id",
    order: 1
  }
})
exports.entities = Entities