'use strict';

// i18n
require('./i18n/load');

var $$ = React.createElement;

// Specify a backend
// ---------------
//

var Backend = require("./backend");
var backend = new Backend();

// Specify a notification service
// ---------------
//
// This is used for user notifications, displayed in the status bar

var NotificationService = require("./notification_service");
var notifications = new NotificationService();

// React Components
// ---------------
//

// Available contexts
var ArchivistReader = require("archivist-core/reader");

// Top Level Application
// ---------------
//

var ReaderApp = React.createClass({
  displayName: "ReaderApp",

  childContextTypes: {
    backend: React.PropTypes.object,
    notifications: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      backend: backend,
      notifications: notifications,      
    };
  },

  render: function() {
    var urlParts = window.location.href.split('/');
    return $$(ArchivistReader, {
      documentId: urlParts[urlParts.length - 1]
    });
  }
});

// Start the app

$(function() {
  React.render(
    $$(ReaderApp, {
      route: window.location.hash.slice(1)
    }),
    document.getElementById('container')
  );
});

