var Backbone = require('backbone'),
		_ = require('underscore'),
    jquery = require('jquery'),
    router = require('./router.js');

Backbone.$ = window.$ = jquery;

var AppStart = function() {
	initializeSession();
	verifyToken(function(err, data){
		if(err) {
			console.log('invalid session');
			return destroySession();
		}
		// renew token
		if (data.token) {
			console.log('renewing session...')
			localStorage.setItem('session', JSON.stringify(data));
			initializeSession();
		}
		var session = getSession();
		Backbone.AppRouter = new router();
  	Backbone.AppRouter.session = session;
   	Backbone.history.start({ pushState: true, root: '/archivist' });
	})
}

var initializeSession = function() {
	var session = getSession();
	if (session) {
	  var token = session.token;
	  $.ajaxSetup({
	  	beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      }
		});
	} else {
		destroySession();
	}
}

var getSession = function() {
	var session = localStorage.getItem('session');
	if(!session) return false;
	return JSON.parse(session);
}

var destroySession = function() {
	localStorage.removeItem('session');
	window.location.href = '/archivist/login';
}

var verifyToken = function(cb) {
	$.getJSON("/api/users/status", function(data) {
	  cb(null, data);
	})
	.error(function(err) { cb(err); })
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
	},
	loading: function() {
		var status = {
			name: Backbone.AppRouter.manager,
			type: 'progress',
			message: 'Transmitting data...'
		}
		Backbone.AppRouter.status.set(status);
	},
	loaded: function() {
		var status = {
			name: Backbone.AppRouter.manager,
			type: 'info',
			message: 'Data has been transmitted'
		}
		Backbone.AppRouter.status.set(status);
	},
	error: function(message) {
		var status = {
			name: Backbone.AppRouter.manager,
			type: 'error',
			message: message
		}
		Backbone.AppRouter.status.set(status);
	},
	success: function(message) {
		var status = {
			name: Backbone.AppRouter.manager,
			type: 'success',
			message: message
		}
		Backbone.AppRouter.status.set(status);
	},
	start: function(message) {
		var status = {
			name: Backbone.AppRouter.manager,
			type: 'progress',
			message: message
		}
		Backbone.AppRouter.status.set(status);
	}
}, Backbone.Events);

Backbone.middle.on({
	"goTo": Backbone.middle.goTo,
	"goToPrevious": Backbone.middle.goToPrev,
	"goToExt": Backbone.middle.goToExt,
	"changeUrl": Backbone.middle.changeUrl,
	"domchange:title": Backbone.middle.changeTitle,
	"load:start": Backbone.middle.loading,
	"load:finish": Backbone.middle.loaded,
	"sync:fail": Backbone.middle.error,
	"sync:success": Backbone.middle.success,
	"sync:start": Backbone.middle.start,
	"logout": destroySession
});

AppStart();