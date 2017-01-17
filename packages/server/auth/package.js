import AuthServer from './AuthServer'

export default {
  name: 'auth-server',
  configure: function(config) {
    let server = config.getServerApp()
    let authEngine = config.getEngine('auth')

    let authServer = new AuthServer({
      authEngine: authEngine,
      path: '/api/auth'
    })
    authServer.bind(server)
  }
}
