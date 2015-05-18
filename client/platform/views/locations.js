var Backbone = require('backbone'),
    Backgrid = require('backgrid'),
    Paginator = require('backbone.paginator'),
    Pageable = require('../local_modules/backgrid-paginator/backgrid-paginator.js'),
    forms = require('backbone-forms'),
    bootstrapForm = require('../local_modules/bootstrap-form/bootstrap3.js'),
    select2form = require('../local_modules/select2-form/select2.js'),
    geocoderform = require('../local_modules/geocoder-form/geocoder.js'),
    geocoded = require('../local_modules/geocoded-form/geocoded.js'),
    markercluster = require('leaflet.markercluster'),
    modal = require('../node_modules/backbone.modal/backbone.modal.js'),
    models = require('../models/index.js'),
    $ = require('jquery'),
    _ = require('underscore'),
    Grid = require('./grid.js');

var ToponymsGrid = Grid.main.extend({
  icon: 'topo',
  title: 'Toponyms',
  className: 'toponymslist',
  initialize: function() {
    $('#' + this.icon).addClass('active');
    this.grid = new Backgrid.Grid({
      row: LocationRow,
      columns: this.options.columns,
      collection: this.options.collection
    });
    $(this.$el).append(this.grid.render().$el);
    this.paginator = new Backgrid.Extension.Paginator({
      columns: this.options.columns,
      collection: this.options.collection
    });
    $(this.$el).append(this.paginator.render().$el);
  },
  filters: function() {
    this.nameFilter = new Utils.filter({
      collection: this.options.collection,
      placeholder: "Enter a name to search",
      name: "synonyms",
    });
    $('.toolbox').prepend(this.nameFilter.render().el);
  },
  beforeClose: function() {
    this.nameFilter.remove();
  },
  _add: function() {
    var dialogModel = new models.toponym();
    var dialog = new editorDialog({model: dialogModel, collection: this.options.collection, new: true});
    $('#main').append(dialog.render().el);
  },
  _edit: function(model) {
    var dialog = new editorDialog({model: model, collection: this.options.collection, new: false});
    $('#main').append(dialog.render().el);
  },
  _showMap: function() {
    Backbone.middle.trigger("goTo", '/toponyms/map');
  },
  panel: [
    {
      name: "Add new toponym",
      icon: "plus",
      fn: "_add"
    },
    {
      name: "",
      icon: "map-marker",
      fn: "_showMap"
    }
  ]
})
exports.toponymsGrid = ToponymsGrid

var PrisonsGrid = Grid.main.extend({
  icon: 'prisons',
  title: 'Prisons',
  className: 'prisonslist',
  initialize: function() {
    $('#' + this.icon).addClass('active');
    this.grid = new Backgrid.Grid({
      row: LocationRow,
      columns: this.options.columns,
      collection: this.options.collection
    });
    $(this.$el).append(this.grid.render().$el);
    this.paginator = new Backgrid.Extension.Paginator({
      columns: this.options.columns,
      collection: this.options.collection
    });
    $(this.$el).append(this.paginator.render().$el);
  },
  filters: function() {
    this.nameFilter = new Utils.filter({
      collection: this.options.collection,
      placeholder: "Enter a name to search",
      name: "synonyms",
    });
    $('.toolbox').prepend(this.nameFilter.render().el);
  },
  beforeClose: function() {
    this.nameFilter.remove();
  },
  _add: function() {
    var dialogModel = new models.prison();
    var dialog = new editorDialog({model: dialogModel, collection: this.options.collection, new: true});
    $('#main').append(dialog.render().el);
  },
  _edit: function(model) {
    var dialog = new editorDialog({model: model, collection: this.options.collection, new: false});
    $('#main').append(dialog.render().el);
  },
  _showMap: function() {
    Backbone.middle.trigger("goTo", '/prisons/map');
  },
  panel: [
    {
      name: "Add new prison",
      icon: "plus",
      fn: "_add"
    },
    {
      name: "",
      icon: "map-marker",
      fn: "_showMap"
    }
  ]
})
exports.prisonsGrid = PrisonsGrid

