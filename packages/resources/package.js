import ResourcesContext from './ResourcesContext'
import ResourceSelector from './ResourceSelector'
import { EntityEditorPackage, PagerPackage } from 'archivist'

export default {
  name: 'archivist-resources',
  configure: function(config) {
    config.import(PagerPackage)
    config.import(EntityEditorPackage)
    config.addComponent('resource-selector', ResourceSelector)
    config.addContext('resources', ResourcesContext, false)
    config.addIcon('resources', {'fontawesome': 'fa-bullseye'})
    config.addIcon('editEntity', {'fontawesome': 'fa-edit'})
    config.addIcon('goBackToList', {'fontawesome': 'fa-arrow-left'})
    config.addIcon('editReference', {'fontawesome': 'fa-pencil'})
    config.addIcon('removeReference', {'fontawesome': 'fa-trash'})
    config.addLabel('resources', {
      en: 'Resources',
      ru: 'Сущности'
    })
    config.addLabel('goBackToResources', {
      en: 'Resources',
      ru: 'К списку'
    })
    config.addLabel('editReference', {
      en: 'Edit',
      ru: 'Редактировать'
    })
    config.addLabel('removeReference', {
      en: 'Remove',
      ru: 'Удалить'
    })
    config.addLabel('searchPlaceholder', {
      en: 'Type to search...',
      ru: 'Поиск...'
    })
    config.addLabel('selectEntityTypeFilter', {
      en: 'Select type',
      ru: 'Выберите тип'
    })
  }
}
