import DefinitionReference from './DefinitionReference'
import DefinitionTool from './DefinitionTool'
import DefinitionComponent from './DefinitionComponent'
import DefinitionCommand from './DefinitionCommand'
import DefinitionContextItem from './DefinitionContextItem'

export default {
  name: 'definition',
  configure: function(config) {
    config.addNode(DefinitionReference)
    config.addTool(DefinitionReference.type, DefinitionTool, {toolGroup: 'annotations'})
    config.addCommand(DefinitionReference.type, DefinitionCommand, { nodeType: DefinitionReference.type })
    config.addIcon(DefinitionReference.type, {'fontawesome': 'fa-book'})
    config.addComponent('definition', DefinitionComponent)
    config.addContextItem('definition', DefinitionContextItem)
    config.addLabel('definition-resources', {
      en: 'Definitions',
      ru: 'Реалии'
    })
  }
}