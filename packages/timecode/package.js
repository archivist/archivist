import { AnnotationCommand, AnnotationComponent } from 'substance'
import MediaJumperComponent from './MediaJumperComponent'
import Timecode from './Timecode'

export default {
  name: 'timecode',
  configure: function(config) {
    let parentConfig = config.getConfig()
    config.addNode(Timecode)
    if(parentConfig.isReader) {
      config.addComponent('timecode', MediaJumperComponent)
    } else {
      config.addComponent('timecode', AnnotationComponent)
    }
    config.addCommand('timecode', AnnotationCommand, { nodeType: 'timecode', commandGroup: 'annotations' })
    config.addIcon('timecode', { 'fontawesome': 'fa-clock-o' })
    config.addLabel('timecode', {
      en: 'timecode',
      ru: 'таймкод'
    })
  }
}
