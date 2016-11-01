let uuid = require('substance').uuid
let Err = require('substance').SubstanceError
let isUndefined = require('lodash/isUndefined')
let map = require('lodash/map')
let Promise = require('bluebird')

/*
  A simple SQL Session Store implementation
*/
class SessionStore {
  constructor(config) {
    this.config = config
    this.db = config.db
  }

  /*
    Create a session record for a given user

    @param {Object} session session object
    @returns {Promise}
  */
  createSession(session) {
    let sessionToken = session.sessionToken || uuid()

    let newSession = {
      sessionToken: sessionToken,
      created: new Date(),
      userId: session.userId
    }

    return new Promise(function(resolve, reject) {
      this.db.sessions.insert(newSession, function(err, session) {
        if (err) {
          return reject(new Err('SessionStore.CreateError', {
            cause: err
          }))
        }

        resolve(session)
      })
    }.bind(this))
  }

  /*
    Get session entry based on a session token

    @param {String} sessionToken session token
    @returns {Promise}
  */
  getSession(sessionToken) {
    return new Promise(function(resolve, reject) {
      this.db.sessions.findOne({sessionToken: sessionToken}, function(err, session) {
        if (err) {
          return reject(new Err('SessionStore.ReadError', {
            cause: err
          }))
        }

        if (!session) {
          return reject(new Err('SessionStore.ReadError', {
            message: 'No session found for token ' + sessionToken
          }))
        }

        resolve(session)
      })
    }.bind(this))
  }

  /*
    Remove session entry based with a given session token

    @param {String} sessionToken session token
    @returns {Promise}
  */
  deleteSession(sessionToken) {
    return this.sessionExists(sessionToken).bind(this)
      .then(function(exists) {
        if (!exists) {
          throw new Err('SessionStore.DeleteError', {
            message: 'Session with sessionToken ' + sessionToken + ' does not exists'
          })
        }

        return new Promise(function(resolve, reject) {
          this.db.sessions.destroy({sessionToken: sessionToken}, function(err, session) {
            if (err) {
              return reject(new Err('SessionStore.DeleteError', {
                cause: err
              }))
            }
            session = session[0]

            resolve(session)
          })
        }.bind(this))
      }.bind(this))
  }

  /*
    Check if session exists

    @param {String} sessionToken session token
    @returns {Promise}
  */
  sessionExists(sessionToken) {
    return new Promise(function(resolve, reject) {
      this.db.sessions.findOne({sessionToken: sessionToken}, function(err, session) {
        if (err) {
          reject(new Err('SessionStore.ReadError', {
            cause: err
          }))
        }
        resolve(!isUndefined(session))
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
    let actions = map(seed, self.createSession.bind(self))

    return Promise.all(actions)
  }
}

module.exports = SessionStore
