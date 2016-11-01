let DocumentStore = require('./DocumentStore')

module.exports = {
  name: 'document-store',
  configure: function(config) {
    config.addStore('document', DocumentStore)
  }
}