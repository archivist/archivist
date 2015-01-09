"use strict";

var _ = require("underscore");
var Panel = require("substance-composer").Panel;
var MetadataController = require("./metadata_controller");

var MetadataPanel = function() {
	Panel.call(this, 'metadata');
};

MetadataPanel.Prototype = function() {

  this.createController = function(doc, writerCtrl) {
    return new MetadataController(doc, writerCtrl);
  };
};

MetadataPanel.Prototype.prototype = Panel.prototype;
MetadataPanel.prototype = new MetadataPanel.Prototype();
MetadataPanel.prototype.constructor = MetadataPanel;

module.exports = MetadataPanel;