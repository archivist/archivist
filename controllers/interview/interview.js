"use strict";

var Substance = require('substance');
var Document = Substance.Document;

var SubstanceCore = require("substance/article").CoreModule;
var BaseModule = require("./modules/base");
var SubjectsModule = require("./modules/subjects");
var EntitiesModule = require("./modules/entities");
var TimecodesModule = require("./modules/timecodes");
var RemarksModule = require("./modules/remarks");

// We don't need an extension mechanism here.
// TODO: import the nodes directly to setup the schema.
// Put the initializers into the article's contructor.
var modules = [
  SubstanceCore,
  BaseModule,
  SubjectsModule,
  EntitiesModule,
  TimecodesModule,
  RemarksModule
];



var schema = new Document.Schema("substance-interview", "0.1.0");
Substance.each(modules, function(ext) {
  schema.addNodes(ext.nodes);
});

var Interview = function(data) {
  Document.call(this, schema, data);
  // Call initializes of modules
  Substance.each(modules, function(ext) {
    if (ext.initialize) ext.initialize(this);
  }, this);
};

Interview.Prototype = function() {};

Substance.inherit(Interview, Document);

Interview.schema = schema;

module.exports = Interview;
