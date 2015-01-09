"use strict";

var _ = require("underscore");
var Panel = require("substance-composer").Panel;

var DefinitionsController = require("./definitions_controller");

var DefinitionsPanel = function() {
  Panel.call(this, 'definitions');
};

DefinitionsPanel.Prototype = function() {

  this.createController = function(doc, writerCtrl) {
    return new DefinitionsController(doc, writerCtrl);
  };
};

DefinitionsPanel.Prototype.prototype = Panel.prototype;
DefinitionsPanel.prototype = new DefinitionsPanel.Prototype();
DefinitionsPanel.prototype.constructor = DefinitionsPanel;

module.exports = DefinitionsPanel;