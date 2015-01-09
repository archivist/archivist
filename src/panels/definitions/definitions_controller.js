"use strict";
var EntityPanelController = require("../entity_panel_controller");

var DefinitionsView = require("./definitions_view");
var _ = require("underscore");
var util = require("substance-util");


// Definitions.Controller
// -----------------
//

var DefinitionsController = function(doc, writerCtrl) {
  EntityPanelController.call(this, doc, writerCtrl);
};

DefinitionsController.Prototype = function() {

  this.createView = function() {
    if (!this.view) {
      this.view = new DefinitionsView(this);
    }
    return this.view;
  };

  this.getEntities = function() {
    return this.metadataService.getDefinitions();
  };
};

DefinitionsController.Prototype.prototype = EntityPanelController.prototype;
DefinitionsController.prototype = new DefinitionsController.Prototype();

module.exports = DefinitionsController;
