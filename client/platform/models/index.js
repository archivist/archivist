var _ = require("underscore")
  , document = require('./document.js')
  , subject = require('./subject.js')
  , user = require('./user.js')
  , menu = require('./menu.js')

module.exports = _.extend({}, document, subject, user, menu);