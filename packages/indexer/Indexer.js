import { EventEmitter, JSONConverter, SubstanceError as Err } from 'substance'
import { findIndex, forEach, isEmpty, map } from 'lodash-es'
import Args from 'args-js'
import Promise from 'bluebird'

let converter = new JSONConverter()
let massivePath = require.resolve('massive')
let Where = require(massivePath + '/../lib/where')

class Indexer extends EventEmitter {
  constructor(config) {
    super(config)

    // Gap between new indexing request
    // and the end of old one (in minutes)
    this.gap = config.gap || 1

    this.configurator = config.configurator
    this.db = config.db
    this.documentEngine = config.documentEngine
    this.snapshotEngine = config.snapshotEngine
    this.fragmentStore = config.fragmentStore

    this.scheduleIndexing()
  }

  /*
    Recurring indexing schedule
  */
  scheduleIndexing() {
    console.info('Scheduling document index update...')
    this.interval = setInterval(() => {
      this.indexOutdatedDocuments()
    }, 60 * 1000 * this.gap)
  }

  /*
    Reset recurring indexing schedule
  */
  resetSchedule() {
    clearInterval(this.interval)
    this.scheduleIndexing()
  }

  index(documentId) {
    return new Promise((resolve, reject) => {
      this._clearDocumentIndex(documentId)
        .then(() => {
          this.documentEngine.getDocument(documentId, (err, docEntry) => {
            if(err) {
              return reject(new Err('Indexer.IndexError', {
                cause: err
              }))
            }
            let emptyDoc = this.configurator.createDocument()
            let doc = converter.importDocument(emptyDoc, docEntry.data)
            let body = doc.get('body')
            let fullText = ''
            let t0 = new Date()

            let counters = {}
            let collaborators = []

            this._countEntityReferences(doc)
              .then(cnt => {
                counters = cnt
                return this._indexCollaborators(doc, docEntry.collaborators, docEntry.documentId)
              }).then(collabs => {
                collaborators = collabs
                return Promise.map(body.nodes, (nodeId, index) => {
                  fullText += '\r\n' + doc.get(nodeId).content
                  let prevId = body.nodes[index - 1] || null
                  let nextId = body.nodes[index + 1] || null
                  return this._processNode(nodeId, doc, documentId, prevId, nextId)
                }, {concurrency: 10})
              }).then(() => {
                return this._saveIndexData(documentId, fullText, counters.annotations, counters.references, collaborators, docEntry.version)
              }).then(function() {
                let t1 = new Date()
                console.info('finish fragment generation, takes', t1-t0, 'ms')
                resolve()
              }).catch((err) => {
                return reject(new Err('Indexer.IndexError', {
                  cause: err
                }))
              })
          })
        })
    })
  }

  indexOutdatedDocuments() {
    console.info('Searching for documents with outdated index...')
    clearInterval(this.interval)
    return new Promise(resolve => {
      this.documentEngine.getOutdatedDocuments((err, docs) => {
        console.info('Found', docs.length, 'documents')
        Promise.reduce(docs, (total, doc) => {
          return this.index(doc.documentId)
        }, 0).then((total) => {
          this.resetSchedule()
          resolve(total)
        })
      })
    })
  }

  indexAll() {
    return new Promise((resolve, reject) => {
      this.documentEngine.listDocuments({}, (err, docs) => {
        if(err) return reject(err)
        Promise.reduce(docs.records, (total, doc) => {
          return this.index(doc.documentId)
        }, 0).then(function(total) {
          resolve(total)
        })
      })
    })
  }

  reindexDocumentReferences(documentId) {
    return new Promise(function(resolve, reject) {
      this.documentEngine.getDocument(documentId, function(err, docEntry) {
        if(err) {
          return reject(new Err('Indexer.IndexError', {
            cause: err
          }))
        }
        let emptyDoc = this.configurator.createDocument()
        let doc = converter.importDocument(emptyDoc, docEntry.data)

        return this._countEntityReferences(doc)
          .then(counters => {
            return this._saveReferencesData(documentId, counters.annotations, counters.references)
          })
      }.bind(this))
    }.bind(this))
  }

  reindexDocumentMetadata(documentId) {
    return new Promise(function(resolve, reject) {
      this.documentEngine.getDocument(documentId, function(err, docEntry) {
        if(err) {
          return reject(new Err('Indexer.IndexError', {
            cause: err
          }))
        }
        let emptyDoc = this.configurator.createDocument()
        let doc = converter.importDocument(emptyDoc, docEntry.data)

        let meta = doc.get('meta')

        return this._saveMetadata(documentId, meta)
      }.bind(this))
    }.bind(this))
  }

