import { Component, ScrollPane } from 'substance'
import concat from 'lodash/concat'
import filter from 'lodash/filter'
import flattenDeep from 'lodash/flattenDeep'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'

class SubjectsContext extends Component {
  
  didMount() {
    this.buildTree()
  }

  render($$) {
    let subjects = this.state.subjects
    let subjectsPanel = $$(ScrollPane).ref('panelEl')
    let el = $$('div').addClass('sc-context-panel sc-subjects-panel').append(
      subjectsPanel
    )
    if(subjects) {
      let childNodes = subjects.getRoots()
      childNodes = sortBy(childNodes, ['position'])

      let childEls = childNodes.map(function(node) {
        return this.renderChildren($$, node, 1)
      }.bind(this))

      subjectsPanel.append(flattenDeep(childEls))
    }

    return el
  }

  buildTree() {
    let editorSession = this.context.editorSession
    let subjectsTree = editorSession.subjects
    let resources = editorSession.resources
    let subjects = filter(resources, {entityType: 'subject'})
    subjects.forEach(s => {
      subjectsTree.set([s.entityId, 'active'], true)
      let parents = subjectsTree.getParents(s.entityId)
      parents.forEach(pid => {
        subjectsTree.set([pid, 'active'], true)
      })
    })
    this.extendState({
      subjects: subjectsTree
    })
  }

  // renderFull($$) {
  //   let urlHelper = this.context.urlHelper
  //   let items = this.state.items
  //   let grid = $$(Grid)

  //   if(items) {
  //     let childNodes = items.getRoots()
  //     childNodes = sortBy(childNodes, ['position'])

  //     let childEls = childNodes.map(function(node) {
  //       return this.renderChildren($$, node, 1)
  //     }.bind(this))

  //     grid.append(flattenDeep(childEls))
  //   }

  //   return grid
  // }

  renderChildren($$, node, level) {
    let editorSession = this.context.editorSession
    let subjects = editorSession.subjects
    let isActive = node.active
    let childNodes = subjects.getChildren(node.id)
    childNodes = sortBy(childNodes, ['position'])
    let childrenEls = []

    if(isActive) {
      childrenEls = map(childNodes, function(сhildNode) {
        return this.renderChildren($$, сhildNode, level + 1)
      }.bind(this))
    
      let el = $$('div').addClass('se-tree-node se-level-' + level)
      .append(node.name)
      .ref(node.id)

      return concat(el, childrenEls);
    } else {
      return []
    }
  }
}

export default SubjectsContext
