"use strict";

var ArchivistDocumentFactory = require("./archivist_document_factory");
var Metadata = require('./metadata');

var ArchivistBackend = function() {
  this.documentFactory = new ArchivistDocumentFactory();
  this.metadata = Metadata.instance();
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

    // First load metadata
    // All available metadata objects are fetched in one go,
    // and assigned to a .metadata property on the doc
    // that way we can work with them synchronously in the app/panels
    this.metadata.load(function(err) {
      $.getJSON("/api/documents/"+path, function(data) {
        console.log('version fetched:', data.__v);
        doc = self.documentFactory.createFromJSON(data);
        // HACK: monkey patching the document to provide resources
        // ... TODO we could add a dedicated namespace for external
        //     resources within the document.
        doc.version = data.__v;
        doc.metadata = self.metadata;

        cb(null, doc);
      });
    });
  };

  this.save = function(doc, path, cb) {
    var self = this;
    var json = doc.toJSON();
    json.__v = doc.version;

    console.log('local version:', doc.version);
    console.log('local subjectDBVersion:', doc.metadata.subjectDBVersion);

    $.ajax({
      type: "PUT",
      url: "/api/documents/"+path,
      contentType: "application/json",
      data: JSON.stringify(json),
      success: function(data) {
        // Remember new document version
        console.log('new documentVersion: ', data.documentVersion);
        console.log('new subjectDBVersion: ', data.subjectDBVersion);
        doc.version = data.documentVersion;

        if (doc.metadata.subjectDBVersion !== data.subjectDBVersion) {
          console.log('outdated subjects metadata.. loading again from server');

          self.metadata.load(function(err) {
            if (err) return cb(err);
            doc.trigger('metadata:updated');
            cb(null);
          });
        } else {
          cb(null);
        }
      },
      error: function(err) {
        cb(err.responseText);
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