  searchDocuments(filters, options) {
    let isTextSearch = filters.query ? true : false
    let limit = options.limit || 100
    let offset = options.offset || 0
    let query, countQuery, args, where, searchQuery, language

    if(isTextSearch) {
      searchQuery = filters.query
      language = filters.language || 'english'
      delete filters.query
      delete filters.language

      args = this._getWhere(arguments)
      where = isEmpty(args.conditions) ? {} : Where. able(args.conditions)

      let whereQuery = where.where ? where.where + ' \nAND (tsv @@ q)' : '\nWHERE (tsv @@ q)'

      countQuery = `SELECT COUNT(*) FROM documents, plainto_tsquery(${language}, ${searchQuery}) AS q ${whereQuery}`

      query = `SELECT 
"documentId", title, meta,
(SELECT COUNT(*) 
  FROM fragments ${whereQuery} 
  AND "documentId" = documents."documentId"
) AS count,
ts_rank_cd(documents.tsv, q) AS rank FROM documents, plainto_tsquery(${language}, ${searchQuery}) AS q ${whereQuery} 
ORDER BY rank DESC limit ${limit} offset ${offset}`

    } else {
      args = this._getWhere(arguments)
      where = isEmpty(args.conditions) ? {} : Where.forTable(args.conditions)

      let whereQuery = where.where

      countQuery = `SELECT COUNT(*) FROM documents ${whereQuery}`

      query = `SELECT 
"documentId", title, meta,
(SELECT COUNT(*) 
  FROM fragments ${whereQuery} 
  AND "documentId" = documents."documentId"
) AS count
FROM documents ${whereQuery}
ORDER BY count DESC limit ${limit} offset ${offset}`
    }

    return new Promise(function(resolve, reject) {
      this.db.run(countQuery, where.params, function(err, count) {
        if(err) {
          return reject(new Err('Indexer.SearchDocumentsError', {
            cause: err
          }))
        }

        let output = {
          total: count[0].count
        }

        this.db.run(query, where.params, function(err, res) {
          if(err) {
            return reject(new Err('Indexer.SearchDocumentsError', {
              cause: err
            }))
          }
          let first = findIndex(res, function(doc) {
            return doc.count > 0
          })

          if(first > -1) {
            if(isTextSearch) {
              filters.query = searchQuery
              filters.language = language
            }
            filters["documentId"] = res[first]["documentId"]
            this.searchFragments(filters, options)
              .then(function(fragments) {
                res[first].fragments = fragments
                output.records = res
                resolve(output)
              })
              .catch(function() {
                output.records = res
                resolve(output)
              })
          } else {
            output.records = res
            resolve(output)
          }
        }.bind(this))
      }.bind(this))
    }.bind(this))
  }

  searchFragments(filters, options) {
    let isTextSearch = filters.query ? true : false
    let limit = options.limit || 100
    let offset = options.offset || 0
    let query, args, where

    if(isTextSearch) {
      let searchQuery = filters.query
      let language = filters.language || 'english'
      delete filters.query
      delete filters.language

      args = this._getWhere(arguments)
      where = isEmpty(args.conditions) ? {} : Where.forTable(args.conditions)

      let whereQuery = where.where ? where.where + ' \nAND (tsv @@ q)' : '\nWHERE (tsv @@ q)'

      query = `SELECT 
"fragmentId",
ts_headline(${language}, content, q, 'StartSel=<strong>, StopSel=</strong>, HighlightAll=TRUE') as content
FROM fragments,
plainto_tsquery(${language}, ${searchQuery}) AS q ${whereQuery} 
ORDER BY SUBSTRING("fragmentId", '([0-9]+)')::int ASC limit ${limit} offset ${offset}`

    } else {
      args = this._getWhere(arguments)
      where = isEmpty(args.conditions) ? {} : Where.forTable(args.conditions)

      let whereQuery = where.where

      query = `SELECT 
"fragmentId",
content
FROM fragments ${whereQuery} 
ORDER BY SUBSTRING("fragmentId", '([0-9]+)')::int ASC limit ${limit} offset ${offset}`
    }

    return new Promise(function(resolve, reject) {
      this.db.run(query, where.params, function(err, res) {
        if(err) {
          return reject(new Err('Indexer.SearchFragmentsError', {
            cause: err
          }))
        }

        resolve(res)
      })
    }.bind(this))
  }

