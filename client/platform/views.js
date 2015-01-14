var Backbone = require('backbone'),
    Backgrid = require('backgrid'),
    moment = require('moment'),
    Paginator = require('backbone.paginator'),
    Pageable = require('./local_modules/backgrid-paginator/backgrid-paginator.js'),
    layoutmanager = require('backbone.layoutmanager'),
    forms = require('backbone-forms'),
    parent = require('./local_modules/parent-form/parent.js'),
    bootstrapForms = require('./local_modules/bootstrap-form/bootstrap3.js'),
    filters = require('backgrid-filter'),
    _ = require('underscore'),
    $ = require('jquery'),
		Notify = require('./local_modules/notify/notify.js')

var MainGrid = Backbone.Layout.extend({
  icon: '',
  initialize: function() {
    this.grid = new Backgrid.Grid({
      row: ClickableRow,
      columns: this.options.columns,
      collection: this.options.collection
    });
    $(this.$el).append(this.grid.render().$el);
    this.paginator = new Backgrid.Extension.Paginator({
  		columns: this.options.columns,
  		collection: this.options.collection
	  });
	  $(this.$el).append(this.paginator.render().$el);
    this.createContextPanel();
    this.contextMenu.reset(this.panel);
  },
  afterRender: function() {
    $('#' + this.icon).addClass('active');
    this.$el.addClass(this.options.class);
    this.filters();
  },
  filters: function() {},
  createContextPanel: function() {
    var contextPanel = document.createElement("div");
    contextPanel.id = "context-panel";
    contextPanel.className = "context-panel";
    contextPanel.innerHTML = '<div class="context-filters"></div>';
    this.$el.prepend(contextPanel);
  },
  close: function() {
    $('#' + this.icon).removeClass('active');
    this.grid.remove();
    this.remove();
    this.unbind();
  },
  panel: []
})
exports.mainGrid = MainGrid

var EditPage = Backbone.View.extend({
  manage: true,
  template: '#page',
  options_def: {
    class: 'stack-item'
  },
  initialize: function() {
    var self = this;
    if(self.add) {
      self.contextMenu.reset(self.panelAdd);
    } else {
      self.contextMenu.reset(self.panelEdit);
      self.template = '#editpage';
    }
  },
  beforeRender: function() {
    this.form = new Backbone.Form({
      model: this.model
    }).render();
  },
  afterRender: function() {
    var self = this;
    this.$el.addClass(this.options_def.class);
    this.$el.css('background-color', 'rgba(0,0,0,0.8)');
    this.$el.find('.form').append(this.form.el);
  },
  serialize: function() {
    return { model: this.model.attributes };
  },
  close: function() {
    this.remove();
    this.unbind();
  },
  _delete: function() {
    var self = this;
    bootbox.confirm("Вы собираетесь удалить запись из базы данных. Вы уверены?", function(result) {
      if(result) {
        Notify.spinner('show');
        self.collection.remove(self.model);
        self.model.destroy({
          wait: true,
          success: function(model,resp) {
            Notify.spinner('hide');
            Notify.info('Запись удалена');
            self.layout.removeFromStack();
          },
          error: function(model,err) { 
            Notify.spinner('hide');
            Notify.info('Запись не удалена. Произошла ошибка.');
          }
        });
      }
    });
  },
  _save: function() {
    var self = this;
    var errors = self.form.commit();
    if(!errors) {
      Notify.spinner('show');
      self.model.save({}, {
        wait: true,
        success: function(model,resp) { 
          Notify.spinner('hide');
          var notice = Notify.info('Запись сохранена');
          self.layout.removeFromStack();
        },
        error: function(model,err) { 
          Notify.spinner('hide');
          var notice = Notify.info('Запись не сохранилась. Произошла ошибка.');
        }
      });
    }
  },
  _create: function() {
    var self = this;
    var errors = self.form.commit();
    if(!errors) {
      Notify.spinner('show');
      self.collection.create(self.model, {
        wait: true,
        success: function(model,resp) { 
          Notify.spinner('hide');
          var notice = Notify.info('Запись создана');
          self.layout.removeFromStack();
        },
        error: function(model,err) { 
          Notify.spinner('hide');
          var notice = Notify.info('Запись не создана. Произошла ошибка.');
        }
      });
    }
  },
  panelAdd: [
    {
      name: "create",
      icon: "save",
      fn: "_create"
    }
  ],
  panelEdit: [
    {
      name: "save",
      icon: "save",
      fn: "_save"
    },
    {
      name: "remove",
      icon: "remove",
      fn: "_delete"
    }
  ]
});
exports.editPage = EditPage

