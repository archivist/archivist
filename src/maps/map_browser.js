var AVAILABLE_FILTERS = {
  "toponyms": {filterId: "toponym", name: i18n.t("map.toponyms"), icon: "globe", state: true},
  "prisons": {filterId: "prison", name: i18n.t("map.prisons"), icon: "table", state: true}
};

var _ = require('substance/basics/helpers');
var Component = require('substance/ui/component');
var $$ = Component.$$;
var util = require('./util');

var Sidebar = require('./sidebar');

require('mapbox.js');
require("leaflet.markercluster");

var MapBrowser = Component.extend({
  didInitialize: function() {
    this.backend = this.props.backend || false;
  },

  render: function() {
    var el = $$('div').attr({id: 'map'}).addClass('map-component');
    el.append($$(Sidebar, {filters: AVAILABLE_FILTERS}).key('sidebar'));
    return el;
  },

  didMount: function() {
    this.actions({
      "applyFilter": this.applyFilter,
      "showLocationInfo": this.showLocationInfo,
      "showList": this.showList
    });
    var filters = {};
    _.each(AVAILABLE_FILTERS, function(filter){
      filters[filter.filterId] = filter.state;
    });
    this._setState({filters: filters});
    this.initilizeMap();
  },

  initilizeMap: function() {
    var self = this;

    L.mapbox.accessToken = window.mapboxToken;

    this.map = L.mapbox.map('map', 'mapbox.light', {
      maxZoom: '10',
      minZoom: '4',
      attributionControl: false
    }).setView([48.6, 18.8], 5);

    this.addAttribution();
    this.overlays = L.layerGroup().addTo(this.map);

    this.backend.getLocations(function(err, data){
      self.layers = L.mapbox.featureLayer()
        .setGeoJSON(data);

      if(self.props.locationId) {
        self.showLayer(false);
        self.showLocationInfo(null, self.props.locationId, true);
      } else {
        self.showLayer();
      }
    });
  },

  addAttribution: function() {
    var attribution = L.control.attribution({position: 'bottomleft'});
    attribution.setPrefix('');
    attribution.addAttribution("© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>");
    attribution.addTo(this.map);
    var logo = $('.mapbox-logo')
    logo.remove();
    $('.leaflet-bottom.leaflet-left').prepend(logo);
  },

  applyFilter: function(filterId) {
    var filters = this.getState().filters;
    if(filters[filterId] == true) {
      filters[filterId] = false;
    } else {
      filters[filterId] = true;
    }
    this.setState({filters: filters});
    this.showLayer();
  },

  showLayer: function(list) {
    var self = this;
    var maxZoom = 11;
    var filters = this.getState().filters;
    this.overlays.clearLayers();
    var clusterGroup = new L.MarkerClusterGroup({disableClusteringAtZoom: maxZoom}).addTo(this.overlays);
    clusterGroup.on('clusterclick', function(e){
      if(self.map.getZoom() == self.map.getMaxZoom()) e.layer.spiderfy();
    })
    this.layers.eachLayer(function(layer) {
      var type = layer.feature.properties.type;
      layer.setIcon(self.renderIcon(type));
      if (filters[type] == true) {
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
      self.showLocationInfo(e.layer);
    });
    if(list !== false) this.showList();
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
      props.title = props.name;
    } else if (type == 'prison') {
      props.title = props.name === 'Неизвестно' ? props.nearest_locality : props.name;
      if(props.name === 'Неизвестно' && props.prison_type) props.title += " (" + props.prison_type.join(', ') + ")";
    }
    var popupContent = "<h3>" + props.title + "</h3>";
    if(locale == "ru") {
      props.stats = props.fragments + " " + util.declOfNum(props.fragments, ['упоминание', 'упоминания', 'упоминаний']) + " в " + props.documents + " " + util.declOfNum(props.documents, ['документе', 'документах', 'документах']);
    } else {
      props.stats = "mentioned " + props.fragments + " times in " + props.documents + " documents";
    }
    popupContent += "<p class='stats'>" + props.stats + "</p>";

    layer.bindPopup(popupContent);
  },

  showList: function() {
    var self = this;
    var filters = this.getState().filters;
    var list = [];
    window.location.hash = "";
    this.map.setView([48.6, 18.8], 5);
    this.layers.eachLayer(function(layer){
      var props = layer.feature.properties;
      if (filters[props.type] == true) {
        var item = {
          title: props.title,
          stats: props.stats,
          id: props._id
        }
        list.push(item);
      }
    });
    list = _.sortBy(list, function(item){return item.title});
    self.refs.sidebar.refs.details.setProps({
      list: list
    });
  },

  showLocationInfo: function(layer, id, init) {
    var self = this;
    var id = id || layer.feature.properties.id;
    if(!init) window.location.hash = '#' + id;
    if(!layer) {
      this.layers.eachLayer(function(l){
        if(l.feature.properties.id == id) {
          layer = l;
        }
      })
    }
    this.focusOn(layer);
    if(self.refs.sidebar.refs.details.props.locationId != id) {
      this.backend.getLocation(id, function(err, data){
        data.stats = layer.feature.properties.stats;
        self.refs.sidebar.refs.details.setProps({
          filters: self.getProps().filters,
          location: data,
          locationId: id
        })
      });
    }
  },

  focusOn: function(marker) {
    var cM = this.map.project(marker.getLatLng(), 10);
    cM.x += 175;
    var point = this.map.unproject(cM, 10)
    this.map.setView(point, 10, {animate: true});
  }
});

module.exports = MapBrowser;