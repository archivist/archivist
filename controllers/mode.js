var db = require('./db.js')
  , express = require('express')
  , _ = require('underscore')
  , mode = express.Router();


mode.checkCurrentMode = function(req, res, next) {
  db.getSystemVariable('maintenance', function(err, mode) {
    if (err) return next(err);
    if (!mode.on) return next();
    if (mode.on) res.send(503);
  })
}

var setMaintenance = function(req, res, next) {
  try {
    var value = JSON.parse(req.query.on),
        data = {on: value};

    data.user = value ? req.user._id : null;
    
    db.setSystemVariable('maintenance', data, function(err, variable) {
      if (err) return next(err);
      res.send(200);
    });
  } catch (e) {
    res.send(400);
  }
}

mode.route('/maintenance')
  .get(setMaintenance)

module.exports = mode;