let AuthEngine = require('./AuthEngine')

module.exports = {
  name: 'auth-engine',
  configure: function(config) {
    let authEngine = new AuthEngine({
      configurator: config,
      mailer: config.getEngine('mailer'),
      userStore: config.getStore('user'),
      sessionStore: config.getStore('session')
    })

    config.addEngine('auth', authEngine)
  }
}