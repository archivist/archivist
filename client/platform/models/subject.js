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
    sortKey: "position",
    order: -1,
  },
  buildIndexes: function() {
    // Build a map of parents referencing their kids
    this.parentIndex = {};
    _.each(this.models, function(model) {
      var parent = model.get('parent') || "root";
      if (!this.parentIndex[parent]) {
        this.parentIndex[parent] = [ model ];
      } else {
        this.parentIndex[parent].push(model);
      }
    }, this);
  },
  getChildren: function(nodeId) {
    return this.parentIndex[nodeId] || [];
  },
  buildSubjectsTree: function() {
    var self = this;

    this.buildIndexes();

    function getChildren(parentId) {
      var res = [];
      var nodes = self.getChildren(parentId);
      if (nodes.length === 0) return res; // exit condition

      _.each(nodes, function(node) {
        var hasDescription = 'not-empty';
        if (_.isEmpty(node.get('description'))) hasDescription = 'empty';
        var entry = {
          id: node.id,
          text: node.get('name'),
          children: getChildren(node.id), // get children for subj
          li_attr: {
            class: hasDescription
          },
          px: node.get('position')
        };
        res.push(entry);
      });
      return res;
    }

    return getChildren("root");
  },
  getChanged: function () {
    return this.models.filter(function(m) {
      return (m.hasChanged() || !m.get('id'));
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