import DocumentServer from './DocumentServer'

export default {
  name: 'document-server',
  configure: function(config) {
    let server = config.getServerApp()
    let documentEngine = config.getEngine('document')
    let indexer = config.getEngine('indexer')

    let documentServer = new DocumentServer({
      configurator: config,
      documentEngine: documentEngine,
      indexer: indexer,
      path: '/api/documents'
    })
    documentServer.bind(server)
  }
}
