"use strict";

var ArchivistDocumentFactory = require("./archivist_document_factory");
var SAMPLE = require('../data/sample');

var ArchivistBackend = function() {
  this.documentFactory = new ArchivistDocumentFactory();
};

ArchivistBackend.Prototype = function() {

  // Returns an empty document
  this.newDocument = function() {
    return this.documentFactory.createEmptyDoc();
  };

  // Use the backend here
  // /api/documents/$docid
  this.open =  function(path, cb) {
    var self = this;
    var doc;
    if (path === "SAMPLE") {
      doc = this.documentFactory.createFromJSON(SAMPLE);
      cb(null, doc);
    } else {
      // console.error('TODO: load from archivist service');
      // cb("Not implemented yet");
      $.getJSON("/api/documents/"+path, function(data) {
        doc = self.documentFactory.createFromJSON(data);
        cb(null, doc);
      });
    }
  };

  this.save = function(doc, path, cb) {
    $.ajax({
      type: "PUT",
      url: "/api/documents/"+path,
      contentType: "application/json",
      data: JSON.stringify(doc.toJSON()),
      success: function(result) {
        cb(null);
      }
    });
  };

  // Read from Arraybuffer
  // -----------
  //
  // Used by Composer, when files are dropped

  this.readFromArrayBuffer = function(data, cb) {
    // we could implement
    console.error('TODO: handle dropped file');
    cb("Not implemented yet.");
  };
};

ArchivistBackend.prototype = new ArchivistBackend.Prototype();

module.exports = ArchivistBackend;
