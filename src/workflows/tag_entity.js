"use strict";

var _ = require("underscore");
var Workflow = require("substance-composer").Workflow;

var TagEntity = function() {
  Workflow.apply(this, arguments);

  this.handlers = [];
};

TagEntity.Prototype = function() {

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
    var contextId = state.contextId;

    var entityPanel = this.writerView.panelViews[contextId];

    // Show all available locations and make them selectable
    if (state.id === "tagentity") {
      entityPanel.updateView({mode: "select"});
      return true;
    }

    // View only referenced locations
    if (oldState.id === "tagentity") {
      entityPanel.updateView({mode: "list"});
      this.writerView.focusResource();
      return true;
    }

    // When ever there's a state transition to the locations panel, refresh the list
    // of tagged locations
    // if (state.id === "locations") {
    //   entityPanel.updateView({mode: "select"});
    //   return true;
    // }

    return false; // Not handled here
  };

  // Add location reference
  // ---------------

  this.beginWorkflow = function(entityType) {
    var doc = this.writerCtrl.document;
    var currentSession = this.writerCtrl.currentSession;
    var recoverSha = doc.state;

    if (!currentSession) {
      console.error("Workflow 'beginAddLocation': nothing selected.");
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

    this.writerCtrl.switchState({
      id: "tagentity",
      contextId: entityType+"s",
      containerId: containerId,
      nodeId: node.id,
      recover: recoverSha,
      // Note: app states can only contain string variables
      charPos: ""+charPos
    }, {"no-scroll": true});
  };

  // nodeId or null if cancelled
  this.endWorkflow = function(entityId, entityType) {
    var editorCtrl = this.writerCtrl.contentCtrl;
    editorCtrl.addReference(entityType+"_reference", {target: entityId});
    // Note: this will trigger an implicit state change via selection change.
    editorCtrl.focus();
  };
};

TagEntity.Prototype.prototype = Workflow.prototype;
TagEntity.prototype = new TagEntity.Prototype();

module.exports = TagEntity;