  searchEntities(filters, options) {
    let isTextSearch = filters.query ? true : false
    let limit = options.limit || 100
    let offset = options.offset || 0
    let query, countQuery, args, where

    if(isTextSearch) {
      let searchQuery = filters.query
      let language = filters.language || 'english'
      delete filters.query
      delete filters.language

      args = this._getWhere(arguments)
      where = isEmpty(args.conditions) ? {} : Where.forTable(args.conditions)

      let whereQuery = where.where ? where.where + ' \nAND (tsv @@ q)' : '\nWHERE (tsv @@ q)'

      countQuery = `SELECT COUNT(*) FROM entities, plainto_tsquery(${language}, ${searchQuery}) AS q ${whereQuery}`

      query = `SELECT 
"entityId", "entityType", name, description, synonyms, created, edited, "updatedBy", "userId", (SELECT COUNT(*) from documents WHERE "references" ? "entityId") AS count, ts_rank_cd(entities.tsv, q) AS rank
FROM entities,
plainto_tsquery(${language}, ${searchQuery}) AS q ${whereQuery} 
ORDER BY rank DESC, created DESC limit ${limit} offset ${offset}`

    } else {
      args = this._getWhere(arguments)
      where = isEmpty(args.conditions) ? {} : Where.forTable(args.conditions)

      let whereQuery = where.where

      countQuery = `SELECT COUNT(*) FROM entities ${whereQuery}`

      query = `SELECT 
"entityId", name, description, synonyms, created, edited, "updatedBy", "userId", (SELECT COUNT(*) from documents WHERE "references" ? "entityId") AS count
FROM entities ${whereQuery} 
ORDER BY created DESC limit ${limit} offset ${offset}`
    }

    return new Promise((resolve, reject) => {
      this.db.run(countQuery, where.params, (err, count) => {
        if(err) {
          return reject(new Err('Indexer.SearchEntitiesError', {
            cause: err
          }))
        }

        let output = {
          total: count[0].count
        }

        this.db.run(query, where.params, (err, res) => {
          if(err) {
            return reject(new Err('Indexer.SearchEntitiesError', {
              cause: err
            }))
          }

          output.records = res
          resolve(output)
        })
      })
    })
  }

  _getWhere(args) {
    args = Args([
      {conditions : Args.ANY | Args.Optional, _default : {}}
    ], args)

    return args
  }

  _clearDocumentIndex(documentId) {
    return this.fragmentStore.deleteDocumentFragments(documentId)
  }

  _processNode(nodeId, doc, documentId, prevId, nextId) {
    let annoIndex = doc.getIndex('annotations')
    let annos = annoIndex.byPath.getAll(nodeId)
    let record = {
      fragmentId: nodeId,
      documentId: documentId,
      prev: prevId,
      next: nextId
    }

    let timeRegExp = /\{(.*?)\}/
    let content = doc.get(nodeId).content
    let timecodes = timeRegExp.exec(content)

    if(!isEmpty(timecodes)) {
      if(timecodes.length > 1) {
        record.time = timecodes[1]
      }
    }
    record.content = content.replace(timeRegExp, '')
    record.annotations = Object.keys(annos)
    record.references = {}
    forEach(annos, function(anno) {
      let ref = anno.reference
      if(ref) {
        if(record.references[ref]) {
          record.references[ref] = record.references[ref] + 1
        } else {
          record.references[ref] = 1
        }
      }
    })
    return this._saveFragment(record)
  }

  _saveIndexData(documentId, text, annos, refs, collabs, version) {
    return this.documentEngine.updateDocumentIndexData(documentId, text, annos, refs, collabs, version)
  }

  _saveReferencesData(documentId, annos, refs) {
    return this.documentEngine.updateReferencesData(documentId, annos, refs)
  }

  _saveMetadata(documentId, metadata) {
    return this.documentEngine.updateMetadata(documentId, metadata)
  }

  _saveFragment(record) {
    return this.fragmentStore.createFragment(record)
  }

  _countEntityReferences(doc) {
    return new Promise((resolve) => {
      let entitiesIndex = doc.getIndex('entities')
      let annotations = []
      let references = {}
      forEach(entitiesIndex.byReference, (refs, key) => {
        annotations.push(key)
        references[key] = Object.keys(refs).length
      })

      resolve({
        annotations: annotations,
        references: references
      })
    })
  }

  _indexCollaborators(doc, collaborators, docId) {
    return new Promise((resolve) => {
      let collaboratorsList = collaborators || []
      let typeIndex = doc.getIndex('type')
      let commentIndex = typeIndex.get('comment')
      if(commentIndex) {
        let authors = map(commentIndex, comment => {
          return comment.author 
        })
        collaboratorsList = collaboratorsList.concat(authors)
      }

      return this.documentEngine.getChangesAuthors(docId)
        .then(authors => {
          collaboratorsList = new Set(collaboratorsList.concat(authors))
          collaboratorsList.delete(null)
          resolve([...collaboratorsList])
        })
    })
  }
}

export default Indexer
