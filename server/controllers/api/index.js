var Documents = require('./documents.js')
  , Subjects = require('./subjects.js')
  , Definitions = require('./definitions.js')
  , Locations = require('./locations.js')
  , Persons = require('./persons.js')
  , Users = require('./users.js')
  , Entities = require('./entities.js').api
  , Search = require('./search.js')
  , Public = require('./public.js')
  , Indexer = require('./indexer.js')
  , express = require('express')
  , api = express.Router();

api.use('/', Documents, Subjects, Public, Indexer, Entities, Definitions, Locations, Persons, Users, Search);

api.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.send(401, 'invalid token...');
  }
  res.status(500).send(err);
});


module.exports = api;