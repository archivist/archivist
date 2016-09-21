'use strict';

var DocumentServer = require('substance/collab/DocumentServer');

/*
  DocumentServer module. Can be bound to an express instance
*/
function ArchivistDocumentServer() {
  ArchivistDocumentServer.super.apply(this, arguments);
}

ArchivistDocumentServer.Prototype = function() {
  var _super = ArchivistDocumentServer.super.prototype;

  this.bind = function(app) {
    _super.bind.apply(this, arguments);

    app.get(this.path, this._listDocuments.bind(this));
  };

  /*
    List available documents
  */
  this._listDocuments = function(req, res, next) {
    var args = req.query;

    this.engine.listDocuments(args, function(err, docs) {
      if (err) return next(err);
      res.json(docs);
    });
  };

};

DocumentServer.extend(ArchivistDocumentServer);

module.exports = ArchivistDocumentServer;