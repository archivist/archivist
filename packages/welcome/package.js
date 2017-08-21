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
      en: 'Welcome',
      ru: 'Добро пожаловать'
    })
    config.addLabel('enter-name', {
      en: 'Please enter your name',
      ru: 'Пожалуйста, укажите ваше имя'
    })
    config.addLabel('enter-name-placeholder', {
      en: 'Enter your name',
      ru: 'Введите ваше имя'
    })
    config.addLabel('enter-name-help', {
      en: 'You can change your name any time via personal menu.',
      ru: 'Вы всегда сможете изменить имя в личных настройках'
    })
    config.addLabel('continue', {
      en: 'Continue ⟶',
      ru: 'Продолжить ⟶'
    })
    config.addLabel('enter-email-placeholder', {
      en: 'Enter your email',
      ru: 'Введите ваш email'
    })
    config.addLabel('enter-password-placeholder', {
      en: '...and password',
      ru: '...и пароль'
    })
    config.addLabel('login', {
      en: 'Login',
      ru: 'Войти'
    })
  }
}
