var Backgrid = require('backgrid'),
    Paginator = require('backbone.paginator'),
    Pageable = require('../local_modules/backgrid-paginator/backgrid-paginator.js'),
    $ = require('jquery'),
    Grid = require('./grid.js');

var UsersGrid = Grid.main.extend({
  icon: 'users',
  title: 'Users',
  className: 'userlist',
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
exports.usersGrid = UsersGrid

var PermissionCell = Backgrid.BooleanCell.extend({
  editor: Backgrid.BooleanCellEditor.extend({
    render: function () {
      var model = this.model;
      var columnName = this.column.get("name");
      var val = this.formatter.fromRaw(model.get(columnName), model);

      /*
       * Toggle checked property since a click is what triggered enterEditMode
      */
      this.$el.prop("checked", !val);
      model.set(columnName, !val);
      model.save();

      return this;
    }
  })
});
exports.permissionCell = PermissionCell