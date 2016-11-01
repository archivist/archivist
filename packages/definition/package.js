import DefinitionReference from './DefinitionReference'
import DefinitionTool from './DefinitionTool'
import DefinitionCommand from './DefinitionCommand'
import DefinitionContextItem from './DefinitionContextItem'

export default {
  name: 'definition',
  configure: function(config) {
    config.addNode(DefinitionReference)
    config.addTool(DefinitionReference.type, DefinitionTool, {target: 'annotations'})
    config.addCommand(DefinitionReference.type, DefinitionCommand, { nodeType: DefinitionReference.type })
    config.addIcon(DefinitionReference.type, {'fontawesome': 'fa-book'})

    config.addContextItem('definition', DefinitionContextItem)
  }
}