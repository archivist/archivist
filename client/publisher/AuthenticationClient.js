import { request } from 'substance'

/*
  HTTP client for talking with AuthenticationServer
*/

class AuthenticationClient {
  constructor(config) {
    this.config = config
    this._requests = {}
  }

  request(method, url, data, cb) {
    let request = new XMLHttpRequest();
    request.open(method, url, true)
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    request.setRequestHeader('x-access-token', this.getSessionToken())
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let res = request.responseText;
        if(isJson(res)) res = JSON.parse(res);
        cb(null, res);
      } else {
        return cb(new Error('Request failed. Returned status: ' + request.status))
      }
    }

    if (data) {
      request.send(JSON.stringify(data))
    } else {
      request.send()
    }
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
    Change user name
  */
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
    Request new password for user
  */
  requestNewPassword(userId, cb) {
    this.request('GET', '/api/users/reset/' + userId, null, cb)
  }

  /*
    Create a new user
  */
  createUser(data, cb) {
    this.request('POST', '/api/users', data, cb)
  }
  /*
    Update a user (for instance revoke access)
  */
  updateUser(userId, data, cb) {
    this.request('PUT', '/api/users/' + userId, data, cb)
  }
  
  /*
    Get users from the server
  */
  listUsers(filters, options, cb) {
    let filtersRequest = encodeURIComponent(JSON.stringify(filters))
    let optionsRequest = encodeURIComponent(JSON.stringify(options))
    this.request('GET', '/api/users?filters=' + filtersRequest + '&options=' + optionsRequest, null, cb)
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
    Clear user session
    TODO: this should make a logout call to the API to remove the session entry
  */
  logout(cb) {
    this._session = null
    cb(null)
  }

}

function isJson(str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export default AuthenticationClient