var Utility = require('./util.js');

var Prison = Utility.model.extend({
  urlRoot: "/api/locations",
  schema: {
    name: { type: 'Text', validators: ['required'], editorAttrs: {placeholder: 'Name', autofocus:'autofocus'} },
    synonyms: {type:'Select2', options:[], config: {tags: true, placeholder: "Synonyms", tokenSeparators: [',']}, multiple: true},
    nearest_locality: { type: 'Text', editorAttrs: {placeholder: 'Nearest locality'} },
    country: { type: 'Text', editorAttrs: {placeholder: 'Country'} },
    description: { type: 'TextArea', title: 'Description', editorAttrs: {placeholder: 'Description'} },
    type: { type: 'Hidden' }
  },
  defaults: {
    type: 'prison'
  }
})
exports.prison = Prison

var LocationsPrisons = Utility.collection.extend({
  model: Prison,
  url: "/api/locations/prisons",
  state: {
    pageSize: 20,
    sortKey: "_id",
    order: 1
  }
})
exports.locationsPrisons = LocationsPrisons

var Toponym = Utility.model.extend({
  urlRoot: "/api/locations",
  schema: {
    name: { type: 'Text', validators: ['required'], editorAttrs: {placeholder: 'Name', autofocus:'autofocus'} },
    current_name: { type: 'Text', editorAttrs: {placeholder: 'Current name' }},
    synonyms: {type:'Select2', options:[], config: {tags: true, placeholder: "Synonyms", tokenSeparators: [',']}, multiple: true},
    country: { type: 'Text', editorAttrs: {placeholder: 'Country'} },
    description: { type: 'TextArea', title: 'Description', editorAttrs: {placeholder: 'Description'} },
    Geocoder: {type:'Geocoder'},
    type: { type: 'Hidden' }
  },
  defaults: {
    type: 'toponym'
  }
})
exports.toponym = Toponym

var LocationsToponyms = Utility.collection.extend({
  model: Toponym,
  url: "/api/locations/toponyms",
  state: {
    pageSize: 20,
    sortKey: "_id",
    order: 1
  }
})
exports.locationsToponyms = LocationsToponyms