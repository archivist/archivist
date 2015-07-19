var Backbone = require('backbone'),
    Backgrid = require('backgrid');

var MainGrid = Backbone.Layout.extend({
  icon: '',
  title: 'Archivist',
  initialize: function() {
    this.grid = new Backgrid.Grid({
      row: ClickableRow,
      columns: this.options.columns,
      collection: this.options.collection
    });
    $(this.$el).append(this.grid.render().$el);
    this.paginator = new Backgrid.Extension.Paginator({
  		columns: this.options.columns,
  		collection: this.options.collection
	  });
	  $(this.$el).append(this.paginator.render().$el);
    this.createContextPanel();
    this.contextMenu.reset(this.panel);
  },
  afterRender: function() {
    Backbone.middle.trigger('domchange:title', this.title);
    $('#' + this.icon).addClass('active');
    this.$el.addClass(this.options.class);
    this.filters();
    this.contextMenu.reset(this.panel);
  },
  filters: function() {},
  createContextPanel: function() {
  },
  close: function() {
    $('#' + this.icon).removeClass('active');
    this.beforeClose();
    this.grid.remove();
    this.remove();
    this.unbind();
  },
  beforeClose: function() {},
  panel: []
})
exports.main = MainGrid