let extend = require('lodash/extend')
let isEmpty = require('lodash/isEmpty')
let union = require('lodash/union')

/*
  ResourceServer module. Can be bound to an express instance
*/
class ResourceServer {
  constructor(config) {
    this.engine = config.resourceEngine
    this.authEngine = config.authEngine
    this.indexer = config.indexer
    this.inspector = config.inspector
    this.path = config.path
  }

  bind(app) {
    // search
    app.post(this.path + '/entities', this.authEngine.hasAccess.bind(this.authEngine), this._createEntity.bind(this))
    app.get(this.path + '/entities', this._listEntities.bind(this))
    app.get(this.path + '/entities/document/:id', this._getDocumentResources.bind(this))
    //app.get(this.path + '/entities/tree/:type', this._getResourcesTree.bind(this))
    app.get(this.path + '/entities/search', this._searchEntities.bind(this))
    app.post(this.path + '/entities/merge', this.authEngine.hasSuperAccess.bind(this.authEngine), this._mergeEntity.bind(this))
    app.get(this.path + '/entities/:id', this._getEntity.bind(this))
    app.delete(this.path + '/entities/:id', this.authEngine.hasSuperAccess.bind(this.authEngine), this._removeEntity.bind(this))
    app.put(this.path + '/entities/:id', this.authEngine.hasAccess.bind(this.authEngine), this._updateEntity.bind(this))
  }

  /*
    Create Entity
  */
  _createEntity(req, res, next) {
    let entityData = req.body
    this.engine.createEntity(entityData).then(function(entity) {
      res.json(entity)
    }).catch(function(err) {
      return next(err)
    })
  }

  /*
    Get Entity
  */
  _getEntity(req, res, next) {
    let entityId = req.params.id
    this.engine.getEntity(entityId).then(function(result) {
      res.json(result)
    }).catch(function(err) {
      return next(err)
    })
  }

  /*
    Update Entity
  */
  _updateEntity(req, res, next) {
    let entityId = req.params.id
    let entityData = req.body
    this.engine.updateEntity(entityId, entityData).then(function(entity) {
      res.json(entity)
    }).catch(function(err) {
      return next(err)
    })
  }

  /*
    Remove Entity
  */
  _removeEntity(req, res, next) {
    let entityId = req.params.id
    this.inspector.removeResource(entityId)
      .then(() => {
        return this.engine.removeEntity(entityId)
      })
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        return next(err)
      })
  }

  /*
    Merge entities
  */
  _mergeEntity(req, res, next) {
    let entityData = req.body
    let entityId = entityData.mergeEntity
    let targetId = entityData.targetEntity
    let type = entityData.type
    let mergeEntity, targetEntity

    this.engine.getEntity(entityId)
      .then(entity => {
        mergeEntity = entity
        return this.engine.getEntity(targetId)
      })
      .then((entity) => {
        targetEntity = entity
        let synonyms = union(mergeEntity.synonyms, targetEntity.synonyms)
        return this.engine.updateEntity(targetId, {synonyms: synonyms, data: extend(targetEntity.data, {synonyms: synonyms})})
      })
      .then(() => {
        return this.inspector.replaceResource(entityId, targetId, type)
      })
      .then(() => {
        return this.engine.removeEntity(entityId)
      })
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        return next(err)
      })
  }

  /*
    Search entities
  */
  _searchEntities(req, res, next) {
    let args = req.query

    let search = args.query
    let language = args.language

    let filters = !isEmpty(args.filters) ? JSON.parse(args.filters) : {}
    let options = !isEmpty(args.options) ? JSON.parse(args.options) : {}

    if(search) filters.query = "'" + search + "'"
    if(language) filters.language = "'" + language + "'"

    this.indexer.searchEntities(filters, options)
      .then(function(resp) {
        res.json(resp)
      })
      .catch(function(err) {
        next(err)
      })
  }

  /*
    List available entities
  */
  _listEntities(req, res, next) {
    let args = req.query
    
    this.engine.listEntities(args)
      .then(function(entities) {
        res.json(entities)
      })
      .catch(function(err) {
        next(err)
      })
  }

  /*
    Get document resources
  */
  _getDocumentResources(req, res, next) {
    let documentId = req.params.id

    this.engine.getDocumentResources(documentId)
      .then(function(entities) {
        res.json(entities)
      })
      .catch(function(err) {
        next(err)
      })
  }
}

export default ResourceServer
