var Backbone = require('backbone')
    _ = require('underscore'),
    $ = Backbone.$,
    Editor = require('substance/ui/editor'),
    Component = require('substance/ui/component'),
    $$ = Component.$$;

Backbone.Form.editors.Htmleditor = Backbone.Form.editors.Base.extend({
  tagName: 'div',

  initialize: function(options) {
    // Call parent constructor
    Backbone.Form.editors.Base.prototype.initialize.call(this, options);
  },

  render: function() {
    var self = this;
    var value = self.value || "<p></p>";
    setTimeout(function(){
      $(function() { 

        self.proseEditor = Component.mount($$(Editor, {
          content: value
        }), self.$el);

      });
    }, 100);

    return this;
  },

  getValue: function() {
    return this.proseEditor.getContent();
  },

  setValue: function() {
  }
});