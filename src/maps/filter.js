'use strict';

var Component = require('substance/ui/component');
var $$ = Component.$$;

var Filter = Component.extend({

  onClick: function(e) {
    this.send("applyFilter", this.props.filterId);
    $(e.target).toggleClass('active');
  },

  onDblClick: function(e) {
    e.stopPropagation();
  },

  render: function() {
    var el = $$('button').addClass('filter').append([
      $$('i').addClass('fa fa-' + this.props.icon),
      this.props.name
    ]).on('click', this.onClick).on('dblclick', this.onDblClick);

    if(this.props.state === true) el.addClass('active');

    return el;
  }
});

module.exports = Filter;