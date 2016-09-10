'use strict';

var SnapshotEngine = require('substance/collab/SnapshotEngine');

module.exports = {
  name: 'snapshot-engine',
  configure: function(config) {

    var snapshotEngine = new SnapshotEngine({
      configurator: config,
      documentStore: config.getStore('document'),
      changeStore: config.getStore('change'),
      snapshotStore: config.getStore('snapshot'),
      frequency: 50
    });

    config.addEngine('snapshot', snapshotEngine);
  }
};