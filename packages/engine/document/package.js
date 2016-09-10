'use strict';

var DocumentEngine = require('./DocumentEngine');

module.exports = {
  name: 'document-engine',
  configure: function(config) {
    var db = config.getDBConnection();
    var documentEngine = new DocumentEngine({
      db: db,
      configurator: config,
      documentStore: config.getStore('document'),
      changeStore: config.getStore('change'),
      snapshotEngine: config.getEngine('snapshot')
    });

    config.addEngine('document', documentEngine);
  }
};