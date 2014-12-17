var Utility = require('./util.js'),
    _ = require("underscore");

var Subject = Utility.model.extend({
  urlRoot: "/api/subjects",
  schema: {
    name: { type: 'Text', validators: ['required'], title: 'Title' },
    description: { type: 'TextArea', title: 'Description' },
    parent: { type: 'ParentChooser' }
  }
})
exports.subject = Subject

var Subjects = Utility.collection.extend({
  model: Subject,
  url: "/api/subjects",
  state: {
    pageSize: 20,
    sortKey: "started",
    order: 1,
  }
})
exports.subjects = Subjects