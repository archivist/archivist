var Backbone = require('backbone'),
    select2 = require('Select2');


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

Backbone.Form.editors.Select2 = Backbone.Form.editors.Select.extend ({

  events: {
    'select2-blur': function(event) {
      if (!this.hasFocus) return;
      var self = this;
      setTimeout(function() {
        if ($('#s2id_'+self.id).hasClass('select2-container-active')) return;
        self.trigger('blur', self);
      }, 100);
    },
    'select2-focus': function(event) {
      this.trigger('focus', this);
    },
    'change': function(event) {
      this.trigger('change', this);
    }
  },

  render: function() {

    this.setOptions(this.schema.options);
    var multiple = this.schema.multiple;
    var config = this.schema.config || {};

    var elem = this;
    setTimeout(function() {
      if (multiple) {
        elem.$el.prop('multiple', true);
      }

      elem.$el.select2(config);
      elem.$el.val(elem.value).trigger('change');
    }, 0);

    return this;
  },

  setValue: function(val) {
    this.$el.select2({data: val});
  },

  disable: function() {
    this.$el.select2('readonly', true);
  }
});
