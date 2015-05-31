var Document = require('substance').Document;

var Reference = Document.Annotation.extend({
  name: "reference"
});

module.exports = Reference;