let Err = require('substance').SubstanceError
let isUndefined = require('lodash/isUndefined')
let map = require('lodash/map')
let Promise = require('bluebird')

/*
  Archivist Fragment Store API
*/
class FragmentStore {
  constructor(config) {
    this.config = config
    this.db = config.db
  }

  /*
    Create a new fragment record (aka signup)

    @param {Object} fragmentData JSON object
    @returns {Promise}
  */
  createFragment(fragmentData) {
    return this.fragmentExists(fragmentData.fragmentId, fragmentData.documentId).bind(this)
      .then(function(exists) {
        if (exists) {
          throw new Err('FragmentStore.CreateError', {
            message: 'Fragment already exists.'
          })
        }

        return this._createFragment(fragmentData)
      }.bind(this))
  }

  /*
    Get fragment record for a given fragmentId

    @param {String} fragmentId fragment id
    @returns {Promise}
  */
  getFragment(fragmentId) {
    return new Promise(function(resolve, reject) {
      this.db.fragments.findOne({fragmentId: fragmentId}, function(err, fragment) {
        if (err) {
          return reject(new Err('FragmentStore.ReadError', {
            cause: err
          }))
        }

        if (!fragment) {
          return reject(new Err('FragmentStore.ReadError', {
            message: 'No fragment found for fragmentId ' + fragmentId
          }))
        }

        resolve(fragment)
      })
    }.bind(this))
  }

  /*
    Update a fragment record with given props

    @param {String} fragmentId fragment id
    @param {Object} props properties to update
    @returns {Promise}
  */
  updateFragment(fragmentId, props) {
    return this.fragmentExistsExists(fragmentId, props.documentId).bind(this)
      .then(function(exists) {
        if (!exists) {
          throw new Err('FragmentStore.UpdateError', {
            message: 'Fragment with fragmentId ' + fragmentId + ' does not exists'
          })
        }

        return new Promise(function(resolve, reject) {
          let fragmentData = props
          fragmentData.fragmentId = fragmentId

          this.db.fragments.save(fragmentData, function(err, fragment) {
            if (err) {
              return reject(new Err('FragmentStore.UpdateError', {
                cause: err
              }))
            }

            resolve(fragment)
          })
        }.bind(this))
      }.bind(this))
  }

  /*
    Remove a fragment from the db

    @param {String} fragmentId fragment id
    @returns {Promise}
  */
  deleteFragment(fragmentId, documentId) {
    return this.fragmentExists(fragmentId, documentId).bind(this)
      .then(function(exists) {
        if (!exists) {
          throw new Err('FragmentStore.DeleteError', {
            message: 'Fragment with fragmentId ' + fragmentId + ' does not exists'
          })
        }

        return new Promise(function(resolve, reject) {
          this.db.fragments.destroy({fragmentId: fragmentId, documentId: documentId}, function(err, fragments) {
            if (err) {
              return reject(new Err('FragmentStore.DeleteError', {
                cause: err
              }))
            }
            fragments = fragments[0]

            resolve(fragments)
          })
        }.bind(this))
      }.bind(this))
  }

  /*
    Remove all fragments asociated with given document from the db

    @param {String} documentId document id
    @returns {Promise}
  */
  deleteDocumentFragments(documentId) {
    return new Promise(function(resolve, reject) {
      this.db.fragments.destroy({documentId: documentId}, function(err, fragments) {
        if (err) {
          return reject(new Err('FragmentStore.DeleteError', {
            cause: err
          }))
        }
        fragments = fragments[0]

        resolve(fragments)
      })
    }.bind(this))
  }

  /*
    Internal method to create a fragment entry

    @param {Object} fragmentData JSON object
    @returns {Promise}
  */
  _createFragment(fragmentData) {
    let record = {
      fragmentId: fragmentData.fragmentId,
      documentId: fragmentData.documentId,
      prev: fragmentData.prev,
      next: fragmentData.next,
      content: fragmentData.content,
      annotations: fragmentData.annotations
    }

    return new Promise(function(resolve, reject) {
      this.db.fragments.insert(record, function(err, fragment) {
        if (err) {
          return reject(new Err('FragmentStore.CreateError', {
            cause: err
          }))
        }

        resolve(fragment)
      })
    }.bind(this))
  }

  /*
    Check if fragment exists

    @param {String} fragmentId fragment id
    @returns {Promise}
  */
  fragmentExists(fragmentId, documentId) {
    return new Promise(function(resolve, reject) {
      this.db.fragments.findOne({fragmentId: fragmentId, documentId: documentId}, function(err, fragment) {
        if (err) {
          return reject(new Err('FragmentStore.ReadError', {
            cause: err
          }))
        }
        resolve(!isUndefined(fragment))
      })
    }.bind(this))
  }

  /*
    List available fragments

    @param {Object} filters filters
    @param {Object} options options (limit, offset, columns)
    @returns {Promise}
  */
  listFragments(filters, options) {
    // Default limit to avoid unlimited listing
    if(!options.limit) options.limit = 100

    return new Promise(function(resolve, reject) {
      this.db.fragments.find(filters, options, function(err, fragments) {
        if (err) {
          return reject(new Err('FragmentStore.ListError', {
            cause: err
          }))
        }

        resolve(fragments)
      })
    }.bind(this))
  }

  /*
    Count available fragments
    
    @param {Object} filters filters
    @returns {Promise}
  */
  countFragmanets(filters) {
    return new Promise(function(resolve, reject) {
      this.db.fragments.count(filters, function(err, count) {
        if (err) {
          return reject(new Err('FragmentStore.CountError', {
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
    let actions = map(seed, self.createFragment.bind(self))
    return Promise.all(actions)
  }
}

module.exports = FragmentStore
