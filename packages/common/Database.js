'use strict';

var oo = require('substance/util/oo');
var massive = require('massive');
var config = require('config');
var Promise = require("bluebird");

/*
  Implements Database Conection API.
*/
function Database() {
  this.connect();
}

Database.Prototype = function() {

  /*
    Connect to the db
  */
  this.connect = function() {
    this.db_url = config.get('db_url');
    if (!this.db_url) {
      throw new Error('Could not find db connection string');
    }
    this.connection = massive.connectSync({connectionString: this.db_url});
  };

  /*
    Wipes DB and create tables
    Be careful with running this in production
    @returns {Promise}
  */
  this.reset = function() {
    return new Promise(function(resolve) {
      this.connection.reset(function(err){
        if (err) {
          // eslint-disable-next-line
          console.error(err.stack);
          process.exit(1);
        }
        resolve();
      });
    }.bind(this));
  };

  /*
    Drop DB connection.
  */

  this.shutdown = function() {
    this.connection.end();
  };

};

oo.initClass(Database);

module.exports = Database;