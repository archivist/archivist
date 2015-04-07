var Backbone = require('backbone'),
    Backgrid = require('backgrid'),
    Paginator = require('backbone.paginator'),
    Pageable = require('../local_modules/backgrid-paginator/backgrid-paginator.js'),
    moment = require('moment'),
    _ = require('underscore'),
    $ = require('jquery'),
    Grid = require('./grid.js'),
    Utils = require('./util.js');

var DocumentsGrid = Grid.main.extend({
  icon: 'dashboard',
  title: 'Dashboard',
  className: 'dashboard',
  initialize: function() {
    this.grid = new Backgrid.Grid({
      row: DocumentRow,
      columns: this.options.columns,
      collection: this.options.collection
    });
    $(this.$el).append(this.grid.render().$el);
    this.paginator = new Backgrid.Extension.Paginator({
      columns: this.options.columns,
      collection: this.options.collection
    });
    $(this.$el).append(this.paginator.render().$el);
  },
  filters: function() {
    this.titleFilter = new Utils.filter({
      collection: this.options.collection,
      placeholder: "Enter a title to search",
      name: "nodes.document.title",
    });
    $('.toolbox').prepend(this.titleFilter.render().el);
  },
  beforeClose: function() {
    this.titleFilter.remove();
  },
  _add: function() {
    Backbone.middle.trigger("goToExt", 'editor/new')
  },
  panel: [
    {
      name: "Add new document",
      icon: "plus",
      fn: "_add"
    }
  ]
})
exports.documentsGrid = DocumentsGrid

var DocumentCell = Backgrid.Cell.extend({
  className: "string-cell document-cell grid-cell animate",
  render: function () {
    this.$el.empty();
    var formattedValue = this.formatter.fromRaw(this.model.get('nodes'));
    if(_.isNull(formattedValue) || _.isEmpty(formattedValue)){
      this.delegateEvents();
      return this;
    }
    else {
      var metadata = formattedValue.document;

      var markup = '<div class="title">' + metadata.title + '</div> \
                    <span class="delete-document">Delete</span> \
                    <div class="updated-at">updated at ' + moment(metadata.updated_at).fromNow() + '</div>';

      this.$el.append(markup)
      this.delegateEvents()
      return this;
    }
  }
});
exports.documentCell = DocumentCell

var DocumentRow = Backgrid.Row.extend({
  events: {
    "click": "onClick",
    "click .delete-document": "onRemove"
  },
  onClick: function (e) {
    e.preventDefault();
    Backbone.middle.trigger("goToExt", '/archivist.html#'+this.model.get('id'));
  },
  onRemove: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var confirm = window.confirm("Are you sure you want to do this?\nThis action can't be undone. Think twice!");
    if(confirm) {
      this.model.destroy();
    }
  }
});