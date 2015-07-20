var Utility = require('./util.js');

var Document = Utility.model.extend({
  urlRoot: "/api/documents"
})
exports.document = Document

var Documents = Utility.collection.extend({
  model: Document,
  url: "/api/documents",
  state: {
    pageSize: 20,
    sortKey: "nodes.document.updated_at",
    order: 1
  }
})
exports.documents = Documents