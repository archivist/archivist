'use strict';

var Database = require('./Database');
var db = new Database();

db.reset()
  .then(function() {
    // eslint-disable-next-line
    console.log('Done seeding.');
    db.shutdown();
  });