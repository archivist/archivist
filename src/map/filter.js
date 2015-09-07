'use strict';

var Component = require('substance/ui/component');
var $$ = Component.$$;

var Filter = Component.extend({

  onClick: function(e) {
    this.send("applyFilter", this.props.filterId);
    $(e.currentTarget).toggleClass('active');
  },

  onDblClick: function(e) {
    e.stopPropagation();
  },

  render: function() {
    var active = this.props.state === true ? true : false;
    var showIcon = active ? 'fa-eye-slash' : 'fa-eye';
    var el = $$('button').addClass('filter').append([
      $$('i').addClass('fa fa-' + this.props.icon),
      this.props.name + " (" + this.props.counter + ")",
      $$('i').addClass('show fa ' + showIcon)
    ]).on('click', this.onClick).on('dblclick', this.onDblClick);

    if(active) el.addClass('active');

    return el;
  }
});

module.exports = Filter;