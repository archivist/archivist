'use strict';

var SnapshotStore = require('./SnapshotStore');

module.exports = {
  name: 'snapshot-store',
  configure: function(config) {
    config.addStore('snapshot', SnapshotStore);
  }
};