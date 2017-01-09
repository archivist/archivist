import { Component } from 'substance'
import filter from 'lodash/filter'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import orderBy from 'lodash/orderBy'

class ResourcesContext extends Component {

  constructor(...args) {
    super(...args)

    this.handleActions({
      'switchTab': this._switchTab,
      'switchActive': this._switchActive
    })
  }

  didMount() {
    if(this.props.entityId) {
      this.focusResource(this.props.entityId)
    }
  }

  willReceiveProps(newProps) {
    if(newProps.entityId !== this.props.entityId && newProps.entityId !== undefined) {
      this.focusResource(newProps.entityId)
    }
  }

  didUpdate() {
    if(this.state.entityId && !this.state.noScroll) {
      this.refs.panelEl.scrollTo(this.state.entityId)
    }
  }

  getInitialState() {
    let configurator = this.props.configurator
    let contexts = configurator.getResourceTypes()

    return {
      contextId: contexts[0].id
    }
  }

  getEntry(entityId) {
    let editorSession = this.context.editorSession
    let resources = editorSession.resources

    return find(resources, function(r) { 
      return r.entityId === entityId 
    })
  }

  getEntries(entityType) {
    let editorSession = this.context.editorSession
    let resources = editorSession.resources
    let entries = filter(resources, {entityType: entityType})
    let orderedEntries = orderBy(entries, 'name', 'asc');
    
    return orderedEntries
  }

  getEntityRender(entityType) {
    let configurator = this.props.configurator
    return configurator.getContextItem(entityType)
  }

  renderContext($$, resourceType) {
    let ScrollPane = this.getComponent('scroll-pane')
    let entityId = this.state.entityId

    let entityEntries = $$("div")
      .addClass("se-entity-entries")
      .ref('entityEntries')

    let entries = this.getEntries(resourceType)

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i]

      if(entry.entityId === entityId) {
        entry.active = true
      }

      let EntityComp = this.getEntityRender(entry.entityType)
      let item = $$(EntityComp, entry).ref(entry.entityId)

      if(entry.entityId === entityId) {
        item.addClass('se-active')
      }

      entityEntries.append(item)
    }

    let el = $$('div').addClass('sc-entity-panel').append(
      $$(ScrollPane).ref('panelEl').append(
        entityEntries
      )
    )

    return el
  }

  render($$) {
    let configurator = this.props.configurator
    let contexts = configurator.getResourceTypes()
    let TabbedContext = this.getComponent('tabbed-context')
    let el = $$('div').addClass('sc-context-panel')
    let currentContextId = this.state.contextId
    let tabs = []

    forEach(contexts, function(context) {
      tabs.push({id: context.id, name: context.name})
    })

    el.append(
      $$(TabbedContext, {
        tabs: tabs,
        activeTab: currentContextId
      }).ref('tabbedPane').append(
        this.renderContext($$, currentContextId)
      )
    )

    return el
  }

  focusResource(entityId) {
    let resource = this.getEntry(entityId)

    if(resource) {
      this.setState({
        contextId: resource.entityType,
        entityId: entityId
      })
    }
  }

  _switchActive(entityType, entityId) {
    this.setState({
      contextId: entityType,
      entityId: entityId,
      noScroll: true
    })
  }

  _switchTab(contextId) {
    this.setState({
      contextId: contextId
    })
  }

}

export default ResourcesContext
