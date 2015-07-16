var Backbone = require('backbone'),
    _ = require('underscore'),
    geocoder = require('leaflet-control-geocoder');


L.Control.LocationGeocoder = L.Control.Geocoder.extend({
  geocodeExternal: function(name) {
    this._clearResults();
    this.options.geocoder.geocode(name, this._geocodeResult, this);

    return false;
  },
  markGeocode: function(result) {
    this._map.fitBounds(result.bbox);

    if (this._geocodeMarker) {
      this._map.removeLayer(this._geocodeMarker);
    }

    this._geocodeMarker = new L.Marker(result.center)
      .bindPopup(result.html || result.name)
      .addTo(this._map)
      .openPopup();

    this._map.info.update(false, [result.center.lng, result.center.lat]);
    if(result.country) $('input[name="country"]').val(result.country);
    if(result.locality) {
      $('input[name="current_name"]').val(result.locality);
      $('input[name="nearest_locality"]').val(result.locality);
    }

    return this;
  }
});

L.Control.Geocoder.GoogleGeo = L.Control.Geocoder.Google.extend({
  getProperty: function(addresses, propName) {
    for (var i = 0; i < addresses.length; i++) {
      if (addresses[i].types[0] == propName) {
        return addresses[i].long_name;
      }
    }
    return false;
  },
  geocode: function(query, cb, context) {
    var that = this,
        params = {
          address: query,
          language: 'ru'
        };
    if(this._key && this._key.length)
    {
      params['key'] = this._key
    }

    L.Control.Geocoder.getJSON(this.options.service_url, params, function(data) {
      var results = [],
          loc,
          latLng,
          latLngBounds;

      if (data.results && data.results.length) {
        for (var i = 0; i <= data.results.length - 1; i++) {
          loc = data.results[i];
          latLng = L.latLng(loc.geometry.location);
          latLngBounds = L.latLngBounds(L.latLng(loc.geometry.viewport.northeast), L.latLng(loc.geometry.viewport.southwest));
          results[i] = {
            name: loc.formatted_address,
            bbox: latLngBounds,
            country: that.getProperty(loc.address_components, 'country'),
            locality: that.getProperty(loc.address_components, 'locality'),
            center: latLng
          };
        }
      }

      cb.call(context, results);
    });
  },
  reverse: function(location, scale, cb, context) {
    var that = this,
        params = {
          latlng: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng),
          language: 'ru'
        };
    if(this._key && this._key.length)
    {
      params['key'] = this._key
    }
    L.Control.Geocoder.getJSON(this.options.service_url, params, function(data) {
      var results = [],
          loc,
          latLng,
          latLngBounds;
      if (data.results && data.results.length) {
        for (var i = 0; i <= data.results.length - 1; i++) {
          loc = data.results[i];
          latLng = L.latLng(loc.geometry.location);
          latLngBounds = L.latLngBounds(L.latLng(loc.geometry.viewport.northeast), L.latLng(loc.geometry.viewport.southwest));
          results[i] = {
            name: loc.formatted_address,
            bbox: latLngBounds,
            country: that.getProperty(loc.address_components, 'country'),
            locality: that.getProperty(loc.address_components, 'locality'), 
            center: latLng
          };
        }
      }

      cb.call(context, results);
    });
  }
});

L.Control.Geocoder.googleGeo = function(key) {
  return new L.Control.Geocoder.GoogleGeo(key);
};

Backbone.Form.editors.Geocoder = Backbone.Form.editors.Hidden.extend ({
  events: {
  },

  initialize: function(options) {
    var that = this;
    Backbone.Form.editors.Hidden.prototype.initialize.call(this, options);
    setTimeout(function(){that.createMap();}, 500);
  },

  getValue: function() {
    var data = this.$el.val();
    var output = _.isEmpty(data) ? null : data.split(',');
    return output;
  },

  createMap: function() {
    var coords = _.isArray(this.value) ? [this.value[1],this.value[0]] : [51, 28],
        map = L.map('map-form').setView(coords, 4),
        geocoders = {
            'Google': L.Control.Geocoder.googleGeo('AIzaSyC5W2oY1NB6pWI0RATM8BhkPdfxNWnlg4o'),
            'Nominatim': L.Control.Geocoder.nominatim(),
            'Bing': L.Control.Geocoder.bing('AoArA0sD6eBGZyt5PluxhuN7N7X1vloSEIhzaKVkBBGL37akEVbrr0wn17hoYAMy')
        },
        selector = L.DomUtil.get('geocode-selector'),
        control = new L.Control.LocationGeocoder({ geocoder: null }),
        btn,
        selection,
        info;

    this.model.on('geocode', function(val){
      control.geocodeExternal(val);
    });

    L.Icon.Default.imagePath = '/assets/leaflet'

    function select(geocoder, el) {
        if (selection) {
            L.DomUtil.removeClass(selection, 'active');
        }

        control.options.geocoder = geocoder;
        L.DomUtil.addClass(el, 'active');
        selection = el;
    }

    for (var name in geocoders) {
        btn = L.DomUtil.create('button', 'btn btn-default btn-xs', selector);
        btn.innerHTML = name;
        (function(n) {
            L.DomEvent.addListener(btn, 'click', function() {
                select(geocoders[n], this);
            }, btn);
        })(name);

        if (!selection) {
            select(geocoders[name], btn);
        }
    }

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //attribution: '<a href="http://osm.org/copyright">Terms & Feedback</a>'
    }).addTo(map);

    map.attributionControl.setPrefix('');

    this.addInfoControl(map, control);

    control.addTo(map);

    map.on('click', function(e) {
        control.options.geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), function(results) {
            var r = results[0];
            if (r) {
              if (control._geocodeMarker) {
                map.removeLayer(control._geocodeMarker);
              }
              control._geocodeMarker = new L.marker(r.center).bindPopup(r.html || r.name).addTo(map).openPopup();

              map.info.update(false, [r.center.lng, r.center.lat]);

              if(r.country) $('input[name="country"]').val(r.country);
              if(r.locality) {
                $('input[name="current_name"]').val(r.locality);
                $('input[name="nearest_locality"]').val(r.locality);
              }
            }
        })
    });

    if (_.isArray(this.value)) {
      control._geocodeMarker = new L.marker(coords).bindPopup(this.model.get('name')).addTo(map).openPopup();
    }
  },

  addInfoControl: function(map, control) {
    var that = this;

    map.info = L.control({position: 'bottomleft'});

    map.info.field = that;

    map.info.onAdd = function (map) {
      var that = this;
      this._div = L.DomUtil.create('div', 'info');
      this._div.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (control._geocodeMarker) map.removeLayer(control._geocodeMarker);
        that.update(e);
      });
      this.update(null, that.field.value);
      return this._div;
    };

    map.info.update = function (e, coords) {
      this._div.innerHTML = coords ?
          '<b><i class="reset fa fa-times"></i></b><span>' + coords.join(", ") + '</span>'
          : '<span>choose location</span>';
      if (coords) {
        this.field.setValue(coords);
      } else {
        this.field.setValue('');
      }
    };

    map.info.addTo(map);
  }
});