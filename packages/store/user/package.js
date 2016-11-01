let UserStore = require('./UserStore')

module.exports = {
  name: 'user-store',
  configure: function(config) {
    config.addStore('user', UserStore)
  }
}