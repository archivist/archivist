let uuid = require('substance').uuid
let Err = require('substance').SubstanceError
let Promise = require('bluebird')

/*
  Implements authentication logic
*/
class AuthenticationEngine {
  constructor(config) {
    this.userStore = config.userStore
    this.sessionStore = config.sessionStore
    this.emailService = config.emailService
  }

  /*
    Generate new loginKey for user and send email with a link
  */
  requestLoginLink(args) {
    let userStore = this.userStore
    return userStore.getUserByEmail(args.email)
      .catch(function() {
        // User does not exist, we create a new one
        return userStore.createUser({email: args.email})
      })
      .then(this._updateLoginKey.bind(this))
      .then(function(user) {
        return this._sendLoginLink(user, args.documentId);
      }.bind(this))
  }

  /*
    Authenticate based on either sessionToken
  */
  authenticate(loginData) {
    if (loginData.loginKey) {
      return this._authenticateWithLoginKey(loginData.loginKey)
    } else {
      return this._authenticateWithToken(loginData.sessionToken)
    }
  }

  /*
    Get session by session token

    TODO: Include session expiration mechanism. If session is found but expired
    the session entry should be deleted here
  */
  getSession(sessionToken) {
    return this.sessionStore.getSession(sessionToken).then(
      this._enrichSession.bind(this)
    )
  }

  updateUserName(args) {
    let userStore = this.userStore
    return userStore.updateUser(args.userId, {name: args.name})
  }

  /*
    Generates a new login key for a given email
  */
  _updateLoginKey(user) {
    let userStore = this.userStore
    let newLoginKey = uuid()
    return userStore.updateUser(user.userId, {loginKey: newLoginKey})
  }

  /*
    Send a login link via email
  */
  _sendLoginLink(user, documentId) {
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
  }

  /*
    Creates a new session based on an existing sessionToken

    1. old session gets read
    2. if exists old session gets deleted 
    3. new session gets created for the same user
    4. rich user object gets attached
  */
  _authenticateWithToken(sessionToken) {
    let sessionStore = this.sessionStore
    let self = this

    return new Promise(function(resolve, reject) {
      sessionStore.getSession(sessionToken).then(function(session) {
        return self._enrichSession(session)
      }).then(function(richSession) {
        resolve(richSession)
      }).catch(function(err) {
        reject(new Err('AuthenticationError', {
          cause: err
        }))
      })
    })
  }

  /*
    Authenicate based on login key
  */
  _authenticateWithLoginKey(loginKey) {
    let sessionStore = this.sessionStore
    let userStore = this.userStore
    let self = this

    return new Promise(function(resolve, reject) {
      userStore.getUserByLoginKey(loginKey).then(function(user) {
        return sessionStore.createSession({userId: user.userId})
      }).then(function(newSession) {
        return self._enrichSession(newSession)
      }).then(function(richSession) {
        resolve(richSession)
      }).catch(function(err) {
        reject(new Err('AuthenticationError', {
          cause: err
        }))
      })
    })
  }

  /*
    Attached a full user object to the session record
  */
  _enrichSession(session) {
    let userStore = this.userStore
    return new Promise(function(resolve, reject) {
      userStore.getUser(session.userId).then(function(user) {
        session.user = user
        resolve(session)
      }).catch(function(err) {
        reject(new Err('AuthenticationError', {
          cause: err
        }))
      })
    })
  }
}

module.exports = AuthenticationEngine
