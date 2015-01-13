"use strict";

var Workflow = require("substance-composer").Workflow;

var TagSubject = function() {
  Workflow.apply(this, arguments);
  this.handlers = [];
};

TagSubject.Prototype = function() {

  // Register handlers that trigger the workflow
  // ---------------
  //
  // not used here since workflow is triggered by LocationTool

  this.registerHandlers = function() {
  };

  this.unRegisterHandlers = function() {
  };

  this.handlesStateUpdate = true;

  // Update view relevant state
  // ---------------

  this.handleStateUpdate = function(state, oldState, stateInfo) {
    var subjectsPanel = this.writerView.panelViews["subjects"];

    console.log('handling state update...');
    // Show all available subjects and make them selectable
    // if (state.id === "tagsubject") {
    //   subjectsPanel.updateView({
    //     mode: "select",
    //     subjectReferenceId: state.subjectReferenceId
    //   });
    //   return true;
    // }

    // View only referenced subjects
    // if (oldState.id === "tagsubject") {
    //   subjectsPanel.updateView({mode: "list"});
    //   this.writerView.focusResource();
    //   return true;
    // }

    // Display subjects that have been assigned to a particular subject reference
    // TODO: this should actually not live here as it has nothing to do with the tag_subject workflow
    // IDEA: Allow panels to define state change behavior
    if (state.id === "main" && state.subjectReferenceId) {
      var mode = state.mode || "show";

      subjectsPanel.updateView({
        mode: mode,
        subjectReferenceId: state.subjectReferenceId
      });

      this.writerView.contentView.annotationBar.update();
      return true;
    } else if (oldState.subjectReferenceId && !state.subjectReferenceId) {
      this.writerView.contentView.annotationBar.update();
    }

    // In all other cases have the panel in list mode
    subjectsPanel.updateView({mode: "list"});

    return false; // Not handled here
  };

  // Add location reference
  // ---------------

  this.beginWorkflow = function() {
    var doc = this.writerCtrl.document;
    var currentSession = this.writerCtrl.currentSession;
    var recoverSha = doc.state;

    if (!currentSession) {
      return false;
    }
    var container = currentSession.container;
    var selection = currentSession.selection;

    if (selection.isNull()) {
      throw new Error("Selection is null.");
    }

    var containerId = currentSession.container.id;
    var cursor = selection.getCursor();
    var node = container.getRootNodeFromPos(cursor.pos);
    var charPos = cursor.charPos;

    // Create subject annotation
    var editorCtrl = this.writerCtrl.contentCtrl;
    var state = this.writerCtrl.state;

    var annotationId = editorCtrl.addMultiAnnotation("subject_reference", {target: [], container: "content"});

    // Transition to highlight the subjectReference we just created
    this.writerCtrl.switchState({
      id: "main",
      contextId: "subjects",
      subjectReferenceId: annotationId,
      mode: "select"
    }, {updateRoute: true, replace: true});

    this.endWorkflow();
  };

  // nodeId or null if cancelled
  this.endWorkflow = function(entityIds) {
    // No longer needed
  };
};

TagSubject.Prototype.prototype = Workflow.prototype;
TagSubject.prototype = new TagSubject.Prototype();

module.exports = TagSubject;
