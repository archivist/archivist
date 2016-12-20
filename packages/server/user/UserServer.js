let Err = require('substance').SubstanceError
let isEmpty = require('lodash/isEmpty')

/*
  UserServer module. Can be bound to an express instance
*/
class UserServer {
  constructor(config) {
    this.authEngine = config.authEngine
    this.path = config.path
  }

  /*
    Attach this server to an express instance
  */
  bind(app) {
    // users api
    app.post(this.path, this.authEngine.hasSuperAccess.bind(this.authEngine), this._createUser.bind(this))
    app.get(this.path, this.authEngine.hasSuperAccess.bind(this.authEngine), this._listUsers.bind(this))
    app.get(this.path + '/reset/:id', this.authEngine.hasSuperAccess.bind(this.authEngine), this._resetUserPassword.bind(this))
    app.put(this.path + '/:id', this.authEngine.hasSuperAccess.bind(this.authEngine), this._updateUser.bind(this))
  }

  _createUser(req, res, next) {
    let userData = req.body

    return this.authEngine.requestNewUser(userData)
      .then(function(user) {
        res.json(user)
      }).catch(function(err) {
        return next(err)
      })
  }

  _updateUser(req, res, next) {
    let userId = req.params.id
    let data = req.body
    return this.authEngine.updateUser(userId, data)
      .then(function(user) {
        res.json(user)
      }).catch(function(err) {
        return next(err)
      })
  }

  _listUsers(req, res, next) {
    let args = req.query
    
    this.authEngine.listUsers(args)
      .then(function(users) {
        res.json(users)
      })
      .catch(function(err) {
        next(err)
      })
  }

  _resetUserPassword(req, res, next) {
    let userId = req.params.id;

    return this.authEngine.requestNewPassword(userId)
      .then(function(user) {
        res.json(user)
      }).catch(function(err) {
        return next(err)
      })
  }
}

module.exports = UserServer
