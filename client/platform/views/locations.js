var Backbone = require('backbone'),
    Backgrid = require('backgrid'),
    Paginator = require('backbone.paginator'),
    Pageable = require('../local_modules/backgrid-paginator/backgrid-paginator.js'),
    forms = require('backbone-forms'),
    bootstrapForm = require('../local_modules/bootstrap-form/bootstrap3.js'),
    select2form = require('../local_modules/select2-form/select2.js'),
    geocoderform = require('../local_modules/geocoder-form/geocoder.js'),
    geocoded = require('../local_modules/geocoded-form/geocoded.js'),
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
  panel: [
    {
      name: "Add new toponym",
      icon: "plus",
      fn: "_add"
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
  panel: [
    {
      name: "Add new prison",
      icon: "plus",
      fn: "_add"
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
    this.$el.find('.delete').on('click', function() {
      that.delete();
    });
    this.$el.find('.form').prepend(this.form.el);
    this.gridUrl = this.collection.url.split('/')[this.collection.url.split('/').length - 1];
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