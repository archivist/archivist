'use strict';

// i18n
require('./i18n/load');

var $ = window.$ = require('jquery');
var MapBrowser = require('./map_browser');
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

var locationId = window.locationId;

$(function() {

  var mapBrowser = $$(MapBrowser, {
    backend: backend,
    locationId: locationId
  });

  Component.mount(mapBrowser, $('#map_container'));
});