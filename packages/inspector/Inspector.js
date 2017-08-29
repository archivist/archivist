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

  replaceResource(oldResourceId, newResourceId, type) {
    return this._getResourceDocuments(oldResourceId)
      .then(docs => {
        return Promise.map(docs, doc => {
          return this._getDocumentAndConnect(doc.documentId)
            .then(session => {
              let doc = session.getDocument()
              let entityIndex = doc.getIndex('entities')
              let references = entityIndex.byReference[oldResourceId]

              if(references) {
                // Notify collaborators about resource changes
                session._send({
                  scope: "substance/collab", 
                  type: "resourceSync", 
                  documentId: session.documentId, 
                  resourceId: oldResourceId, 
                  mode: 'remove'
                })

                session._send({
                  scope: "substance/collab", 
                  type: "resourceSync", 
                  documentId: session.documentId, 
                  resourceId: newResourceId, 
                  mode: 'add'
                })

                session.transaction((tx, args) => {
                  each(references, (node, id) => {
                    if(node.isResourceReference()) {
                      if(type) {
                        // Recreate annotation in case of entity type changing
                        let annoData = {
                          type: type,
                          reference: newResourceId,
                          start: node.start.toJSON(),
                          end: node.end.toJSON()
                        }
                        tx.delete(id)
                        tx.create(annoData)
                      } else {
                        tx.set([id, 'reference'], newResourceId)
                      }
                    } else if (node.isResourceMultipleReference()) {
                      let reference = node.reference

                      if(reference.indexOf(newResourceId) === -1) {
                        let index = reference.indexOf(oldResourceId)
                        reference[index] = newResourceId

                        if(type) {
                          // Recreate annotation in case of entity type changing
                          let annoData = {
                            type: type,
                            reference: reference,
                            start: node.start.toJSON(),
                            end: node.end.toJSON()
                          }
                          tx.delete(id)
                          tx.create(annoData)
                        } else {
                          tx.set([id, 'reference'], reference)
                        }
                      }
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
                // Notify collaborators about resource changes
                session._send({
                  scope: "substance/collab", 
                  type: "resourceSync", 
                  documentId: session.documentId, 
                  resourceId: resourceId, 
                  mode: 'remove'
                })

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

        let emptyDoc = this.configurator.createDocument()
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
    // TODO: disconnect after transactions finish
    // otherwise we will send duplicate transaction 
    return new Promise((resolve) => {
      setTimeout(function() {
        session.dispose()
        resolve()
      }, 1000)
    })
  }
}

export default Inspector