var LocationCell = Backgrid.Cell.extend({
  className: "string-cell definition-cell grid-cell animate",
  render: function () {
    this.$el.empty();
    var formattedValue = this.formatter.fromRaw(this.model);
    if(_.isNull(formattedValue) || _.isEmpty(formattedValue)){
      this.delegateEvents();
      return this;
    }
    else {
      var name = formattedValue.get('name'),
          synonyms = formattedValue.get('synonyms'),
          type = formattedValue.get('prison_type'),
          country = formattedValue.get('country'),
          description = formattedValue.get('description'),
          updatedAt = _.isUndefined(formattedValue.get('updatedAt')) ? 'unknown' : new Date(formattedValue.get('updatedAt')).toDateString(),
          edited = _.isUndefined(formattedValue.get('edited')) || _.isNull(formattedValue.get('edited')) ? 'unknown' : formattedValue.get('edited').name;

      if(_.isNull(synonyms)) synonyms = [];
      if(_.isNull(type)) type = [];

      var markup = '<div class="meta-info">';
      if (!_.isEmpty(type)) markup += '<div class="definition-type">' + type + '</div>';
         markup += '<div class="country">' + country + '</div> \
                    <div class="edited">' + edited + '</div> \
                    <div class="updated">updated at ' + updatedAt + '</div> \
                    </div> \
                    <div class="title">' + name + '</div> \
                    <div class="description">' + description + '</div> \
                    <div class="synonyms">' + (synonyms.length > 0 ? "Also know as: " + synonyms.join(", ") : "" ) + '</div>';

      this.$el.append(markup)
      this.delegateEvents()
      return this;
    }
  }
});
exports.locationCell = LocationCell

