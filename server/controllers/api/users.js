var User = require('../../models/user.js')
  , auth = require('../auth/utils.js')
  , express = require('express')
  , api = express.Router();

api.use(auth.checkAuth);

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

var getUserStatus = function(req, res, next) {
  auth.checkExpiration(req, function(err, token) {
    if(err) return res.status(500).send('Token renewing crashed.');
    if(token) {
      res.status(200).json(token);
    } else {
      res.status(200).json({validSession: true});
    }
  })
};

api.route('/users')
  .get(auth.check_scopes, listUsers);

api.route('/users/status')
  .get(getUserStatus);

api.route('/users/:id')
  .get(auth.check_scopes, readUser)
  .put(auth.check_scopes, updateUser);

module.exports = api;