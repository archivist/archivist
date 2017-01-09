let ResourceEngine = require('./ResourceEngine')

module.exports = {
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