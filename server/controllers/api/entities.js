var Location = require('../../models/location.js')
  , Person = require('../../models/person.js')
  , Definition = require('../../models/definition.js')
  , maintenance = require('../shared/maintenance.js')
  , oauth = require('../auth/oauth.js')
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
  async.series([
    function(callback){
      Location.list(req.query, function(err, locations) {
        callback(err, locations);
      });
    },
    function(callback){
      Person.list(req.query, function(err, persons) {
        callback(err, persons);
      });
    },
    function(callback){
      Definition.list(req.query, function(err, definitions) {
        callback(err, definitions);
      });
    }
  ],
  function(err, results){
    if(err) return res.status(500).json(err.message);
    
    var entities = [{total_entries: 0},[]];
    _.each(results,function(entity){
      entities[0].total_entries += entity[0].total_entries;
      entities[1] = _.union(entities[1], entity[1]);
    })
    _.each(entities[1], function(entity, id) {
      entities[1][id] = entity.toJSON();
      if(!_.isUndefined(entity.title)) entities[1][id].name = entity.title;
    });
    if(!_.isUndefined(req.query.sort_by)){
      entities[1] = _.sortBy(entities[1], req.query.sort_by);
      if(req.query.order == 'desc') entities[1].reverse()
    }
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
  .post(maintenance.checkCurrentMode, entitiesGetter)
  .get(oauth.ensureSuperAuth, listEntities)


api.route('/entities/merge')
  .get(maintenance.checkCurrentMode, oauth.ensureSuperAuth, mergeEntities)

module.exports = api;