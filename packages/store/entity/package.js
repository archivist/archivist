let EntityStore = require('./EntityStore')

module.exports = {
  name: 'entity-store',
  configure: function(config) {
    config.addStore('entity', EntityStore)
  }
}