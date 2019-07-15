import { Configurator } from 'substance'

class ServerConfigurator extends Configurator {
  constructor(...args) {
    super(...args)

    // Extend config
    this.config.configurators = {}
    this.config.stores = {}
    this.config.engines = {}
    this.config.styles = []
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

  setServerApp(app) {
    this.config.server = app
  }

  getServerApp() {
    return this.config.server
  }

  setWebSocketServer(wss) {
    this.config.wss = wss
  }

  getWebSocketServer() {
    return this.config.wss
  }

  /*
    Set database connection
  */
  setDBConnection(db) {
    this.config.db = db
  }

  /*
    Get database connection
  */
  getDBConnection() {
    return this.config.db.connection;
  }

  /*
    Add store
  */
  addStore(name, StoreClass) {
    this.config.stores[name] = StoreClass
  }

  /*
    Get store
  */
  getStore(name) {
    let db = this.getDBConnection();
    let StoreClass = this.config.stores[name]
    return new StoreClass({db: db})
  }

  /*
    Add engine
  */
  addEngine(name, engineInstance) {
    this.config.engines[name] = engineInstance
  }

  /*
    Get engine
  */
  getEngine(name) {
    return this.config.engines[name]
  }

  getDocumentEngine() {
    return this.config.engines.document
  }

  addContextItem(rendererName, contextRenderer) {
    this.addComponent(rendererName + '-context-item', contextRenderer)
  }

  /*
    Provision of sub configurators (e.g. editor, viewer etc
    receive their own configurator)
  */
  addConfigurator(name, configurator, isDefault) {
    this.config.configurators[name] = configurator
    if(isDefault) this.config.defaultConfigurator = name
  }

  /*
    Get sub confgiurator
  */
  getConfigurator(name) {
    return this.config.configurators[name]
  }

}

export default ServerConfigurator
