var Substance = require("substance");

var Document = Substance.Document;

var Emphasis = Document.Annotation.extend({
  name: "emphasis"
});

// Html import
// -----------

Emphasis.static.matchElement = function(el) {
  var tagName = el.tagName.toLowerCase();
  return (tagName === 'i' || tagName === 'em');
};

module.exports = Emphasis;
