'use strict';

var SessionStore = require('./SessionStore');

module.exports = {
  name: 'session-store',
  configure: function(config) {
    config.addStore('session', SessionStore);
  }
};