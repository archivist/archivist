var Substance = require("substance");
var Document = Substance.Document;

var Strong = Document.Annotation.extend({
  name: "strong"
});

Strong.static.matchElement = function(el) {
  var tagName = el.tagName.toLowerCase();
  return (tagName === 'b' || tagName === 'strong');
};

module.exports = Strong;