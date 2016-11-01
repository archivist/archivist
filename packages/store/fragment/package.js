let FragmentStore = require('./FragmentStore')

module.exports = {
  name: 'fragment-store',
  configure: function(config) {
    config.addStore('fragment', FragmentStore)
  }
}