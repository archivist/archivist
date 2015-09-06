'use strict';

// i18n
require('./i18n/load');

var $ = window.$ = require('jquery');
var ResourceBrowser = require('./resource_browser');
var Component = require('substance/ui/component');
var $$ = Component.$$;

// Specify a backend
// ---------------
//

var Backend = require("./backend");
var backend = new Backend();

// React Components
// ---------------
//

var resourceId = window.resourceId;

$(function() {

  var resourceBrowser = $$(ResourceBrowser, {
    backend: backend,
    resourceId: resourceId
  });

  Component.mount(resourceBrowser, $('#resource_container'));
});