'use strict';

var DocumentServer = require('substance/collab/DocumentServer');

/*
  DocumentServer module. Can be bound to an express instance
*/
function ArchivistDocumentServer() {
  ArchivistDocumentServer.super.apply(this, arguments);
}

ArchivistDocumentServer.Prototype = function() {
  // var _super = NotesDocumentServer.super.prototype;

  // this.bind = function(app) {
  //   _super.bind.apply(this, arguments);

  //   // Add notes specific routes
  // };

};

DocumentServer.extend(ArchivistDocumentServer);

module.exports = ArchivistDocumentServer;