// ROOT VIEW
var MainLayout = Backbone.Layout.extend({
  el: 'body',

  events: {
    'click #goback, click .close-stack, exit': 'removeFromStack',
    'keyup' : 'keyup',
  },
  
  changeLayout: function(v) {
  	this.stackView.closeStack();
    this.stackView = new StackView();
    this.stackView.setRootView(v);
    this.setView('#stackView', this.stackView).render();
  },

  addContext: function(v) {
    this.stackView.insertView('#context-panel', v).render();
  },
	
	keyup: function(e){
		if (e.which == 27 && $(e.target).is('body') && !$(e.target).hasClass('modal-open')) {
			this.removeFromStack();
		}
	},

  getRoot: function() {
    return this.stackView.getFirst();
  },

  getTop: function() {
    return this.stackView.getLast();
  },
	
  addToStack: function(v) {
    this.stackView.push(v);
  },

  removeFromStack: function() {
    this.stackView.pop();
    this.contextMenu.trigger("restore");
  },

  initialize: function() {
    // Create a new StackView and the root view.
    this.stackView = new StackView();
    this.stackView.setRootView(this.options.rootView);
    this.setView('#stackView', this.stackView);
  }
});
exports.mainLayout = MainLayout

// STACK MANAGER
var StackView = Backbone.Layout.extend({
  hasRootView: false,

  // Define options for transitioning views in and out.
  options_def: {
    inTransitionClass: 'animated fadeInLeft',
    outTransitionClass: 'animated fadeOutRight',
    transitionDelay: 1000,
    class: 'stacks'
  },

  afterRender: function() {
    this.$el.addClass(this.options_def.class);
  },

  // Pop the top-most view off of the stack.
  pop: function() {
    var views = this.getViews().value();

    if (views.length > (this.hasRootView ? 1 : 0)) {
      var view = views.pop();
      this.transitionViewOut(view);
    }
  },

  getFirst: function() {
    var views = this.getViews().value();
    return views[0];
  },

  getLast: function() {
    var views = this.getViews().value();
    return views[views.length - 1];
  },

  // Push a new view onto the stack.
  // The itemClass will be auto-added to the parent element.
  push: function(view) {
    this.insertView(view);
    this.transitionViewIn(view);
  },

  // Trastition the new view in.  This is broken out as a method for convenient
  // overriding of the default transition behavior.  If you only want to change
  // the animation use the trasition class options instead.
  transitionViewIn: function(view) {
    this.trigger('before:transitionIn', this, view);
    view.$el.addClass(this.options_def.inTransitionClass);
		
    view.render();

    setTimeout(function() {
      this.trigger('transitionIn', this, view);
    }.bind(this), this.options_def.transitionDelay);
  },
  
  // Trastition a view out.  This is broken out as a method for convenient
  // overriding of the default transition behavior.  If you only want to change
  // the animation use the trasition class options instead.
  transitionViewOut: function(view) {
    this.trigger('before:transitionOut', this, view);
    view.$el.addClass(this.options_def.outTransitionClass);
    Backbone.middle.trigger("goToPrevious");
    setTimeout(function() {
      view.close();
      this.trigger('transitionOut', this, view);
    }.bind(this), this.options_def.transitionDelay);
  },

  setRootView: function(view) {
    this.hasRootView = true;
  	this.setView(view);
  },

  closeStack: function() {
    var views = this.getViews().value();
    _.each(views, function(view){
      view.close();
    });
    this.remove();
    this.unbind();
  }
});
exports.stackView = StackView

var DocumentsGrid = MainGrid.extend({
  icon: 'dashboard',
  className: 'dashboard',
  initialize: function() {
    this.grid = new Backgrid.Grid({
      row: DocumentRow,
      columns: this.options.columns,
      collection: this.options.collection
    });
    $(this.$el).append(this.grid.render().$el);
    this.paginator = new Backgrid.Extension.Paginator({
      columns: this.options.columns,
      collection: this.options.collection
    });
    $(this.$el).append(this.paginator.render().$el);
    this.createContextPanel();
    this.contextMenu.reset(this.panel);
  },
	filters: function() {
    this.titleFilter = new Filter({
      collection: this.options.collection,
      placeholder: "Enter a title to search",
      name: "nodes.document.title",
    });
    this.$el.find('.context-filters').prepend(this.titleFilter.render().el);
	},
  _add: function() {
    Backbone.middle.trigger("goToExt", 'editor/new')
  },
  panel: [
    {
      name: "Add new document",
      icon: "plus",
      fn: "_add"
    }
  ]
})
exports.documentsGrid = DocumentsGrid


