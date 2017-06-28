import { Command } from 'substance'
import IndentationCleaner from './IndentationCleaner'


class IndentationCommand extends Command {

  getCommandState() {
    return {
      disabled: false,
      active: false
    }
  }

  execute(params, context) {
    let editorSession = context.editorSession
    let indentationCleaner = new IndentationCleaner()
    editorSession.transaction(tx => {
      indentationCleaner.clean(tx, 'body')
    })
  }
}

export default IndentationCommand