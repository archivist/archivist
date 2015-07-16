var User = require('../models/user.js')
  , oauth = require('./oauth.js')
  , express = require('express')
  , api = express.Router();

/* The User api */

var readUser = function(req, res, next) {
  User.get(req.params.id, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
}

var updateUser = function(req, res, next) {
  User.change(req.params.id, req.body, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
}
var listUsers = function(req, res, next) {
  User.list(req.query, function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
}

api.route('/users')
  .get(oauth.ensureSuperAuth, listUsers)

api.route('/users/:id')
  .get(oauth.ensureSuperAuth, readUser)
  .put(oauth.ensureSuperAuth, updateUser)

module.exports = api;