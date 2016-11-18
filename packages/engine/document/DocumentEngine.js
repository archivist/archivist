let DocumentEngine = require('substance').DocumentEngine
let Err = require('substance').SubstanceError
let isEmpty = require('lodash/isEmpty')
let Promise = require('bluebird')

/*
  Archivist Document Engine API
*/
class ArchivistDocumentEngine extends DocumentEngine {
  constructor(config) {
    super(config)

    this.configurator = config
    this.db = config.db
  }

  createDocument(args, cb) {
    let schema = this.configurator.getSchema()
    if (schema.name !== args.schemaName) {
      return cb(new Err('ArchivistDocumentEngine.SchemaNotFoundError', {
        message: 'Schema not found for ' + args.schemaName
      }))
    }
    let seed = this.configurator.getSeed()
    let doc = this.configurator.createArticle(seed)
    args.info.updatedAt = new Date()
    args.info.title = doc.get(['meta', 'title'])
    super.createDocument(args, cb)
  }

  getDocument(args, cb) {
    let self = this;
    // SQL query powered
    this.queryDocumentMetaData(args.documentId, function(err, docEntry) {
      if (err) {
        return cb(new Err('ArchivistDocumentEngine.ReadDocumentMetadataError', {
          cause: err
        }))
      }
      self.snapshotEngine.getSnapshot(args, function(err, snapshot) {
        if (err) {
          return cb(new Err('ArchivistDocumentEngine.ReadSnapshotError', {
            cause: err
          }))
        }
        docEntry.data = snapshot.data
        cb(null, docEntry)
      })
    })
  }

  queryDocumentMetaData(documentId, cb) {
    let query = 'SELECT \
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
    WHERE d."documentId" = $1'

    this.db.run(query, [documentId], function(err, doc) {
      if (err) {
        return cb(new Err('ArchivistDocumentEngine.ReadDocumentMetaDataError', {
          cause: err
        }))
      }
      doc = doc[0];
      if (!doc) {
        return cb(new Err('ArchivistDocumentEngine.ReadDocumentMetaDataError', {
          message: 'No document found for documentId ' + documentId,
        }))
      }
      if(!doc.collaborators) {
        doc.collaborators = []
      } else {
        doc.collaborators = doc.collaborators.split(',')
      }
      cb(null, doc)
    })
  }

  updateDocumentFullText(documentId, text) {
    return new Promise(function(resolve, reject) {
      this.documentStore.updateDocument(documentId, {'fullText': text}, function(err) {
        if(err) return reject(err)

        resolve()
      })
    }.bind(this))
  }

  listDocuments(args, cb) {
    let filters = !isEmpty(args.filters) ? JSON.parse(args.filters) : {}
    let options = !isEmpty(args.options) ? JSON.parse(args.options) : {}  
    let results = {}
    
    if(!options.columns) options.columns = ['"documentId"', '"schemaName"', '"schemaVersion"', "meta", "title", "language", '"updatedAt"', '"updatedBy"', '"userId"']

    this.documentStore.countDocuments(filters, function(err, count) {
      if(err) {
        return cb(new Err('ArchivistDocumentEngine.ListDocumentsError', {
          cause: err
        }))
      }
      results.total = count
      this.documentStore.listDocuments(filters, options, function(err, docs) {
        if(err) {
          return cb(new Err('ArchivistDocumentEngine.ListDocumentsError', {
            cause: err
          }))
        }
        results.records = docs
        
        cb(null, results)
      })
    }.bind(this))
  }
}

module.exports = ArchivistDocumentEngine
