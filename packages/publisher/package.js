import PublisherLayout from './PublisherLayout'
import { BracketsPackage } from 'archivist'

export default {
  name: 'archivist-publisher',
  configure: function(config) {
    config.import(BracketsPackage)
    config.addComponent('editor', PublisherLayout)
    config.addToolGroup('references')
  }
}