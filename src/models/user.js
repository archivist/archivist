var Backbone = require('backbone')
  , Utility = require('./util.js');

var User = Utility.model.extend({
  urlRoot: "/api/users"
})
exports.user = User

var Users = Utility.collection.extend({
  model: User,
  url: "/api/users",
  state: {
    pageSize: 20,
    sortKey: "_id",
    order: 1
  }
})
exports.users = Users