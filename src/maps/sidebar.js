'use strict';

var Component = require('substance/ui/component');
var $$ = Component.$$;

var Sidebar = Component.extend({
	render: function() {
    var el = $$('div').addClass('map-sidebar').append('Click for additional info');
    if(this.state.location) {
    	el.append(this.renderToponym(this.state.location));
    }
    return el;
  },

  update: function(location) {
  	this.setState({
      location: location
    });
  },

  renderPrison: function(entity) {
    var className = ["entity prison"];
    var prisonType = (entity.prison_type instanceof Array ? entity.prison_type.join(', ') : '');
    var name = entity.name.toLowerCase().indexOf("неизвестно") >= 0 ? i18n.t('entity.unknown_name') : entity.name;
    var location = entity.country;
    if (entity.nearest_locality) location = location + ', ' + entity.nearest_locality;
    if (this.props.active) className.push("active");
    
    return $$("div", {"data-id": entity.id, className: className.join(" "), onClick: this.handleToggle.bind(this)},
      $$("div", {className: "resource-header"},
        $$("div", {className: "entity-type"}, prisonType),
        $$("div", {className: "location"}, location)
      ),
      $$("a", {className: "show-on-map", href: "/map/" + entity.id}, 
        $$("i", {className: "fa fa-map-o"})
      ),
      $$("div", {className: "name"}, name),
      $$("div", {
        className: "description",
        dangerouslySetInnerHTML: {__html: entity.description }
      })
    );
  },

  renderToponym: function(entity) {
    var className = ["entity location"];
    if (this.props.active) className.push("active");

    var location = entity.country;

    if(entity.name !== entity.current_name && entity.current_name) location = location + ", " + entity.current_name;

    return $$("div").attr({"data-id": entity.id, class: className.join(" ")}).append([
    	$$("div").attr({class: "resource-header"}).append([
  			$$("div").addProps({class: "name"}).append(entity.name),
      	$$("div").addProps({class: "location"}).append(location)
  		]),
  		$$("a").attr({class: "show-on-map", href: "/map/" + entity.id}).append([
  			$$("i").attr({class: "fa fa-map-o"})
  		]), 
	  	$$("div").attr({
        class: "description"
      }).append(entity.description)
  	]);
  }

});

module.exports = Sidebar;