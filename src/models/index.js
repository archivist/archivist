var _ = require("underscore")
  , document = require('./document.js')
  , definition = require('./definition.js')
  , location = require('./location.js')
  , person = require('./person.js')
  , entity = require('./entity.js')
  , subject = require('./subject.js')
  , user = require('./user.js')
  , menu = require('./menu.js')

module.exports = _.extend({}, document, definition, location, person, entity, subject, user, menu);