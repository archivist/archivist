import { AnnotationCommand, AnnotationComponent, AnnotationTool } from 'substance'
import Timecode from './Timecode'

export default {
  name: 'timecode',
  configure: function(config, options) {
    options = options || {}
    config.addNode(Timecode)
    config.addComponent('timecode', AnnotationComponent)
    config.addCommand('timecode', AnnotationCommand, { nodeType: 'timecode' })
    config.addTool('timecode', AnnotationTool, {
      toolGroup: options.toolGroup || 'annotations'
    })
    config.addIcon('timecode', { 'fontawesome': 'fa-clock-o' })
    config.addLabel('timecode', {
      en: 'Timecode'
    })
  }
}
