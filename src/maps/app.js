'use strict';

// i18n
require('./i18n/load');

window.mapboxToken = "pk.eyJ1IjoiaW50ZWdyYWwiLCJhIjoiMkhlMkFRNCJ9.1KcR7bx-EPXbWIR0vqEnDg";

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

$(function() {

  var mapBrowser = $$(MapBrowser, {
    backend: backend
  });

  Component.mount(mapBrowser, $('#map_container'));
});