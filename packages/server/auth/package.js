'use strict';

var AuthServer = require('./AuthServer');

module.exports = {
  name: 'auth-server',
  configure: function(config) {
    var server = config.getServerApp();
    var authEngine = config.getEngine('auth');

    var authServer = new AuthServer({
      authEngine: authEngine,
      path: '/api/auth'
    });
    authServer.bind(server);
  }
};