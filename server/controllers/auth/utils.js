var User = require('../../models/user.js')
  , jwt = require('express-jwt')
  , utils = {};

// OAUTH 2

var secret = process.env.AUTH_SECRET || 'archivistSecret';

utils.ensureAuthenticated = jwt({
  secret: secret,
  userProperty: 'user_data'
});

utils.ensureSuperAuth = function(req, res, next) {
  if (req.isAuthenticated()) { 
    User.checkSuper(req, res, next);
  } else {
    res.redirect('/login');
  }
}


module.exports = utils;