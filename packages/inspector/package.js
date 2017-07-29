import Inspector from './Inspector'

export default {
  name: 'archivist-indexer',
  configure: function(config) {
    let db = config.getDBConnection()
    let inspector = new Inspector({
      db: db,
      configurator: config,
      documentEngine: config.getEngine('document')
    })

    config.addEngine('inspector', inspector)
  }
}