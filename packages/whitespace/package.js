import WhitespaceTool from './WhitespaceTool'
import WhitespaceCommand from './WhitespaceCommand'

export default {
  name: 'whitespace-cleaner',
  configure: function(config) {
    config.addTool('whitespace-cleaner', WhitespaceTool, {toolGroup: 'utils'})
    config.addCommand('whitespace-cleaner', WhitespaceCommand)
    config.addIcon('whitespace-cleaner', {'fontawesome': 'fa-eraser'})
  }
}