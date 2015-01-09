"use strict";

var Composer = require('substance-composer');
var EditableArticle = Composer.EditableArticle;
var Chronicle = require("substance-chronicle");
var Document = require("substance-document");
var util = require("substance-util");

var archivistNodeTypes = require('./nodes');

var SCHEMA_ID = "archivist-interview";
var SCHEMA_VERSION = "0.1.0";

// Creates fresh documents
// ----------
//

var ArchivistDocumentFactory = function() {
};

ArchivistDocumentFactory.Prototype = function() {

  this.createFromJSON = function(jsonDoc) {
    var schema = util.deepclone(Document.schema);
    schema.id = SCHEMA_ID;
    schema.version = SCHEMA_VERSION;
    var doc = EditableArticle.fromSnapshot(jsonDoc, {
      schema: schema,
      nodeTypes: archivistNodeTypes,
      chronicle: Chronicle.create()
    });
    return doc;
  };

  this.createEmptyDoc = function() {
    return ArchivistDocumentFactory.createEmptyDoc();
  };

};

ArchivistDocumentFactory.createEmptyDoc = function() {
  var docId = util.uuid();

  var seed = {
    "id": docId,
    "schema": [SCHEMA_ID, SCHEMA_VERSION],
    "nodes": {
      "document": {
        "id": "document",
        "type": "document",
        "views": [
          "content",
          "citations",
          "remarks",
          "info"
        ],
        "license": "licence", // really needed?
        "guid": docId,
        "creator": "",
        "title": "Untitled",
        "authors": [],
        "abstract": "",
        "created_at": new Date().toJSON(),
        "updated_at": new Date().toJSON(),
        "published_on": new Date().toJSON()
      },
      "cover": {
        "id": "cover",
        "type": "cover",
        "authors": []
      },
      "content": {
        "type": "view",
        "id": "content",
        "nodes": ["cover", "text1"]
      },
      "citations": {
        "type": "view",
        "id": "citations",
        "nodes": []
      },
      "remarks": {
        "type": "view",
        "id": "remarks",
        "nodes": []
      },
      "info": {
        "type": "view",
        "id": "info",
        "nodes": ["publication_info", "interview_subject", "interview_conductor", "interview_operator", "interview_sound_operator"]
      },
      "text1": {
        "type": "text",
        "id": "text1",
        "content": ""
      },
      "publication_info": {
        "id": "publication_info",
        "type": "publication_info"
      },
      "interview_subject": {
        "type": "interview_subject",
        "id": "interview_subject",
        "name": "The Interviewed",
        "role": "Interview Subject",
        "forced_labor": "intracamp work; earthworks (construction of barracks); digging tunnels for military factories",
        "categories": ["Ost arbeiter", "Cocentration camp worker"],
        "prisons": ["location_komorn"],
        "movement": [
          {
            "location": "location_danzig",
            "density": 33
          },
          {
            "location": "location_komorn",
            "density": 67
          }
        ],
        "description": "",
        "image": "",
      },
      "interview_conductor": {
        "type": "contributor",
        "id": "interview_conductor",
        "source_id": "",
        "name": "Daniel Beilinson",
        "role": "Interview Conductor",
        "description": "",
        "image": "",
      },
      "interview_operator": {
        "type": "contributor",
        "id": "interview_operator",
        "source_id": "",
        "name": "Oliver Buchtala",
        "role": "Operator",
        "description": "",
        "image": "",
      },
      "interview_sound_operator": {
        "type": "contributor",
        "id": "interview_sound_operator",
        "source_id": "",
        "name": "Michael Aufreiter",
        "role": "Sound Operator",
        "description": "",
        "image": "",
      },
      "license": {
        "id": "license",
        "type": "license",
        "name": "None",
        "code": "none",
        "description": "",
        "version": "1.0",
        "url": ""
      }
    }
  };

  var doc = new EditableArticle({
    seed: seed,
    nodeTypes: archivistNodeTypes,
    chronicle: Chronicle.create()
  });

  return doc;
};

ArchivistDocumentFactory.prototype = new ArchivistDocumentFactory.Prototype();
ArchivistDocumentFactory.prototype.constructor = ArchivistDocumentFactory;

module.exports = ArchivistDocumentFactory;
