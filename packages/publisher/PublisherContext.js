import { Component } from 'substance'
import { forEach } from 'lodash-es'

class PublisherContext extends Component {
  constructor(...args) {
    super(...args)

    this.contexts = {}
    
    const configurator = this.props.configurator
    const contexts = configurator.getContexts()
    const contextMapping = configurator.getContextMapping()

    this.contextMap = contextMapping

    forEach(contexts, function(context) {
      this.addContext(context, this.getComponent(context))
    }.bind(this))

    this.handleActions({
      'switchTab': this._switchTab,
      'switchContext': this._switchContext
    })
  }

  didMount() {
    // TODO: loop through config
    // if(this.props.time) {
    //   this.extendState({
    //     contextId: 'source'
    //   })
    // }

    // if(this.props.entityId) {
    //   this.extendState({
    //     contextId: 'resources'
    //   })
    // }

    // if(this.props.topic) {
    //   this.extendState({
    //     contextId: 'subjects'
    //   })
    // }
  }

  openResource(node) {
    let mode = 'view'
    let context = this.contextMap[node.type]
    let state = {
      contextId: context,
      mode: mode,
      item: node.id
    }
    this.extendState(state)
    console.log('Open inline resource', node.id, ',', mode, 'mode')
  }

  editResource(node) {
    let mode = 'edit'
    let context = node ? this.contextMap[node.type] : 'resources'
    let state = {
      contextId: context,
      mode: mode,
      item: node ? node.id : undefined
    }
    this.extendState(state)
    if(node) {
      console.log('Edit inline resource', node.id, ',', mode, 'mode')
    } else {
      console.log('Create inline resource', ',', mode, 'mode')
    }
  }

  openComment(node) {
    let mode = 'view'
    let context = this.contextMap[node.type]
    let state = {
      contextId: context,
      mode: mode,
      item: node.id
    }
    this.extendState(state)
    console.log('View comment', node.id, ',', mode, 'mode')
  }

  editComment(node) {
    let mode = 'edit'
    let context = this.contextMap[node.type]
    let state = {
      contextId: context,
      mode: mode,
      item: node.id
    }
    this.extendState(state)
    console.log('Edit comment', node.id, ',', mode, 'mode')
  }

  toggleBracket(node, active) {
    let mode = active ? 'edit' : 'list'
    let context = this.contextMap[node.type]
    let state = {
      contextId: context,
      mode: mode
    }
    if(mode === 'edit') state.item = node.id
    this.extendState(state)
    console.log('Open container resource', node.id, ',', mode, 'mode,', node.reference)
  }

  openDefaultTab() {
    let defaultContext = this.getDefaultContext()
    if(this.getDefaultContext() !== this.getContextName()) {
      let state = {
        contextId: defaultContext,
        mode: 'list'
      }
      this.extendState(state)
    }
  }

  addContext(contextName, ContextClass) {
    this.contexts[contextName] = ContextClass
  }

  getDefaultContext() {
    let configurator = this.props.configurator
    return configurator.getDefaultContext()
  }

  getContextName() {
    let context = this.state.contextId
    return context || this.getDefaultContext()
  }

  getContext(contextName) {
    return this.contexts[contextName]
  }

  getContextByEntityType(entityType) {
    let contextName = this.contextMap[entityType]
    return this.contexts[contextName]
  }

  getContextProps() {
    let props = {
      configurator: this.props.configurator,
      mode: this.state.mode || 'list',
      item: this.state.item
    }
    return props
  }

  getContextState() {
    return this.state
  }

  renderContext($$) {
    let contextName = this.getContextName()
    let Context = this.getContext(contextName)
    return $$(Context, this.getContextProps()).ref(contextName)
  }

  render($$) {
    let currentContextName = this.getContextName()
    let TabbedContext = this.getComponent('tabbed-context')

    let el = $$('div').addClass('sc-context-panel')
    let tabs = []

    forEach(this.contexts, function(context, contextId) {
      tabs.push({id: contextId, name: contextId})
    })

    el.append(
      $$(TabbedContext, {
        tabs: tabs,
        activeTab: currentContextName
      }).ref('tabbedPane').append(
        this.renderContext($$)
      )
    )

    return el
  }

  _switchTab(contextId) {
    this.extendState({
      contextId: contextId,
      mode: 'list'
    })
  }

  _switchContext(context) {
    this.extendState(context)
  }

}

export default PublisherContext