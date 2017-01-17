import { SubstanceError as Err } from 'substance'
import { isUndefined, map } from 'lodash-es'
import Promise from 'bluebird'

/*
  Archivist Entity Store API
*/
class EntityStore {
  constructor(config) {
    this.config = config
    this.db = config.db
  }

  /*
    Create a new entity record

    @param {Object} entityData JSON object
    @returns {Promise}
  */
  createEntity(entityData) {
    return this.entityExists(entityData.entityId).bind(this)
      .then(function(exists) {
        if (exists) {
          throw new Err('EntityStore.CreateError', {
            message: 'Entity already exists.'
          })
        }

        return this._createEntity(entityData)
      }.bind(this))
  }

  /*
    Get entity record for a given entityId

    @param {String} entityId entity id
    @returns {Promise}
  */
  getEntity(entityId) {
    return new Promise(function(resolve, reject) {
      this.db.entities.findOne({entityId: entityId}, function(err, entity) {
        if (err) {
          return reject(new Err('EntityStore.ReadError', {
            cause: err
          }))
        }

        if (!entity) {
          return reject(new Err('EntityStore.ReadError', {
            message: 'No entity found for entityId ' + entityId
          }))
        }

        resolve(entity)
      })
    }.bind(this))
  }

  /*
    Update an entity record with given props

    @param {String} entityId entity id
    @param {Object} props properties to update
    @returns {Promise}
  */
  updateEntity(entityId, props) {
    return this.entityExists(entityId).bind(this)
      .then(function(exists) {
        if (!exists) {
          throw new Err('EntityStore.UpdateError', {
            message: 'Entity with entityId ' + entityId + ' does not exists'
          })
        }

        return new Promise(function(resolve, reject) {
          let entityData = props
          entityData.entityId = entityId

          this.db.entities.save(entityData, function(err, entity) {
            if (err) {
              return reject(new Err('EntityStore.UpdateError', {
                cause: err
              }))
            }

            resolve(entity)
          })
        }.bind(this))
      }.bind(this))
  }

  /*
    Remove an entity from the db

    @param {String} entityId entity id
    @returns {Promise}
  */
  deleteEntity(entityId) {
    return this.entityExists(entityId).bind(this)
      .then(function(exists) {
        if (!exists) {
          throw new Err('EntityStore.DeleteError', {
            message: 'Entity with entityId ' + entityId + ' does not exists'
          })
        }

        return new Promise(function(resolve, reject) {
          this.db.entities.destroy({entityId: entityId}, function(err, entities) {
            if (err) {
              return reject(new Err('EntityStore.DeleteError', {
                cause: err
              }))
            }
            entities = entities[0]

            resolve(entities)
          })
        }.bind(this))
      }.bind(this))
  }

  /*
    Internal method to create a entity entry

    @param {Object} entityData JSON object
    @returns {Promise}
  */
  _createEntity(entityData) {
    let record = {
      entityId: entityData.entityId,
      name: entityData.name,
      description: entityData.description,
      synonyms: entityData.synonyms || [],
      created: entityData.created || new Date(),
      edited: entityData.edited || new Date(),
      updatedBy: entityData.updatedBy,
      userId: entityData.userId,
      entityType: entityData.entityType,
      data: entityData.data
    }

    return new Promise(function(resolve, reject) {
      this.db.entities.insert(record, function(err, entity) {
        if (err) {
          return reject(new Err('EntityStore.CreateError', {
            cause: err
          }))
        }

        resolve(entity)
      })
    }.bind(this))
  }

  /*
    Check if entity exists

    @param {String} entityId entity id
    @returns {Promise}
  */
  entityExists(entityId) {
    return new Promise(function(resolve, reject) {
      this.db.entities.findOne({entityId: entityId}, function(err, entity) {
        if (err) {
          return reject(new Err('EntityStore.ReadError', {
            cause: err
          }))
        }
        resolve(!isUndefined(entity))
      })
    }.bind(this))
  }

  /*
    List available entities

    @param {Object} filters filters
    @param {Object} options options (limit, offset, columns)
    @returns {Promise}
  */
  listEntities(filters, options) {
    // Default limit to avoid unlimited listing
    if(!options.limit) options.limit = 100
    if(!options.offset) options.offset = 0
    if(!options.order) options.order = 'created DESC'

    return new Promise(function(resolve, reject) {
      this.db.entities.find(filters, options, function(err, entities) {
        if (err) {
          return reject(new Err('EntityStore.ListError', {
            cause: err
          }))
        }

        resolve(entities)
      })
    }.bind(this))
  }

  /*
    Count available entities

    @param {Object} filters filters
    @returns {Promise}
  */
  countEntities(filters) {
    return new Promise(function(resolve, reject) {
      this.db.entities.count(filters, function(err, count) {
        if (err) {
          return reject(new Err('EntityStore.CountError', {
            cause: err
          }))
        }

        resolve(count)
      })
    }.bind(this))
  }

  /*
    Resets the database and loads a given seed object

    Be careful with running this in production

    @param {Object} seed JSON object
  */
  seed(seed) {
    let self = this
    let actions = map(seed, self.createEntity.bind(self))
    return Promise.all(actions)
  }
}

export default EntityStore
