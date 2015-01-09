var NodesPanelView = require('substance-composer').NodesPanelView;
var _ = require("underscore");

var MetadataView = function(controller, viewFactory) {
  NodesPanelView.call(this, controller, viewFactory, {
    name: "metadata",
    label: "Info",
    title: "Info",
    type: "resource",
    icon: "icon-info"
  });

  this.writerCtrl = this.controller.writerCtrl;
  this.$el.addClass('metadata-panel');
};

MetadataView.Prototype = function() {

  this.focusResource = function(entityId) {
    // this.$('.entity.active').removeClass('active');
    // var $entity = this.$('.entity[data-id='+entityId+']');
    // $entity.addClass('active');
  };
};

MetadataView.Prototype.prototype = NodesPanelView.prototype;
MetadataView.prototype = new MetadataView.Prototype();
MetadataView.prototype.constructor = MetadataView;

module.exports = MetadataView;