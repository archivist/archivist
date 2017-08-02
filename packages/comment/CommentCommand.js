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
    let anno
    editorSession.transaction((tx) => {
      anno = tx.annotate(annoData)
    })
    editorSession.emit('createComment', anno)
    return {
      mode: 'create',
      anno: anno
    }
  }

}

export default CommentCommand