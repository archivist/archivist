var _ = require("underscore")
  , document = require('./document.js')
  , location =require('./location.js')
  , subject = require('./subject.js')
  , user = require('./user.js')
  , menu = require('./menu.js')

module.exports = _.extend({}, document, location, subject, user, menu);