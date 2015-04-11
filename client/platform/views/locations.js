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
  },
  _add: function() {
    var dialogModel = new models.toponym();
    var dialog = new editorDialog({model: dialogModel, collection: this.options.collection});
    $('#main').append(dialog.render().el);
  },
  _edit: function(model) {
    var dialog = new editorDialog({model: model, collection: this.options.collection});
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
  },
  _add: function() {
    var dialogModel = new models.prison();
    var dialog = new editorDialog({model: dialogModel});
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

var PrisonCell = Backgrid.Cell.extend({
  className: "string-cell document-cell grid-cell animate",
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
exports.prisonCell = PrisonCell

var LocationRow = Backgrid.Row.extend({
  events: {
    "click": "onClick",
    "click .delete-document": "onRemove"
  },
  onClick: function (e) {
    e.preventDefault();
    Backbone.middle.trigger("goTo", '/toponyms/' + this.model.get('id'));
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
  prefix: 'editor-dialog',
  keyControl: false,
  template: _.template($('#editorDialog').html()),
  cancelEl: '.cancel',
  submitEl: '.save',
  onRender: function() {
    var model = this.model;
    this.form = new Backbone.Form({
      model: this.model
    }).render();
    this.$el.find('.form').prepend(this.form.el);
  },
  beforeSubmit: function() {
    var self = this;
    var errors = self.form.commit();
    if(!errors) {
      this.$el.find('button').prop('disabled', true);
      //this.$el.find('.save').text('Saving...');
      this.$el.find('#meter').show();
      this.$el.find('#state').html('Saving...');
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
    //this.model.trigger('confirm', this);
    return false;
  },
  submit: function(msg, state) {
    this.$el.find('#meter').addClass(state);
    this.$el.find('#state').addClass(state).html(msg);
    //this.model.stopListening();
    setTimeout(function(dialog){
      dialog.destroy();
    }, 500, this);
  },
  cancel: function() {
    //this.model.stopListening();
  }
});