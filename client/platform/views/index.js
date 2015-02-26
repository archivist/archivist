var _ = require("underscore")
	, layout  = require('./layout.js')
	, menu = require('./menu.js')
	, grid = require('./grid.js')
  , documents = require('./documents.js')
  , locations = require('./locations.js')
  , subjects = require('./subjects.js')
  , users = require('./users.js')
  , util = require('./util.js')

module.exports = _.extend({}, layout, menu, grid, documents, locations, subjects, users, util);