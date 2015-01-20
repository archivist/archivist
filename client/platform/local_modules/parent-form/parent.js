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
        'click .add-child': function(e) {
            e.preventDefault();
            this.trigger('click', this);
            this._onAddChild();
        },
        'click .remove': function(e) {
            e.preventDefault();
            this.trigger('click', this);
            this._onRemove();
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
        parentChooser.className = 'choose-parent btn';
        parentChooser.setAttribute('title', 'Choose new parent');
        parentChooser.innerHTML = '<i class="fa fa-bars"></i>';
        this.el.appendChild(parentChooser);
        
        var rootChooser = document.createElement('button');
        rootChooser.className = 'root-parent btn';
        rootChooser.setAttribute('title', 'Set root level');
        rootChooser.innerHTML = '<i class="fa fa-level-up"></i>';
        this.el.appendChild(rootChooser);

        var addChild = document.createElement('button');
        addChild.className = 'add-child btn';
        addChild.setAttribute('title', 'Add child subject');
        addChild.innerHTML = '<i class="fa fa-plus-square-o"></i>';
        this.el.appendChild(addChild);

        var mergeBtn = document.createElement('button');
        mergeBtn.className = 'merge btn';
        mergeBtn.setAttribute('title', 'Merge with another subject');
        mergeBtn.innerHTML = '<i class="fa fa-code-fork"></i>';
        this.el.appendChild(mergeBtn);

        var removeBtn = document.createElement('button');
        removeBtn.className = 'remove btn';
        removeBtn.setAttribute('title', 'Remove subject');
        removeBtn.innerHTML = '<i class="fa fa-trash-o"></i>';
        this.el.appendChild(removeBtn);

        return this;
    },

    _onClickChoose: function() {
      this.trigger('edit', this);
    },

    _onClickRoot: function() {
      this.model.set('parent','');
    },

    _onAddChild: function() {
      this.trigger('add', this);
    },

    _onRemove: function() {
      var confirm = window.confirm("Are you sure you want to do this?\nThis action can't be undone. Think twice!");
      if(confirm) {
        this.model.destroy();
      }
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