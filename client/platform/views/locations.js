var Backgrid = require('backgrid'),
    Paginator = require('backbone.paginator'),
    Pageable = require('../local_modules/backgrid-paginator/backgrid-paginator.js'),
    $ = require('jquery'),
    Grid = require('./grid.js');

var ToponymsGrid = Grid.main.extend({
  icon: 'topo',
  title: 'Toponyms',
  className: 'toponymslist',
  initialize: function() {
    $('#' + this.icon).addClass('active');
    this.grid = new Backgrid.Grid({
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
  }
})
exports.toponymsGrid = ToponymsGrid

var PrisonsGrid = Grid.main.extend({
  icon: 'prisons',
  title: 'Prisons',
  className: 'prisonslist',
  initialize: function() {
    $('#' + this.icon).addClass('active');
    this.grid = new Backgrid.Grid({
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
  }
})
exports.prisonsGrid = PrisonsGrid

var PrisonCell = Backgrid.Cell.extend({
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
exports.prisonCell = PrisonCell