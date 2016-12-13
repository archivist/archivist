//import {AnnotationComponent}
import PersonReference from './PersonReference'
import PersonTool from './PersonTool'
import PersonCommand from './PersonCommand'
import PersonContextItem from './PersonContextItem'

export default {
  name: 'person',
  configure: function(config) {
    config.addNode(PersonReference)
    config.addTool(PersonReference.type, PersonTool, {toolGroup: 'annotations'})
    config.addCommand(PersonReference.type, PersonCommand, { nodeType: PersonReference.type })
    config.addIcon(PersonReference.type, {'fontawesome': 'fa-address-book-o'})

    config.addContextItem('person', PersonContextItem)
  }
}