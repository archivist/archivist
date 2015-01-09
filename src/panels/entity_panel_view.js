var PanelView = require('substance-composer').PanelView;
var _ = require("underscore");

var EntityPanelView = function(controller, options) {
  PanelView.call(this, controller, {
    name: options.name,
    label: options.label,
    title: options.title,
    type: options.type,
    icon: options.icon
  });

  this.entityType = options.entityType;
  this.writerCtrl = this.controller.writerCtrl;
  this.$el.addClass('entities');
  this.$el.on('click', '.select-entity', _.bind(this.selectEntity, this));
};

EntityPanelView.Prototype = function() {

  this.selectEntity = function(e) {
    var entityId = $(e.currentTarget).attr("data-id");
    var tagEntityWorkfow = this.writerCtrl.workflows["tag_entity"];
    tagEntityWorkfow.endWorkflow(entityId, this.entityType);
    e.preventDefault();
  };

  this.render = function() {
    this.renderEntities();
    return this;
  };

  // Render entity
  // ----------------
  
  this.renderEntity = function() {
    throw new Error("this method is abstract");
  };

  // Render all available entities
  // ----------------

  this.renderEntities = function() {
    this.$entities = $('<div>').addClass('entities');

    _.each(this.controller.getEntities(), function(entity) {
      var $entity = this.renderEntity(entity);
      // Select Entity button (only shown during workflow)
      var $selectButton = $('<a>').addClass('select-entity').attr({"data-id": entity.id}).html('Select');
      $entity.append($selectButton);
      this.$entities.append($entity);
    }, this);

    this.$el.append(this.$entities);

    // List referenced (mentioned) entities
    this.updateView({mode: "list"});
  };

  this.updateView = function(viewState) {
    var self = this;
    this.$el.removeClass('select-mode').removeClass('list-mode');
    this.$el.addClass(viewState.mode+'-mode');

    var entityEls = this.$('.entity');
    entityEls.each(function() {
      var entityId = this.getAttribute("data-id");
      var entityRefs = self.writerCtrl.referenceIndex.get(entityId);
      if (Object.keys(entityRefs).length === 0) {
        $(this).addClass('unreferenced');
      } else {
        $(this).removeClass('unreferenced');
      }

      if (entityId === viewState.selectedResource) {
        $(this).addClass('active');
      }
    });
  };

  this.focusResource = function(entityId) {
    this.$('.entity.active').removeClass('active');
    var $entity = this.$('.entity[data-id='+entityId+']');
    $entity.addClass('active');
  };
};


EntityPanelView.Prototype.prototype = PanelView.prototype;
EntityPanelView.prototype = new EntityPanelView.Prototype();
EntityPanelView.prototype.constructor = EntityPanelView;

module.exports = EntityPanelView;