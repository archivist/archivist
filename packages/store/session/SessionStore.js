'use strict';

var oo = require('substance/util/oo');
var uuid = require('substance/util/uuid');
var Err = require('substance/util/SubstanceError');
var isUndefined = require('lodash/isUndefined');
var map = require('lodash/map');
var Promise = require('bluebird');

/*
  A simple SQL Session Store implementation
*/
function SessionStore(config) {
  this.config = config;
  this.db = config.db;
}

SessionStore.Prototype = function() {

  /*
    Create a session record for a given user

    @param {Object} session session object
    @returns {Promise}
  */
  this.createSession = function(session) {
    var sessionToken = session.sessionToken || uuid();

    var newSession = {
      sessionToken: sessionToken,
      created: new Date(),
      userId: session.userId
    };

    return new Promise(function(resolve, reject) {
      this.db.sessions.insert(newSession, function(err, session) {
        if (err) {
          return reject(new Err('SessionStore.CreateError', {
            cause: err
          }));
        }

        resolve(session);
      });
    }.bind(this));
  };

  /*
    Get session entry based on a session token

    @param {String} sessionToken session token
    @returns {Promise}
  */
  this.getSession = function(sessionToken) {
    return new Promise(function(resolve, reject) {
      this.db.sessions.findOne({sessionToken: sessionToken}, function(err, session) {
        if (err) {
          return reject(new Err('SessionStore.ReadError', {
            cause: err
          }));
        }

        if (!session) {
          return reject(new Err('SessionStore.ReadError', {
            message: 'No session found for token ' + sessionToken
          }));
        }

        resolve(session);
      });
    }.bind(this));
  };

  /*
    Remove session entry based with a given session token

    @param {String} sessionToken session token
    @returns {Promise}
  */
  this.deleteSession = function(sessionToken) {
    return this.sessionExists(sessionToken).bind(this)
      .then(function(exists) {
        if (!exists) {
          throw new Err('SessionStore.DeleteError', {
            message: 'Session with sessionToken ' + sessionToken + ' does not exists'
          });
        }

        return new Promise(function(resolve, reject) {
          this.db.sessions.destroy({sessionToken: sessionToken}, function(err, session) {
            if (err) {
              return reject(new Err('SessionStore.DeleteError', {
                cause: err
              }));
            }
            session = session[0];

            resolve(session);
          });
        }.bind(this));
      }.bind(this));
  };

  /*
    Check if session exists

    @param {String} sessionToken session token
    @returns {Promise}
  */
  this.sessionExists = function(sessionToken) {
    return new Promise(function(resolve, reject) {
      this.db.sessions.findOne({sessionToken: sessionToken}, function(err, session) {
        if (err) {
          reject(new Err('SessionStore.ReadError', {
            cause: err
          }));
        }
        resolve(!isUndefined(session));
      });
    }.bind(this));
  };

  /*
    Resets the database and loads a given seed object

    Be careful with running this in production

    @param {Object} seed JSON object
  */
  this.seed = function(seed) {
    var self = this;
    var actions = map(seed, self.createSession.bind(self));

    return Promise.all(actions);
  };
};

oo.initClass(SessionStore);

module.exports = SessionStore;