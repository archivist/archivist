'use strict';

module.exports = {
  name: 'store',
  configure: function(config) {
    config.import(require('./document/package'));
    config.import(require('./change/package'));
    config.import(require('./snapshot/package'));
    config.import(require('./session/package'));
    config.import(require('./user/package'));

    // Not implemented yet
    // config.import(require('./fragment/package'));
    // config.import(require('./subject/package'));
    // config.import(require('./entity/package'));
  }
};