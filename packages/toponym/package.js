import ToponymReference from './ToponymReference'
import ToponymTool from './ToponymTool'
import ToponymCommand from './ToponymCommand'
import ToponymContextItem from './ToponymContextItem'

export default {
  name: 'toponym',
  configure: function(config) {
    config.addNode(ToponymReference)
    config.addTool(ToponymReference.type, ToponymTool, {toolGroup: 'annotations'})
    config.addCommand(ToponymReference.type, ToponymCommand, { nodeType: ToponymReference.type })
    config.addIcon(ToponymReference.type, {'fontawesome': 'fa-globe'})

    config.addContextItem('toponym', ToponymContextItem)
  }
}