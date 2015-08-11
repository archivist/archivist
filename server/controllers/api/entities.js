var Location = require('../../models/location.js')
  , Person = require('../../models/person.js')
  , Definition = require('../../models/definition.js')
  , maintenance = require('../shared/maintenance.js')
  , auth = require('../auth/utils.js')
  , mongoose = require('mongoose')
  , async = require('async')
  , _ = require('underscore')
  , express = require('express')
  , api = express.Router();


/* GET ENTITIES */

var getEntities = function(entities, cb) {
  var entitiesArray = [],
      isValid = true;

  if(_.isArray(entities)) {
    entitiesArray = entities;
  } else {
    entitiesArray = entities.split(',');
  }

  _.each(entitiesArray, function(id){
    if (!mongoose.Types.ObjectId.isValid(id)) {
      isValid = false;
    }
  });

  if (isValid) {
    entitiesQuery(entitiesArray, cb);
  } else {
    cb(new Error('You pass wrong ids'))
  }
}

var entitiesQuery = function(entities, cb) {
  var query = {
    _id: {
      '$in': entities
    }
  }

  async.parallel([
    function(callback){
      Location.find(query, function (err, output) {
        if (err) return callback(err);
        callback(null, output);
      });
    },
    function(callback){
      Person.find(query, function (err, output) {
        if (err) return callback(err);
        _.each(output, function(val, i){
          output[i] = output[i].toJSON();
          output[i].type = 'person';
        })
        callback(null, output);
      });
    },
    function(callback){
      Definition.find(query, function (err, output) {
        if (err) return callback(err);
        _.each(output, function(val, i){
          output[i] = output[i].toJSON();
          output[i].type = 'definition';
        })
        callback(null, output);
      });
    }
  ],
  function(err, results){
    if (err) return cb(err);
    var result = results[0].concat(results[1],results[2]);
    cb(null, result);
  });
}

/* LIST ENTITIES */

var getAllEntities = function(query, cb) {
  var query = query || {};
  async.series([
    function(callback){
      Location.list(query, function(err, locations) {
        _.each(locations[1], function(val, i){
          locations[1][i] = val.toJSON();
          if(!_.isUndefined(val.title)) locations[1][i].name = val.title;
        });
        callback(err, locations);
      });
    },
    function(callback){
      Person.list(query, function(err, persons) {
        _.each(persons[1], function(val, i){
          persons[1][i] = val.toJSON();
          persons[1][i].type = 'person';
          if(!_.isUndefined(val.title)) persons[1][i].name = val.title;
        });
        callback(err, persons);
      });
    },
    function(callback){
      Definition.list(query, function(err, definitions) {
        _.each(definitions[1], function(val, i){
          definitions[1][i] = val.toJSON();
          definitions[1][i].type = 'definition';
          if(!_.isUndefined(val.title)) definitions[1][i].name = val.title;
        });
        callback(err, definitions);
      });
    }
  ],
  function(err, results){
    if(err) return cb(err);
    
    var entities = [{total_entries: 0},[]];
    _.each(results,function(entity){
      entities[0].total_entries += entity[0].total_entries;
      entities[1] = _.union(entities[1], entity[1]);
    })
    if(!_.isUndefined(query.sort_by)){
      entities[1] = _.sortBy(entities[1], query.sort_by);
      if(query.order == 'desc') entities[1].reverse()
    }
    cb(null, entities);
  });
}

var listEntities = function(req, res, next) {
  if(!_.isUndefined(req.query.query)){
    if(!_.isUndefined(req.query.query.synonyms)) {
      var query = JSON.parse(req.query.query.synonyms);
      req.query.query = {
        $or: [
          {synonyms: query},
          {name: query},
          {title: query}
        ]
      }
    }
  }
  getAllEntities(req.query, function(err, entities){
    if(err) return res.status(500).json(err.message);
    res.status(200).json(entities);
  });
}

/* MERGE ENTITIES */

var mergeEntities = function(req, res, next) {
  req.socket.setTimeout(800000);

  var one = req.query.one;
  var into = req.query.into;

  if (!one || !into) return res.status(500).send('You should proveide two entities!');
  if (one == into) return res.status(500).send('Entity can not merge itself!');

  findEntityById(one, function(err, model) {
    if(err) return res.status(500).send(err.message);
    model.merge(one, into, function(err){
      if (err) return next(err);
      res.json(200);
    })
  })
}

var findEntityById = function(id, cb) {
  Location.findById(id, function (err, location) {
    if (location) return cb(err, Location);
    Definition.findById(id, function (err, definition) {
      if (definition) return cb(err, Definition);
      Person.findById(id, function (err, person) {
        if (person) return cb(err, Person);
        return cb(new Error('Please provide valid entity id!'));
      });
    });
  });
}

/* ENTITIES API */

var entitiesGetter = function(req, res, next) {
  var query = req.body,
      entityIds = query.entityIds || [];

  getEntities(entityIds, function (err, output) {
    if (err) return next(err);
    res.json({results: output});
  });
}

api.route('/entities')
  .post(maintenance.checkCurrentMode, auth.checkAuth, entitiesGetter)
  .get(auth.checkAuth, auth.check_scopes, listEntities);


api.route('/entities/merge')
  .get(maintenance.checkCurrentMode, auth.checkAuth, auth.check_scopes, mergeEntities);

module.exports = {
  api: api,
  get: getEntities,
  list: getAllEntities
}