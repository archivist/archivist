import PublisherLayout from './PublisherLayout'
import { BracketsPackage, TabbedContextPackage } from 'archivist'

export default {
  name: 'archivist-publisher',
  configure: function(config) {
    config.import(BracketsPackage)
    config.import(TabbedContextPackage)
    config.addComponent('editor', PublisherLayout)
    config.addToolGroup('references')
  }
}