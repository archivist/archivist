import { BasePackage, PersistencePackage } from 'substance'
import PublisherLayout from './PublisherLayout'

export default {
  name: 'archivist-publisher',
  configure: function(config) {
    // Now import base packages
    config.import(BasePackage)
    config.import(PersistencePackage)
    config.addComponent('editor', PublisherLayout)
  }
}