import { Configurator } from 'substance'

/*
  Archivist subconfigurator.
*/

class ArchivistSubConfigurator extends Configurator {

  constructor(...args) {
    super(...args)
    // Extend config
    this.config.context = []
    this.config.contextRenderers = []
  }

  addContext(contextName, component, defaultContext) {
    this.addComponent(contextName, component)
    this.config.context.push(contextName)
    if(defaultContext) this.config.defaultContext = contextName
  }

  getContext(contextName) {
    return this.config.components[contextName]
  }

  getDefaultContext() {
    let defaultContext = this.config.defaultContext
    return defaultContext
  }

  getContexts() {
    return this.config.context
  }

  addContextItem(rendererName, contextRenderer) {
    this.addComponent(rendererName + '-context-item', contextRenderer)
  }

  getContextItem(rendererName) {
    let name = rendererName + '-context-item'
    return this.config.components[name]
  }

}

export default ArchivistSubConfigurator
