import PublisherLayout from './PublisherLayout'

export default {
  name: 'archivist-publisher',
  configure: function(config) {
    // Now import base packages
    config.addComponent('editor', PublisherLayout)
    config.addToolGroup('references')
  }
}