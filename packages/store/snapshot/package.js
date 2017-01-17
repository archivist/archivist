import SnapshotStore from './SnapshotStore'

export default {
  name: 'snapshot-store',
  configure: function(config) {
    config.addStore('snapshot', SnapshotStore)
  }
}