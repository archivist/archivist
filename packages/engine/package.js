'use strict';

var StorePackage = require('../store/package');

module.exports = {
  name: 'engine',
  configure: function(config) {
    config.import(StorePackage);
    config.import(require('./document/package'));

    // Not implemented yet
    // config.import(require('./auth/package'));
    // config.import(require('./snapshot/package'));
  }
};