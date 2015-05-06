var Reference = require('substance/article').nodes.Reference;

var EntityReference = Reference.extend({
  name: "entity_reference",
  properties: {
    "target": "string"
  }
});

module.exports = EntityReference;