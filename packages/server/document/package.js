let DocumentServer = require('./DocumentServer')

module.exports = {
  name: 'document-server',
  configure: function(config) {
    let server = config.getServerApp()
    let documentEngine = config.getEngine('document')
    let indexer = config.getEngine('indexer')

    let documentServer = new DocumentServer({
      documentEngine: documentEngine,
      indexer: indexer,
      path: '/api/documents'
    })
    documentServer.bind(server)
  }
}
