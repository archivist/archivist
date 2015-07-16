var Utility = require('./util.js'),
    _ = require("underscore");

var Person = Utility.model.extend({
  urlRoot: "/api/persons",
  schema: {
    name: { type: 'Text', validators: ['required'], title: 'Name', editorAttrs: {placeholder: "Name", autofocus:'autofocus'} },
    description: { type: 'TextArea', title: 'Description', editorAttrs: {placeholder: "Type description", rows: 17} },
    global: { title: 'Global', type:'Checkbox', editorAttrs: {placeholder: "Type" }, help: 'Check if person is global' }
  }
})
exports.person = Person

var Persons = Utility.collection.extend({
  model: Person,
  url: "/api/persons",
  state: {
    pageSize: 40,
    sortKey: "updatedAt",
    order: 1,
  }
})
exports.persons = Persons