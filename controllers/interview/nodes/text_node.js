var Substance = require("substance");
var Document = Substance.Document;

// Note: in archivist paragraphs are called text nodes.
var TextNode = Document.TextNode.extend({
  name: "text"
});

// Html import
// -----------

TextNode.static.blockType = true;

TextNode.static.matchElement = function(el) {
  var tagName = el.tagName.toLowerCase();
  return (tagName === 'p');
};

TextNode.static.fromHtml = function(el, converter) {
  var text = {
    id: el.dataset.id || Substance.uuid('text'),
    content: ''
  };
  text.content = converter.annotatedText(el, [text.id, 'content']);
  return text;
};


module.exports = TextNode;