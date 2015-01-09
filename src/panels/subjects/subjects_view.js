var PanelView = require('substance-composer').PanelView;
var $$ = require("substance-application").$$;
var _ = require("underscore");

var SubjectsView = function(controller) {
  PanelView.call(this, controller, {
    name: 'subjects',
    label: 'Subjects',
    title: 'Subjects',
    type: 'resource',
    icon: 'icon-tag'
  });

  // Shortcut for writerCtrl
  this.writerCtrl = this.controller.writerCtrl;

  this.$el.addClass('entities subjects');
  this.$el.on('click', '.confirm-selection', _.bind(this.confirmSelection, this));
  this.$el.on('click', '.edit-subject-reference', _.bind(this.enableSelection, this));
  this.$el.on('click', '.delete-subject-reference', _.bind(this.deleteSubjectReference, this));
  this.$el.on('click', '.cancel-edit', _.bind(this.cancelEdit, this));
};

SubjectsView.Prototype = function() {

  this.cancelEdit = function() {
    var state = this.writerCtrl.state;
    this.writerCtrl.switchState({
      id: "main",
      contextId: "subjects",
      subjectReferenceId: state.subjectReferenceId
    }, {"no-scroll": true});
  };


  this.deleteSubjectReference = function(e) {
    e.preventDefault();
    var state = this.writerCtrl.state;
    var doc = this.writerCtrl.document;
    var subjectReferenceId = state.subjectReferenceId;

    var frags = doc.getAnnotationFragments(subjectReferenceId);

    _.each(frags, function(frag) {
      doc.delete(frag.id);
    }, this);

    doc.delete(subjectReferenceId);

    this.writerCtrl.switchState({
      id: "main",
      contextId: "subjects"
    }, {"no-scroll": true});
  };

  // We enable subject selection when the user requests it
  this.enableSelection = function(e) {
    e.preventDefault();
    var state = this.writerCtrl.state;

    this.writerCtrl.switchState({
      id: "tagsubject",
      contextId: "subjects",
      subjectReferenceId: state.subjectReferenceId
    }, {"no-scroll": true});
  };

  this.confirmSelection = function() {
    var subjectIds = $(this.treeView).jstree().get_selected();

    if (subjectIds.length > 0) {
      var tagSubjectWorkfow = this.writerCtrl.workflows["tag_subject"];
      tagSubjectWorkfow.endWorkflow(subjectIds);      
    }
  };

  this.updateView = function(viewState) {
    // Remember view state
    this.viewState = viewState;
    this.el.innerHTML = "";

    if (viewState.mode === 'select') {
      this.renderSelectMode();
    } else if (viewState.mode === 'show') {
      this.renderShowMode();
    } else if (viewState.mode === 'list') {
      this.renderListMode();
    }
  };

  this.renderShowMode = function() {
    this.el.innerHTML = '';

    // Gather nodes
    var subjects = this.controller.getReferencedSubjects(this.viewState.subjectReferenceId);

    this.headerEl = $$('.header', {text: "Annotated text"});
    this.actionsEl = $$('.actions');
    this.actionsEl.appendChild($$('a.action.edit-subject-reference', {href: "#", text: "Edit"}));
    this.actionsEl.appendChild($$('a.action.delete-subject-reference', {href: "#", text: "Delete"}));
    this.headerEl.appendChild(this.actionsEl);

    this.el.appendChild(this.headerEl);
    this.renderSubjectsList(subjects);
  };

  this.renderSubjectsList = function(subjects) {
    this.subjectsEl = $$('.subjects.entities');

    _.each(subjects, function(subject) {
      var fullPath = this.controller.getFullPathForSubject(subject.id);
      

      var subjectEl = $$('.subject.entity', {
        children: [ $$('.subject-name', {text: fullPath.join(' > ') })]
      });
      this.subjectsEl.appendChild(subjectEl);
    }, this);

    this.el.appendChild(this.subjectsEl);
  };

  this.renderListMode = function() {
    this.el.innerHTML = '';
    var subjects = this.controller.getAllReferencedSubjects();
    this.headerEl = $$('.header', {text: subjects.length + " subjects annotated in this interview"});
    this.el.appendChild(this.headerEl);
    this.renderSubjectsList(subjects);
  };

  // Shows a tree to select from available
  this.renderSelectMode = function() {
    var state = this.writerCtrl.state;
    var doc = this.writerCtrl.document;
    this.headerEl = $$('.header', {text: "Please choose relevant subjects"});
    this.el.appendChild(this.headerEl);
    this.actionsEl = $$('.actions');
    this.actionsEl.appendChild($$('a.action.confirm-selection', {href: "#", text: "Save"}));
    this.actionsEl.appendChild($$('a.action.cancel-edit', {href: "#", text: "Cancel"}));
    this.headerEl.appendChild(this.actionsEl);

    // Used for add and edit workflow
    this.availableSubjects = $$('.available-subjects');
    var treeView = this.treeView = $$('.tree-view');

    // Attach extra stuff
    this.availableSubjects.appendChild(this.treeView);

    // TreeView for selecting a subject
    // --------------

    var subjectsTree = this.controller.getSubjectsTree();

    $(this.treeView).jstree({
      "checkbox" : {
        // "keep_selected_style" : false,
        // "cascade": "up+down",
        "three_state": false
      },
      "plugins" : ["checkbox"],
      'core' : {
        'data' : subjectsTree
      }
    });

    if (state.subjectReferenceId) {

      // Set currently selected subjects
      _.delay(function() {
        var annotation = doc.get(state.subjectReferenceId);
        _.each(annotation.target, function(subjectId) {
          $('.jstree').jstree('select_node', subjectId);
        }, this);
      }, 200, this);
    }

    this.el.appendChild(this.availableSubjects);
  };

  this.render = function() {
    this.renderListMode();
    return this;
  };
};

SubjectsView.Prototype.prototype = PanelView.prototype;
SubjectsView.prototype = new SubjectsView.Prototype();
SubjectsView.prototype.constructor = SubjectsView;

module.exports = SubjectsView;
