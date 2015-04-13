var Utility = require('./util.js'),
    _ = require("underscore");

var Person = Utility.model.extend({
  urlRoot: "/api/persons",
  schema: {
    name: { type: 'Text', validators: ['required'], title: 'Name', editorAttrs: {autofocus:'autofocus'} },
    description: { type: 'TextArea', title: 'Description' },
    global: { title: 'Global', type:'Checkbox' }
  }
})
exports.person = Person

var Persons = Utility.collection.extend({
  model: Person,
  url: "/api/persons",
  state: {
    pageSize: null,
    sortKey: "name",
    order: -1,
  }
})
exports.persons = Persons