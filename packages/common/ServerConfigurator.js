var path = require('path');
var Configurator = require('substance').Configurator;


class ServerConfigurator extends Configurator {
  constructor(...args) {
    super(...args)

    // Extend config
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

  addStyle() {    
    let sassFilePath = path.join.apply(this, arguments)
    this.config.styles.push(sassFilePath)
  }

}


module.exports = ServerConfigurator;