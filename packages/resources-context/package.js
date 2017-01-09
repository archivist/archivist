import ResourcesContext from './ResourcesContext'

export default {
  name: 'archivist-reader-resources',
  configure: function(config) {
    config.addContext('resources', ResourcesContext, false)
    config.addIcon('resources', {'fontawesome': 'fa-book'})
    config.addLabel('resources', {
      en: 'Resources',
      ru: 'Указатель'
    })
  }
}