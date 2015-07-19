var Backbone = require('backbone');

var ICONS_FOR_TYPE = {
  "error": "fa-exclamation-circle",
  "info": "fa-info",
  "progress": "fa-exchange",
  "success": "fa-check-circle",
};

var StatusBar = Backbone.View.extend({
  manage: true,
  initialize: function() {
    var self = this;
    this.state = self.model.get('type');
    self.model.set("type", ICONS_FOR_TYPE[self.model.get('type')]);
    self.model.on("change", function(){
      self.state = self.model.get('type');
      self.model.attributes.type = ICONS_FOR_TYPE[self.model.get('type')];
      self.render();
    });
    self.render();
  },
  serialize: function() {
    return { status: this.model, state: this.state };
  },
  template: '#statusbar'
});
exports.statusBar = StatusBar