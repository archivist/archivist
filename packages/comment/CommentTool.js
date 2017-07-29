import { AnnotationTool } from 'substance'

class CommentTool extends AnnotationTool {
  executeCommand(props) {
    let authClient = this.context.authenticationClient
    let user = authClient.getUser()
    props = Object.assign({ mode: this.props.mode, user: user.name }, props)
    this.context.commandManager.executeCommand(this.getCommandName(), props)
  }
}

export default CommentTool