var ListView = Backbone.View.extend({
  tagName: "div",
  className: "list",

  initialize: function (options) {
    var listItems = this.listItems = options.items;

    // add new item to the list
    this.listenTo(listItems, "add", function (item) {
      this.addItem(item);
    })

    this.listenTo(listItems, "change", function (item) {
      this.updateItem(item);
    })

    // remove item from list
    this.listenTo(listItems, "remove", function (item) {
      this.removeItem(item);
    })

    this.listenTo(listItems, "changeParent", function (itemId, parentId) {
      this.changeParent(itemId, parentId);
    })

    this.on("parent:choose", function(child) {
      this.stopListening(this.listItems, "list:getitem");
      listItems.once("list:getitem", function(parent) {
        child.set('parent', parent.get('id'));
        this.registerItemListner();
        this.updateHiercharchy();
      }, this);
    })

    this.registerItemListner();
  },

  registerItemListner: function() {
    this.listenTo(this.listItems, "list:getitem", function (item) {
      item.trigger("list:edit", item)
    })
  },

  prepareViews: function() {
    this.itemViews = {};
    this.listItems.each(function(item) {
      this.itemViews[item.cid] = new ItemView({model: item}).render();
    }, this);
  },

  addItem: function(item) {
    // model creation
    // make changes without set method to avoid change event call
    item.attributes.id = item.cid;
    this.itemViews[item.cid] = new ItemView({model: item}).render();
    this.updateHiercharchy();
  },
 
  // doesnt affect hierarchy
  updateItem: function(item) {
    this.itemViews[item.cid].render() // re-render
    this.updateHiercharchy();
  },

  removeItem: function(item) {
    this.itemViews[item.cid].remove()
    this.updateHiercharchy();
  },

  changeParent: function(itemId, parentId) {
    var model = this.listItems.get(itemId);
    model.set('parent', parentId);
  },

  updateHiercharchy: function() {
    var self = this;
 
    // Build a map of parents referencing their kids
    var map = {};
    _.each(self.itemViews, function(item) {
      var parent = item.model.get('parent') || "root";
      if (!map[parent]) {
        map[parent] = [ item ];
      } else {
        map[parent].push(item);
      }
    });

    function renderChildren(parent) {
      var listEl = document.createElement('ol');
 
      var items = map[parent];
      if (!items) return listEl; // exit condition      
      
      _.each(items, function(item) {
        var listItemEl = self.itemViews[item.model.cid].render().el;

        var childList = renderChildren(item.model.get('id'));
        listItemEl.appendChild(childList);
        listEl.appendChild(listItemEl);
      });
      
      return listEl;
    }
    var listEl = renderChildren("root");
    self.$el.append(listEl);
  },

  render: function() {
    this.prepareViews();
    this.updateHiercharchy();
    this.delegateEvents();
    return this;
  },

  remove: function() {

  }

});


