var Component = require('substance/ui/component');
var $$ = Component.$$;
var L = require('leaflet');
var Tooltip = require('./tooltip');

require("leaflet.markercluster");
require("./maki");

var MapBrowser = Component.extend({
  didInitialize: function() {
    this.backend = this.props.backend || false;
    this.tooltip = Component.mount($$(Tooltip), $('#info'));
  },

  render: function() {
    var el = $$('div').attr({id: 'map'}).addClass('map-component');
    return el;
  },

  didMount: function() {
    this.initilizeMap();
  },

  willUnmount: function() {
  },

  initilizeMap: function() {
    var self = this;

    this.map = L.map('map').setView([48.6, 18.8], 5);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.light'
    }).addTo(this.map);

    L.Icon.Default.imagePath = 'aseets/img/leaflet/';

    this.backend.getLocations(function(err, data){
      self.addLayer(data);
    });
  },

  addLayer: function(geoJson) {
    var self = this;
    var icon = L.MakiMarkers.icon({icon: "prison", color: "#7e7e7e", size: "m"});
    var markers = new L.MarkerClusterGroup({ disableClusteringAtZoom: 19});
    var layer = L.geoJson(geoJson, { 
      pointToLayer: function (feature, latlng) {   
        return L.marker(latlng, {icon: icon});
      },
      onEachFeature: this.prepareFeature
    });
    layer.on('mouseover', function(e) {
      self.tooltip.update();
    });
    layer.on('mouseout', function(e) {
      e.layer.closePopup();
    });
    markers.addLayer(layer);
    this.map.addLayer(markers);
  },

  prepareFeature: function(feature, layer) {
    var popupContent = "<p>I started out as a GeoJSON " +
        feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    layer.bindPopup(popupContent);
  }
});

module.exports = MapBrowser;