import { SubstanceError as Err, uuid } from 'substance'
import { isEmpty } from 'lodash-es'
import Promise from 'bluebird'

class ResourceEngine {
  constructor(config) {
    this.configurator = config
    this.db = config.db
    this.entityStore = config.entityStore
  }

  createEntity(entityData) {
    if(!entityData.entityId) entityData.entityId = uuid()
    return this.entityStore.createEntity(entityData)
  }

  getEntity(entityId) {
    return this.entityStore.getEntity(entityId)
  }

  updateEntity(entityId, entityData) {
    return this.entityStore.updateEntity(entityId, entityData)
  }

  removeEntity(entityId) {
    return this.entityStore.deleteEntity(entityId)
  }

  listEntities(args) {
    let filters = !isEmpty(args.filters) ? JSON.parse(args.filters) : {}
    let options = !isEmpty(args.options) ? JSON.parse(args.options) : {}      
    let results = {}

    // TODO: avoid sql here
    // last element is sql expression for geting total number of backreferences
    if(!options.columns) options.columns = ['"entityId"', '"entityType"', "name", "description", "synonyms", 'created', 'edited', '(SELECT name FROM users WHERE "userId" = "updatedBy") AS "updatedBy"', '"userId"', '(SELECT COUNT(*) FROM documents WHERE "references" ? "entityId") AS count']
    if(options.mode === 'full') options.columns.push('data')

    return this.entityStore.countEntities(filters) 
      .then(count => {
        results.total = count
        return this.entityStore.listEntities(filters, options)
      })
      .then(function(entities) {
        results.records = entities
        return results
      })
  }

  getDocumentResources(documentId) {
    let query = `
      SELECT "entityId", "entityType", data, name 
      FROM entities
      WHERE "entityId" IN (
        SELECT unnest(annotations)
        FROM documents
        WHERE "documentId" = $1 
      )
    `
    return new Promise((resolve, reject) => {
      this.db.run(query, [documentId], (err, entities) => {
        if (err) {
          return reject(new Err('ResourceEngine.ReadDocumentResources', {
            cause: err
          }))
        }
        
        resolve(entities)
      })
    })
  }

  getDocumentCollaborators(documentId) {
    let query = `
      SELECT "userId", name 
      FROM users
      WHERE "userId" IN (
        SELECT unnest(collaborators)
        FROM documents
        WHERE "documentId" = $1 
      )
    `
    return new Promise((resolve, reject) => {
      this.db.run(query, [documentId], (err, collaborators) => {
        if (err) {
          return reject(new Err('ResourceEngine.ReadDocumentCollaborators', {
            cause: err
          }))
        }
        
        resolve(collaborators)
      })
    })
  }
}

export default ResourceEngine