var ItemView = Backbone.View.extend({
  tagName: "li",

  events: {
    'click': 'chooseItem',
    'dragstart': '_onDragStart',
    'dragenter': '_onDragEnter',
    'dragleave': '_onDragLeave',
    'dragover': '_onDragOver',
    'drop': '_onDrop',
    'dragend': '_onDragEnd'
  },

  initialize: function () {
    var model = this.model;

    model.on("change", function () {
      this.render();
    }, this);
  },

  render: function () {
    this.$el.empty();
    var model = this.model;
    var content = document.createElement('span');
    content.textContent = model.get('name');
    this.$el.append(content);
    this.$el.attr("draggable","true");
    this.delegateEvents();
    return this;
  },

  chooseItem: function(e) {
    var model = this.model;
    model.trigger("list:getitem", model);
    e.preventDefault();
    e.stopPropagation();
  },

  remove: function () {

  },


  _onDragStart: function(e) {
    e.stopPropagation();

    var id = this.model.get('id');

    if (e.originalEvent) e = e.originalEvent
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    e.target.style.opacity = '0.5';
    e.target.className = 'dragging';
    //e.target.style.display = 'none';
    return true;
  },

  _onDragEnd: function(e) {
    if (e.originalEvent) e = e.originalEvent
    e.target.style.opacity = '1';
    e.target.className = '';
  },

  _onDragEnter: function(e) {
    e.stopPropagation();
    if (e.originalEvent) e = e.originalEvent;
    if (e.target.tagName == 'SPAN' && !$(e.target).parents('.dragging').length) {
      this._insertDragPlaceholder(e.target);
    }
  },

  _onDragLeave: function(e) {
    e.stopPropagation();
    if (e.originalEvent) e = e.originalEvent;
    if (e.target.tagName == 'SPAN') {
      this._removeDragPlaceholder();
    }
  },

  _onDragOver: function(e) {
    e.preventDefault();
  },

  _onDrop: function(e) {
    e.stopPropagation();
    if (e.originalEvent) e = e.originalEvent;

    var id = e.dataTransfer.getData("text/plain");
    if(id != this.model.get('id') && !$(e.target).parents('.dragging').length) this.model.trigger('changeParent', id, this.model.get('id'));

    return false;
  },

  _insertDragPlaceholder: function(target) {
    this._removeDragPlaceholder();
    var dropzone = document.createElement('span');
    dropzone.setAttribute('id','dropzone');
    target.nextSibling.insertBefore(dropzone, target.nextSibling.firstChild);
  },

  _removeDragPlaceholder: function() {
    var dropzone = document.getElementById("dropzone");
    if (dropzone) dropzone.parentNode.removeChild(dropzone);
  }

});

// SUBJECT PAGES

var SubjectsView = Backbone.Layout.extend({
  icon: 'subjects',
  className: 'subjects',
  template: '#subjectsLayout',

  initialize: function() {
    var self = this;
    this.collection.on('list:edit', function(model) {
      this.editSubject(model);
    }, this);
  },
  beforeRender: function() {

  },
  afterRender: function() {
    var self = this;
    $('#' + this.icon).addClass('active');
    this.contextMenu.reset(this.panel);
    this.list = new ListView({items: self.collection}).render();
    this.$el.append(this.list.el);
  },
  editSubject: function(model) {
    var self = this,
        sidebar = this.$el.find('.sidebar');
    sidebar.empty();
    this.form = new Backbone.Form({
      model: model
    }).render();
    this.form.on('change', function() {
      this.commit();
    });
    this.form.on('parent:edit', function(item) {
      self.list.trigger('parent:choose', item.model);
    })
    this.collection.once('list:itemparent', function(item){
      this.form.trigger("parent:choosed", item);
    }, this);
    sidebar.html(this.form.el);
    //this.insertView('.sidebar', this.form).render();
    //this.$el.html(this.form.el);
    return this;
    //console.log(e)
    // var subjectId = e.target.parentElement.dataset.id,
    //     termForm = new TermEdit({model: this.terms.get(termId)});

    // var modal = new Backbone.BootstrapModal({ content: termForm, animate: true }).open();
  },
  _save: function() {
  
  },
  _add: function() {
    this.collection.add({ name: "Untitled" });
  },
  close: function() {
    $('#' + this.icon).removeClass('active');
    this.remove();
    this.unbind();
  },
  panel: [
    {
      name: "save",
      icon: "save",
      fn: "_save"
    },
    {
      name: "Add new subject",
      icon: "plus",
      fn: "_add"
    }
  ]
})
exports.subjectsView = SubjectsView

var SubjectsEdit = Backbone.View.extend({
  className: "subject-edit",
  initialize: function () {
    this.bind("ok", this._save);
    this.bind("cancel", this.close);
  },
  render: function() {
    this.form = new Backbone.Form({
      model: this.model
    }).render();
    this.$el.html(this.form.el);
    return this;
  },
  _save: function(modal) {
    modal.preventClose();

    var self = this,
        errors = self.form.commit();

    if(!errors) {
      Notify.spinner('show');
      self.model.save({}, {
        wait: true,
        success: function(model,resp) { 
          Notify.spinner('hide');
          var notice = Notify.info('New subject has been saved');
          modal.close();
          self.remove();
        },
        error: function(model,err) { 
          Notify.spinner('hide');
          var notice = Notify.info('Sorry, the error occured!');
          console.log(err);
        }
      });
    }
  },
  close: function() {
    this.remove();
    this.unbind();
  }
})
exports.subjectsEdit = SubjectsEdit


