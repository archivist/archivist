import { DocumentEngine, SubstanceError as Err } from 'substance'
import { isEmpty } from 'lodash-es'
import Promise from 'bluebird'

/*
  Archivist Document Engine API
*/
class ArchivistDocumentEngine extends DocumentEngine {
  constructor(config) {
    super(config)

    this.documentStore = config.documentStore
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

  getDocument(documentId, cb) {
    this.queryDocumentMetaData(documentId, (err, docEntry) => {
      if (err) {
        return cb(new Err('ArchivistDocumentEngine.ReadDocumentMetadataError', {
          cause: err
        }))
      }

      this.snapshotEngine.getSnapshot(docEntry.documentId, docEntry.version, function(err, snapshot) {
        if (err) {
          return cb(new Err('ArchivistDocumentEngine.ReadSnapshotError', {
            cause: err
          }))
        }
        docEntry.data = snapshot.data ? snapshot.data : snapshot
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

  updateDocumentIndexData(documentId, text, annos, refs, version) {
    return new Promise(function(resolve, reject) {
      this.documentStore.updateDocument(documentId, {
        'fullText': text, 
        annotations: annos, 
        references: refs, 
        'indexedVersion': version
      }, function(err) {
        if(err) return reject(err)

        resolve()
      })
    }.bind(this))
  }

  updateReferencesData(documentId, annos, refs) {
    return new Promise(function(resolve, reject) {
      this.documentStore.updateDocument(documentId, {
        annotations: annos, 
        references: refs
      }, function(err) {
        if(err) return reject(err)

        resolve()
      })
    }.bind(this))
  }

  getOutdatedDocuments(cb) {
    this.db.run('SELECT "documentId" from documents WHERE version > "indexedVersion"', function(err, docs) {
      if (err) {
        return cb(new Err('ArchivistDocumentEngine.ReadOutdatedDocumentsError', {
          cause: err
        }))
      }

      cb(null, docs)
    })
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

  listResourceDocuments(resourceId, published, cb) {
    let publishedProviso = ''
    if(published) publishedProviso = "AND meta->>'state' = 'published'"
    let query = `
      SELECT "documentId", title, meta, "references"->>$1 AS count
      FROM documents
      WHERE "references" ? $1 ${publishedProviso}
      ORDER BY count DESC;
    `

    this.db.run(query, [resourceId], function(err, docs) {
      if (err) {
        return cb(new Err('ArchivistDocumentEngine.ListResourceDocumentsError', {
          cause: err
        }))
      }

      cb(null, docs)
    })
  }

  /*
    Add change to a given documentId.

    Snapshot creation is requested on each change to be stored.
  */
  addChange(documentId, change, cb) {
    this.changeStore.addChange(documentId, change, (err, newVersion) => {
      if (err) return cb(err)

      this.documentStore.updateDocument(documentId, {
        version: newVersion,
        // Store custom documentInfo
        info: change.info
      }, err => {
        if (err) return cb(err)
        this.requestSnapshot(documentId, newVersion, () => {
          // no matter if snaphot creation errored or not we will confirm change
          cb(null, newVersion)
        })
      })
    })
  }
}

export default ArchivistDocumentEngine
