var Utility = require('./util.js'),
    _ = require("underscore");

var Subject = Utility.model.extend({
  urlRoot: "/api/subjects",
  schema: {
    name: { type: 'Text', validators: ['required'], title: 'Title' },
    description: { type: 'TextArea', title: 'Description' }
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
  },
  getSerialisedJson: function() {
    var self = this,
        nested = [],
        children = [];

    self.each(function(term) {
      var parent = term.get("parentId");
      if(!_.isEmpty(parent)) {
        children.push(term.id);
      } else {
        var element = {
          id: term.get("_id"),
          name: term.get("name")
        }
        nested.push(element);
      }
    });
    buildNestedChildren(children, nested);
    
    function buildNestedChildren(children, nested) {
      var i = 0,
          childrenLeft = [];

      _.each(children, function(termId, index) {
        var term = self.get(termId);
        var parent = _.findWhere(nested, {id: term.get("parentId")});
        if (parent) {
          if(!parent.children) parent.children = [];
          var element = {
            id: term.id,
            name: term.get("name"),
            parentId: parent.id
          }
          parent.children.push(element);
          i++;
        } else {
          childrenLeft.push(termId);
        }
      });

      if (_.isEmpty(childrenLeft) || i == 0) return nested;

      var subNested = [],
          nestedWithChildren = _.filter(nested, function(item) { 
            return !_.isUndefined(item.children); 
          });

      _.each(nestedWithChildren, function(child) { 
        _.each(child.children, function(item) {
          subNested.push(item)
        }); 
      });
      buildNestedChildren(childrenLeft, subNested);
    }

    return nested;
  }
})
exports.subjects = Subjects