import UserServer from './UserServer'

export default {
  name: 'user-server',
  configure: function(config) {
    let server = config.getServerApp()
    let authEngine = config.getEngine('auth')

    let userServer = new UserServer({
      authEngine: authEngine,
      path: '/api/users'
    })
    userServer.bind(server)
  }
}