var LocationRow = Backgrid.Row.extend({
  events: {
    "click": "onClick",
    "click .delete-document": "onRemove"
  },
  onClick: function (e) {
    e.preventDefault();
    var url = this.model.collection.url.split('/')[this.model.collection.url.split('/').length - 1];
    Backbone.middle.trigger("goTo", '/' + url + '/' + this.model.get('id'));
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

var editorDialog = Backbone.Modal.extend({
  prefix: 'editor-dialog-locations',
  keyControl: false,
  template: _.template($('#editorLocationsDialog').html()),
  cancelEl: '.cancel',
  submitEl: '.save',
  onRender: function() {
    var that = this,
        model = this.model;

    this.form = new Backbone.Form({
      model: this.model
    }).render();
    this.$el.find('.delete').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var confirm = window.confirm("Are you sure you want to do this?\nThis action can't be undone. Think twice!");
      if(confirm) {
        that.delete();
      }
    });
    this.$el.find('.form').prepend(this.form.el);
    var path = window.location.pathname.split('/');
    this.gridUrl = (path[path.length - 1] == 'map' ? path[path.length - 2] + '/' + path[path.length - 1] : this.collection.url.split('/')[this.collection.url.split('/').length - 1]);
  },
  serializeData: function () {
    return {remove: (this.model.id ? true : false)};
  },
  delete: function() {
    var self = this;
    this.$el.find('button').prop('disabled', true);
    this.$el.find('#meter').show();
    this.$el.find('#state').html('Deleting...');
    this.collection.remove(this.model);
    this.model.destroy({
      wait: true,
      success: function(model,resp) { 
        self.submit('Your location has been removed.','Removed!');
      },
      error: function(model,err) { 
        self.submit('Something went wrong.','Error!');
      }
    });
  },
  beforeSubmit: function() {
    var self = this;
    var errors = self.form.commit();
    if(!errors) {
      this.$el.find('button').prop('disabled', true);
      //this.$el.find('.save').text('Saving...');
      this.$el.find('#meter').show();
      this.$el.find('#state').html('Saving...');
      //check if old model
      if (this.model.id) {
        this.model.save({}, {
          wait: true,
          success: function(model,resp) { 
            self.submit('Your location has been saved.','Saved!');
          },
          error: function(model,err) { 
            self.submit('Something went wrong.','Error!');
          }
        });
      } else {
        self.collection.create(self.model, {
          wait: true,
          success: function(model,resp) { 
            self.submit('Your new location has been added to collection.','Saved!');
          },
          error: function(model,err) { 
            self.submit('Something went wrong.','Error!');
          }
        });
      }
    }
    //this.model.trigger('confirm', this);
    return false;
  },
  submit: function(msg, state) {
    var that = this;
    this.$el.find('#meter').addClass(state);
    this.$el.find('#state').addClass(state).html(msg);
    //this.model.stopListening();
    setTimeout(function(dialog){
      dialog.destroy();
      Backbone.middle.trigger("changeUrl", '/' + that.gridUrl);
    }, 1000, this);
  },
  cancel: function() {
    Backbone.middle.trigger("changeUrl", '/' + this.gridUrl);
    //this.model.stopListening();
  }
});

var LocationsMap = Backbone.Layout.extend({
  icon: '',
  title: '',
  nameProperty: '',
  model: '',
  id: "location-map-wrapper",
  template: "#locationsMap",
  afterRender: function() {
    var self = this;

    $('#' + this.icon).addClass('active');
    this.contextMenu.reset(this.panel);
    Backbone.middle.trigger('domchange:title', this.title);
    this.collection.on('reset', function() {
      this.queryRedraw();
    }, self);
    this.nameFilter = new Utils.filter({
      collection: this.options.collection,
      placeholder: "Enter a name to search",
      name: "synonyms",
    });
    $('.toolbox').prepend(this.nameFilter.render().el);
    this.drawMap();
  },
  drawMap: function() {
    var self = this;

    //render map element
    var map = this.map = L.map('location-map', {
      center: [50.47304, 28.13243],
      zoom: 5,
      attributionControl: false
    });
    
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 15
    }).addTo(map);
    
    this.sidebar = document.getElementById('map-sidebar');

    this.markers = new L.MarkerClusterGroup();

    this.orphans = new Backbone.Collection();
    //render each marker
    this.collection.map(function(location) {
      if(!_.isUndefined(location.get('point')) && !_.isNull(location.get('point'))) {
        var latlon = location.get('point').slice();
        var marker = L.circleMarker(latlon.reverse(), {
          color: '#eb8100',
          //fillColor: '#ce0909',
          fillOpacity: 0.1,
          weight: 7
        });
        marker._leaflet_id = location.cid;
        marker.on('click', function(e) {
          self.updateInfo(location, e.target);
          self.zoomToFeature(e.target)
        });
        location.on('destroy', self._onRemove, self);
        self.markers.addLayer(marker);
      } else {
        location.on('change', self.drawOrphansList, self);
        location.on('change:point', function(model){
          if(_.isArray(model.get('point'))) {
            self.orphans.remove(model);
          }
        }, self);
        location.on('destroy', self._onRemove, self);
        self.orphans.add(location);
      }
    });
  
    this.drawOrphansList();

    map.addLayer(this.markers);
  },
  queryRedraw: function() {
    var self = this;

    this.map.removeLayer(this.markers);

    this.markers = new L.MarkerClusterGroup();

    this.collection.map(function(location) {
      if(!_.isUndefined(location.get('point')) && !_.isNull(location.get('point'))) {
        var latlon = location.get('point').slice();
        var marker = L.circleMarker(latlon.reverse(), {
          color: '#eb8100',
          //fillColor: '#ce0909',
          fillOpacity: 0.1,
          weight: 7
        });
        marker._leaflet_id = location.cid;
        marker.on('click', function(e) {
          self.updateInfo(location, e.target);
          self.zoomToFeature(e.target)
        });
        location.on('destroy', self._onRemove, self);
        self.markers.addLayer(marker);
      }
    });
    var layers = this.markers.getLayers();
    if (layers.length == 1) this.markers = layers[0];
    this.map.addLayer(this.markers);
    layers.length > 0 ? this.map.fitBounds(this.markers.getBounds()) : this.map.setView([50.47304, 28.13243], 5);
    this.drawSearchResults();
  },
  drawSearchResults: function() {
    var self = this;

    this.sidebar.innerHTML = '';

    var helper = L.DomUtil.create('div', 'helper', this.sidebar);
    helper.innerHTML = '<i class="fa fa-hand-o-up"></i> Click on a location to see details'

    var resultsIntro = L.DomUtil.create('div', 'intro', this.sidebar);
    resultsIntro.innerHTML = self.collection.length > 0 ? self.collection.length + ' locations found:' : 'No locations found, try another query';

    var resultsTable = L.DomUtil.create('table', 'orphans', this.sidebar);
    self.collection.each(function(item) {
      var row = L.DomUtil.create('tr', 'row orphan', resultsTable);
      var title = L.DomUtil.create('td', 'title-cell', row);
      title.innerHTML = item.get(self.nameProperty);
      var editLink = L.DomUtil.create('td', 'edit-cell', row);
      editLink.innerHTML = 'focus on →';

      L.DomEvent.addListener(editLink, 'click', function() {
        var marker = self.markers.getLayer(item.cid);
        self.updateInfo(item, marker);
        self.map.fitBounds(marker.getBounds());
      });
    });
  },
  drawOrphansList: function() {
    var self = this;

    this.sidebar.innerHTML = '';

    var helper = L.DomUtil.create('div', 'helper', this.sidebar);
    helper.innerHTML = '<i class="fa fa-hand-o-up"></i> Click on a location to see details'

    var orphansIntro = L.DomUtil.create('div', 'intro', this.sidebar);
    orphansIntro.innerHTML = self.orphans.length + ' orphaned locations found:'

    var orphansTable = L.DomUtil.create('table', 'orphans', this.sidebar);
    self.orphans.each(function(orphan) {
      var row = L.DomUtil.create('tr', 'row orphan', orphansTable);
      var title = L.DomUtil.create('td', 'title-cell', row);
      title.innerHTML = orphan.get(self.nameProperty);
      var editLink = L.DomUtil.create('td', 'edit-cell', row);
      editLink.innerHTML = 'edit location →';

      L.DomEvent.addListener(editLink, 'click', function() {
        self.editLocation(orphan);
      });
    });
  },
  editLocation: function(model, marker) {
    var self = this;

    var dialog = new editorDialog({model: model, collection: this.collection, new: false});
    $('#main').append(dialog.render().el);
    model.once('change', function(){
      var marker = marker || null;
      if (!_.isUndefined(model.get('point')) && !_.isNull(model.get('point')) && !_.isNull(marker)) {
        var latlon = model.get('point').slice();
        marker.setLatLng(latlon.reverse());
        marker.redraw();
        self.zoomToFeature(marker);
        self.updateInfo(model, marker);
      }
      if (!_.isUndefined(model.get('point')) && !_.isNull(model.get('point')) && _.isNull(marker)) {
        var latlon = model.get('point').slice();
        var marker = L.circleMarker(latlon.reverse(), {
          color: '#eb8100',
          //fillColor: '#ce0909',
          fillOpacity: 0.1,
          weight: 7
        });
        marker.on('click', function(e) {
          self.updateInfo(model, e.target);
          self.zoomToFeature(e.target)
        });
        marker._leaflet_id = location.cid;
        self.markers.addLayer(marker);
        self.map.addLayer(marker);
        self.zoomToFeature(marker);
        self.updateInfo(model, marker);
      }
    })
  },
  addLocation: function() {
    var self = this;
    var model = new models[self.model]();
    var dialog = new editorDialog({model: model, collection: this.options.collection, new: true});
    $('#main').append(dialog.render().el);

    model.once('change', function(){
      if (!_.isUndefined(model.get('point')) && !_.isNull(model.get('point'))) {
        var latlon = model.get('point').slice();
        var marker = L.circleMarker(latlon.reverse(), {
          color: '#eb8100',
          //fillColor: '#ce0909',
          fillOpacity: 0.1,
          weight: 7
        });
        marker.on('click', function(e) {
          self.updateInfo(model, e.target);
          self.zoomToFeature(e.target)
        });
        marker._leaflet_id = model.cid;
        model.on('destroy', self._onRemove, self);
        if (!self.markers.options.hasOwnProperty('maxClusterRadius')) self.markers = new L.MarkerClusterGroup();
        self.markers.addLayer(marker);
        self.map.addLayer(marker);
        self.zoomToFeature(marker);
        self.updateInfo(model, marker);
      } else {
        model.on('change', self.drawOrphansList, self);
        model.on('change:point', function(model){
          if(_.isArray(model.get('point'))) {
            self.orphans.remove(model);
          }
        }, self);
        model.on('destroy', self._onRemove, self);
        self.orphans.add(model);
        self.drawOrphansList();
      }
    });
  },
  updateInfo: function(model, marker) {
  },
  zoomToFeature: function(marker) {
    if(this.activeMarker) {
      this.activeMarker.setRadius(10);
      this.activeMarker.setStyle({color: '#eb8100'})
    }
    this.activeMarker = marker;
    marker.setRadius(20);
    marker.setStyle({color: '#007CF5'})
    var cM = this.map.project(marker._latlng);
        cM.y -= marker._container.clientHeight/2;

    this.map.setView(this.map.unproject(cM), 10, {animate: true});
  },
  _onRemove: function(model) {
    var self = this;
    if (self.markers.options.hasOwnProperty('maxClusterRadius')) {
      var marker = self.markers.getLayer(model.cid);
      !_.isNull(marker) ? self.markers.removeLayer(marker) : self.orphans.remove(model);
    } else {
      self.map.removeLayer(self.markers);
    }
    self.map.setView([50.47304, 28.13243], 5);
    self.drawOrphansList();
  },
  _showList: function() {
  },
  close: function() {
    $('#' + this.icon).removeClass('active');
    this.nameFilter.remove();
    this.remove();
    this.unbind();
  },
  panel: [
  ]
});

