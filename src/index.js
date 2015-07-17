var Backbone = require('backbone'),
		_ = require('underscore'),
    jquery = require('jquery'),
    router = require('./router.js');

Backbone.$ = window.$ = jquery;

var AppStart = function() {
	var session = localStorage.getItem('session');
	if (session) {
	  var token = JSON.parse(session).token;
	  $.ajaxSetup({
	  	beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      }
		});
	}
	verifyToken(function(){
		Backbone.AppRouter = new router();
  	Backbone.AppRouter.session = JSON.parse(session);
   	Backbone.history.start({ pushState: true, root: '/' });
	})
}

var destroySession = function() {
	localStorage.removeItem('session');
	window.location.href = '/login';
}

var verifyToken = function(cb) {
	$.getJSON("/api/users/status", function(data) {
	  cb();
	})
	.error(function(err) { destroySession(); })
};

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
	changeUrl: function(url) {
  	Backbone.AppRouter.navigate(url, {trigger: false});
	},
	changeTitle: function(title) {
		document.title = title;
	}
}, Backbone.Events);

Backbone.middle.on({
	"goTo": Backbone.middle.goTo,
	"goToPrevious": Backbone.middle.goToPrev,
	"goToExt": Backbone.middle.goToExt,
	"changeUrl": Backbone.middle.changeUrl,
	"domchange:title": Backbone.middle.changeTitle,
	"logout": destroySession
});

AppStart();