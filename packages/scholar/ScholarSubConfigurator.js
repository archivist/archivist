import { Configurator } from 'substance'
import ScholarLabelProvider from './ScholarLabelProvider'

/*
  Scholar subconfigurator.
*/

class ScholarSubConfigurator extends Configurator {

  constructor(...args) {
    super(...args)
    // Extend config
    this.config.isReader = true
    this.config.context = []
    this.config.resourceTypes = []
    this.config.contextRenderers = []
  }

  addResourceType(resourceType) {
    this.config.resourceTypes.push(resourceType)
  }

  getResourceTypes() {
    return this.config.resourceTypes
  }

  setResourceTypes(resourceTypes) {
    this.config.resourceTypes = resourceTypes
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

  getLabelProvider() {
    return new ScholarLabelProvider(this.config.labels, this.config.lang)
  }
}

export default ScholarSubConfigurator
