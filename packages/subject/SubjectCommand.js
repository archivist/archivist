import { AnnotationCommand } from 'substance'

class SubjectCommand extends AnnotationCommand {
  isDisabled(sel) {
    // TODO: Container selections should be valid if the annotation type
    // is a container annotation. Currently we only allow property selections.
    if (sel.isContainerSelection()) {
      return false
    }
    return true
  }
}

export default SubjectCommand