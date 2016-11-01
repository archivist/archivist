import { Configurator } from 'substance'

/*
  Archivist configurator.
*/

class ArchivistConfigurator extends Configurator {

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
    Set Authentication Server url
  */
  setAuthenticationServerUrl(url) {
    this.config.authenticationServerUrl = url
  }

  /*
    Set Document Server url
  */
  setDocumentServerUrl(url) {
    this.config.documentServerUrl = url
  }

  /*
    Set File Server url
  */
  setFileServerUrl(url) {
    this.config.fileServerUrl = url
  }

  /*
    Set File Client class
  */
  setFileClient(fileClient) {
    this.config.fileClient = fileClient
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
    var DocumentClientClass = this.config.DocumentClientClass;
    return new DocumentClientClass({httpUrl: this.config.documentServerUrl})
  }

  /*
    Set Authentication Client class
  */
  setAuthenticationClient(AuthenticationClientClass) {
    this.config.AuthenticationClientClass = AuthenticationClientClass
  }

  /*
    Get Authentication Client instance
  */
  getAuthenticationClient() {
    var AuthenticationClientClass = this.config.AuthenticationClientClass
    return new AuthenticationClientClass({httpUrl: this.config.authenticationServerUrl})
  }

  /*
    Get File Client instance
  */
  getFileClient() {
    var FileClientClass = this.config.fileClient
    return new FileClientClass({httpUrl: this.config.fileServerUrl})
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

}

export default ArchivistConfigurator
