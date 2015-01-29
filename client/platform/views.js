var Backbone = require('backbone'),
    Backgrid = require('backgrid'),
    moment = require('moment'),
    Paginator = require('backbone.paginator'),
    Pageable = require('./local_modules/backgrid-paginator/backgrid-paginator.js'),
    layoutmanager = require('backbone.layoutmanager'),
    forms = require('backbone-forms'),
    parent = require('./local_modules/parent-form/parent.js'),
    bootstrapForms = require('./local_modules/bootstrap-form/bootstrap3.js'),
    modal = require('./node_modules/backbone.modal/backbone.modal.js'),
    filters = require('backgrid-filter'),
    _ = require('underscore'),
    $ = require('jquery'),
    jstree = require('./local_modules/jstree/dist/jstree.js'),
    request = require('superagent'),
    ObjectId = require('./local_modules/objectid/Objectid.js'),
		Notify = require('./local_modules/notify/notify.js')

var MainGrid = Backbone.Layout.extend({
  icon: '',
  title: 'Archivist',
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
    Backbone.middle.trigger('domchange:title', this.title);
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
  title: 'Dashboard',
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
        this.updateHierarchy();
      }, this);
    })

    this.on("parent:merge", function(child) {
      this.stopListening(this.listItems, "list:getitem");
      listItems.once("list:getitem", function(parent) {
        request
          .get('/api/subjects/merge')
          .query({ one: child.id, into: parent.id })
          .end(function(res){
            if(res.ok) console.log("Merged: " + child.id + " into " + parent.id);
          });
      }, this);
    })

    this.registerItemListner();
  },

  registerItemListner: function() {
    this.listenTo(this.listItems, "list:getitem", function (item, el) {
      $('div.list li.active').removeClass('active');
      el.addClass('active');
      item.trigger("list:edit", item)
    })
  },

  prepareViews: function() {
    this.itemViews = {};
    this.listItems.each(function(item) {
      this.itemViews[item.id] = new ItemView({model: item}).render();
    }, this);
  },

  addItem: function(item) {
    // model creation
    this.itemViews[item.id] = new ItemView({model: item}).render();
    this.updateHierarchy();
  },
 
  // doesnt affect hierarchy
  updateItem: function(item) {
    var isParent = this.listItems.findWhere({parent: item.id}) ? true : false;
    this.itemViews[item.id].render(isParent) // re-render
    this.updateHierarchy(item);
  },

  removeItem: function(item) {
    this.itemViews[item.id].remove()
    this.updateHierarchy();
  },

  changeParent: function(itemId, parentId) {
    var model = this.listItems.get(itemId),
        isParent = this.listItems.findWhere({parent: itemId}) ? true : false;
    model.set('parent', parentId);
    this.updateHierarchy();
  },

  updateHierarchy: function(item) {
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

    //debugger;

    function renderChildren(parent) {
      var listEl = document.createElement('ol');
 
      var items = map[parent];
      if (!items) return listEl; // exit condition      
      
      _.each(items, function(item) {
        var isParent = map.hasOwnProperty(item.model.id);
        var listItemEl = self.itemViews[item.model.id].render(isParent).el;

        var childList = renderChildren(item.model.id);
        listItemEl.appendChild(childList);
        listEl.appendChild(listItemEl);
        if (isParent) item._collapseItem(item.$el);
      });

      return listEl;
    }

    var listEl = item ? renderChildren(item.id) : renderChildren("root");
    if (item) {
      this.itemViews[item.id].$el.append(listEl);
    } else {
      self.$el.append(listEl);
    }
    
  },

  render: function() {
    this.prepareViews();
    this.updateHierarchy();
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
    'click .collapse': '_onCollapseItem',
    'click .expand': '_onExpandItem',
    'click .drag-handle': '_dragHandleClick',
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

  render: function (parent) {
    this.$el.empty();

    var dragHandle = document.createElement('button');
    dragHandle.classList.add("drag-handle");
    dragHandle.innerHTML = '<i class="fa fa-bars"></i>';
    dragHandle.setAttribute("draggable", true);
    this.$el.append(dragHandle);

    var collapseBtn = document.createElement('button');
    collapseBtn.classList.add("collapse");
    collapseBtn.innerHTML = '<i class="fa fa-minus-square-o"></i>';
    collapseBtn.style.display = 'none';
    this.$el.append(collapseBtn);

    var expandBtn = document.createElement('button');
    expandBtn.classList.add("expand");
    expandBtn.innerHTML = '<i class="fa fa-plus-square-o"></i>';
    if(!parent) expandBtn.style.display = 'none';
    this.$el.append(expandBtn);

    var content = document.createElement('span');
    content.textContent = this.model.get('name');
    this.$el.append(content);
    this.delegateEvents();
    return this;
  },

  chooseItem: function(e) {
    var model = this.model;
    model.trigger("list:getitem", model, this.$el);
    e.preventDefault();
    e.stopPropagation();
  },

  remove: function () {

  },

  _dragHandleClick: function(e) {
    e.stopPropagation();
  },

  _collapseItem: function(item) {
    var lists = item.children('ol');
    if (lists.length) {
      item.addClass('collapsed');
      item.children('.collapse').hide();
      item.children('.expand').show();
      item.children('ol').hide();
    }
  },

  _onCollapseItem: function(e) {
    e.stopPropagation();
    var item = $(e.currentTarget).parent();
    this._collapseItem(item);
  },

  _expandItem: function(item) {
    item.removeClass('collapsed');
    item.children('.expand').hide();
    item.children('.collapse').show();
    item.children('ol').show();
  },

  _onExpandItem: function(e) {
    e.stopPropagation();
    var item = $(e.currentTarget).parent();
    this._expandItem(item);
  },

  _onDragStart: function(e) {
    e.stopPropagation();

    var id = this.model.get('_id');

    if (e.originalEvent) e = e.originalEvent
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setDragImage(e.target.parentNode,0,0);
    e.target.style.opacity = '0.5';
    e.target.parentNode.className = 'dragging';
    //e.target.style.display = 'none';
    return true;
  },

  _onDragEnd: function(e) {
    if (e.originalEvent) e = e.originalEvent
    e.target.style.opacity = '1';
    e.target.parentNode.className = '';
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
    if(id != this.model.id && !$(e.target).parents('.dragging').length) this.model.trigger('changeParent', id, this.model.id);

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

  events: {
    "click .import": "_runImport",
    "click .cancel": "_cancelImport"
  },

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
    this.form.on('parent:merge', function(item) {
      self.list.trigger('parent:merge', item.model);
    })
    this.form.on('parent:add', function(item) {
      self._add(item.model.id);
    })
    this.collection.once('list:itemparent', function(item){
      this.form.trigger("parent:choosed", item);
    }, this);
    sidebar.html(this.form.el);
    this.form.$el.find('input')[0].focus();
    //this.insertView('.sidebar', this.form).render();
    //this.$el.html(this.form.el);
    return this;
    //console.log(e)
    // var subjectId = e.target.parentElement.dataset.id,
    //     termForm = new TermEdit({model: this.terms.get(termId)});

    // var modal = new Backbone.BootstrapModal({ content: termForm, animate: true }).open();
  },
  _runImport: function() {
    var self = this,
        data = $('.import-data').val(),
        lines = data.split('\n'),
        map = [];

    _.each(lines, function(line, i) {
      var indentation = 0;
      while (line[indentation] == '\t') {
          indentation++;
      }
      if(!map[indentation]) map[indentation] = [];
      var name = line.split('\t').join(''),
          id = new ObjectId().toString(),
          parent = indentation > 0 ? map[indentation - 1][map[indentation - 1].length - 1] : '';

      map[indentation].push(id);

      self.collection.add({ _id: id, name: name, parent: parent });
    });
    self.$el.find('.sidebar').empty();
  },
  _cancelImport: function() {
    this.$el.find('.sidebar').empty();
  },
  _save: function() {
    this.collection.saveChanged();
  },
  _add: function(parentId) {
    var id = new ObjectId().toString(),
        parent = parentId ? parentId : '';
    this.collection.add({ _id: id, name: "Untitled", parent: parent });
  },
  _import: function() {
    $('div.list li.active').removeClass('active');
    var sidebar = this.$el.find('.sidebar');
    sidebar.empty();

    var dialog = document.createElement('div');
    dialog.innerHTML = '<textarea class="import-data" style="width: 100%;"></textarea><button class="import btn">Import</button><button class="cancel btn">Cancel</button>';
    sidebar.append(dialog);
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
    },
    {
      name: "import",
      icon: "file-text-o",
      fn: "_import"
    }
  ]
})
exports.subjectsView = SubjectsView

