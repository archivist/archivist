"use strict";

var Substance = require('substance');
var Document = Substance.Document;

// Nodes
// --------------

var DocumentNode = require("./nodes/document_node");
var TextNode = require("./nodes/text_node");
var Emphasis = require("./nodes/emphasis");
var Strong = require("./nodes/strong");
var Remark = require("./nodes/remark");
var Timecode = require("./nodes/timecode");
var SubjectReference = require("./nodes/subject_reference");
var EntityReference = require("./nodes/entity_reference");
var Waypoint = require("./nodes/waypoint");

var schema = new Document.Schema("substance-interview", "1.0.0");
schema.addNodes([
  DocumentNode,
  TextNode,
  Emphasis,
  Strong,
  Remark,
  Timecode,
  SubjectReference,
  EntityReference,
  Waypoint
]);

var Interview = function(data) {
  Document.call(this, schema, data);

  this.entityReferencesIndex = this.addIndex('entityReferencesIndex', Substance.Data.Index.create({
    type: "entity_reference",
    property: "target"
  }));

  this.remarksIndex = this.addIndex('remarksIndex', Substance.Data.Index.create({
    type: "remark",
    property: "id"
  }));

  this.subjectReferencesIndex = this.addIndex('subjectReferencesIndex', Substance.Data.Index.create({
    type: "subject_reference",
    property: "target"
  }));

};

Interview.Prototype = function() {};

Substance.inherit(Interview, Document);
Interview.schema = schema;
module.exports = Interview;