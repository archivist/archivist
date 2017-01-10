let DocumentEngine = require('./DocumentEngine')

module.exports = {
  name: 'document-engine',
  configure: function(config) {
    let db = config.getDBConnection()
    let documentEngine = new DocumentEngine({
      db: db,
      configurator: config,
      snapshotFrequency: 50,
      documentStore: config.getStore('document'),
      changeStore: config.getStore('change'),
      snapshotStore: config.getStore('snapshot')
    })

    config.addEngine('document', documentEngine)
  }
}