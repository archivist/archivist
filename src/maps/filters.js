'use strict';

var OO = require('substance/basics/oo');
var Component = require('substance/ui/component');
var $$ = Component.$$;

var Filters = Component.extend({
	didInitialize: function() {
    this.show = this.props.showLayer;
    this.layers = this.props.layers;
    this.overlays = this.props.overlays;
    this.renderIcon = this.props.renderIcon;
    this.prepareFeature = this.props.prepareFeature;
  },

  filterData: function(e) {
  	var $el = $(e.target);
  	var layerName = $el.data('type');
  	var siblName = $el.siblings().data('type');
  	var active = $el.hasClass('active');
  	var siblActive = $el.siblings().hasClass('active');
  	
  	$(e.target).toggleClass('active');
  	var filters = {};
    filters[layerName] = active;
    filters[siblName] = siblActive;
  	// if(active) {
  	// 	if(siblActive) {
  	// 		this.show(siblName);
  	// 	} else {
  	// 		this.show(null);
  	// 	}
  	// } else {
  	// 	if(siblActive) {
  	// 		this.show();
  	// 	} else {
  	// 		this.show(layerName);
  	// 	}
  	// }
    this.setState({filters: filters});
    return false;
  },

	render: function() {
    var el = $$('ul').addClass('map-filters').append([
    	this._filterEl('Упомянутые топонимы', 'toponym', 'globe'),
    	this._filterEl('Места работы и заключения', 'prison', 'table')
    ]);
    return el;
  },

  _filterEl: function(name, prop, icon) {
  	return $$('li').addClass('filter active').attr("data-type", prop).on('click', this.filterData).append([
  		$$('i').addClass('fa fa-' + icon),
  		name
  	]);
  },

  update: function(location) {
  	this.$el.append('<div>text<div>')
  }
});

module.exports = Filters;