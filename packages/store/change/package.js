'use strict';

var ChangeStore = require('./ChangeStore');

module.exports = {
  name: 'change-store',
  configure: function(config) {
    config.addStore('change', ChangeStore);
  }
};