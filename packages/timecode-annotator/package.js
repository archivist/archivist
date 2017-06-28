import TimecodeAnnotatorTool from './TimecodeAnnotatorTool'
import TimecodeAnnotatorCommand from './TimecodeAnnotatorCommand'

export default {
  name: 'timecode-annotator',
  configure: function(config) {
    config.addTool('timecode-annotator', TimecodeAnnotatorTool, {toolGroup: 'utils'})
    config.addCommand('timecode-annotator', TimecodeAnnotatorCommand)
    config.addIcon('timecode-annotator', {'fontawesome': 'fa-history'})
  }
}