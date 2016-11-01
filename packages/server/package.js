let config = require('config')
let extend = require('lodash/extend')
let ServerConfig = extend({}, config.get('server'), {env: config.util.getEnv('NODE_ENV')})
let Database = require('../common/Database')
let EnginePackage = require('../engine/package')
var IndexerPackage = require('../indexer/package')
let AuthServerPackage = require('./auth/package')
let CollabServerPackage = require('./collab/package')
let DocumentServerPackage = require('./document/package')

let db = new Database()

let InterviewPackage = require('./interview')

module.exports = {
  name: 'server',
  configure: function(config) {
    config.setAppConfig(ServerConfig)
    config.setDBConnection(db)
    config.import(InterviewPackage)
    config.import(EnginePackage)
    config.import(IndexerPackage)
    config.import(DocumentServerPackage)
    config.import(AuthServerPackage)
    config.import(CollabServerPackage)
  }
}
