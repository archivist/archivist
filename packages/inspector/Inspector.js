import { CollabClient, CollabSession, EventEmitter, JSONConverter, SubstanceError as Err } from 'substance'
import { each } from 'lodash-es'
import WebSocketConnection from './WSConnection'
import Promise from 'bluebird'

let converter = new JSONConverter()

class Inspector extends EventEmitter {
  constructor(config) {
    super(config)

    this.configurator = config.configurator
    this.documentEngine = config.documentEngine

    setTimeout(function() {
      this._createConnection()
    }.bind(this), 1000)
  }

  replaceResource(oldResourceId, newResourceId) {
    return this._getResourceDocuments(oldResourceId)
      .then(docs => {
        return Promise.map(docs, doc => {
          return this._getDocumentAndConnect(doc.documentId)
            .then(session => {
              let doc = session.getDocument()
              let entityIndex = doc.getIndex('entities')
              let references = entityIndex.byReference[oldResourceId]

              if(references) {
                session.transaction((tx, args) => {
                  each(references, (node, id) => {
                    if(node.isResourceReference()) {
                      tx.set([id, 'reference'], newResourceId)
                    } else if (node.isResourceMultipleReference()) {
                      let reference = node.reference
                      let index = reference.indexOf(oldResourceId)
                      reference[index] = newResourceId
                      tx.set([id, 'reference'], reference)
                    }
                  })
                  return args
                })
              }

              return this._closeSession(session)
            })
        }, {concurrency: 1})
      })
  }

  removeResource(resourceId) {
    return this._getResourceDocuments(resourceId)
      .then(docs => {
        return Promise.map(docs, doc => {
          return this._getDocumentAndConnect(doc.documentId)
            .then(session => {
              let doc = session.getDocument()
              let entityIndex = doc.getIndex('entities')
              let references = entityIndex.byReference[resourceId]

              if(references) {
                session.transaction((tx, args) => {
                  each(references, (node, id) => {
                    if(node.isResourceReference()) {
                      tx.delete(id)
                    } else if (node.isResourceMultipleReference()) {
                      let reference = node.reference
                      let index = reference.indexOf(resourceId)
                      reference.splice(index, 1)
                      tx.set([id, 'reference'], reference)
                    }
                  })
                  return args
                })
              }

              return this._closeSession(session)
            })
        }, {concurrency: 1})
      })
  }

  _createConnection() {
    let config = this.configurator.getAppConfig()

    this.conn = new WebSocketConnection({
      wsUrl: config.wsUrl || 'ws://'+config.host+':'+config.port
    })

    this.collabClient = new CollabClient({
      connection: this.conn,
      enhanceMessage: function(message) {
        message.sessionToken = config.botToken
        return message
      }
    })
  }

  _getResourceDocuments(resourceId) {
    return new Promise((resolve, reject) => {
      this.documentEngine.listResourceDocuments(resourceId, false, (err, docs) => {
        if(err) {
          return reject(new Err('Inspector.ListResourceDocumentsError', {
            cause: err
          }))
        }

        return resolve(docs)
      })
    })
  }

  _getDocumentAndConnect(documentId) {
    return new Promise((resolve, reject) => {
      this.documentEngine.getDocument(documentId, (err, docEntry) => {
        if(err) {
          return reject(new Err('Inspector.ReadDocumentError', {
            cause: err
          }))
        }

        let emptyDoc = this.configurator.createArticle()
        let rawDoc = converter.importDocument(emptyDoc, docEntry.data)

        let session = new CollabSession(rawDoc, {
          configurator: this.configurator,
          documentId: documentId,
          version: docEntry.version,
          collabClient: this.collabClient
        })

        return resolve(session)
      })
    })
  }

  _closeSession(session) {
    return new Promise((resolve) => {
      setTimeout(function() {
        session.dispose()
        resolve()
      }, 100)
    })
  }
}

export default Inspector
