/*
  Implements a simple AuthenticationServer we may want to
  reuse for other Substance projects.
*/
class AuthenticationServer{
  
  constructor(config) {
    this.engine = config.authEngine
    this.path = config.path
  }

  /*
    Attach this server to an express instance

    @param {String} mountPath must be something like '/api/auth/'
  */
  bind(app) {
    app.post(this.path + '/authenticate', this._authenticate.bind(this))
    app.post(this.path + '/changename', this._changename.bind(this))
  }

  /*
    Authenticate based on either sessionToken
  */
  _authenticate(req, res, next) {
    let loginData = req.body

    this.engine.authenticate(loginData).then(function(session) {
      res.json(session)
    }).catch(function(err) {
      return next(err)
    })
  }


  /*
    Change user name
  */
  _changename(req, res, next) {
    let args = req.body

    this.engine.updateUserName(args).then(function() {
      res.json({status: 'ok'})
    }).catch(function(err) {
      return next(err)
    })
  }
}

module.exports = AuthenticationServer
