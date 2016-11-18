import { Component, FontAwesomeIcon as Icon } from 'substance'
import forEach from 'lodash/forEach'

class PublisherContext extends Component {
  constructor(...args) {
    super(...args)

    this.contexts = {}
    
    let configurator = this.props.configurator
    let contexts = configurator.getContexts()

    forEach(contexts, function(context) {
      this.addContext(context, this.getComponent(context))
    }.bind(this))

  }

  addContext(contextName, ContextClass) {
    this.contexts[contextName] = ContextClass
  }

  getDefaultContext() {
    let configurator = this.props.configurator
    return configurator.getDefaultContext()
  }

  getContextName() {
    let context = undefined
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
    let TabbedPane = this.getComponent('tabbed-pane')
    let el = $$('div').addClass('sc-context-panel')
    let currentContextName = this.getContextName()
    let tabs = []

    forEach(this.contexts, function(context, contextId) {
      tabs.push({id: contextId, name: context.title})
    })

    el.append(
      $$(TabbedPane, {
        tabs: tabs,
        activeTab: currentContextName
      }).ref('tabbedPane').append(
        this.renderContext($$)
      )
    )



    // let toggleItems = $$('div').addClass('se-toggle-context')
    // forEach(this.contexts, function(context, contextName) {
    //   let item = $$('div').addClass('se-toggle-item').append(
    //     $$(Icon, {icon: context.icon}),
    //     $$('span').addClass('se-toggle-title').append(context.title)
    //   )

    //   if(contextName === currentContextName) item.addClass('se-active')
    //   toggleItems.append(item)
    // })

    // el.append(
    //   toggleItems,
    //   this.renderContext($$)
    // )

    return el
  }

}

export default PublisherContext