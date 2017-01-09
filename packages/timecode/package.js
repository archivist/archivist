import { AnnotationCommand, AnnotationComponent, AnnotationTool } from 'substance'
import MediaJumperComponent from './MediaJumperComponent'
import Timecode from './Timecode'

export default {
  name: 'timecode',
  configure: function(config, options) {
    let parentConfig = config.getConfig()
    options = options || {}
    config.addNode(Timecode)
    if(parentConfig.isReader) {
      config.addComponent('timecode', MediaJumperComponent)
    } else {
      config.addComponent('timecode', AnnotationComponent)
    }
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
