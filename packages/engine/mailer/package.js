import MailerEngine from './MailerEngine'

export default {
  name: 'mailer-engine',
  configure: function(config) {
    let mailerEngine = new MailerEngine()
    config.addEngine('mailer', mailerEngine)
  }
}
