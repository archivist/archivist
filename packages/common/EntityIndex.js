import { DocumentIndex, TreeIndex } from 'substance'
import filter from 'lodash/filter'

class EntityIndex extends DocumentIndex {
  constructor(...args) {
    super(...args)

    this.byReference = new TreeIndex()
  }

  get property() { return "reference" }

  select(node) {
    return Boolean(node._isPropertyAnnotation)
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
    this.byReference.set([anno.reference, anno.id], anno)
  }

  delete(anno) {
    this.byReference.delete([anno.reference, anno.id])
  }

  update(node, path, newValue, oldValue) {
    // TODO
  }
}

export default EntityIndex