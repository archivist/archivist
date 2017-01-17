import { SnapshotEngine } from 'substance'

export default {
  name: 'snapshot-engine',
  configure: function(config) {

    let snapshotEngine = new SnapshotEngine({
      configurator: config,
      documentStore: config.getStore('document'),
      changeStore: config.getStore('change'),
      snapshotStore: config.getStore('snapshot'),
      frequency: 50
    })
    
    config.addEngine('snapshot', snapshotEngine)
  }
}