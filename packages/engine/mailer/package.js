let MailerEngine = require('./MailerEngine')

module.exports = {
  name: 'mailer-engine',
  configure: function(config) {
    let mailerEngine = new MailerEngine()
    config.addEngine('mailer', mailerEngine)
  }
}
