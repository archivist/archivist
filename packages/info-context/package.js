import InfoContext from './InfoContext'

export default {
  name: 'archivist-reader-info',
  configure: function(config) {
    config.addContext('info', InfoContext, false)
    config.addIcon('info', {'fontawesome': 'fa-info-circle'})
    config.addLabel('info', {
      en: 'About',
      ru: 'О респонденте'
    })
    config.addLabel('expand-abstract', {
      en: 'Full version ↓',
      ru: 'Полная версия ↓'
    })
    config.addLabel('collapse-abstract', {
      en: 'Hide ↑',
      ru: 'Скрыть ↑'
    })
    config.addLabel('meta-bio-section', {
      en: 'Biography',
      ru: 'Биография'
    })
  }
}