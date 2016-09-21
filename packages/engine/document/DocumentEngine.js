'use strict';

var DocumentEngine = require('substance/collab/DocumentEngine');
var Err = require('substance/util/SubstanceError');

/*
  Archivist Document Engine API
*/
function ArchivistDocumentEngine(config) {
  ArchivistDocumentEngine.super.apply(this, arguments);

  this.configurator = config;
  this.db = config.db;
}

ArchivistDocumentEngine.Prototype = function() {

  var _super = ArchivistDocumentEngine.super.prototype;

  this.createDocument = function(args, cb) {
    var schema = this.configurator.getSchema();
    if (schema.name !== args.schemaName) {
      return cb(new Err('ArchivistDocumentEngine.SchemaNotFoundError', {
        message: 'Schema not found for ' + args.schemaName
      }));
    }
    var seed = this.configurator.getSeed();
    var doc = this.configurator.createArticle(seed);
    args.info.updatedAt = new Date();
    args.info.title = doc.get(['meta', 'title']);
    _super.createDocument.call(this, args, cb);
  };

  this.getDocument = function(args, cb) {
    var self = this;
    // SQL query powered
    this.queryDocumentMetaData(args.documentId, function(err, docEntry) {
      if (err) {
        return cb(new Err('ArchivistDocumentEngine.ReadDocumentMetadataError', {
          cause: err
        }));
      }
      self.snapshotEngine.getSnapshot(args, function(err, snapshot) {
        if (err) {
          return cb(new Err('ArchivistDocumentEngine.ReadSnapshotError', {
            cause: err
          }));
        }
        docEntry.data = snapshot.data;
        cb(null, docEntry);
      });
    });
  };

  this.queryDocumentMetaData = function(documentId, cb) {
    var query = 'SELECT \
      d."documentId", \
      d."updatedAt", \
      d.version, \
      d."schemaName", \
      d."schemaVersion", \
      (SELECT string_agg(name, \',\') \
        FROM (SELECT DISTINCT u.name FROM changes c INNER JOIN users u ON c."userId" = u."userId" WHERE c."documentId" = d."documentId" AND c."userId" != d."userId") AS authors \
      ) AS collaborators, \
      (SELECT "createdAt" FROM changes c WHERE c."documentId"=d."documentId" ORDER BY "createdAt" ASC LIMIT 1) AS "createdAt", \
      u.name AS author, \
      f.name AS "updatedBy" \
    FROM documents d \
    JOIN users u ON(u."userId"=d."userId") \
    JOIN users f ON(f."userId"=d."updatedBy") \
    WHERE d."documentId" = $1';

    this.db.run(query, [documentId], function(err, doc) {
      if (err) {
        return cb(new Err('ArchivistDocumentEngine.ReadDocumentMetaDataError', {
          cause: err
        }));
      }
      doc = doc[0];
      if (!doc) {
        return cb(new Err('ArchivistDocumentEngine.ReadDocumentMetaDataError', {
          message: 'No document found for documentId ' + documentId,
        }));
      }
      if(!doc.collaborators) {
        doc.collaborators = [];
      } else {
        doc.collaborators = doc.collaborators.split(',');
      }
      cb(null, doc);
    });
  };

  this.listDocuments = function(args, cb) {
    var filters = args.filters || {};
    var options = args.options || {};
    this.documentStore.listDocuments(filters, options, cb);
  };
};

DocumentEngine.extend(ArchivistDocumentEngine);

module.exports = ArchivistDocumentEngine;