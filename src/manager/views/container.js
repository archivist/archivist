var Backbone = require('backbone')
	, utils = require('./util.js');

var Container = Backbone.View.extend({
  manage: true,
  events: {
    'click span.logout': 'logout'
  },
  logout: function(e) {
    e.preventDefault();
    Backbone.middle.trigger("logout");
  },
  serialize: function() {
  	var userData = utils.getUserData();
    return { user: userData };
  },
  template: '#container'
});
exports.container = Container