var Location = require('../../models/location.js')
  , maintenance = require('../shared/maintenance.js')
  , auth = require('../auth/utils.js')
  , resourcesMapCache = require('./entities').cache
  , getReferences = require('./entities').references
  , util = require('./utils.js')
  , _ = require('underscore')
  , express = require('express')
  , api = express.Router();


/* The Location REST api */

var createLocation = function(req, res, next) {
  Location.add(req.body, req.user, function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
}

var readLocation = function(req, res, next) {
  Location.getRecord(req.params.id, function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
}

var updateLocation = function(req, res, next) {
  Location.change(req.params.id, req.body, req.user, function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
}

var deleteLocation = function(req, res, next) {
  Location.delete(req.params.id, function(err) {
    if (err) return next(err);
    res.json(200);
  });
}

var listLocations = function(req, res, next) {
  Location.list(req.query, function(err, locations) {
    if (err) return next(err);
    res.json(locations);
  });
}

var listPrisonLocations = function(req, res, next) {
  req.query.query = util.reduceQuery(req.query.query, {type: 'prison'});
  Location.list(req.query, function(err, locations) {
    if (err) return next(err);
    resourcesMapCache.get(function(err, resources) {
      if(err) return next(err);
      _.each(locations[1], function(entity, id) {
        locations[1][id] = entity.toJSON();
        locations[1][id].docCounter = resources[entity._id] ? resources[entity._id].length : 0;
      });
      res.json(locations);
    });
  });
}

var listToponymLocations = function(req, res, next) {
  req.query.query = util.reduceQuery(req.query.query, {type: 'toponym'});
  Location.list(req.query, function(err, locations) {
    if (err) return next(err);
    resourcesMapCache.get(function(err, resources) {
      if(err) return next(err);
      _.each(locations[1], function(entity, id) {
        locations[1][id] = entity.toJSON();
        locations[1][id].docCounter = resources[entity._id] ? resources[entity._id].length : 0;
      });
      res.json(locations);
    });
  });
}

var getLocationReferences = function(req, res, next) {
  var id = req.params.id;
  getReferences(id, function(err, docs){
    if(err) return next(err);
    res.json([{total_entries: docs.length}, docs]);
  })
}


api.route('/locations')
  .post(maintenance.checkCurrentMode, auth.checkAuth, createLocation)
  .get(listLocations)

api.route('/locations/prisons')
  .get(listPrisonLocations)

api.route('/locations/toponyms')
  .get(listToponymLocations)

api.route('/locations/:id')
  .get(maintenance.checkCurrentMode, readLocation)
  .put(maintenance.checkCurrentMode, auth.checkAuth, updateLocation)
  .delete(maintenance.checkCurrentMode, auth.checkAuth, auth.check_scopes, deleteLocation)

api.route('/locations/:id/references')
  .get(getLocationReferences)
  
module.exports = api;