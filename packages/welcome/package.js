import Welcome from './Welcome'
import UserSettings from './UserSettings'
import EnterName from './EnterName'

export default {
  name: 'welcome',
  configure: function(config) {
    config.addPage('welcome', Welcome)
    config.addPage('user-settings', UserSettings)
    config.addPage('entername', EnterName)

    config.addIcon('continue', { 'fontawesome': 'fa-long-arrow-right' });
    

    config.addLabel('welcome', {
      en: 'Welcome'
    })
    config.addLabel('enter-name', {
      en: 'Please enter your name'
    })
    config.addLabel('enter-name-placeholder', {
      en: 'Enter your name'
    })
    config.addLabel('enter-name-help', {
      en: 'You can change your name any time via personal menu.',
    })
    config.addLabel('continue', {
      en: 'Continue ⟶'
    })
    config.addLabel('enter-email-placeholder', {
      en: 'Enter your email'
    })
    config.addLabel('enter-password-placeholder', {
      en: '...and password'
    })
    config.addLabel('login', {
      en: 'Login'
    })
  }
}
