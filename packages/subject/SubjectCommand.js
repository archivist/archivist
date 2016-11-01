import { AnnotationCommand, createAnnotation } from 'substance'

class SubjectCommand extends AnnotationCommand {
  isDisabled(sel) {
    // TODO: Container selections should be valid if the annotation type
    // is a container annotation. Currently we only allow property selections.
    if (sel.isContainerSelection()) {
      return false
    }
    return true
  }

  executeCreate(props, context) {
    let annos = this._getAnnotationsForSelection(props, context)
    this._checkPrecondition(props, context, annos, this.canCreate)
    let newAnno = this._applyTransform(props, context, function(tx) {
      props.node = this.getAnnotationData()
      props.node.type = this.getAnnotationType()
      return createAnnotation(tx, props)
    }.bind(this))
    
    return {
      mode: 'create',
      anno: newAnno
    }
  }
}

export default SubjectCommand