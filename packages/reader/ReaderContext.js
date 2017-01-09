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
    return $$(Context, this.getContextProps()).ref(contextName)
  }

  render($$) {
    let TabbedContext = this.getComponent('tabbed-context')
    let el = $$('div').addClass('sc-context-panel')
    let currentContextName = this.getContextName()
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
      contextId: contextId
    })
  }

}

export default ReaderContext