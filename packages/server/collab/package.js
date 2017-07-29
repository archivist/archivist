import CollabServer from './CollabServer'

export default {
  name: 'collab-server',
  configure: function(config) {
    let socketServer = config.getWebSocketServer()
    let authEngine = config.getEngine('auth')
    let indexer = config.getEngine('indexer')
    let documentEngine = config.getEngine('document')
    let documentStore = config.getStore('document')

    let collabServer = new CollabServer({
      // every 30s a heart beat message is sent to keep
      // websocket connects alive when they are inactive
      configurator: config,
      heartbeat: 30000,
      authEngine: authEngine,
      indexer: indexer,
      documentEngine: documentEngine,
      documentStore: documentStore
    })
    collabServer.bind(socketServer)
  }
}
