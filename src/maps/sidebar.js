'use strict';

var AVAILABLE_FILTERS = {
  "toponyms": {filterId: "toponym", name: i18n.t("map.toponyms"), icon: "globe"},
  "prisons": {filterId: "prison", name: i18n.t("map.prisons"), icon: "table"}
};

var Component = require('substance/ui/component');
var $$ = Component.$$;
var Details = require('./details')
var Filters = require('./filters')

var Sidebar = Component.extend({
	render: function() {
    var el = $$('div').addClass('map-sidebar').append([
    	$$(Details).key('details')
    ]);
    el.on('wheel', this.onWheel);
    return el;
  },

  didReceiveProps: function(props) {
  	if(this.props.location) {
  		var location = this.props.location;
	  	this.refs.details.setProps({
	      location: location
	    })
  	}
  },

  onWheel: function(e) {
  	e.stopPropagation();
  }

});

module.exports = Sidebar;