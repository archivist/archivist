var Backbone = require('backbone'),
    Backgrid = require('backgrid'),
    layoutmanager = require('backbone.layoutmanager'),
    _ = require('underscore'),
    $ = require('jquery');

var MainLayout = Backbone.Layout.extend({
  el: 'body',

  events: {
    'click #goback, click .close-stack, exit': 'removeFromStack',
    'keyup' : 'keyup',
  },
  
  changeLayout: function(v) {
  	this.stackView.closeStack();
    this.stackView = new StackView();
    this.stackView.setRootView(v);
    this.setView('#stackView', this.stackView).render();
  },

  addContext: function(v) {
    this.stackView.insertView('#context-panel', v).render();
  },
	
	keyup: function(e){
		if (e.which == 27 && $(e.target).is('body') && !$(e.target).hasClass('modal-open')) {
			this.removeFromStack();
		}
	},

  getRoot: function() {
    return this.stackView.getFirst();
  },

  getTop: function() {
    return this.stackView.getLast();
  },
	
  addToStack: function(v) {
    this.stackView.push(v);
  },

  removeFromStack: function() {
    this.stackView.pop();
    this.contextMenu.trigger("restore");
  },

  initialize: function() {
    // Create a new StackView and the root view.
    this.stackView = new StackView();
    this.stackView.setRootView(this.options.rootView);
    this.setView('#stackView', this.stackView);
  }
});
exports.mainLayout = MainLayout

// STACK MANAGER
var StackView = Backbone.Layout.extend({
  hasRootView: false,

  // Define options for transitioning views in and out.
  options_def: {
    inTransitionClass: 'animated fadeInLeft',
    outTransitionClass: 'animated fadeOutRight',
    transitionDelay: 1000,
    class: 'stacks'
  },

  afterRender: function() {
    this.$el.addClass(this.options_def.class);
  },

  // Pop the top-most view off of the stack.
  pop: function() {
    var views = this.getViews().value();

    if (views.length > (this.hasRootView ? 1 : 0)) {
      var view = views.pop();
      this.transitionViewOut(view);
    }
  },

  getFirst: function() {
    var views = this.getViews().value();
    return views[0];
  },

  getLast: function() {
    var views = this.getViews().value();
    return views[views.length - 1];
  },

  // Push a new view onto the stack.
  // The itemClass will be auto-added to the parent element.
  push: function(view) {
    this.insertView(view);
    this.transitionViewIn(view);
  },

  // Trastition the new view in.  This is broken out as a method for convenient
  // overriding of the default transition behavior.  If you only want to change
  // the animation use the trasition class options instead.
  transitionViewIn: function(view) {
    this.trigger('before:transitionIn', this, view);
    view.$el.addClass(this.options_def.inTransitionClass);
		
    view.render();

    setTimeout(function() {
      this.trigger('transitionIn', this, view);
    }.bind(this), this.options_def.transitionDelay);
  },
  
  // Trastition a view out.  This is broken out as a method for convenient
  // overriding of the default transition behavior.  If you only want to change
  // the animation use the trasition class options instead.
  transitionViewOut: function(view) {
    this.trigger('before:transitionOut', this, view);
    view.$el.addClass(this.options_def.outTransitionClass);
    Backbone.middle.trigger("goToPrevious");
    setTimeout(function() {
      view.close();
      this.trigger('transitionOut', this, view);
    }.bind(this), this.options_def.transitionDelay);
  },

  setRootView: function(view) {
    this.hasRootView = true;
  	this.setView(view);
  },

  closeStack: function() {
    var views = this.getViews().value();
    _.each(views, function(view){
      view.close();
    });
    this.remove();
    this.unbind();
  }
});
exports.stackView = StackView