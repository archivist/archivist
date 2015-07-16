var Backbone = require('backbone')
    _ = require('underscore');

Backbone.Form.editors.Geocoded = Backbone.Form.editors.Text.extend({

  initialize: function(options) {
    this.options = options || {};

    Backbone.Form.editors.Text.prototype.initialize.call(this, options);
    
    this.template = this.options.template || this.constructor.template;
  },

  render: function() {
    var self = this;

    var $el = $($.trim(this.template({
      item: self
    })));

    //Remove the wrapper tag

    this.setElement($el);

    this.$input = this.$el.find('input');
    this.$button = this.$el.find('i');

    this.$input.attr('name', this.getName());

    this.setValue(this.value);

    //debugger;
    if (this.hasFocus) this.trigger('blur', this);
    this.$button.on('click', function(){
      self.geocode();
    });

    return this;
  },

  getValue: function() {
    return this.$input.val();
  },

  setValue: function(data) {
    this.$input.val(data);
  },

  geocode: function() {
    this.model.trigger('geocode', this.getValue());
  } 

}, {
  template: _.template('\
    <div class="geocoded-input">\
      <input type="text" placeholder="<%- item.schema.editorAttrs.placeholder %>" name="<%= item.name %>" id="<%= item.id %>" class="form-control" value="" autofocus>\
      <i class="fa fa-map-marker"></i>\
    </div>\
  ', null, Backbone.Form.templateSettings)
});