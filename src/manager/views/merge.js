var Backbone = require('backbone'),
    Backgrid = require('backgrid'),
    Paginator = require('backbone.paginator'),
    SelectAll = require('backgrid-select-all'),
    Pageable = require('../local_modules/backgrid-paginator/backgrid-paginator.js'),
    modal = require('../node_modules/backbone.modal/backbone.modal.js'),
    models = require('../models/index.js'),
    utils = require('./util.js')
    request = require('superagent'),
    $ = require('jquery'),
    _ = require('underscore'),
    Grid = require('./grid.js');

var MergeGrid = Grid.main.extend({
  icon: 'code-merge',
  title: 'Merge',
  className: 'mergelist',
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

    this.collection.on("backgrid:selected", function(model, selected) {
      if(selected) {
        var selection = this.grid.getSelectedModels();
        _.each(selection, function(selmodel){
          if(selmodel.id != model.id) selmodel.trigger("backgrid:select", selmodel, false);
        });
      }
    }.bind(this));

    var $panel = $('<div>').addClass('merge-panel');
    var $instructions = $('<span>').addClass('help').html('Choose the entity to merge from list below and press <i class="fa fa-code-fork"></i> Merge button');
    var $state = $('<div>').addClass('merge-state');
    $panel.append($instructions);
    $panel.append($state);
    $(this.$el).prepend($panel);
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
  _merge: function() {
    var selected = this.grid.getSelectedModels();
    if(!_.isUndefined(selected[0])) {
      this.merge = {
        one: selected[0].id
      }
      this.mergeNames = {
        one: selected[0].get('name')
      }
      $(this.$el).find('.merge-panel .help').html('Now choose entity to merge into and press <i class="fa fa-long-arrow-right"></i> Merge into button');
      $(this.$el).find('.merge-state').text('Will merge ' + selected[0].get('name') + ' into...');
    }
  },
  _mergeInto: function() {
    var selected = this.grid.getSelectedModels();
    if(!_.isUndefined(selected[0]) && this.merge) {
      this.merge.into = selected[0].id;
      this.mergeNames.into = selected[0].get('name');
      if(this.merge.one != this.merge.into) {
        $(this.$el).find('.merge-state').text('Will merge ' + this.mergeNames.one + ' into ' + this.mergeNames.into);
        showDialog(this.merge, this.collection, this.collection.get(this.merge.one));
      }
    }
  },
  panel: [
    {
      name: "Merge",
      icon: "code-fork",
      fn: "_merge"
    },
    {
      name: "Merge into",
      icon: "long-arrow-right",
      fn: "_mergeInto"
    }
  ]
})

exports.mergeGrid = MergeGrid;

var showDialog = function(mergeData, collection, model) {
  var dialog = new Backbone.Model({
    title: "Merge Entities",
    description: "Merging entities is critical operation, that also affects existing interviews. The operation can take up to a minute to complete. During that time the system will be turned into <b>maintenance mode</b>, where editors can not save documents.",
    action: "Confirm merging",
    submitState: "Merging...",
    initState: "Changing entities in documents..."
  })

  dialog.on('confirm', function(dialog){
    Backbone.middle.trigger("sync:start", 'Merging... This could take a while, please be patient');
    request
      .get('/api/entities/merge')
      .set('Authorization', 'Bearer ' + utils.getUserToken())
      .query(mergeData)
      .end(function(err, res) {
        if (res.ok) {
          collection.remove(model);
          $('span.help').html('Choose the entity to merge from list below and press <i class="fa fa-code-fork"></i> Merge button');
          $('div.merge-state').text('');
          dialog.submit('Done! Exiting from maintenance mode...', 'ok');
          Backbone.middle.trigger("sync:success", 'Merge has been completed');
        } else {
          dialog.submit(err, res.text);
          Backbone.middle.trigger("sync:fail", 'Sorry, the error occured! Please reload the page and try again');
        }
      });
  });

  var mergeDialog = new subjectDialog({model: dialog});
  $('#main').append(mergeDialog.render().el);
}

var subjectDialog = Backbone.Modal.extend({
  prefix: 'subject-dialog',
  keyControl: false,
  template: _.template($('#subjectDialog').html()),
  cancelEl: '.cancel',
  submitEl: '.run',
  beforeSubmit: function() {
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