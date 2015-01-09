"use strict";
var EntityPanelController = require("../entity_panel_controller");

var PersonsView = require("./persons_view");
var _ = require("underscore");
var util = require("substance-util");


// Locations.Controller
// -----------------
//

var PersonsController = function(doc, writerCtrl) {
  EntityPanelController.call(this, doc, writerCtrl);
};

PersonsController.Prototype = function() {

  this.createView = function() {
    if (!this.view) {
      this.view = new PersonsView(this);
    }
    return this.view;
  };

  this.getEntities = function() {
    return this.metadataService.getPersons();
  };
};

PersonsController.Prototype.prototype = EntityPanelController.prototype;
PersonsController.prototype = new PersonsController.Prototype();

module.exports = PersonsController;
