import { AnnotationComponent, AnnotationCommand, AnnotationTool } from 'substance'
import Xref from './Xref'
import XrefHTMLConverter from './XrefHTMLConverter'

export default {
  name: 'xref',
  configure: function(config, {
    toolGroup,
    disableCollapsedCursor
  }) {
    config.addNode(Xref)
    config.addComponent('xref', AnnotationComponent)
    config.addConverter('html', XrefHTMLConverter)

    config.addCommand('xref', AnnotationCommand, {
      nodeType: 'xref',
      disableCollapsedCursor
    })
    config.addTool('xref', AnnotationTool, {
      toolGroup: toolGroup || 'annotations'
    })
    config.addIcon('xref', { 'fontawesome': 'fa-comment'})
    config.addLabel('xref', 'Comment')
  }
}
