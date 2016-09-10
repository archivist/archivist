'use strict';

var oo = require('substance/util/oo');
var uuid = require('substance/util/uuid');
var Err = require('substance/util/SubstanceError');
var Promise = require('bluebird');

/*
  Implements authentication logic
*/
function AuthenticationEngine(config) {
  this.userStore = config.userStore;
  this.sessionStore = config.sessionStore;
  this.emailService = config.emailService;
}

AuthenticationEngine.Prototype = function() {

  /*
    Generate new loginKey for user and send email with a link
  */
  this.requestLoginLink = function(args) {
    var userStore = this.userStore;
    return userStore.getUserByEmail(args.email)
      .catch(function() {
        // User does not exist, we create a new one
        return userStore.createUser({email: args.email});
      })
      .then(this._updateLoginKey.bind(this))
      .then(function(user) {
        return this._sendLoginLink(user, args.documentId);
      }.bind(this));
  };

  /*
    Authenticate based on either sessionToken
  */
  this.authenticate = function(loginData) {
    if (loginData.loginKey) {
      return this._authenticateWithLoginKey(loginData.loginKey);
    } else {
      return this._authenticateWithToken(loginData.sessionToken);
    }
  };

  /*
    Get session by session token

    TODO: Include session expiration mechanism. If session is found but expired
    the session entry should be deleted here
  */
  this.getSession = function(sessionToken) {
    return this.sessionStore.getSession(sessionToken).then(
      this._enrichSession.bind(this)
    );
  };

  this.updateUserName = function(args) {
    var userStore = this.userStore;
    return userStore.updateUser(args.userId, {name: args.name});
  };

  /*
    Generates a new login key for a given email
  */
  this._updateLoginKey = function(user) {
    var userStore = this.userStore;
    var newLoginKey = uuid();
    return userStore.updateUser(user.userId, {loginKey: newLoginKey});
  };

  /*
    Send a login link via email
  */
  this._sendLoginLink = function(user, documentId) {
    // var url = appConfig.get('server.appUrl');
    // var subject = "Your login key!";
    // var msg;

    // if (documentId) {
    //   msg = "Click the following link to edit: "+url + "/#section=note,documentId=" +documentId+",loginKey=" + user.loginKey;
    // } else {
    //   msg = "Click the following link to login: "+url + "/#loginKey=" + user.loginKey;
    // }
    // // eslint-disable-next-line
    // console.log('Message: ', msg);
    // return Mail.sendPlain(user.email, subject, msg)
    //   .then(function(info){
    //     // eslint-disable-next-line
    //     console.log(info);
    //     return {
    //       loginKey: user.loginKey
    //     };
    //   }).catch(function(err) {
    //     throw new Err('EmailError', {
    //       cause: err
    //     });
    //   });
  };

  /*
    Creates a new session based on an existing sessionToken

    1. old session gets read
    2. if exists old session gets deleted 
    3. new session gets created for the same user
    4. rich user object gets attached
  */
  this._authenticateWithToken = function(sessionToken) {
    var sessionStore = this.sessionStore;
    var self = this;

    return new Promise(function(resolve, reject) {
      sessionStore.getSession(sessionToken).then(function(session) {
        return self._enrichSession(session);
      }).then(function(richSession) {
        resolve(richSession);
      }).catch(function(err) {
        reject(new Err('AuthenticationError', {
          cause: err
        }));
      });
    });
  };

  /*
    Authenicate based on login key
  */
  this._authenticateWithLoginKey = function(loginKey) {
    var sessionStore = this.sessionStore;
    var userStore = this.userStore;
    var self = this;

    return new Promise(function(resolve, reject) {
      userStore.getUserByLoginKey(loginKey).then(function(user) {
        return sessionStore.createSession({userId: user.userId});
      }).then(function(newSession) {
        return self._enrichSession(newSession);
      }).then(function(richSession) {
        resolve(richSession);
      }).catch(function(err) {
        reject(new Err('AuthenticationError', {
          cause: err
        }));
      });
    });
  };

  /*
    Attached a full user object to the session record
  */
  this._enrichSession = function(session) {
    var userStore = this.userStore;
    return new Promise(function(resolve, reject) {
      userStore.getUser(session.userId).then(function(user) {
        session.user = user;
        resolve(session);
      }).catch(function(err) {
        reject(new Err('AuthenticationError', {
          cause: err
        }));
      });
    });
  };
};

oo.initClass(AuthenticationEngine);

module.exports = AuthenticationEngine;