"use strict";

var Composer = require("substance-composer/env/web");

// Panels
// -----------------

var LocationsPanel = require("./src/panels/locations");
var PersonsPanel = require("./src/panels/persons");
var DefinitionsPanel = require("./src/panels/definitions");
var SubjectsPanel = require("./src/panels/subjects");
var MetadataPanel = require("./src/panels/metadata");
var ArchivistShell = require("./src/archivist_shell");

var panels = [
  // new LocationsPanel(),
  // new PersonsPanel(),
  // new DefinitionsPanel(),
  new SubjectsPanel(),
  // new MetadataPanel()
];

// Tools
// -----------------

var tools = require('substance-composer').defaultTools;

// Custom tools
var LocationTool = require("./src/tools/location_tool");
var PersonTool = require("./src/tools/person_tool");
var DefinitionTool = require("./src/tools/definition_tool");
var SubjectTool = require("./src/tools/subject_tool");

// tools.push(new LocationTool());
// tools.push(new PersonTool());
// tools.push(new DefinitionTool());
tools.push(new SubjectTool());

// Workflows
// -----------------

var workflows = require('substance-composer').defaultWorkflows;

// Custom workflows
var TagEntity = require('./src/workflows/tag_entity');
var TagSubject = require('./src/workflows/tag_subject');

workflows["tag_entity"] = new TagEntity();
workflows["tag_subject"] = new TagSubject();


// Composer
// --------

/* global $: false */ // requires jquery included via script tag
$(function() {

  // Substance Shell Initialization
  // ---------------------------

  // Note: the shell has a document factory where the custom
  // node injection happens
  var shell = new ArchivistShell();

  var composer = new Composer({
    shell: shell,
    panels: panels,
    tools: tools,
    workflows: workflows
  });

  // Start the engines
  // ---------------------------

  window.app = composer;

  var containerEl = $('#container')[0];
  if (!containerEl) {
    throw new Error("Could not find element with id 'container'.");
  }

  composer.start({
    el: containerEl
  });

  // window.onbeforeunload = function() {
  //   if (composer.controller.isDocumentDirty()) {
  //     var options = {
  //       type: 'info',
  //       title: 'Unsaved Changes',
  //       message: 'You have unsaved changes.',
  //       buttons: ['Save', 'Discard', 'Cancel'],
  //       detail: 'You can Save or Discard the changes. If you press Cancel the document will not be closed.'
  //     };
  //     var choice = shell.showModalDialog(options);
  //     switch (choice) {
  //     case 0:
  //       composer.save();
  //       // Note: we have to intercept the closing
  //       // as otherwise the file window gets closed before the file dialog
  //       return false;
  //     case 1:
  //       return true;
  //     case 2:
  //       return false;
  //     }
  //   }
  //   return true;
  // };
});