var ToponymsMap = LocationsMap.extend({
  icon: 'topo',
  title: 'Toponyms',
  nameProperty: 'name',
  model: 'toponym',
  updateInfo: function(model, marker) {
    var self = this;

    var editLocation = function(){
      self.editLocation(model, marker);
    }

    if(!_.isUndefined(this.editLink)) L.DomEvent.removeListener(this.editLink, 'click', editLocation);

    this.sidebar.innerHTML = '';

    var title = L.DomUtil.create('div', 'title', this.sidebar);
    title.innerHTML = model.get('name');

    var country = L.DomUtil.create('div', 'country', this.sidebar);
    country.innerHTML = model.get('country');

    var currentName = L.DomUtil.create('div', 'current-name', this.sidebar);
    var current = model.get('current_name');
    currentName.innerHTML = 'Current name: ' + (_.isUndefined(current) ? 'unknown' : current);

    var knownAs = L.DomUtil.create('div', 'synonyms', this.sidebar);
    var synonyms = model.get('synonyms');
    if(_.isArray(synonyms)) knownAs.innerHTML = 'Known as: ' + synonyms.join(', ');

    var description = L.DomUtil.create('div', 'description', this.sidebar);
    description.innerHTML = model.get('description');

    this.editLink = L.DomUtil.create('div', 'edit helper', this.sidebar);
    this.editLink.innerHTML = 'edit location →';
   
    L.DomEvent.addListener(this.editLink, 'click', editLocation);
  },
  _showList: function() {
    delete this.collection.queryParams.query;
    this.collection.state.pageSize = 20;
    this.collection.fetch({reset: true}).done(function(){
      Backbone.middle.trigger("goTo", '/toponyms');
    });
  },
  panel: [
    {
      name: "Add new toponym",
      icon: "plus",
      fn: "addLocation"
    },
    {
      name: "",
      icon: "list",
      fn: "_showList"
    }
  ]
});
exports.toponymsMap = ToponymsMap

