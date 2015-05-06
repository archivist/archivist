var Article = require('substance/article');
var Paragraph = Article.Paragraph;

// Note: in archivist paragraphs are called text nodes.
var TextNode = Paragraph.extend({
  name: "text"
});

module.exports = TextNode;
