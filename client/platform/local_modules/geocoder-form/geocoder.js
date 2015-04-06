var Backbone = require('backbone'),
    geocoder = require('leaflet-control-geocoder');


/**
 * Select2
 *
 * Renders Select2 - jQuery based replacement for select boxes
 * https://gist.github.com/jbugwadia/9303389
 *
 * Usage: Works the same as Select editor, with the following extensions for Select2:
 *    schema.config: configuration object passed to Select2
 *    schema.multiple: sets 'multiple' property on the HTML <select>
 *
 * Example:
 *    schema: {title: {type:'Select2', options:['Mr','Mrs',Ms], config: {}, multiple: false}
 *
 * Also see:
 *    https://gist.github.com/powmedia/5161061
 *    https://gist.github.com/Integral/5156170
 * Changelog:
 *    removed hard tabs (@fonji)
 *    added blur and focus events (fonji)
 *    delayed blur event (fonji) (it was fired when an element was clicked on)
 */

Backbone.Form.editors.Geocoder = Backbone.Form.editors.Base.extend ({
  tagName: 'div',

  className: 'map',

  events: {
  },

  initialize: function(options) {
    Backbone.Form.editors.Base.prototype.initialize.call(this, options);
  },

  render: function() {

    var map = L.map(this.el).setView([0, 0], 2),
        geocoders = {
            'Nominatim': L.Control.Geocoder.nominatim(),
            'Bing': L.Control.Geocoder.bing('AoArA0sD6eBGZyt5PluxhuN7N7X1vloSEIhzaKVkBBGL37akEVbrr0wn17hoYAMy')
        },
        selector = L.DomUtil.get('geocode-selector'),
        control = new L.Control.Geocoder({ geocoder: null }),
        btn,
        selection,
        marker;

    function select(geocoder, el) {
        if (selection) {
            L.DomUtil.removeClass(selection, 'selected');
        }

        control.options.geocoder = geocoder;
        L.DomUtil.addClass(el, 'selected');
        selection = el;
    }

    for (var name in geocoders) {
        btn = L.DomUtil.create('button', '', selector);
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

    L.tileLayer('http://api.tiles.mapbox.com/v3/liedman.jokgn3nn/{z}/{x}/{y}.png', {
        attribution: '<a href="http://osm.org/copyright">Terms & Feedback</a>'
    }).addTo(map);

    control.addTo(map);

    map.on('click', function(e) {
        control.options.geocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), function(results) {
            var r = results[0];
            if (r) {
                if (marker) {
                    map.removeLayer(marker);
                }
                marker = L.marker(r.center).bindPopup(r.html || r.name).addTo(map).openPopup();
            }
        })
    });

    return this;
  }
});