var SubjectsTreeView = Backbone.Layout.extend({
  icon: 'subjects',
  title: 'Subjects',
  className: 'subjects',
  template: '#subjectsTreeLayout',

  initialize: function() {
    $.jstree.currentState = {
      nodeToMerge: null
    };
  },
  beforeRender: function() {

  },
  afterRender: function() {

    var to = false;
    $('#search_subject').keyup(function () {
      console.log('searching...');
      if(to) { clearTimeout(to); }
      to = setTimeout(function () {
        var v = $('#search_subject').val();
        console.log('searching...', v);
        $('.tree').jstree(true).search(v);
      }, 250);
    });

    var self = this;
    Backbone.middle.trigger('domchange:title', this.title);
    $('#' + this.icon).addClass('active');
    this.contextMenu.reset(this.panel);
    $('.tree')
      .on("move_node.jstree", function(e, data) {
        self._onMoveNode(e, data, self);
      })
      .on("rename_node.jstree", function(e, data) {
        self._onRenameNode(e, data, self);
      })
      .jstree({
        "core" : {
          "animation" : 0,
          "check_callback" : true,
          "themes" : { "stripes" : true },
          "data": self.collection.buildSubjectsTree()
        },
        "contextmenu": {
          "items": function(o, cb) {
            return self.itemsFunc(o, cb, self);
          }
        },
        "types": {
          "default": {"icon": "glyphicon hidden-icon"}
        },
        "plugins" : [ "contextmenu", "dnd", "search", "state", "types", "wholerow", "sort"]
      });
  },


  itemsFunc: function(o, cb, context) {
    var self = this;

    o.model = context.collection.get(o.id);
    o.collection = context.collection;

    var res = $.jstree.defaults.contextmenu.items(o, cb);

    // Edit node
    // -----------

    res.edit = {
      "separator_before"  : false,
      "separator_after" : true,
      "_disabled"     : false,
      "label"       : "Description",
      "action"      : function (data) {
        var inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference),
            subject = obj.model;

        console.log('editing subject...');

        var editModal = new subjectModal({model: subject});

        $('#main').append(editModal.render().el);

      }
    };

    // Create a new node
    // -------------------

    res.create = {
      "separator_before"  : false,
      "separator_after" : true,
      "_disabled"     : false,
      "label"       : "Create",
      "action"      : function (data) {
        var inst = $.jstree.reference(data.reference),
          obj = inst.get_node(data.reference);

        console.log('creating a new subject...');

        var newNode = {
          _id: new ObjectId().toString(), // daniel you can try to remove this here
          name: 'New Subject',
          parent: obj.id
        };

        console.log('newnode', newNode);

        o.collection.create(newNode, {
          wait: true,
          success: function(model, resp) {
            console.log('success', model, resp);
            inst.create_node(obj, {id: newNode._id, text: newNode.name}, "last", function (new_node) {
              setTimeout(function () { inst.edit(new_node); },0);
            });

            Notify.spinner('hide');
            Notify.info('Subject ' + obj.model.get('name') + ' has been created!');
          },
          error: function(model,err) { 
            console.log(err);
            Notify.spinner('hide');
            Notify.info('Sorry, the error occured! Please reload the page and try again.');
          }
        });
      }
    };

    // No cut and paste for the moment
    delete res.ccp.submenu.copy;

    // Remove a node
    // -------------------

    res.remove = {
      "separator_before"  : false,
      "icon"        : false,
      "separator_after" : false,
      "_disabled"   : function (data) {
        if (!window.superaccess) return true;
        
        var inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference);
            hasChildren = obj.children.length > 0;

        return hasChildren; // Only leaf nodes can be deleted
      },
      "label"       : "Delete",
      "action"      : function (data, context) {
        var inst = $.jstree.reference(data.reference),
          obj = inst.get_node(data.reference);
        
        console.log('deleting...', obj.id);

        var dialog = new Backbone.Model({
          title: "Delete Subject",
          description: "Deleting a subject is critical operation, that also affects existing interviews. The operation can take up to a minute to complete. During that time the system will be turned into <b>maintenance mode</b>, where editors can not save documents.",
          action: "Confirm deletion",
          submitState: "Deleting...",
          initState: "Removing subject from documents..."
        })

        dialog.on('confirm', function(dialog){
          obj.model.destroy({
            success: function(model,resp) {
              if(inst.is_selected(obj)) {
                inst.delete_node(inst.get_selected());
              } else {
                inst.delete_node(obj);
              }
              dialog.submit('Done! Exiting from maintenance mode...', 'ok');
              Notify.spinner('hide');
              Notify.info('Subject ' + obj.model.get('name') + ' has been removed!');
            },
            error: function(model,err) { 
              Notify.spinner('hide');
              Notify.info('Sorry an error occurred!', err.responseText);
              dialog.submit(err, 'error');
              console.log(err);
            }
          });
        });

        var editDialog = new subjectDialog({model: dialog});
        $('#main').append(editDialog.render().el);
      }
    };

    // Start a merge
    // -------------------

    res.merge = {
      "separator_before"  : true,
      "_disabled"     : false,
      "label"       : "Merge",
      "_disabled"   : function (data) {
        if (!window.superaccess) return true;

        var inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference);
            hasChildren = obj.children.length > 0;
        return hasChildren; // Only leaf nodes can be merged
      },
      "action"      : function (data) {
        var inst = $.jstree.reference(data.reference),
            obj = inst.get_node(data.reference);

        console.log('obj node to merge', data.reference);
        $.jstree.currentState.nodeToMerge = obj.id;
      }
    };

    // Complete a merge
    // -------------------

    res.mergeInto = {
      "separator_before"  : false,
      "separator_after" : true,
      "_disabled"     : function (data) {
        if (!window.superaccess) return true;
        return !$.jstree.currentState.nodeToMerge;
      },
      "label"       : "Merge into",
      "action"      : function (data) {
        var inst = $.jstree.reference(data.reference),
            targetNode = inst.get_node(data.reference),
            nodeToMerge = inst.get_node($.jstree.currentState.nodeToMerge);

        if (!nodeToMerge) {
          console.log('seems like state.nodeToMerge is no longer in the tree. Doing nothing...');
          return;
        }

        if (nodeToMerge === targetNode) {
          Notify.spinner('hide');
          var notice = Notify.info('Can not merge with itself!');
          return;
        }
        
        console.log('completing merge of ', nodeToMerge.id, 'into ', targetNode.id);

        var dialog = new Backbone.Model({
          title: "Merge Subjects",
          description: "Merging subjects is critical operation, that also affects existing interviews. The operation can take up to a minute to complete. During that time the system will be turned into <b>maintenance mode</b>, where editors can not save documents.",
          submitState: "Merging...",
          initState: "Changing subjects in documents..."
        })

        dialog.on('confirm', function(dialog){
          request
            .get('/api/subjects/merge')
            .query({ one: nodeToMerge.id, into: targetNode.id })
            .end(function(res) {
              if (res.ok) {
                Notify.spinner('hide');

                inst.delete_node(nodeToMerge);
                $.jstree.currentState.nodeToMerge = null;
                dialog.submit('Done! Exiting from maintenance mode...', 'ok');
                Notify.info('Merge has been completed!');
              } else {
                Notify.spinner('hide');
                dialog.submit(err, res.text);
                var notice = Notify.info('Sorry, the error occured! Please reload the page and try again.');
              }
            });
        });

        var mergeDialog = new subjectDialog({model: dialog});
        $('#main').append(mergeDialog.render().el);
      }
    };

    return res;
  },
  close: function() {
    $('#' + this.icon).removeClass('active');
    this.remove();
    this.unbind();
  },
  _addNewSubject: function() {
    var id = new ObjectId().toString(),
        new_node = {'id': id, 'text': 'New Subject'};
    
    this.collection.create({ _id: new_node.id, name: new_node.text, parent: '' }, {
      success: function(model, resp) {
        $('.tree').jstree('create_node', '#', new_node, 'last', function (newJSTreeNode) {
          setTimeout(function() {
            $('.tree').jstree().edit(newJSTreeNode);
          },0);
        });

        Notify.spinner('hide');
        Notify.info('Subject ' + model.get('name') + ' has been created!');
      },
      error: function(model, err) { 
        Notify.spinner('hide');
        Notify.info('Sorry an error occurred!', err.responseText);
        console.log(err);
      }
    });
  },
  _onMoveNode: function(e, data, context) {
    console.log('node moved yay', e, data);
      
    var movedNode = data.node;
    var newParent = data.parent;
    var oldParent = data.old_parent;

    console.log('changing parent from node', movedNode.id, 'from', oldParent, 'to', newParent);

    // Use backbone stuff to retrieve the model with that id
    var subject = context.collection.get(movedNode.id);

    if(newParent == '#') newParent = '';

    subject.save('parent', newParent, {
      success: function(model, resp) { 
        Notify.spinner('hide');
        var notice = Notify.info('Subject ' + subject.get('name') + ' has been changed');
      },
      error: function(model, err) { 
        Notify.spinner('hide');
        console.log(err);
        alert('Sorry an error occurred: ', err);
        window.location.href = "/subjects";
      }
    })
  },
  _onRenameNode: function(e, data, context) {
    var updatedNode = data.node;
    var newName = data.text;
    var oldName = data.old;

    console.log('changing name of node', updatedNode.id, 'from', oldName, 'to', newName);

    // Use backbone stuff to retrieve the model with that id
    var subject = context.collection.get(updatedNode.id);

    subject.save('name', newName, {
      success: function(model, resp) { 
        Notify.spinner('hide');
        var notice = Notify.info('Subject ' + subject.get('name') + ' has been changed');
      },
      error: function(model, err) { 
        Notify.spinner('hide');

        console.log(err);
        alert('Sorry an error occurred: ', err);
        window.location.href = "/subjects";
      }
    })
  },
  panel: [
    {
      name: "Add new subject",
      icon: "plus",
      fn: "_addNewSubject"
    }
  ]
})
exports.subjectsTreeView = SubjectsTreeView

