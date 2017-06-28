import IndentationTool from './IndentationTool'
import IndentationCommand from './IndentationCommand'

export default {
  name: 'indentation-cleaner',
  configure: function(config) {
    config.addTool('indentation-cleaner', IndentationTool, {toolGroup: 'utils'})
    config.addCommand('indentation-cleaner', IndentationCommand)
    config.addIcon('indentation-cleaner', {'fontawesome': 'fa-dedent'})
  }
}