'use strict';

var config = require('config');
var extend = require('lodash/extend');
var ServerConfig = extend({}, config.get('server'), {env: config.util.getEnv('NODE_ENV')});
var Database = require('../common/Database');
var EnginePackage = require('../engine/package');
var DocumentServerPackage = require('./document/package');
var CollabServerPackage = require('./collab/package');

var db = new Database();

module.exports = {
  name: 'server',
  configure: function(config) {
    config.setAppConfig(ServerConfig);
    config.setDBConnection(db);
    config.import(EnginePackage);
    config.import(DocumentServerPackage);
    config.import(CollabServerPackage);
  }
};