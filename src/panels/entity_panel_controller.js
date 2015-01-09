"use strict";
var PanelController = require("substance-composer").PanelController;

var MetadataService = require('../metadata_service');
var _ = require("underscore");
var util = require("substance-util");

// EntityPanelController
// -----------------
//

var EntityPanelController = function(doc, writerCtrl) {
  PanelController.call(this, doc, writerCtrl);
  this.state = {id: "initialized"};
  this.metadataService = MetadataService.instance();
};

EntityPanelController.Prototype = function() {

  this.createView = function() {

  };

  this.initialize = function(newState, cb) {
    cb(null);
  };

  this.getEntities = function() {
    throw new Error("this method is abstract");
  };

  this.transition = function(newState, cb) {
    // Nothing to do here
    cb(null);
  };

  // Trigger view transition on state change
  // -----------------
  //

  this.afterTransition = function(oldState) {
    this.view.transition(oldState);
  };
};

EntityPanelController.Prototype.prototype = PanelController.prototype;
EntityPanelController.prototype = new EntityPanelController.Prototype();
EntityPanelController.prototype.constructor = EntityPanelController;

module.exports = EntityPanelController;
