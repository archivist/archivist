'use strict';

var path = require('path');
var Configurator = require('substance/util/Configurator');

function ServerConfigurator() {
  ServerConfigurator.super.apply(this, arguments);

  // Extend config
  this.config.stores = {};
  this.config.engines = {};
  this.config.styles = [];
}

ServerConfigurator.Prototype = function() {

  /*
    Set app config
  */
  this.setAppConfig = function(config) {
    this.config.app = config;
  };

  /*
    Get app config
  */
  this.getAppConfig = function() {
    return this.config.app;
  };

  this.setServerApp = function(app) {
    this.config.server = app;
  };

  this.getServerApp = function() {
    return this.config.server;
  };

  this.setWebSocketServer = function(wss) {
    this.config.wss = wss;
  };

  this.getWebSocketServer = function() {
    return this.config.wss;
  };

  /*
    Set database connection
  */
  this.setDBConnection = function(db) {
    this.config.db = db;
  };

  /*
    Get database connection
  */
  this.getDBConnection = function() {
    return this.config.db.connection;
  };

  /*
    Add store
  */
  this.addStore = function(name, StoreClass) {
    this.config.stores[name] = StoreClass;
  };

  /*
    Get store
  */
  this.getStore = function(name) {
    var db = this.getDBConnection();
    var StoreClass = this.config.stores[name];
    return new StoreClass({db: db});
  };

  /*
    Add engine
  */
  this.addEngine = function(name, engineInstance) {
    this.config.engines[name] = engineInstance;
  };

  /*
    Get engine
  */
  this.getEngine = function(name) {
    return this.config.engines[name];
  };

  this.addStyle = function() {    
    var sassFilePath = path.join.apply(this, arguments);    
    this.config.styles.push(sassFilePath);    
  };

};

Configurator.extend(ServerConfigurator);

module.exports = ServerConfigurator;