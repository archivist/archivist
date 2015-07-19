var Backbone = require('backbone');

var MenuItem = Backbone.Model.extend({});
exports.menuItem = MenuItem

var MenuItems = Backbone.Collection.extend({ model: MenuItem });
exports.menuItems = MenuItems

var ContextItem = Backbone.Model.extend({});
exports.contextItem = ContextItem

var ContextItems = Backbone.Collection.extend({ model: ContextItem });
exports.contextItems = ContextItems