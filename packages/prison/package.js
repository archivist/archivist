import PrisonReference from './PrisonReference'
import PrisonTool from './PrisonTool'
import PrisonComponent from './PrisonComponent'
import PrisonCommand from './PrisonCommand'
import PrisonContextItem from './PrisonContextItem'

export default {
  name: 'prison',
  configure: function(config) {
    config.addNode(PrisonReference)
    config.addTool(PrisonReference.type, PrisonTool, {toolGroup: 'annotations'})
    config.addCommand(PrisonReference.type, PrisonCommand, { nodeType: PrisonReference.type })
    config.addIcon(PrisonReference.type, {'fontawesome': 'fa-th'})
    config.addComponent('prison', PrisonComponent)
    config.addContextItem('prison', PrisonContextItem)
    config.addLabel('prison-resources', {
      en: 'Prisons',
      ru: 'Места заключения'
    })
  }
}