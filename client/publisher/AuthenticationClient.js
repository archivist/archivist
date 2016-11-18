import { request } from 'substance'

/*
  HTTP client for talking with AuthenticationServer
*/

class AuthenticationClient {
  constructor(config) {
    this.config = config
    this._requests = {}
  }

  getSession() {
    return this._session
  }

  getSessionToken() {
    if (this._session) {
      return this._session.sessionToken
    } else return null
  }

  getUser() {
    if (this._session) {
      return this._session.user
    } else return null
  }

  changeName(userId, name, cb) {
    this._requests['changeName'] = userId+name

    let path = this.config.httpUrl + 'changename'
    request('POST', path, {
      userId: userId,
      name: name
    }, function(err, res) {
      // Skip if there has been another request in the meanwhile
      if (this._requestInvalid('changeName', userId+name)) return

      if (err) return cb(err)
      // We need to update user.name locally too
      this._session.user.name = name
      cb(null, res)
    }.bind(this))
  }

  /*
    Returns true if client is authenticated
  */
  isAuthenticated() {
    return Boolean(this._session)
  }

  _requestInvalid(reqName, reqParams) {
    return this._requests[reqName] !== reqParams
  }

  /*
    Authenticate user
    Logindata consists of an object (usually with login/password properties)
  */
  authenticate(loginData, cb) {
    this._requests['authenticate'] = loginData

    let path = this.config.httpUrl + 'authenticate'
    request('POST', path, loginData, function(err, hubSession) {
      // Skip if there has been another request in the meanwhile
      if (this._requestInvalid('authenticate', loginData)) return

      if (err) return cb(err)
      this._session = hubSession
      cb(null, hubSession)
    }.bind(this))
  }

  /*
    Clear user session
    TODO: this should make a logout call to the API to remove the session entry
  */
  logout(cb) {
    this._session = null
    cb(null)
  }

  /*
    Request a login link for a given email address
  */
  requestLoginLink(data, cb) {
    this._requests['requestLoginLink'] = data

    let path = this.config.httpUrl + 'loginlink'
    request('POST', path, data, function(err, res) {
      // Skip if there has been another request in the meanwhile
      if (this._requestInvalid('requestLoginLink', data)) return
      if (err) return cb(err)
      cb(null, res)
    }.bind(this))
  }

}

export default AuthenticationClient