//MENU

var MainMenu = Backbone.View.extend({
  manage: true,
  events: {
    'click li:not(.active)': 'goToInternal'
  },
  initialize: function() {
    var self = this;
    self.render();
  },
  template: '#mainmenu',
  goToInternal: function(e) {
    e.preventDefault()
    Backbone.middle.trigger("goTo", e.currentTarget.dataset.url)
  },
  serialize: function() {
    return { items: this.collection };
  }
});
exports.mainMenu = MainMenu

// CONTEXT MENU

var ContextMenu = Backbone.View.extend({
  manage: true,
  className: "context-toolbar animate",
  events: {
    'click .btn': '_run'
  },
  initialize: function() {
    var self = this;
    self.render();
    self.collection.on("reset", function(col, prev){
      self.prev = prev.previousModels;
      self.render();
    });
    self.collection.on("restore", self.restore, self);
  },
  template: '#contextmenu',
  serialize: function() {
    return { items: this.collection };
  },
  restore: function() {
    this.collection.reset(this.prev);
  },
  _run: function(e) {
    e.preventDefault();
    var view = this.layout.getRoot(),
        fn = e.currentTarget.dataset.fn;

    view[fn]();
  },
  close: function() {
    this.remove();
    this.unbind();
  }
});
exports.contextMenu = ContextMenu;

// UTILS

var ClickableRow = Backgrid.Row.extend({
  events: {
    "click": "onClick"
  },
  onClick: function (e) {
    e.preventDefault()
    if(e.target.className.indexOf('string-cell') != -1 || e.target.className.indexOf('moment-cell') != -1) {
      var url = this.model.urlRoot.split('/')
      Backbone.middle.trigger("goTo", '/' + url[2] + '/' + this.model.id)
    }
  }
});
exports.clickableRow = ClickableRow

var DocumentRow = Backgrid.Row.extend({
  events: {
    "click": "onClick"
  },
  onClick: function (e) {
    e.preventDefault()
    Backbone.middle.trigger("goToExt", '/editor/' + this.model.get('id'));
  }
});
exports.documentRow = DocumentRow

var DocumentCell = Backgrid.ObjectCell = Backgrid.Cell.extend({
  className: "string-cell document-cell animate",
  render: function () {
    this.$el.empty();
    var formattedValue = this.formatter.fromRaw(this.model.get('nodes'));
    if(_.isNull(formattedValue) || _.isEmpty(formattedValue)){
      this.delegateEvents();
      return this;
    }
    else {
      var metadata = formattedValue.document;

      var markup = '<div class="title">' + metadata.title + '</div> \
                    <span class="delete-document">Delete</span> \
                    <div class="container"> \
                    <div class="authors">by ' + metadata.authors.join(', ') + '</div> \
                    <div class="updated-at">updated at ' + moment(metadata.updated_at).fromNow() + '</div> \
                    </div>';

      this.$el.append(markup)
      this.delegateEvents()
      return this;
    }
  }
});
exports.documentCell = DocumentCell

var Filter = Backgrid.Extension.ServerSideFilter.extend({
  className: "backgrid-filter form-search animate",
  initialize: function (options) {
      Backgrid.Extension.ServerSideFilter.__super__.initialize.apply(this, arguments);
      this.name = options.name || this.name;
      this.placeholder = options.placeholder || this.placeholder;
      this.template = options.template || this.template;

      // Persist the query on pagination
      var collection = this.collection, self = this;
      if (Backbone.PageableCollection &&
          collection instanceof Backbone.PageableCollection &&
          collection.mode == "server") {
          if(_.isUndefined(collection.queryParams.query)) {
          collection.queryParams.query = {};
        }
          collection.queryParams.query[this.name] = function () {
            var value = self.searchBox().val();
            if(!_.isEmpty(value)){
              return JSON.stringify({ $regex: value, $options: 'i' });
            } else {
              return null;
            }
          };
        }
    },
  search: function (e) {
    if (e) e.preventDefault();

    var data = { query: {} };
    data.query = JSON.stringify({ $regex: this.searchBox().val(), $options: 'i' });

    var collection = this.collection;
    // go back to the first page on search
    if (Backbone.PageableCollection &&
          collection instanceof Backbone.PageableCollection) {
          collection.getFirstPage({data: data, reset: true, fetch: true});
    }
    else collection.fetch({data: data, reset: true});
    },
});
exports.filter = Filter