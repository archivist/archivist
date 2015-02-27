var Backbone = require('backbone'),
    Backgrid = require('backgrid'),
    layoutmanager = require('backbone.layoutmanager'),
    _ = require('underscore'),
    $ = require('jquery');

var MainLayout = Backbone.Layout.extend({
  el: 'body',
  
  changeLayout: function(v) {
  	this.parentView.close();
    this.parentView = new ParentView();
    this.parentView.setRootView(v);
    this.setView('#stackView', this.parentView).render();
  },

  addContext: function(v) {
    this.parentView.insertView('#context-panel', v).render();
  },
	
  initialize: function() {
    // Create a new StackView and the root view.
    this.parentView = new ParentView();
    this.parentView.setRootView(this.options.rootView);
    this.setView('#stackView', this.parentView);
  }
});
exports.mainLayout = MainLayout

// STACK MANAGER
var ParentView = Backbone.Layout.extend({
  hasRootView: false,
  // Define options for transitioning views in and out.
  options_def: {
    class: 'stacks'
  },

  afterRender: function() {
    this.$el.addClass(this.options_def.class);
  },

  setRootView: function(view) {
    this.hasRootView = true;
    this.setView(view);
  },

  close: function() {
    var views = this.getViews().value();
    _.each(views, function(view){
      view.close();
    });
    this.remove();
    this.unbind();
  }
});
exports.parentView = ParentView