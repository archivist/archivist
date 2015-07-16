var _ = require("underscore")
	, layout  = require('./layout.js')
	, menu = require('./menu.js')
	, grid = require('./grid.js')
  , documents = require('./documents.js')
  , definitions = require('./definitions.js')
  , locations = require('./locations.js')
  , persons = require('./persons.js')
  , merge = require('./merge.js')
  , subjects = require('./subjects.js')
  , users = require('./users.js')
  , util = require('./util.js')

module.exports = _.extend({}, layout, menu, grid, documents, definitions, locations, persons, merge, subjects, users, util);