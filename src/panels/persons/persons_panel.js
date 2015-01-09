"use strict";

var _ = require("underscore");
var Panel = require("substance-composer").Panel;

var PersonsController = require("./persons_controller");

var PersonsPanel = function() {
	Panel.call(this, 'persons');
};

PersonsPanel.Prototype = function() {
  this.createController = function(doc, writerCtrl) {
    return new PersonsController(doc, writerCtrl);
  };
};

PersonsPanel.Prototype.prototype = Panel.prototype;
PersonsPanel.prototype = new PersonsPanel.Prototype();
PersonsPanel.prototype.constructor = PersonsPanel;

module.exports = PersonsPanel;