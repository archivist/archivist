import { Command } from 'substance'
import TimecodeAnnotator from './TimecodeAnnotator'


class TimecodeAnnotatorCommand extends Command {

  getCommandState() {
    return {
      disabled: false,
      active: false
    }
  }

  execute(params, context) {
    let editorSession = context.editorSession
    let timecodeAnnotator = new TimecodeAnnotator()
    editorSession.transaction(tx => {
      timecodeAnnotator.start(tx, 'body')
    })
    // TODO: for some reasons timecodes doesn't renders visually
    // although tools recognize annotation
    // currently we are rerendering surface to see changes 
    let surfaceManager = editorSession.surfaceManager
    let surface = surfaceManager.getSurface('body')
    surface.rerender()
  }
}

export default TimecodeAnnotatorCommand