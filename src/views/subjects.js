var Backbone = require('backbone'),
    Backgrid = require('backgrid'),
    _ = require('underscore'),
    $ = require('jquery'),
    modal = require('../node_modules/backbone.modal/backbone.modal.js')
    jstree = require('jstree'),
    request = require('superagent'),
    ObjectId = require('../local_modules/objectid/Objectid.js'),
    Grid = require('./grid.js'),
    Notify = require('../local_modules/notify/notify.js'),
    Utils = require('./util.js');

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

    $('.subject-search').appendTo('.toolbox');
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
      .on("description:change", function(e, data) {
        self._onDescriptionChange(e, data, self);
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
        // "sort": function (a, b) {
        //   return this.get_node(a).original.px > this.get_node(b).original.px ? 1 : -1;
        // },
        "types": {
          "default": {"icon": "glyphicon hidden-icon"}
        },
        "plugins" : [ "contextmenu", "dnd", "search", "state", "types", "wholerow"]
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
        if (!Utils.isSuper()) return true;
        
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
        if (!Utils.isSuper()) return true;

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
        if (!Utils.isSuper()) return true;
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
          action: "Confirm merging",
          submitState: "Merging...",
          initState: "Changing subjects in documents..."
        })

        dialog.on('confirm', function(dialog){
          request
            .get('/api/subjects/merge')
            .set('Authorization', 'Bearer ' + Utils.getUserToken())
            .query({ one: nodeToMerge.id, into: targetNode.id })
            .end(function(err, res) {
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
    $('#search_subject').off();
    $('.subject-search').remove();
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
      
    var movedNode = data.node,
        newParent = data.parent,
        oldParent = data.old_parent,
        oldPos = data.old_position,
        newPos = data.position;

    var parentChanged = (oldParent != newParent),
        positionChanged = (oldPos != newPos);

    if (parentChanged) console.log('changing parent from node', movedNode.id, 'from', oldParent, 'to', newParent);
    if (positionChanged) console.log('changing position from ', oldPos, 'to', newPos);

    request
      .get('/api/subjects/move')
      .set('Authorization', 'Bearer ' + Utils.getUserToken())
      .query({ oldparent: oldParent, newparent: newParent, node: movedNode.id, oldpos: oldPos, newpos: newPos })
      .end(function(err, res) {
        if (res.ok) {
          Notify.spinner('hide');
          var notice = Notify.info('Subject has been moved to new position.');
        } else {
          Notify.spinner('hide');
          var notice = Notify.info('Sorry, the error occured! Please reload the page and try again.');
          alert('Sorry an error occurred: ', err);
          window.location.href = "/subjects";
        }
      });

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
  _onDescriptionChange: function(e, data, context) {
    var id = data.get('id');
    var node = $('.tree').jstree('get_node', id);
    var hasDescription = 'not-empty';
    if (_.isEmpty(data.get('description'))) hasDescription = 'empty';
    node.li_attr.class = hasDescription;
    $('.tree').jstree('redraw', node, false);
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
        $('.tree').trigger('description:change', self.model);
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