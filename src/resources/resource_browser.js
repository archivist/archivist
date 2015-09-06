var _ = require('substance/basics/helpers');
var Component = require('substance/ui/component');
var $$ = Component.$$;
var util = require('./util');

var Details = require('./details');

var ResourceBrowser = Component.extend({
  didInitialize: function() {
    this.backend = this.props.backend || false;
  },

  render: function() {
    var el = $$('div').addClass('resource-component');
    el.append($$(Details).key('details'));
    return el;
  },

  didMount: function() {
    var self = this;
    var id = this.getProps().resourceId;
    this.backend.getEntity(id, function(err, resource){
      self.refs.details.setProps({resource: resource});
    });
  }
  
});

module.exports = ResourceBrowser;