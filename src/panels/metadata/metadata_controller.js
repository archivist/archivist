"use strict";
var NodesPanelController = require("substance-composer").NodesPanelController;

var _ = require("underscore");
var util = require("substance-util");
var MetadataView = require("./metadata_view");

// MetadataController
// -----------------
//

var MetadataController = function(doc, writerCtrl) {
  NodesPanelController.call(this, doc, writerCtrl);
  this.state = {id: "initialized"};
};

MetadataController.Prototype = function() {

  // Get Nodes for panel
  // -----------------
  // 
  // // This is called by NodesPanelView.build

  this.getNodes = function() {
    var nodes = [];

    // Get data from info view (=container) node
    var infoNode = this.document.get('info');

    _.each(infoNode.nodes, function(nodeId) {
      nodes.push(this.document.get(nodeId));
    }, this);
    
    return nodes;
  };


  this.createView = function() {
    if (!this.view) {
      this.view = new MetadataView(this, this.createViewFactory());
    }
    return this.view;
  };

  this.initialize = function(newState, cb) {
    cb(null);
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

MetadataController.Prototype.prototype = NodesPanelController.prototype;
MetadataController.prototype = new MetadataController.Prototype();
MetadataController.prototype.constructor = MetadataController;

module.exports = MetadataController;
