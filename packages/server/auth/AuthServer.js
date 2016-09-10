'use strict';

var oo = require('substance/util/oo');

/*
  Implements a simple AuthenticationServer we may want to
  reuse for other Substance projects.
*/
function AuthenticationServer(config) {
  this.engine = config.authEngine;
  this.path = config.path;
}

AuthenticationServer.Prototype = function() {

  /*
    Attach this server to an express instance

    @param {String} mountPath must be something like '/api/auth/'
  */
  this.bind = function(app) {
    app.post(this.path + '/loginlink', this._requestLoginLink.bind(this));
    app.post(this.path + '/authenticate', this._authenticate.bind(this));
    app.post(this.path + '/changename', this._changename.bind(this));
  };

  /*
    Generate new loginKey for user and send email with a link
  */
  this._requestLoginLink = function(req, res, next) {
    var args = req.body; // has email and docId (optional) which should be included in the login url.

    this.engine.requestLoginLink(args).then(function(result) {
      // eslint-disable-next-line
      console.log('this.engine.requestLoginLink result', result);
      res.json({status: 'ok'});
    }).catch(function(err) {
      return next(err);
    });
  };

  /*
    Authenticate based on either sessionToken
  */
  this._authenticate = function(req, res, next) {
    var loginData = req.body;

    this.engine.authenticate(loginData).then(function(session) {
      res.json(session);
    }).catch(function(err) {
      return next(err);
    });
  };


  /*
    Change user name
  */
  this._changename = function(req, res, next) {
    var args = req.body;

    this.engine.updateUserName(args).then(function() {
      res.json({status: 'ok'});
    }).catch(function(err) {
      return next(err);
    });
  };
};

oo.initClass(AuthenticationServer);

module.exports = AuthenticationServer;