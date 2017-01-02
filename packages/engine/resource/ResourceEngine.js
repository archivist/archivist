let uuid = require('substance').uuid
let isEmpty = require('lodash/isEmpty')

class ResourceEngine {
  constructor(config) {
    this.configurator = config
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
    if(!options.columns) options.columns = ['"entityId"', "name", "description", "synonyms", 'created', 'edited', '"updatedBy"', '"userId"', "(SELECT COUNT(*) from documents WHERE \"entityId\"=ANY(documents.annotations)) AS count"]
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

}

module.exports = ResourceEngine
