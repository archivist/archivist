import { ContainerAnnotationPackage } from 'substance'

const { ContainerAnnotationCommand } = ContainerAnnotationPackage

class CommentCommand extends ContainerAnnotationCommand {

  executeCreate(params) {
    let annos = this._getAnnotationsForSelection(params)
    this._checkPrecondition(params, annos, this.canCreate)
    let editorSession = this._getEditorSession(params)
    let annoData = this.getAnnotationData()
    annoData.type = this.getAnnotationType()
    annoData.author = params.user
    annoData.createdAt = new Date().toISOString()
    editorSession.emit('createComment', annoData)
    return {
      mode: 'create'
    }
  }

}

export default CommentCommand
