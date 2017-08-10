import { ToggleTool } from 'substance'

class CommentTool extends ToggleTool {
  executeCommand(props) {
    let authClient = this.context.authenticationClient
    let user = authClient.getUser()
    props = Object.assign({ mode: this.props.mode, user: user.userId }, props)
    this.context.commandManager.executeCommand(this.getCommandName(), props)
  }
}

export default CommentTool