var Backbone = require('backbone'),
		_ = require('underscore'),
    jquery = require('jquery'),
    router = require('./router.js');

Backbone.$ = window.$ = jquery;

var AppStart = function() {
  Backbone.AppRouter = new router();
  Backbone.history.start({ pushState: true, root: '/' });
}

Backbone.middle = _.extend({
	goTo: function(url) {
  	Backbone.AppRouter.navigate(url, {trigger: true});
	},
	goToPrev: function() {
		Backbone.AppRouter.previous();
	},
	goToExt: function(url) {
		window.location = url;
	},
	changeTitle: function(title) {
		document.title = title;
	}
}, Backbone.Events);

Backbone.middle.on({
	"goTo": Backbone.middle.goTo,
	"goToPrevious": Backbone.middle.goToPrev,
	"goToExt": Backbone.middle.goToExt,
	"domchange:title": Backbone.middle.changeTitle
});

AppStart();