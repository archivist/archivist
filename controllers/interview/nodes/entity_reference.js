var Document = require('substance').Document;

var EntityReference = Document.Annotation.extend({
  name: "entity_reference",
  properties: {
    "target": "string"
  }
});

module.exports = EntityReference;