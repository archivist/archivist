import { Configurator } from 'substance'
import ScholarLabelProvider from './ScholarLabelProvider'

/*
  Scholar configurator.
*/

class ScholarConfigurator extends Configurator {

  constructor(...args) {
    super(...args)
    // Extend config
    this.config.configurators = {}
    this.config.pages = []
    this.config.menu = []
  }

  /*
    Set app config
  */
  setAppConfig(config) {
    this.config.app = config
  }

  /*
    Get app config
  */
  getAppConfig() {
    return this.config.app
  }

  addSeed(seed) {
    this.config.seed = seed
  }

  getSeed() {
    return this.config.seed
  }

  /*
    Set Document Server url
  */
  setDocumentServerUrl(url) {
    this.config.documentServerUrl = url
  }

  /*
    Set Resource Server url
  */
  setResourceServerUrl(url) {
    this.config.resourceServerUrl = url
  }

  /*
    Set Document Client class
  */
  setDocumentClient(DocumentClientClass) {
    this.config.DocumentClientClass = DocumentClientClass
  }

  /*
    Get Document Client instance
  */
  getDocumentClient() {
    let DocumentClientClass = this.config.DocumentClientClass;
    return new DocumentClientClass({httpUrl: this.config.documentServerUrl})
  }

  /*
    Set Resource Client class
  */
  setResourceClient(resourceClient) {
    this.config.resourceClient = resourceClient
  }

  /*
    Get Resource Client instance
  */
  getResourceClient() {
    let ResourceClientClass = this.config.resourceClient
    return new ResourceClientClass({httpUrl: this.config.resourceServerUrl})
  }

  /*
    Provision of sub configurators (e.g. editor, viewer etc
    receive their own configurator)
  */
  addConfigurator(name, configurator) {
    this.config.configurators[name] = configurator
  }

  /*
    Get sub confgiurator
  */
  getConfigurator(name) {
    return this.config.configurators[name]
  }

  addPage(pageName, component) {
    this.addComponent(pageName, component)
    this.config.pages.push(pageName)
  }

  getPages() {
    return this.config.pages
  }

  setMenuItems(menuItems) {
    this.config.menu = menuItems
  }

  getMenuItems() {
    return this.config.menu
  }

  getLabelProvider() {
    return new ScholarLabelProvider(this.config.labels, this.config.lang)
  }
}

export default ScholarConfigurator
