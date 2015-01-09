"use strict";
var EntityPanelController = require("../entity_panel_controller");

var LocationsView = require("./locations_view");
var _ = require("underscore");
var util = require("substance-util");


// Locations.Controller
// -----------------
//

var LocationsController = function(doc, writerCtrl) {
  EntityPanelController.call(this, doc, writerCtrl);
};

LocationsController.Prototype = function() {

  this.createView = function() {
    if (!this.view) {
      this.view = new LocationsView(this);
    }
    return this.view;
  };

  this.getEntities = function() {
    return this.metadataService.getLocations();
  };
};

LocationsController.Prototype.prototype = EntityPanelController.prototype;
LocationsController.prototype = new LocationsController.Prototype();

module.exports = LocationsController;
