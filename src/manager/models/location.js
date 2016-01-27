var Utility = require('./util.js');

var Prison = Utility.model.extend({
  urlRoot: "/api/locations",
  schema: {
    name: { type: 'Geocoded', validators: ['required'], editorAttrs: {placeholder: 'Name', autofocus:'autofocus'} },
    synonyms: {type:'Select2', options:[], config: {tags: true, placeholder: "Synonyms", tokenSeparators: [','], theme: "bootstrap"}, multiple: true},
    nearest_locality: { type: 'Geocoded', editorAttrs: {placeholder: 'Nearest locality'} },
    prison_type: {type:'Select2', options:['рабочий лагерь', 'пересыльный лагерь', 'штрафлагерь', 'проверочно-фильтрационный лагерь НКВД', 'тюрьма', 'лагерь военнопленных', 'концлагерь', 'ГУЛаг', 'ферма', 'учебный лагерь', 'лагерь для перемещенных лиц', 'распределительный лагерь', 'лагерь внешней команды концлагеря', 'частный дом', 'неизвестно'], config: {tags: true, placeholder: "Type", tokenSeparators: [','], theme: "bootstrap"}, multiple: true},
    country: { type: 'Text', editorAttrs: {placeholder: 'Country'} },
    description: { type: 'Htmleditor', title: 'Description' },
    point: { type:'Geocoder' },
    type: { type: 'Hidden' }
  },
  defaults: {
    type: 'prison',
    name: 'Untitled'
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
window.entities = LocationsPrisons;
exports.locationsPrisons = LocationsPrisons

var Toponym = Utility.model.extend({
  urlRoot: "/api/locations",
  schema: {
    name: { type: 'Geocoded', validators: ['required'], editorAttrs: {placeholder: 'Name', autofocus:'autofocus'} },
    current_name: { type: 'Geocoded', editorAttrs: {placeholder: 'Current name' }},
    synonyms: {type:'Select2', options:[], config: {tags: true, placeholder: "Synonyms", tokenSeparators: [','], theme: "bootstrap"}, multiple: true},
    country: { type: 'Text', editorAttrs: {placeholder: 'Country'} },
    description: { type: 'Htmleditor', title: 'Description' },
    point: { type:'Geocoder' },
    type: { type: 'Hidden' }
  },
  defaults: {
    type: 'toponym',
    name: 'Unknown'
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