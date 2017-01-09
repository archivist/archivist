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
  }
}