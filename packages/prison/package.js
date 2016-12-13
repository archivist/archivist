import PrisonReference from './PrisonReference'
import PrisonTool from './PrisonTool'
import PrisonCommand from './PrisonCommand'
import PrisonContextItem from './PrisonContextItem'

export default {
  name: 'prison',
  configure: function(config) {
    config.addNode(PrisonReference)
    config.addTool(PrisonReference.type, PrisonTool, {toolGroup: 'annotations'})
    config.addCommand(PrisonReference.type, PrisonCommand, { nodeType: PrisonReference.type })
    config.addIcon(PrisonReference.type, {'fontawesome': 'fa-th'})

    config.addContextItem('prison', PrisonContextItem)
  }
}