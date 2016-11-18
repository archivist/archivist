let ResourceServer = require('./ResourceServer')

module.exports = {
  name: 'resource-server',
  configure: function(config) {
    let server = config.getServerApp()
    let resourceEngine = config.getEngine('resource')

    let resourceServer = new ResourceServer({
      resourceEngine: resourceEngine,
      path: '/api'
    })
    resourceServer.bind(server)
  }
}
