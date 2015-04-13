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
    this.buildMenu()
    this.contextMenu = new models.contextItems()
	},
	routes: {
    '': 'dashboard',
    'subjects': 'subjectsList',
    'prisons': 'prisonsList',
    'prisons/:id': 'prisonsEdit',
    'toponyms': 'toponymsList',
    'toponyms/:id': 'toponymsEdit',
    'definitions': 'definitionsList',
    'definitions/:id': 'definitionsEdit',
    'persons': 'personsList',
    'persons/:id': 'personsEdit',
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

  toponymsEdit: function(id) {
    this.edit(id, 'toponymsList', 'toponymsEdit', 'toponym');
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

  prisonsEdit: function(id) {
    this.edit(id, 'prisonsList', 'prisonsEdit', 'prison');
  },

  definitionsList: function(callback, id) {
    var definitionsGrid = [
      {
        name: 'title',
        label: 'title',
        editable: false,
        cell: 'string'
      }
    ];
   
    this.grid(definitionsGrid, 'definitions', 'definitionsGrid', callback, id);
  },

  definitionsEdit: function(id) {
    this.edit(id, 'definitionsList', 'definitionsEdit', 'definition');
  },

  personsList: function(callback, id) {
    var personsGrid = [
      {
        name: 'name',
        label: 'name',
        editable: false,
        cell: 'string'
      }
    ];
   
    this.grid(personsGrid, 'persons', 'personsGrid', callback, id);
  },

  personsEdit: function(id) {
    this.edit(id, 'personsList', 'personsEdit', 'person');
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

  edit: function(id, parentName, name, modelName) {
    var that = this;
    if(!this.initialized) {
      this[parentName](name, id);
    } else {
      var model = new models[modelName]({_id:id});
      model.fetch().done(function() {
        var view = that.layout.parentView.getView();
        view._edit(model);
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
      //this.buildContextMenu()
    }
    if (callback) this[callback](id);
  },

  buildMenu: function() {
    var menuItems = new models.menuItems();
    menuItems.set(menuData);
    var menu = new views.mainMenu({ collection: menuItems, el: $('nav.sidebar') });
  },

  buildContextMenu: function() {
    var self = this;
    var contextMenu = new views.contextMenu({ collection: this.contextMenu, layout: this.layout });
    this.layout.addContext(contextMenu);
  }
})

module.exports = Router