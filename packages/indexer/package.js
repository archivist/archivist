import Indexer from './Indexer'

export default {
  name: 'archivist-indexer',
  configure: function(config) {
    let db = config.getDBConnection()
    let indexer = new Indexer({
      db: db,
      configurator: config,
      documentEngine: config.getEngine('document'),
      snapshotEngine: config.getEngine('snapshot'),
      fragmentStore: config.getStore('fragment')
    })

    config.addEngine('indexer', indexer)
  }
}