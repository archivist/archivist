var EntityPanelView = require('../entity_panel_view');

var PersonsView = function(controller) {
  EntityPanelView.call(this, controller, {
    entityType: "person",
    name: 'persons',
    label: 'Persons',
    title: 'Persons',
    type: 'resource',
    icon: 'icon-user'
  });
};

PersonsView.Prototype = function() {

  this.renderEntity = function(person) {
    var $person = $('<div>').addClass('person entity').attr("data-id", person.id);

    // Name
    $person.append($('<div>').addClass('person-name').html(person.name));

    // Biography
    $person.append($('<div>').addClass('person-bio').html(person.bio));

    return $person;
  };
};

PersonsView.Prototype.prototype = EntityPanelView.prototype;
PersonsView.prototype = new PersonsView.Prototype();
PersonsView.prototype.constructor = PersonsView;

module.exports = PersonsView;
