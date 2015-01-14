var Backbone = require('backbone');

Backbone.Form.editors.ParentChooser = Backbone.Form.editors.Base.extend({

    tagName: 'div',

    className: 'parent',

    events: {
        'click .choose-parent': function(e) {
            e.preventDefault();
            this.trigger('click', this);
            this._onClickChoose();
        },
        'click .root-parent': function(e) {
            e.preventDefault();
            this.trigger('click', this);
            this._onClickRoot();
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
        var parentChooser = document.createElement('button');
        parentChooser.className = 'choose-parent';
        parentChooser.innerHTML = 'Choose new parent';
        this.el.appendChild(parentChooser);
        
        var rootChooser = document.createElement('button');
        rootChooser.className = 'root-parent';
        rootChooser.innerHTML = 'Make root';
        this.el.appendChild(rootChooser);

        return this;
    },

    _onClickChoose: function() {
      this.trigger('edit', this);
    },

    _onClickRoot: function() {
      this.model.set('parent','');
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