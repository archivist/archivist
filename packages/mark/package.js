import Mark from './Mark'
import MarkTool from './MarkTool'
import MarkCommand from './MarkCommand'

export default {
  name: 'mark',
  configure: function(config) {
    config.addNode(Mark)
    config.addTool(Mark.type, MarkTool)
    config.addCommand(Mark.type, MarkCommand, { nodeType: Mark.type })
    config.addIcon(Mark.type, {'fontawesome': 'fa-pencil'})
  }
}