let ResourceServer = require('./ResourceServer')

module.exports = {
  name: 'resource-server',
  configure: function(config) {
    let server = config.getServerApp()
    let resourceEngine = config.getEngine('resource')
    let indexer = config.getEngine('indexer')

    let resourceServer = new ResourceServer({
      indexer: indexer,
      resourceEngine: resourceEngine,
      path: '/api'
    })
    resourceServer.bind(server)
  }
}
