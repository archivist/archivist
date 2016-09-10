'use strict';

var CollabServer = require('./CollabServer');

module.exports = {
  name: 'collab-server',
  configure: function(config) {
    var socketServer = config.getWebSocketServer();
    var authEngine = config.getEngine('auth');
    var documentEngine = config.getEngine('document');
    var documentStore = config.getStore('document');

    var collabServer = new CollabServer({
      // every 30s a heart beat message is sent to keep
      // websocket connects alive when they are inactive
      heartbeat: 30000,
      authEngine: authEngine,
      documentEngine: documentEngine,
      documentStore: documentStore
    });
    collabServer.bind(socketServer);
  }
};