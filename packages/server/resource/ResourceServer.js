let isEmpty = require('lodash/isEmpty')

/*
  ResourceServer module. Can be bound to an express instance
*/
class ResourceServer {
  constructor(config) {
    this.engine = config.resourceEngine
    this.indexer = config.indexer
    this.path = config.path
  }

  bind(app) {
    // search
    app.get(this.path + '/entities/search', this._searchEntities.bind(this))
    app.get(this.path + '/entities', this._listEntities.bind(this))
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
}

module.exports = ResourceServer
