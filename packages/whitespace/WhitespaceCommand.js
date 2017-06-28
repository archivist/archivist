import { Command } from 'substance'
import WhitespaceCleaner from './WhitespaceCleaner'


class WhitespaceCommand extends Command {

  getCommandState() {
    return {
      disabled: false,
      active: false
    }
  }

  execute(params, context) {
    let editorSession = context.editorSession
    let whitespaceCleaner = new WhitespaceCleaner()
    editorSession.transaction(tx => {
      whitespaceCleaner.clean(tx, 'body')
    })
  }
}

export default WhitespaceCommand