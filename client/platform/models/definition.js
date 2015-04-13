var Utility = require('./util.js'),
    _ = require("underscore");

var Definition = Utility.model.extend({
  urlRoot: "/api/definitions",
  schema: {
    title: { type: 'Text', validators: ['required'], title: 'Title', editorAttrs: {autofocus:'autofocus'} },
    description: { type: 'TextArea', title: 'Description' },
    type: { title: 'Type', type:'Select2', options:['жаргонизм', 'реалия', 'сокращение'], config: {placeholder: "Synonyms", tokenSeparators: [','], theme: "bootstrap"}, multiple: true}
  }
})
exports.definition = Definition

var Definitions = Utility.collection.extend({
  model: Definition,
  url: "/api/definitions",
  state: {
    pageSize: null,
    sortKey: "name",
    order: -1,
  }
})
exports.definitions = Definitions