let CollabServer = require('./CollabServer')

module.exports = {
  name: 'collab-server',
  configure: function(config) {
    let socketServer = config.getWebSocketServer()
    let authEngine = config.getEngine('auth')
    let documentEngine = config.getEngine('document')
    let documentStore = config.getStore('document')

    let collabServer = new CollabServer({
      // every 30s a heart beat message is sent to keep
      // websocket connects alive when they are inactive
      heartbeat: 30000,
      authEngine: authEngine,
      documentEngine: documentEngine,
      documentStore: documentStore
    })
    collabServer.bind(socketServer)
  }
}
