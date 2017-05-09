import { Component } from 'substance'
import { find, sortBy } from 'lodash-es'
import ResourceSelector from './ResourceSelector'

class ResourcesContext extends Component {

  constructor(...args) {
    super(...args)

    this.handleActions({
      'viewItem': this._viewItem,
      'showList': this._showList
    })
  }

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
    if(mode === 'list') {
      return this.renderList($$)
    } else if (mode === 'edit') {
      return this.renderResourceSelector($$)
    } else {
      return this.renderItem($$)
    }
  }

  renderItem($$) {
    let item = this.props.item
    let doc = this.context.doc
    
    let el = $$('div').addClass('sc-entity-panel')
    
    let header = $$('div').addClass('sc-panel-header').append(
      $$('div').addClass('sc-goback-action').append(
        this.context.iconProvider.renderIcon($$, 'goBackToList'),
        this.getLabel('goBackToResources')
      ).on('click', this._showList),
      $$('div').addClass('sc-actions').append(
        $$('div').addClass('sc-edit-action').append(
          this.context.iconProvider.renderIcon($$, 'editReference'),
          this.getLabel('editReference')
        ).on('click', this._editReference),
        $$('div').addClass('sc-remove-action').append(
          this.context.iconProvider.renderIcon($$, 'removeReference'),
          this.getLabel('removeReference')
        ).on('click', this._removeReference)
      )
    )

    el.append(header)

    let node = doc.get(item)
    let refId = node.reference
    let entry = this.getEntry(refId)
    let EntityComp = this.getEntityRender(entry.entityType)

    if(EntityComp) {
      el.append(
        $$(EntityComp, entry).addClass('se-reference-item')
          .ref(entry.entityId)
      )
    }

    return el
  }

  renderResourceSelector($$) {
    let el = $$('div').addClass('sc-entity-panel')
    
    el.append(
      $$(ResourceSelector, {configurator: this.props.configurator, node: this.props.item})
    )

    return el
  }

  renderList($$) {
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

  _showList() {
    this.extendProps({
      mode: 'list',
      item: undefined
    })
  }

  _viewItem(item) {
    this.extendProps({
      mode: 'view',
      item: item
    })
  }

  _editReference() {
    let item = this.props.item
    this.extendProps({
      mode: 'edit',
      item: item
    })
  }

  _removeReference() {
    let item = this.props.item
    let editorSession = this.context.editorSession
    editorSession.transaction(function(tx, args) {
      tx.delete(item)
      return args
    })
    this.extendProps({
      mode: 'list',
      item: undefined
    })
  }
}

export default ResourcesContext