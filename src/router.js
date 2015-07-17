var Backbone = require('backbone')
  , Backgrid = require('backgrid')
  , moment = require('moment')
  , _ = require('underscore')
  , models = require('./models/index.js')
  , views = require('./views/index.js')
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
  },
  {
    name: 'Prisons',
    id: 'prisons',
    icon: 'th',
    url: '/prisons'
  },
  {
    name: 'Toponyms',
    id: 'topo',
    icon: 'globe',
    url: '/toponyms'
  },
  {
    name: 'Definitions',
    id: 'definition',
    icon: 'bookmark',
    url: '/definitions'
  },
  {
    name: 'Persons',
    id: 'person',
    icon: 'users',
    url: '/persons'
  },
  {
    name: 'Merge entities',
    id: 'merge',
    super: true,
    icon: 'code-fork',
    url: '/merge'
  },
  {
    name: 'Users',
    id: 'users',
    super: true,
    icon: 'user-plus',
    url: '/users'
  }
]

var Router = Backbone.Router.extend({
	initialize: function() {
    this.on("all", this.storeRoute)
    this.history = []
    this.layout = ''
    this.notice = {}
    this.initialized = false
    //this.initializeContainer()
    this.contextMenu = new models.contextItems()
	},
	routes: {
    '': 'dashboard',
    'subjects': 'subjectsList',
    'prisons': 'prisonsList',
    'prisons/map': 'prisonsMap',
    'prisons/add': 'prisonsAdd',
    'prisons/:id': 'prisonsEdit',
    'toponyms': 'toponymsList',
    'toponyms/map': 'toponymsMap',
    'toponyms/add': 'toponymsAdd',
    'toponyms/:id': 'toponymsEdit',
    'definitions': 'definitionsList',
    'definitions/add': 'definitionsAdd',
    'definitions/:id': 'definitionsEdit',
    'persons': 'personsList',
    'persons/add': 'personsAdd',
    'persons/:id': 'personsEdit',
    'merge': 'mergeList',
    'users': 'usersList'
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

  subjectsList: function(callback, id) {
    Notify.spinner('show');

    var self = this;
        
    self.subjects = new models.subjects()

    self.subjects.fetch().done(function() {
      var subjectsView = new views.subjectsTreeView({ collection: self.subjects, contextMenu: self.contextMenu });
      self.changeLayout(subjectsView, callback, id);
      Notify.spinner('hide');
      Notify.info( 'Data has been loaded' );
    });
  },

  toponymsList: function(callback, id) {
    var toponymsGrid = [
      {
        name: 'name',
        label: 'name',
        editable: false,
        cell: views.locationCell
      }
    ];
   
    this.grid(toponymsGrid, 'locationsToponyms', 'toponymsGrid', callback, id);
  },

  toponymsMap: function(callback, id) {
    this.map('locationsToponyms', 'toponymsMap', callback, id);
  },

  toponymsAdd: function() {
    this.add('toponymsList', 'toponymsAdd', 'toponym', 'locationsToponyms');
  },

  toponymsEdit: function(id) {
    this.edit(id, 'toponymsList', 'toponymsEdit', 'toponym', 'locationsToponyms');
  },

  prisonsList: function(callback, id) {
    var prisonsGrid = [
      {
        name: 'name',
        label: 'name',
        editable: false,
        cell: views.locationCell
      }
    ];
   
    this.grid(prisonsGrid, 'locationsPrisons', 'prisonsGrid', callback, id);
  },

  prisonsMap: function(callback, id) {
    this.map('locationsPrisons', 'prisonsMap', callback, id);
  },

  prisonsAdd: function() {
    this.add('prisonsList', 'prisonsAdd', 'prison', 'locationsPrisons');
  },

  prisonsEdit: function(id) {
    this.edit(id, 'prisonsList', 'prisonsEdit', 'prison', 'locationsPrisons');
  },

  definitionsList: function(callback, id) {
    var definitionsGrid = [
      {
        name: 'title',
        label: 'title',
        editable: false,
        cell: views.definitionCell
      }
    ];
   
    this.grid(definitionsGrid, 'definitions', 'definitionsGrid', callback, id);
  },

  definitionsAdd: function() {
    this.add('definitionsList', 'definitionsAdd', 'definition', 'definitions');
  },

  definitionsEdit: function(id) {
    this.edit(id, 'definitionsList', 'definitionsEdit', 'definition', 'definitions');
  },

  personsList: function(callback, id) {
    var personsGrid = [
      {
        name: 'name',
        label: 'name',
        editable: false,
        cell: views.personCell
      }
    ];
   
    this.grid(personsGrid, 'persons', 'personsGrid', callback, id);
  },

  personsAdd: function() {
    this.add('personsList', 'personsAdd', 'person', 'persons');
  },

  personsEdit: function(id) {
    this.edit(id, 'personsList', 'personsEdit', 'person', 'persons');
  },

  mergeList: function(callback, id) {
    var mergeGrid = [
      {
        name: "",
        cell: "select-row",
        headerCell: "select-all"
      },
      {
        name: 'name',
        label: 'name',
        editable: false,
        cell: "string"
      },
      {
        name: 'description',
        label: 'description',
        editable: false,
        cell: "string"
      }
    ];
    
    this.grid(mergeGrid, 'entities', 'mergeGrid', callback, id);
  },

  usersList: function(callback, id) {
    var usersGrid = [
      {
        name: 'name',
        label: 'name',
        editable: false,
        cell: 'string'
      },
      {
        name: 'email',
        label: 'email',
        editable: false,
        cell: 'string'
      },
      {
        name: 'access',
        label: 'access',
        editable: true,
        cell: views.permissionCell
      },
      {
        name: 'super',
        label: 'super user',
        editable: true,
        cell: views.permissionCell
      }
    ];
   
    this.grid(usersGrid, 'users', 'usersGrid', callback, id);

  },

  map: function(colName, viewName, callback, id) {
    Notify.spinner('show');

    var self = this;
        
    self[colName] = new models[colName]();
    self[colName].state.pageSize = null;
    delete self[colName].queryParams.query;
    self[colName].fetch().done(function(){
      var mapView = new views[viewName]({ collection: self[colName], contextMenu: self.contextMenu });
      self.changeLayout(mapView, callback, id);
      Notify.spinner('hide');
      Notify.info( 'Data has been loaded' );
    });
  },

  grid: function(grid, colName, viewName, callback, id) {
    Notify.spinner('show');

    var self = this;
    
    if(_.isUndefined(self[colName])) self[colName] = new models[colName]()

    self[colName].fetch().done(function(){
      var gridView = new views[viewName]({ collection: self[colName], columns: grid, contextMenu: self.contextMenu });
      self.changeLayout(gridView, callback, id);
      Notify.spinner('hide');
      Notify.info( 'Data has been loaded' );
    });
  },

  edit: function(id, parentName, name, modelName, colName) {
    var that = this;
    if(!this.initialized) {
      this[parentName](name, id);
    } else {
      var model = that[colName].get(id);
      if (_.isUndefined(model)) model = new models[modelName]({_id: id});
      model.fetch().done(function() {
        var view = that.layout.parentView.getView();
        view._edit(model);
      });
    }
  },

  add: function(parentName, name, modelName, colName) {
    var that = this;
    if(!this.initialized) {
      this[parentName](name);
    } else {
      var view = that.layout.parentView.getView();
      view._add();
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
    var self = this;
    if (!this.initialized) {
      self.initializeContainer(function(){
        self.layout = new views.mainLayout({rootView: v, contextMenu: self.contextMenu}).render()
        self.initialized = true;
        self.buildContextMenu()
        if (callback) self[callback](id);
      })
    } else {
      this.layout.changeLayout(v);
      if (callback) this[callback](id);
    }
  },

  initializeContainer: function(cb) {
    var self = this;
    var container = new views.container({el: $('#main') }).once("afterRender", function() {
      self.buildMenu();
      cb()
    }).render();
  },

  buildMenu: function() {
    var menuItems = new models.menuItems();
    menuItems.set(menuData);
    var menu = new views.mainMenu({ collection: menuItems, el: $('nav.topbar') });
  },

  buildContextMenu: function() {
    var self = this;
    var contextMenu = new views.contextMenu({ collection: this.contextMenu, layout: this.layout });
    this.layout.addContext(contextMenu);
  }
})

module.exports = Router