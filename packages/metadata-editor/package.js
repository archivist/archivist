import { ResourceOperatorPackage } from 'archivist-js'
import MetaDataContext from './MetaDataContext'
import MetadataEditor from './MetadataEditor'

export default {
  name: 'archivist-metadata-editor',
  configure: function(config) {
    config.import(ResourceOperatorPackage)
    config.addComponent('archivist-metadata-editor', MetadataEditor)
    config.addContext('metadata', MetaDataContext, false)
    config.addIcon('collapsed', { 'fontawesome': 'fa-caret-right' })
    config.addIcon('expanded', { 'fontawesome': 'fa-caret-down' })
    config.addIcon('metadata', { 'fontawesome': 'fa-id-card-o' })
    config.addLabel('metadata', {
      en: 'Metadata',
      ru: 'Метаданные'
    })
    config.addLabel('select-none', {
      en: 'Not selected',
      ru: 'Не выбрано'
    })
  }
}
