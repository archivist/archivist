var Substance = require('substance');

function initialize(doc) {
  // Index only entity references (regular annotations)
  doc.entityReferencesIndex = doc.addIndex('entityReferencesIndex', Substance.Data.Index.create({
    type: "entity_reference",
    property: "target"
  }));
}

module.exports = initialize;
