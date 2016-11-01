import { ResponsiveApplication } from 'substance'
import cloneDeep from 'lodash/cloneDeep'
import isNull from 'lodash/isNull'

/*
  Abstract Application class.
*/

class AbstractApplication extends ResponsiveApplication {

  constructor(...args) {
    super(...args)

    this.handleActions({
      'logout': this._logout,
      'userSessionUpdated': this._updateUserSession
    })
  }

  willUpdateState(newState) {
    if(isNull(newState.userSession)) {
      this.navigate({page: this.getLoginPage()})
    }
  }

  /*
    Gets default app route.
  */
  getDefaultPage() {
    throw new Error("This method is abstract.")
  }

  /*
    Gets login route.
  */
  getLoginPage() {
    throw new Error("This method is abstract.")
  }

  /*
    Gets application router.
  */
  getRouter() {
    throw new Error("This method is abstract.")
  }

  /*
    Used to navigate the app based on given route.
    Example route: {documentId: '12345'}

    Performs authentication before routing.
  */
  navigate(route, opts) {
    let loginData = this._getLoginData(route)
    
    this._authenticate(loginData, function(err, userSession) {
      if (err) {
        console.error(err)
        route = {page: this.getLoginPage()}
      }

      // Patch route not to include loginKey for security reasons
      delete route.loginKey

      // Call hook to change route depends on userSession properties
      route = this._onAuthentication(route, userSession)

      this.extendState({
        route: route,
        userSession: userSession
      })

      this.router.writeRoute(route, opts)
    }.bind(this))
  }

  _getPageProps() {
    let props = cloneDeep(this.state.route)
    delete props.page
    props.mobile = this.state.mobile
    props.userSession = this.state.userSession
    return props
  }

  /*  
    Authenticate based on loginData object

    Returns current userSession if no loginData is given.
  */
  _authenticate(loginData, cb) {
    if (!loginData) return cb(null, this.state.userSession)
    this.authenticationClient.authenticate(loginData, function(err, userSession) {
      if (err) {
        window.localStorage.removeItem('sessionToken')
        return cb(err)
      }
      this._setSessionToken(userSession.sessionToken)
      cb(null, userSession)
    }.bind(this))
  }

  /*
    Used for session inspection and returning changed route.
  */
  // eslint-disable-next-line
  _onAuthentication(route, session) {
    // Inspect session here
    return route
  }

  /*
    Retrieves login data

    Returns login key either session token of logged in user.
  */
  _getLoginData(route) {
    let loginKey = route.loginKey
    let storedToken = this._getSessionToken()
    let loginData

    if (loginKey) {
      loginData = {loginKey: loginKey}
    } else if (storedToken && !this.state.userSession) {
      loginData = {sessionToken: storedToken}
    }
    return loginData
  }

  /*
    Store session token in localStorage.
  */
  _setSessionToken(sessionToken) {
    window.localStorage.setItem('sessionToken', sessionToken)
  }

  /*
    Retrieve last session token from localStorage.
  */
  _getSessionToken() {
    return window.localStorage.getItem('sessionToken')
  }

  /*
    Update user session with new data, for example new user name.
  */
  _updateUserSession(userSession) {
    this.extendState({
      userSession: userSession
    })

    this.navigate({page: this.getDefaultPage()})
  }

  /*
    Logout, e.g. forget current user session.
  */
  _logout() {
    this.authenticationClient.logout(function(err) {
      if (err) throw err

      window.localStorage.removeItem('sessionToken')

      this.extendState({
        userSession: null
      });
    }.bind(this))
  }

}

export default AbstractApplication