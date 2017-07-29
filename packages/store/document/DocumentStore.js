import { SubstanceError as Err, uuid } from 'substance'
import { isUndefined, map } from 'lodash-es'
import Promise from 'bluebird'

/*
  Archivist Document Store API

  Implements low level CRUD operations API for storing 
  information about documents in PostgreSQL DB.
  Note that content of documents itself got stored via changes and snapshots.
  
  With this API you can:
  - create new document
  - read document
  - update document
  - delete document
  - list documents
  - count documents
  - check if document exists
  - seed database with data

  All methods expects callback functions, 
  except seed which is using promise based document creation clone
*/
class DocumentStore {
  constructor(config) {
    this.config = config
    this.db = config.db
  }

  /*
    Internal method to create a document record
  */
  createDocument(props, cb) {
    if (!props.documentId) {
      // We generate a documentId ourselves
      props.documentId = uuid()
      props.updatedAt = new Date()
    } 

    if(props.info) {
      if(props.info.title) props.title = props.info.title
      if(props.info.meta) props.meta = props.info.meta
      if(props.info.userId) {
        props.updatedBy = props.info.userId
        props.userId = props.info.userId
      }
    }
    
    this.documentExists(props.documentId, function(err, exists) {
      if (err) {
        return cb(new Err('DocumentStore.CreateError', {
          cause: err
        }))
      }

      if (exists) {
        return cb(new Err('DocumentStore.CreateError', {
          message: 'Document ' + props.documentId + ' already exists.'
        }))
      }

      this.db.documents.insert(props, function(err, doc) {
        if (err) {
          return cb(new Err('DocumentStore.CreateError', {
            cause: err
          }))
        }

        cb(null, doc)
      })
    }.bind(this))
  }

  /*
    Promise version
  */
  _createDocument(props) {
    return new Promise(function(resolve, reject) {
      this.createDocument(props, function(err, doc) {
        if(err) {
          return reject(err)
        }

        resolve(doc)
      })
    }.bind(this))
  }

  /*
    Check if document exists
    @param {String} documentId document id
    @param {Callback} cb callback
    @returns {Callback}
  */
  documentExists(documentId, cb) {
    this.db.documents.findOne({documentId: documentId}, function(err, doc) {
      if (err) {
        return cb(new Err('DocumentStore.ReadError', {
          cause: err,
          info: 'Happened within documentExists.'
        }))
      }

      cb(null, !isUndefined(doc))
    })
  }

  /*
    Get document record for a given documentId
    
    @param {String} documentId document id
    @param {Callback} cb callback
    @returns {Callback}
  */
  getDocument(documentId, cb) {
    this.db.documents.findOne({documentId: documentId}, function(err, doc) {
      if (err) {
        return cb(new Err('DocumentStore.ReadError', {
          cause: err
        }))
      }

      if (!doc) {
        return cb(new Err('DocumentStore.ReadError', {
          message: 'No document found for documentId ' + documentId
        }))
      }

      cb(null, doc)
    })
  }

  /*
    Update a document record with given props
    
    @param {String} documentId document id
    @param {Object} props properties to update
    @param {Callback} cb callback
    @returns {Callback}
  */
  updateDocument(documentId, props, cb) {
    if(props.info) {
      if(props.info.title) props.title = props.info.title
      if(props.info.meta) props.meta = props.info.meta
      if(props.info.userId) props.updatedBy = props.info.userId
      if(props.info.updatedAt) props.updatedAt = props.info.updatedAt
    }
    
    this.documentExists(documentId, function(err, exists) {
      if (err) {
        return cb(new Err('DocumentStore.UpdateError', {
          cause: err
        }))
      }

      if (!exists) {
        return cb(new Err('DocumentStore.UpdateError', {
          message: 'Document with documentId ' + documentId + ' does not exists'
        }))
      }

      let documentData = props
      documentData.documentId = documentId

      this.db.documents.save(documentData, function(err, doc) {
        if (err) {
          return cb(new Err('DocumentStore.UpdateError', {
            cause: err
          }))
        }

        cb(null, doc)
      })
    }.bind(this))
  }

  /*
    Remove a document record from the db

    @param {String} documentId document id
    @param {Callback} cb callback
    @returns {Callback}
  */
  deleteDocument(documentId, cb) {
    this.documentExists(documentId, function(err, exists) {
      if (err) {
        return cb(new Err('DocumentStore.DeleteError', {
          cause: err
        }))
      }

      if (!exists) {
        return cb(new Err('DocumentStore.DeleteError', {
          message: 'Document with documentId ' + documentId + ' does not exists'
        }))
      }

      this.db.documents.destroy({documentId: documentId}, function(err, doc) {
        if (err) {
          return cb(new Err('DocumentStore.DeleteError', {
            cause: err
          }))
        }
        doc = doc[0]

        cb(null, doc)
      })
    }.bind(this))
  }

  /*
    List available documents

    @param {Object} filters filters
    @param {Object} options options (limit, offset, columns)
    @param {Callback} cb callback
    @returns {Callback}
  */
  listDocuments(filters, options, cb) {
    // set default to avoid unlimited listing
    options.limit = options.limit || 1000
    options.offset = options.offset || 0

    this.db.documents.find(filters, options, function(err, docs) {
      if (err) {
        return cb(new Err('DocumentStore.ListError', {
          cause: err
        }))
      }

      cb(null, docs)
    })
  }

  /*
    Count available documents

    @param {Object} filters filters
    @param {Function} cb callback
    @returns {Callback}
  */
  countDocuments(filters, cb) {
    this.db.documents.count(filters, function(err, count) {
      if (err) {
        return cb(new Err('DocumentStore.CountError', {
          cause: err
        }))
      }

      cb(null, count)
    })
  }

  /*
    Loads a given seed object to database

    Be careful with running this in production

    @param {Object} seed JSON object
    @param {Function} cb callback
  */

  seed(seed) {
    let self = this
    let actions = map(seed, self._createDocument.bind(self))

    return Promise.all(actions)
  }
}

export default DocumentStore
