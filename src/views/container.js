var Backbone = require('backbone');

var Container = Backbone.View.extend({
  manage: true,
  template: '#container'
});
exports.container = Container