var PrisonsMap = LocationsMap.extend({
  icon: 'topo',
  title: 'Prisons',
  nameProperty: 'nearest_locality',
  model: 'prison',
  updateInfo: function(model, marker) {
    var self = this;

    var editLocation = function(){
      self.editLocation(model, marker);
    }

    if(!_.isUndefined(this.editLink)) L.DomEvent.removeListener(this.editLink, 'click', editLocation);

    this.sidebar.innerHTML = '';

    var name = model.get('name');
    if (name.toLowerCase().indexOf("неизвестно") >= 0) {
      var title = L.DomUtil.create('div', 'title', this.sidebar);
      title.innerHTML = model.get('nearest_locality');

      var locationName = L.DomUtil.create('div', 'current-name', this.sidebar);
      var location = model.get('name');
      locationName.innerHTML = 'Name: ' + (_.isUndefined(location) ? 'unknown' : location);
    } else {
      
      var title = L.DomUtil.create('div', 'title', this.sidebar);
      title.innerHTML = model.get('name');

      var nearestLocality = L.DomUtil.create('div', 'current-name', this.sidebar);
      var nearest = model.get('nearest_locality');
      nearestLocality.innerHTML = 'Nearest locality: ' + (_.isUndefined(nearest) ? 'unknown' : nearest);
    }

    var country = L.DomUtil.create('div', 'country', this.sidebar);
    country.innerHTML = model.get('country');

    var prisonType = L.DomUtil.create('div', 'prison-type', this.sidebar);
    var types = model.get('prison_type');
    if(_.isArray(types)) prisonType.innerHTML = 'Type: ' + types.join(', ');

    var knownAs = L.DomUtil.create('div', 'synonyms', this.sidebar);
    var synonyms = model.get('synonyms');
    if(_.isArray(synonyms)) knownAs.innerHTML = 'Known as: ' + synonyms.join(', ');

    var description = L.DomUtil.create('div', 'description', this.sidebar);
    description.innerHTML = model.get('description');

    this.editLink = L.DomUtil.create('div', 'edit helper', this.sidebar);
    this.editLink.innerHTML = 'edit location →';
   
    L.DomEvent.addListener(this.editLink, 'click', editLocation);
  },
  _showList: function() {
    delete this.collection.queryParams.query;
    this.collection.state.pageSize = 20;
    this.collection.fetch({reset: true}).done(function(){
      Backbone.middle.trigger("goTo", '/prisons');
    });
  },
  panel: [
    {
      name: "Add new prison",
      icon: "plus",
      fn: "addLocation"
    },
    {
      name: "",
      icon: "list",
      fn: "_showList"
    }
  ]
});
exports.prisonsMap = PrisonsMap

L.Icon.Default.imagePath = '/assets/leaflet';