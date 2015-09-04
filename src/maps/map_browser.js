var OO = require('substance/basics/oo');
var Component = require('substance/ui/component');
var $$ = Component.$$;

var Sidebar = require('./sidebar');
var Filters = require('./filters');

require('mapbox.js');
require("leaflet.markercluster");
require("./maki");

var MapBrowser = Component.extend({
  didInitialize: function() {
    this.backend = this.props.backend || false;
    this.sidebar = Component.mount($$(Sidebar), $('#sidebar'));
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

  willUpdateState: function(newState) {
  },

  initilizeMap: function() {
    var self = this;

    L.mapbox.accessToken = window.mapboxToken;

    this.map = L.mapbox.map('map', 'mapbox.light', {
        maxZoom: '10',
        minZoom: '4'
      })
      .setView([48.6, 18.8], 5);

    this.overlays = L.layerGroup().addTo(this.map);

    this.backend.getLocations(function(err, data){
      self.layers = L.mapbox.featureLayer()
        .setGeoJSON(data);

      self.addFilters();
      self.showLayer();
    });

    // this.map.on('zoomend',function(){
    //   if(self.map._animateToZoom == self.map.getMaxZoom()){
    //     self.overlays.eachLayer(function(layer){
    //       setTimeout(function(){
    //         layer._group._inZoomAnimation = 0;
    //         layer.spiderfy();
    //       }, 0)
    //     })
    //   }
    // })
  },

  addFilters: function() {
    this.filters = Component.mount($$(Filters, {
      showLayer: this.showLayer,
      overlays: this.overlays,
      layers: this.layers,
      renderIcon: this.renderIcon,
      prepareFeature: this.prepareFeature
    }), $('#filters'));
  },

  showLayer: function(name) {
    var self = this;
    var maxZoom = 11;
    this.overlays.clearLayers();
    var clusterGroup = new L.MarkerClusterGroup({disableClusteringAtZoom: maxZoom}).addTo(this.overlays);
    clusterGroup.on('clusterclick', function(e){
      if(self.map.getZoom() == self.map.getMaxZoom()) e.layer.spiderfy();
    })
    this.layers.eachLayer(function(layer) {
      var type = layer.feature.properties.type;
      layer.setIcon(self.renderIcon(type));
      if (name && type === name) {
        clusterGroup.addLayer(layer);
      } else if (name === null) {
      } else if (!name) {
        clusterGroup.addLayer(layer);
      }
      self.prepareFeature(layer);
    });
    this.layers.on('mouseover', function(e) {
      e.layer.openPopup();
    });
    this.layers.on('mouseout', function(e) {
      setTimeout(function(){
        e.layer.closePopup();
      }, 300);
    });
    this.layers.on('click', function(e) {
      self.sidebar.update(e.layer);
    });
  },

  renderIcon: function(name) {
    var icon;
    if (name == "toponym") {
      icon = 'globe'
    } else if (name == "prison") {
      icon = 'table';
    }
    return L.divIcon({
      className: 'icon icon-' + name,
      html: '<i class="fa fa-' + icon +'"></i>',
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    })
  },

  prepareFeature: function(layer) {
    var storage = window.storage || window.localStorage;
    var locale = storage.getItem('locale') || "ru";

    var name;
    var props = layer.feature.properties;
    var type = props.type;
    if(type == 'toponym') {
      name = props.current_name ? props.current_name : props.name;
    } else if (type == 'prison') {
      name = props.name === 'Неизвестно' ? props.nearest_locality : props.name;
      if(props.name === 'Неизвестно' && props.prison_type) name += " (" + props.prison_type.join(', ') + ")";
    }
    var popupContent = "<h3>" + name + "</h3>";
    if(locale == "ru") {
      popupContent += "<p class='stats'>упомянуто " + props.fragments + " " + this.declOfNum(props.fragments, ['раз', 'раза', 'раз']) + " в " + props.documents + " " + this.declOfNum(props.documents, ['документе', 'документах', 'документах']) + "</p>";
    } else {
      popupContent += "<p class='stats'>mentioned " + props.fragments + " times in " + props.documents + " documents</p>";
    }

    layer.bindPopup(popupContent);
  },

  declOfNum: function(number, titles) {  
    var cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
  }
});

module.exports = MapBrowser;