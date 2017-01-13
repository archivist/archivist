import { Component } from 'substance'
import forEach from 'lodash/forEach'

class ReaderContext extends Component {
  constructor(...args) {
    super(...args)

    this.contexts = {}
    
    let configurator = this.props.configurator
    let contexts = configurator.getContexts()

    forEach(contexts, function(context) {
      this.addContext(context, this.getComponent(context))
    }.bind(this))

    this.handleActions({
      'switchTab': this._switchTab
    })
  }

  didMount() {
    // TODO: loop through config
    if(this.props.time) {
      this.extendState({
        contextId: 'source'
      })
    }

    if(this.props.entityId) {
      this.extendState({
        contextId: 'resources'
      })
    }

    if(this.props.topic) {
      this.extendState({
        contextId: 'subjects'
      })
    }
  }

  willReceiveProps(newProps) {
    // TODO: loop through config
    if(newProps.time !== this.props.time && newProps.time !== undefined) {
      this._switchTab('source')
    }

    if(newProps.entityId !== this.props.entityId && newProps.entityId !== undefined) {
      this._switchTab('resources')
    }

    if(newProps.topic !== this.props.topic && newProps.topic !== undefined) {
      this._switchTab('subjects')
    }
  }

  getChildContext() {
    return {
      readerContext: this
    }
  }

  getPlayer() {
    return this.refs.player
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

  getContextProps() {
    let props = {configurator: this.props.configurator}
    return props
  }

  renderContext($$) {
    let contextName = this.getContextName()
    let Context = this.getContext(contextName)
    return $$(Context, this.props).addClass('sc-context-' + contextName).ref(contextName)
  }

  render($$) {
    let currentContextName = this.getContextName()
    let TabbedContext = this.getComponent('tabbed-context')
    let SourcePlayer = this.getComponent('source-player')
    let PlayerOverlay = $$(SourcePlayer, {
      time: this.props.time,
      currentContext: currentContextName,
      boundContext: 'source'
    }).ref('player')
    let el = $$('div').addClass('sc-context-panel')
    let tabs = []

    forEach(this.contexts, function(context, contextId) {
      tabs.push({id: contextId, name: contextId})
    })

    el.append(
      PlayerOverlay,
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
      contextId: contextId
    })
  }

}

export default ReaderContext
