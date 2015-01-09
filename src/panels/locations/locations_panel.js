"use strict";

var _ = require("underscore");
var Panel = require("substance-composer").Panel;

var LocationsController = require("./locations_controller");

var LocationsPanel = function() {
	Panel.call(this, 'locations');
};

LocationsPanel.Prototype = function() {

  this.createController = function(doc, writerCtrl) {
    return new LocationsController(doc, writerCtrl);
  };

};
LocationsPanel.Prototype.prototype = Panel.prototype;
LocationsPanel.prototype = new LocationsPanel.Prototype();
LocationsPanel.prototype.constructor = LocationsPanel;

module.exports = LocationsPanel;