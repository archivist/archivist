'use strict';

var DocumentServer = require('./DocumentServer');

module.exports = {
  name: 'document-server',
  configure: function(config) {
    var server = config.getServerApp();
    var documentEngine = config.getEngine('document');

    var documentServer = new DocumentServer({
      documentEngine: documentEngine,
      path: '/api/documents'
    });
    documentServer.bind(server);
  }
};