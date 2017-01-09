import { Component } from 'substance'
import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
import orderBy from 'lodash/orderBy'

class ResourcesContext extends Component {

  constructor(...args) {
    super(...args)

    this.handleActions({
      'switchTab': this._switchTab
    })
  }

  getInitialState() {
    let configurator = this.props.configurator
    let contexts = configurator.getResourceTypes()

    return {
      contextId: contexts[0].id
    }
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

    let entityEntries = $$("div")
      .addClass("se-entity-entries")
      .ref('entityEntries')

    let entries = this.getEntries(resourceType)

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i]

      let EntityComp = this.getEntityRender(entry.entityType)

      entityEntries.append(
        $$(EntityComp, entry).ref(entry.entityId)
      )
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

  _switchTab(contextId) {
    this.extendState({
      contextId: contextId
    })
  }

}

export default ResourcesContext
