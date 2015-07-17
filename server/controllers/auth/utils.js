var User = require('../../models/user.js')
  , jwt = require('express-jwt')
  , jwtLib = require('jsonwebtoken') 
  , _ = require('underscore')
  , utils = {};

// OAUTH 2

var secret = process.env.AUTH_SECRET || 'archivistSecret';

var getToken = function(req) {
	var token;
	var parts = req.headers.authorization.split(' ');
  if (parts.length == 2) {
    var scheme = parts[0];
    var credentials = parts[1];

    if (/^Bearer$/i.test(scheme)) {
      token = credentials;
      return token;
    } else {
      return false;
    }
  }
}

var isRevokedCallback = function(req, payload, done){
	var token = getToken(req);

	if(!token) return done(new Error('Bad schema, format is Authorization: Bearer [token]'));

  var issuer = payload.iss;
  User.checkTokenExistance(issuer, token, function(err, result) {
  	if (err) { return done(err); }
    return done(null, !result);
  });
};

utils.checkAuth = jwt({
  secret: secret,
  isRevoked: isRevokedCallback
});

utils.check_scopes = function(req, res, next) {
  var scopes = ['access', 'super'];
  var token = req.user;

  if (_.isEmpty(_.difference(scopes, token.scopes))) return next();

  return res.send(401, 'You have no access.');
}

utils.checkExpiration = function(req, cb) {
	var token = getToken(req);
	if(!token) return cb(new Error('Bad schema, format is Authorization: Bearer [token]'));
	var decoded = jwtLib.decode(token, {complete: true});
	var expDate = decoded.payload.exp;
	var userId = decoded.payload.iss;
	var now = Math.floor(Date.now() / 1000);
	var step = 60*60*48; // 2 days step to renew token
	if(expDate - step < now) {
		User.renewToken(userId, token, function(err, tokenData){
			cb(err, tokenData);
		});
	} else {
		cb(null)
	}
}


module.exports = utils;