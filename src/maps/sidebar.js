'use strict';

var Component = require('substance/ui/component');
var $$ = Component.$$;

var Sidebar = Component.extend({
	render: function() {
    var el = $$('div').addClass('map-sidebar').append('Click for additional info');
    return el;
  },

  update: function(location) {
  	this.$el.append('<div>text<div>');
  }
});

module.exports = Sidebar;