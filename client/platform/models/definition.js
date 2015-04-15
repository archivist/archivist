var Utility = require('./util.js'),
    _ = require("underscore");

var Definition = Utility.model.extend({
  urlRoot: "/api/definitions",
  schema: {
    title: { type: 'Text', validators: ['required'], title: 'Title', editorAttrs: {placeholder: "Title", autofocus:'autofocus'} },
    description: { type: 'TextArea', title: 'Description', editorAttrs: {placeholder: "Enter description", rows: 17 } },
    type: { title: 'Type', type:'Select2', options:['жаргонизм', 'реалия', 'сокращение'], config: {placeholder: "Definition type", theme: "bootstrap"}}
  }
})
exports.definition = Definition

var Definitions = Utility.collection.extend({
  model: Definition,
  url: "/api/definitions",
  state: {
    pageSize: 40,
    sortKey: "updatedAt",
    order: 1,
  }
})
exports.definitions = Definitions