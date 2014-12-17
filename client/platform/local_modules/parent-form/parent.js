var Backbone = require('backbone');

Backbone.Form.editors.ParentChooser = Backbone.Form.editors.Base.extend({

    tagName: 'button',

    className: 'parent',

    events: {
        'click': function(e) {
            e.preventDefault();
            this.trigger('click', this);
            this._onClick();
        },
        'focus': function() {
            this.trigger('focus', this);
        },
        'blur': function() {
            this.trigger('blur', this);
        }
    },

    initialize: function(options) {
        Backbone.Form.editors.Base.prototype.initialize.call(this, options);
    },

    render: function() {
        this.el.innerHTML = 'Choose new parent';

        return this;
    },

    _onClick: function() {
      this.trigger('edit', this);
    },

    focus: function() {
        if (this.hasFocus) return;

        this.$el.focus();
    },

    blur: function() {
        if (!this.hasFocus) return;

        this.$el.blur();
    }
});