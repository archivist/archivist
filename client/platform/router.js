var Backbone = require('backbone')
  , Backgrid = require('backgrid')
  , moment = require('moment')
  , _ = require('underscore')
  , models = require('./models/index.js')
  , views = require('./views.js')
  , Notify = require('./local_modules/notify/notify.js');

var menuData = [
  {
    name: 'Dashboard',
    id: 'dashboard',
    icon: 'tasks',
    url: '/'
  },
  {
    name: 'Subjects',
    id: 'subjects',
    icon: 'tags',
    url: '/subjects'
  }
]

var Router = Backbone.Router.extend({
	initialize: function() {
    this.on("all", this.storeRoute)
    this.history = []
    this.layout = ''
    this.notice = {}
    this.initialized = false
    this.buildMenu()
    this.contextMenu = new models.contextItems()
	},
	routes: {
    '': 'dashboard',
    'subjects': 'subjects',
    'subjects/add': 'subjectAdd',
    'subjects/:id': 'subjectEdit'
	},
  dashboard: function(callback, id) {
    var dashboardGrid = [
      {
        name: 'nodes.document.title',
        label: 'sort by title',
        editable: false,
        cell: views.documentCell
      }
    ];
    this.grid(dashboardGrid, 'documents', 'documentsGrid', callback, id);
  },

  subjects: function(callback, id) {
    Notify.spinner('show');

    var self = this;
        
    self.subjects = new models.subjects()

    self.subjects.fetch().done(function() {
      var subjectsView = new views.subjectsView({ collection: self.subjects, contextMenu: self.contextMenu });
      self.changeLayout(subjectsView, callback, id);
      Notify.spinner('hide');
      Notify.info( 'Data has been loaded' );
    });
  },

  subjectPage: function(id) {
      Notify.spinner('show');

      var self = this,
          model = models.subject.create({_id:id}),
          terms = new models.terms([],{ queryParams: {query: {dictionary: id}}, state: {pageSize: 500}})

      model.fetch().done(function() {
        terms.fetch().done(function() {
          var view = new views.categoryView({ model: model, collection: self.dictionaries, contextMenu: self.contextMenu, layout: self.layout, terms: terms });   
          self.layout.stackView.push(view);
          Notify.spinner('hide');
          Notify.info( 'Data has been loaded' );
        });
      });
  },

  grid: function(grid, colName, viewName, callback, id) {
    Notify.spinner('show');

    var self = this;
        
    self[colName] = new models[colName]()

    self[colName].fetch().done(function(){
      var gridView = new views[viewName]({ collection: self[colName], columns: grid, contextMenu: self.contextMenu });
      self.changeLayout(gridView, callback, id);
      Notify.spinner('hide');
      Notify.info( 'Data has been loaded' );
    });
  },

  edit: function(id, parentName, name, modelName, colName) {
    if(!this.initialized) {
      this[parentName](name, id);
    } else {
      Notify.spinner('show');

      var self = this,
          model = models[modelName].create({_id:id});

      model.fetch().done(function() {
        var view = new views.editPage({ model: model, collection: self[colName], add: false, contextMenu: self.contextMenu, layout: self.layout, sidebarItems: relations });   
        self.layout.stackView.push(view);
        Notify.spinner('hide');
        Notify.info( 'Data has been loaded' );
      });
    }
  },

  add: function(parentName, name, modelName, colName) {
    if(!this.initialized) {
      this[parentName](name);
    } else {

      var self = this,
          model = models[modelName].create();

      var view = new views.editPage({ model: model, collection: self[colName], add: true, contextMenu: self.contextMenu, layout: self.layout });   
      self.layout.stackView.push(view)
    }
  },

  storeRoute: function(e) {
    if(e != 'route') {
      this.history.push(Backbone.history.fragment)
    }
  },
  
  previous: function() {
    if (this.history.length > 1) {
      this.navigate(this.history[this.history.length - 2], false)
      this.history.pop()
    } else {
      this.navigate('/', true)
    }
  },

  changeLayout: function(v, callback, id) {
    if (!this.initialized) {
      this.layout = new views.mainLayout({rootView: v, contextMenu: this.contextMenu}).render()
      this.initialized = true;
      this.buildContextMenu()
    } else {
      this.layout.changeLayout(v);
      this.buildContextMenu()
    }
    if (callback) this[callback](id);
  },

  buildMenu: function() {
    var menuItems = new models.menuItems();
    menuItems.set(menuData);
    var menu = new views.mainMenu({ collection: menuItems, el: $('div.toolbox') });
  },

  buildContextMenu: function() {
    var self = this;
    var contextMenu = new views.contextMenu({ collection: this.contextMenu, layout: this.layout });
    this.layout.addContext(contextMenu);
  }
})

module.exports = Router