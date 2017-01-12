import { DocumentIndex, TreeIndex } from 'substance'

class EntityIndex extends DocumentIndex {
  constructor(...args) {
    super(...args)

    this.byReference = new TreeIndex()
  }

  get property() { return "reference" }

  select(node) {
    return Boolean(node._isPropertyAnnotation || node._isContainerAnnotation) && Boolean(node.reference)
  }

  reset(data) {
    this.byReference.clear()
    this._initialize(data)
  }

  get(refId) {
    let annotations = this.byReference[refId]
    return annotations
  }

  create(anno) {
    let isMultiReference = anno.reference.constructor === Array ? true : false
    if(isMultiReference) {
      anno.reference.forEach(ref => {
        this.byReference.set([ref, anno.id], anno)
      })
    } else {
      this.byReference.set([anno.reference, anno.id], anno)
    }
  }

  delete(anno) {
    let isMultiReference = anno.reference.constructor === Array ? true : false
    if(isMultiReference) {
      anno.reference.forEach(ref => {
        this.byReference.delete([ref, anno.id], anno)
      })
    } else {
      this.byReference.delete([anno.reference, anno.id], anno)
    }
  }

  update(node, path, newValue, oldValue) {
    // TODO
  }
}

export default EntityIndex