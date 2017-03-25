import { Component } from 'substance'
import { find, sortBy } from 'lodash-es'

class ResourcesContext extends Component {

  // didMount() {
  //   let tocProvider = this.context.tocProvider
  //   tocProvider.on('toc:updated', this.onTOCUpdated, this)
  // }

  // dispose() {
  //   let tocProvider = this.context.tocProvider
  //   tocProvider.off(this)
  // }

  getEntries() {
    let editorSession = this.context.editorSession
    let resources = editorSession.resources
    let entries = sortBy(resources, ['entityType', 'name'])
    return entries
  }

  getEntry(refId) {
    let editorSession = this.context.editorSession
    let resources = editorSession.resources
    let entry = find(resources, r => {return r.entityId === refId})
    return entry
  }

  getEntityRender(entityType) {
    let configurator = this.props.configurator
    return configurator.getContextItem(entityType)
  }

  render($$) {
    let mode = this.props.mode
    if(mode === 'list' || mode === 'view') {
      return this.renderList($$)
    } else {
      return this.renderItem($$)
    }
  }

  renderItem($$) {
    let item = this.props.item
    let doc = this.context.doc
    
    let el = $$('div').addClass('sc-entity-panel')
    
    let node = doc.get(item)
    let refId = node.reference
    let entry = this.getEntry(refId)
    let EntityComp = this.getEntityRender(entry.entityType)

    if(EntityComp) {
      el.append(
        $$(EntityComp, entry).ref(entry.entityId)
      )
    }

    return el
  }

  renderList($$) {
    console.log(this.props)
    let ScrollPane = this.getComponent('scroll-pane')

    let entityEntries = $$("div")
      .addClass("se-entity-entries")
      .ref('entityEntries')

    let entries = this.getEntries()

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i]
      
      let EntityComp = this.getEntityRender(entry.entityType)

      if(EntityComp) {
        entityEntries.append(
          $$(EntityComp, entry).ref(entry.entityId)
        )
      }
    }

    let el = $$('div').addClass('sc-entity-panel').append(
      $$(ScrollPane).ref('panelEl').append(
        entityEntries
      )
    )
    return el
  }
}

export default ResourcesContext