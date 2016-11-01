let ChangeStore = require('./ChangeStore')

module.exports = {
  name: 'change-store',
  configure: function(config) {
    config.addStore('change', ChangeStore)
  }
}