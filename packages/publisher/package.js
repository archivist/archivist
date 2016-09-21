import { BasePackage, PersistencePackage } from 'substance'
import InterviewPackage from '../interview/package'
import PublisherLayout from './PublisherLayout'

export default {
  name: 'archivist-publisher',
  configure: function(config) {
    // Now import base packages
    config.import(BasePackage);
    config.import(PersistencePackage);

    config.import(InterviewPackage);

    config.addComponent('editor', PublisherLayout);
  }
}