'use strict';

var AuthEngine = require('./AuthEngine');

module.exports = {
  name: 'auth-engine',
  configure: function(config) {
    var authEngine = new AuthEngine({
      configurator: config,
      userStore: config.getStore('user'),
      sessionStore: config.getStore('session')
    });

    config.addEngine('auth', authEngine);
  }
};