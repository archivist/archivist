import AuthEngine from './AuthEngine'

export default {
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