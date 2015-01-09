"use strict";

var _ = require("underscore");
var Panel = require("substance-composer").Panel;
var SubjectsController = require("./subjects_controller");

var SubjectsPanel = function() {
	Panel.call(this, 'subjects');
};

SubjectsPanel.Prototype = function() {
  this.createController = function(doc, writerCtrl) {
    return new SubjectsController(doc, writerCtrl);
  };
};

SubjectsPanel.Prototype.prototype = Panel.prototype;
SubjectsPanel.prototype = new SubjectsPanel.Prototype();
SubjectsPanel.prototype.constructor = SubjectsPanel;

module.exports = SubjectsPanel;