import ResourcesContext from './ResourcesContext'

export default {
  name: 'archivist-resources',
  configure: function(config) {
    config.addContext('resources', ResourcesContext, true)
    config.addIcon('resources', {'fontawesome': 'fa-bullseye'})
    config.addLabel('resources', {
      en: 'Resources',
      ru: 'Сущности'
    })
  }
}