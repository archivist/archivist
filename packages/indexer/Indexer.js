let Err = require('substance').SubstanceError
let EventEmitter = require('substance').EventEmitter
let JSONConverter = require('substance').JSONConverter
let findIndex = require('lodash/findIndex')
let isEmpty = require('lodash/isEmpty')
let Promise = require('bluebird')
let converter = new JSONConverter()

//import { EventEmitter, SubstanceError as Err } from 'substance'

// Massive internal libs
let ArgTypes = require('../../node_modules/massive/lib/arg_types')
let Where = require('../../node_modules/massive/lib/where')

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
    console.log('Scheduling document index update...')
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
    return new Promise(function(resolve, reject) {
      this._clearDocumentIndex(documentId)
        .then(function() {
          this.snapshotEngine.getSnapshot({documentId: documentId}, function(err, snapshot) {
            if(err) {
              return reject(new Err('Indexer.IndexError', {
                cause: err
              }))
            }
            let emptyDoc = this.configurator.createArticle()
            let doc = converter.importDocument(emptyDoc, snapshot.data)
            let body = doc.get('body')
            let fullText = ''
            let t0 = new Date()

            return Promise.map(body.nodes, function(nodeId, index) {
              fullText += '\r\n' + doc.get(nodeId).content
              let prevId = body.nodes[index - 1] || null
              let nextId = body.nodes[index + 1] || null
              return this._processNode(nodeId, doc, documentId, prevId, nextId)
            }.bind(this), {concurrency: 10}).then(function() {
              return this._saveFullText(documentId, fullText, snapshot.version)
            }.bind(this)).then(function() {
              let t1 = new Date()
              console.log('finish fragment generation, takes', t1-t0, 'ms')
              resolve()
            })
          }.bind(this))
        }.bind(this))
    }.bind(this))
  }

  indexOutdatedDocuments() {
    console.log('Searching for documents with outdated index...')
    clearInterval(this.interval)
    return new Promise(resolve => {
      this.documentEngine.getOutdatedDocuments((err, docs) => {
        console.log('Found', docs.length, 'documents')
        Promise.reduce(docs, (total, doc) =>  {
          return this.index(doc.documentId)
        }, 0).then((total) => {
          this.resetSchedule()
          resolve(total)
        })
      })
    })
  }

  indexAll() {
    return new Promise(function(resolve, reject) {
      this.documentEngine.listDocuments({}, function(err, docs) {
        Promise.reduce(docs.records, function(total, doc) {
          return this.index(doc.documentId)
        }.bind(this), 0).then(function(total) {
          resolve(total)
        })
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

      args = ArgTypes.findArgs(arguments, this)
      where = isEmpty(args.conditions) ? {} : Where.forTable(args.conditions)

      let whereQuery = where.where ? where.where + ' \nAND (tsv @@ q)' : '\nWHERE (tsv @@ q)'

      countQuery = `SELECT COUNT(*) FROM documents, plainto_tsquery(${language}, ${searchQuery}) AS q ${whereQuery}`

      query = `SELECT 
"documentId",
title, meta->>'summary' AS summary,
(SELECT COUNT(*) 
  FROM fragments ${whereQuery} 
  AND "documentId" = documents."documentId"
) AS count,
ts_rank_cd(documents.tsv, q) AS rank FROM documents, plainto_tsquery(${language}, ${searchQuery}) AS q ${whereQuery} 
ORDER BY rank DESC limit ${limit} offset ${offset}`

    } else {
      args = ArgTypes.findArgs(arguments, this)
      where = isEmpty(args.conditions) ? {} : Where.forTable(args.conditions)

      let whereQuery = where.where

      countQuery = `SELECT COUNT(*) FROM documents ${whereQuery}`

      query = `SELECT 
"documentId",
title, meta->>'summary' AS summary,
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

      args = ArgTypes.findArgs(arguments, this)
      where = isEmpty(args.conditions) ? {} : Where.forTable(args.conditions)

      let whereQuery = where.where ? where.where + ' \nAND (tsv @@ q)' : '\nWHERE (tsv @@ q)'

      query = `SELECT 
"fragmentId",
ts_headline(${language}, content, q, 'StartSel=<strong>, StopSel=</strong>, HighlightAll=TRUE') as content
FROM fragments,
plainto_tsquery(${language}, ${searchQuery}) AS q ${whereQuery} 
ORDER BY SUBSTRING("fragmentId", '([0-9]+)')::int ASC limit ${limit} offset ${offset}`

    } else {
      args = ArgTypes.findArgs(arguments, this)
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

      args = ArgTypes.findArgs(arguments, this)
      where = isEmpty(args.conditions) ? {} : Where.forTable(args.conditions)

      let whereQuery = where.where ? where.where + ' \nAND (tsv @@ q)' : '\nWHERE (tsv @@ q)'

      countQuery = `SELECT COUNT(*) FROM entities, plainto_tsquery(${language}, ${searchQuery}) AS q ${whereQuery}`

      query = `SELECT 
"entityId", name, description, synonyms, created, edited, "updatedBy", "userId", (SELECT COUNT(*) from documents WHERE "entityId"=ANY(documents.annotations)) AS count, ts_rank_cd(entities.tsv, q) AS rank
FROM entities,
plainto_tsquery(${language}, ${searchQuery}) AS q ${whereQuery} 
ORDER BY rank DESC limit ${limit} offset ${offset}`

    } else {
      args = ArgTypes.findArgs(arguments, this)
      where = isEmpty(args.conditions) ? {} : Where.forTable(args.conditions)

      let whereQuery = where.where

      countQuery = `SELECT COUNT(*) FROM entities ${whereQuery}`

      query = `SELECT 
"entityId", name, description, synonyms, created, edited, "updatedBy", "userId", (SELECT COUNT(*) from documents WHERE "entityId"=ANY(documents.annotations)) AS count
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

    record.content = doc.get(nodeId).content
    record.annotations = Object.keys(annos)
    return this._saveFragment(record)
  }

  _saveFullText(documentId, text, version) {
    return this.documentEngine.updateDocumentFullText(documentId, text, version)
  }

  _saveFragment(record) {
    return this.fragmentStore.createFragment(record)
  }
}

//export default Indexer
module.exports = Indexer
