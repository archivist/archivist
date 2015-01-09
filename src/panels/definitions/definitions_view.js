var EntityPanelView = require('../entity_panel_view');


var DefinitionsView = function(controller) {
  EntityPanelView.call(this, controller, {
    entityType: "definition",
    name: 'definitions',
    label: 'Definitions',
    title: 'Definitions',
    type: 'resource',
    icon: 'icon-book'
  });
};

DefinitionsView.Prototype = function() {

  this.renderEntity = function(def) {
    var $def = $('<div>').addClass('definition entity').attr("data-id", def.id);

    // Name
    $def.append($('<div>').addClass('definition-title').html(def.title));

    // Biography
    $def.append($('<div>').addClass('definition-description').html(def.description));

    return $def;
  };
};


DefinitionsView.Prototype.prototype = EntityPanelView.prototype;
DefinitionsView.prototype = new DefinitionsView.Prototype();
DefinitionsView.prototype.constructor = DefinitionsView;

module.exports = DefinitionsView;
