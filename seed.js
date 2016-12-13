'use strict';

var Database = require('./packages/common/Database');
var Configurator = require('./packages/common/ServerConfigurator');
var StorePackage = require('./packages/store/package');

var db = new Database();
var configurator = new Configurator().import(StorePackage);

if (process.argv[2] === 'dev') {
  var seed = require('../data/devSeed');
  // eslint-disable-next-line
  console.log('Development seeding...');

  db.reset() // Clear the database, set up the schema
    .then(function() {
      // We should drop connection and establish it again,
      // so massive will have new tables attached
      db.shutdown();
      db = new Database();
      configurator.setDBConnection(db);
      var userStore = configurator.getStore('user');
      return userStore.seed(seed.users);
    }).then(function() {
      var sessionStore = configurator.getStore('session');
      return sessionStore.seed(seed.sessions);
    }).then(function() {
      var entityStore = configurator.getStore('entity');
      return entityStore.seed(seed.entities);
    }).then(function() {
      var documentStore = configurator.getStore('document');
      return documentStore.seed(seed.documents);
    }).then(function() {
      var changeStore = configurator.getStore('change');
      return changeStore.seed(seed.changes);
    }).then(function() {
      // eslint-disable-next-line
      console.log('Done seeding.');
      db.shutdown();
    });
} else {
  db.reset()
    .then(function() {
      // eslint-disable-next-line
      console.log('Done seeding.');
      db.shutdown();
    });
}