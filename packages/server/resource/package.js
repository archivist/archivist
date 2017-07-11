import ResourceServer from './ResourceServer'

export default {
  name: 'resource-server',
  configure: function(config) {
    let server = config.getServerApp()
    let resourceEngine = config.getEngine('resource')
    let authEngine = config.getEngine('auth')
    let indexer = config.getEngine('indexer')
    let inspector = config.getEngine('inspector')

    let resourceServer = new ResourceServer({
      authEngine: authEngine,
      indexer: indexer,
      inspector: inspector,
      resourceEngine: resourceEngine,
      path: '/api'
    })
    resourceServer.bind(server)
  }
}
