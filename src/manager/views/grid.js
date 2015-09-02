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
    this.listenTo(this.options.collection,'reset',this.updateCounter);
    this.updateCounter();
  },
  filters: function() {},
  createContextPanel: function() {
  },
  updateCounter: function() {
    var status = Backbone.AppRouter.status;
    var statusName = status.get('name');
    var counter = this.options.collection.state.totalRecords;
    counter = counter > 1 ? counter + " items" : counter + " item";
    if(statusName.indexOf("items") != -1){
      statusName = statusName.replace(/\(.*?\)/g, counter);
    } else {
      statusName = statusName + " (" + counter + ")";
    }
    setTimeout(function() {
      Backbone.AppRouter.status.set({'name': statusName, type: 'info'});
    }, 0)
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