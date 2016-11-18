let ResourceEngine = require('./ResourceEngine')

module.exports = {
  name: 'resource-engine',
  configure: function(config) {
    let resourceEngine = new ResourceEngine({
      configurator: config,
      entityStore: config.getStore('entity')
    })

    config.addEngine('resource', resourceEngine)
  }
}