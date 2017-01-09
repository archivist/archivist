import SourceContext from './SourceContext'

export default {
  name: 'archivist-reader-source',
  configure: function(config) {
    config.addContext('source', SourceContext, true)
    config.addIcon('source', {'fontawesome': 'fa-youtube-play'})
    config.addLabel('source', {
      en: 'Source',
      ru: 'Источник'
    })
  }
}