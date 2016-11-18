let StorePackage = require('../store/package')

module.exports = {
  name: 'engine',
  configure: function(config) {
    config.import(StorePackage);
    config.import(require('./auth/package'))
    config.import(require('./snapshot/package'))
    config.import(require('./document/package'))
    config.import(require('./resource/package'))
  }
}