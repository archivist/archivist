let AuthEngine = require('./AuthEngine')

module.exports = {
  name: 'auth-engine',
  configure: function(config) {
    let authEngine = new AuthEngine({
      configurator: config,
      userStore: config.getStore('user'),
      sessionStore: config.getStore('session')
    })

    config.addEngine('auth', authEngine)
  }
}