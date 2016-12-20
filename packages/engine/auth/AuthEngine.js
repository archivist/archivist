let Err = require('substance').SubstanceError
let uuid = require('substance').uuid
let isEmpty = require('lodash/isEmpty')
let Promise = require('bluebird')
let bcrypt = require('bcryptjs')
let generatePassword = require('password-generator')

/*
  Implements authentication logic
*/
class AuthEngine {
  constructor(config) {
    this.userStore = config.userStore
    this.sessionStore = config.sessionStore
    this.mailer = config.mailer
  }

  requestNewUser(userData) {
    let userStore = this.userStore
    let password = generatePassword()
    let createdUser = {}
    return new Promise(function(resolve, reject) {
      bcrypt.hash(password, 10, function(err, bcryptedPassword) {
        if(err) return reject(err)
        userData.password = bcryptedPassword
        return userStore.createUser(userData).bind(this)
          .then(function(user) {
            createdUser = user
            return this._sendInvitation(user, password)
          }.bind(this))
          .then(function() {
            resolve(createdUser)
          })
          .catch(function(err) {
            reject(err)
          })
      }.bind(this))
    }.bind(this))
  }

  requestNewPassword(userId) {
    let userStore = this.userStore
    let password = generatePassword()
    let updatedUser = {}
    return new Promise(function(resolve, reject) {
      bcrypt.hash(password, 10, function(err, bcryptedPassword) {
        if(err) return reject(err)
        updatedUser.password = bcryptedPassword
        return userStore.updateUser(userId, updatedUser).bind(this)
          .then(function(user) {
            updatedUser = user
            return this._sendPasswordReset(user, password)
          }.bind(this))
          .then(function() {
            resolve(updatedUser)
          })
          .catch(function(err) {
            reject(err)
          })
      }.bind(this))
    }.bind(this))
  }

  /*
    Authenticate based on either sessionToken
  */
  authenticate(loginData) {
    if (loginData.password) {
      return this._authenticateWithPassword(loginData.email, loginData.password)
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
    Updates User's record from json object
  */
  updateUser(userId, data) {
    return this.userStore.updateUser(userId, data)
  }

  /*
    List users with given filters and options
  */
  listUsers(args) {
    let filters = !isEmpty(args.filters) ? JSON.parse(args.filters) : {}
    let options = !isEmpty(args.options) ? JSON.parse(args.options) : {}      
    let results = {}

    return this.userStore.countUsers(filters) 
      .then(count => {
        results.total = count
        return this.userStore.listUsers(filters, options)
      })
      .then(function(users) {
        results.records = users
        return results
      })
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
    Send an invitation via email
  */
  _sendInvitation(user, password) {
    return this.mailer.invite({email: user.email, password: password})
  }

   
  /*
    Send a password reset notification via email
  */
  _sendPasswordReset(user, password) {
    return this.mailer.reset({email: user.email, password: password})
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
    Authenicate based on password
  */
  _authenticateWithPassword(email, password) {
    let sessionStore = this.sessionStore
    let userStore = this.userStore
    let self = this

    return new Promise(function(resolve, reject) {
      userStore.getUserByEmail(email).then(function(user) {
        return self._checkPassword(password, user)
      }).then(function(user) {
        return self._checkAccess(user)
      }).then(function(user) {
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
    Check password
  */
  _checkPassword(suppliedPassword, user) {
    return new Promise(function(resolve, reject) {
      bcrypt.compare(suppliedPassword, user.password, function(err, doesMatch) {
        if (doesMatch) {
          resolve(user)
        } else{
          reject(new Err('AuthenticationError', {
            message: 'Wrong password'
          }))
        }
      })
    })
  }

  /*
    Check user access
  */
  _checkAccess(user) {
    return new Promise(function(resolve, reject) {
      if(user.access || user.super) {
        resolve(user)
      } else {
        reject(new Err('AuthenticationError', {
          message: 'No access, sorry'
        }))
      }
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

  /*
    Check if user has access
  */
  hasAccess(req, res, next) {
    let token = req.headers['x-access-token']
    if(!token) return res.status(403).end('forbidden')

    this.sessionStore.getSession(token).then(function(session) {
      return this.userStore.getUser(session.userId)
    }.bind(this)).then(function(user) {
      req.user = user
      if(user.access) {
        next()
      } else {
        return res.status(403).end('forbidden')
      }
    })
  }

  /*
    Check if user has super access
  */
  hasSuperAccess(req, res, next) {
    let token = req.headers['x-access-token']
    if(!token) return res.status(403).end('forbidden')

    this.sessionStore.getSession(token).then(function(session) {
      return this.userStore.getUser(session.userId)
    }.bind(this)).then(function(user) {
      req.user = user
      if(user.super) {
        next()
      } else {
        return res.status(403).end('forbidden')
      }
    })
  }
}

module.exports = AuthEngine
