var _ = require("underscore")
  , document = require('./document.js')
  , definition = require('./definition.js')
  , location =require('./location.js')
  , person = require('./person.js')
  , subject = require('./subject.js')
  , user = require('./user.js')
  , menu = require('./menu.js')

module.exports = _.extend({}, document, definition, location, person, subject, user, menu);