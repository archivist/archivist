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
  },
  filters: function() {
  }
})
exports.usersGrid = UsersGrid