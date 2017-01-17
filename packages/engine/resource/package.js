import ResourceEngine from './ResourceEngine'

export default {
  name: 'resource-engine',
  configure: function(config) {
    let db = config.getDBConnection()
    let resourceEngine = new ResourceEngine({
      db: db,
      configurator: config,
      entityStore: config.getStore('entity')
    })

    config.addEngine('resource', resourceEngine)
  }
}