import ResourcesContext from './ResourcesContext'

export default {
  name: 'archivist-reader-resources',
  configure: function(config) {
    config.addContext('resources', ResourcesContext, false)
    config.addIcon('resources', {'fontawesome': 'fa-book'})
    config.addIcon('map-link', {'fontawesome': 'fa-crosshairs'})
    config.addIcon('person-link', {'fontawesome': 'fa-address-book'})
    config.addLabel('resources', {
      en: 'Resources',
      ru: 'Указатель'
    })
    config.addLabel('resource-link', {
      en: 'Find in other documents',
      ru: 'Найти в других документах'
    })
    config.addLabel('map-link', {
      en: 'Show on map',
      ru: 'Показать на карте'
    })
    config.addLabel('person-link', {
      en: 'Find in persons index',
      ru: 'Найти в индексе персоналий'
    })
    config.addLabel('unknown-name', {
      en: 'Unknown name',
      ru: 'Название неизвестно'
    })
  }
}