var Utility = require('./util.js'),
    _ = require("underscore");

var Subject = Utility.model.extend({
  urlRoot: "/api/subjects",
  schema: {
    name: { type: 'Text', validators: ['required'], title: 'Title', editorAttrs: {autofocus:'autofocus'} },
    description: { type: 'TextArea', title: 'Description' },
    parent: { type: 'ParentChooser' }
  }
})
exports.subject = Subject

var Subjects = Utility.collection.extend({
  model: Subject,
  url: "/api/subjects",
  state: {
    pageSize: null,
    sortKey: "name",
    order: -1,
  },
  getChanged: function () {
    return this.models.filter(function(m) {
      return m.hasChanged()
    });
  },
  saveChanged: function() {
    var changed = this.getChanged();
    _.each(changed, function(m) {
      m.save();
    });
  }
})
exports.subjects = Subjects