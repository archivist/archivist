var Documents = require('./documents.js')
  , Subjects = require('./subjects.js')
  , Definitions = require('./definitions.js')
  , Locations = require('./locations.js')
  , Persons = require('./persons.js')
  , Users = require('./users.js')
  , Entities = require('./entities.js')
  , Search = require('./search.js')
  , express = require('express')
  , api = express.Router();

api.use('/', Documents, Subjects, Definitions, Locations, Persons, Users, Entities, Search);

api.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.send(401, 'invalid token...');
  }
  res.status(500).send(err);
});


module.exports = api;