var subjectModal = Backbone.Modal.extend({
  prefix: 'subject-modal',
  keyControl: false,
  template: _.template($('#subjectModal').html()),
  cancelEl: '.cancel',
  submitEl: '.ok',
  submit: function() {
    var self = this,
        description = document.getElementById("description").value;

    self.model.save('description', description, {
      success: function(model, resp) { 
        Notify.spinner('hide');
        var notice = Notify.info('Subject ' + self.model.get('name') + ' has been updated');
      },
      error: function(model, err) { 
        Notify.spinner('hide');
        var notice = Notify.info('Sorry, the error occured! Please reload the page and try again.');
        console.log(err);
      }
    })
  }
});

var subjectDialog = Backbone.Modal.extend({
  prefix: 'subject-dialog',
  keyControl: false,
  template: _.template($('#subjectDialog').html()),
  cancelEl: '.cancel',
  submitEl: '.run',
  beforeSubmit: function() {
    debugger;
    this.$el.find('button').prop('disabled', true);
    this.$el.find('.run').text(this.model.get('submitState'));
    this.$el.find('#meter').show();
    this.$el.find('#state').html(this.model.get('initState'))
    this.model.trigger('confirm', this);
    return false;
  },
  submit: function(msg, state) {
    this.$el.find('#meter').addClass(state);
    this.$el.find('#state').addClass(state).html(msg);
    this.model.stopListening();
    setTimeout(function(dialog){
      dialog.destroy();
    }, 500, this);
  },
  cancel: function() {
    this.model.stopListening();
  }
});

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

// USERS GRID
var UsersGrid = MainGrid.extend({
  icon: 'users',
  title: 'Users',
  className: 'userlist',
  initialize: function() {
    $('#' + this.icon).addClass('active');
    this.grid = new Backgrid.Grid({
      columns: this.options.columns,
      collection: this.options.collection
    });
    $(this.$el).append(this.grid.render().$el);
  },
  filters: function() {
  }
})
exports.usersGrid = UsersGrid


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
    "click": "onClick",
    "click .delete-document": "onRemove"
  },
  onClick: function (e) {
    e.preventDefault();
    Backbone.middle.trigger("goToExt", '/archivist.html#state=composer.main;0.path='+this.model.get('id')+';1.contextId=toc');
  },
  onRemove: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var confirm = window.confirm("Are you sure you want to do this?\nThis action can't be undone. Think twice!");
    if(confirm) {
      this.model.destroy();
    }
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
                    <div class="updated-at">updated at ' + moment(metadata.updated_at).fromNow() + '</div>';

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