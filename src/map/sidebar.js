'use strict';

var _ = require('substance/basics/helpers');
var Component = require('substance/ui/component');
var $$ = Component.$$;
var Details = require('./details')
var Filter = require('./filter')

var Sidebar = Component.extend({
	render: function() {
    var filterEls = [];

    _.each(this.props.filters, function(filter) {
      filterEls.push($$(Filter, filter));
    });

    var el = $$('div').addClass('map-sidebar').append([
    	$$(Details).key('details'),
      $$('div').addClass('filters').append(filterEls)
    ]);
    el.on('wheel', this.onWheel);
    el.on('dblclick', this.onDblClick);
    return el;
  },

  didReceiveProps: function(props) {
  	if(this.props.location) {
  		var location = this.props.location;
	  	this.refs.details.setProps({
        location: location
	    });
  	}
  },

  onWheel: function(e) {
  	e.stopPropagation();
  },

  onDblClick: function(e) {
    e.stopPropagation();
  },

});

module.exports = Sidebar;