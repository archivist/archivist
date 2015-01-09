var EntityPanelView = require('../entity_panel_view');


var LocationsView = function(controller) {
  EntityPanelView.call(this, controller, {
    entityType: "location",
    name: 'locations',
    label: 'Locations',
    title: 'Locations',
    type: 'resource',
    icon: 'icon-location-arrow'
  });
};

LocationsView.Prototype = function() {

  this.renderEntity = function(loc) {
    var $loc = $('<div>').addClass('location entity').attr("data-id", loc.id);

    // Location type
    $loc.append($('<div>').addClass('location-type').addClass(loc.location_type).html(loc.location_type));

    // Name
    $loc.append($('<div>').addClass('location-name').html([loc.name, loc.country].join(', ')));

    // Synonyms
    $loc.append($('<div>').addClass('location-synonyms').html(loc.synonyms.join(', ')));
    
    if (loc.location_type === "prison") {
      // Prison type
      $loc.append($('<div>').addClass('prison-type').html(loc.prison_type.join(', ')));

      // Nearest locality
      $loc.append($('<div>').addClass('nearest-locality').html("Nearest locality: "+ loc.nearest_locality));
    } else {
      // Current name
      $loc.append($('<div>').addClass('current-name').html("Current name: "+ loc.current_name));
    }

    return $loc;
  };
};


LocationsView.Prototype.prototype = EntityPanelView.prototype;
LocationsView.prototype = new LocationsView.Prototype();
LocationsView.prototype.constructor = LocationsView;

module.exports = LocationsView;
