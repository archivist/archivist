import { NodeIndex, TreeIndex } from 'substance'

/**
  @class
 */
class SubjectIndex extends NodeIndex {
  constructor(doc) {
    super(doc)

    this.doc = doc
    this.index = new TreeIndex()
  }

  /**
    Selects all nodes which have a parent.
    @private
    @param {model/data/Node}
    @returns {Boolean} true if the given node should be added to the index.
   */
  select(node) {
    return node.hasParent()
  }

  _getPath(node, parentId) {
    parentId = parentId || node.parent
    let type = node.type

    return [parentId, type, node.id]
  }

  /**
    Called when a node has been created.
    @private
    @param {Node} node
   */
  create(node) {
    this.index.set(this._getPath(node), node)
  }

  /**
    Called when a node has been deleted.
    @private
    @param {Node} node
   */
  delete(node) {
    this.index.delete(this._getPath(node))
  }

  /**
    Called when a property has been updated.
    @private
    @param {Node} node
   */
  update(node, path, newValue, oldValue) {
    if (!this.select(node) || path[1] !== 'parent') return
    this.index.delete(this._getPath(node, oldValue))
    this.index.set(this._getPath(node, newValue), node)
  }

  clone() {
    return new SubjectIndex(this.doc)
  }
}

export default SubjectIndex
