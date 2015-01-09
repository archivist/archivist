"use strict";
var PanelController = require("substance-composer").PanelController;
var SubjectsView = require("./subjects_view");
var _ = require("underscore");
var MetadataService = require('../../metadata_service');

  
// A simple tree implementation
// -------------

var Tree = function(nodes) {
  this.nodes = nodes;
  this.buildIndexes();
};

Tree.Prototype = function() {

  this.buildIndexes = function() {
    // Build a map of parents referencing their kids
    this.parentIndex = {};
    _.each(this.nodes, function(node) {
      var parent = node.parent || "root";
      if (!this.parentIndex[parent]) {
        this.parentIndex[parent] = [ node ];
      } else {
        this.parentIndex[parent].push(node);
      }
    }, this);
  };

  // Get a node by id
  this.get = function(id) {
    return this.nodes[id];
  };

  // Get children nodes for a given node using our parentIndex
  this.getChildren = function(nodeId) {
    return this.parentIndex[nodeId] || [];
  };

  // Get parent node for a given nodeId
  this.getParent = function(nodeId) {
    var node = this.nodes[nodeId];
    return this.nodes[node.parent];
  };

  // Walk the tree
  this.walkTree = function(fn, ctx) {
    var self = this;
    if (!ctx) ctx = this;

    function _walkTree(rootNode, fn, ctx) {
      if (rootNode !== "root") {
        fn.call(ctx, rootNode);  
      }

      _.each(self.getChildren(rootNode.id), function(child) {
        _walkTree(child, fn, ctx);
      });
    }

    return _walkTree("root", fn, ctx);
  };
};

Tree.prototype = new Tree.Prototype();

var SubjectsController = function(doc, writerCtrl) {
  PanelController.call(this, doc, writerCtrl);

  this.metadataService = MetadataService.instance();

  var subjects = this.metadataService.getSubjects();
  this.tree = new Tree(subjects);
};

SubjectsController.Prototype = function() {

  this.createView = function() {
    if (!this.view) {
      this.view = new SubjectsView(this);
    }
    return this.view;
  };

  // Used by: SubjectsView.renderList()

  this.getAllReferencedSubjects = function() {
    var doc = this.document;
    var subjectReferences = doc.getIndex("multi_annotations").get("content");
    var availableSubjects = this.getSubjects();

    var subjects = []; // The result
    _.each(subjectReferences, function(subjectRef) {
      subjects = subjects.concat(_.map(subjectRef.target, function(subjectId) {
        return availableSubjects[subjectId];
      }, this));
    }, this);

    return subjects;
  };

  // Retrieve all referenced subjects for a given subjectReferenceId
  // Used by: SubjectsView.renderShow()

  this.getReferencedSubjects = function(subjectReferenceId) {
    var annotation = this.document.get(subjectReferenceId);
    // just to make sure
    if (!annotation) return [];
    var availableSubjects = this.getSubjects();
    return _.map(annotation.target, function(subjectId) {
      return availableSubjects[subjectId];
    });
  };

  this.getSubjects = function() {
    var subjects = this.metadataService.getSubjects();
    return subjects;
  };

  this.getSubjectsTree = function() {
    var tree = this.tree;

    function getChildren(parentId) {
      var res = [];
      var nodes = tree.getChildren(parentId);
      if (nodes.length === 0) return res; // exit condition

      _.each(nodes, function(node) {
        var entry = {
          id: node.id,
          text: node.name,
          children: getChildren(node.id) // get children for subj
        };
        res.push(entry);
      });
      return res;
    }

    return getChildren("root");
  };

  this.getFullPathForSubject = function(subjectId) {
    var tree = this.tree;
    var res = [];

    function getParent(nodeId) {
      var node = tree.get(nodeId);
      var parent = tree.getParent(nodeId);
      if (parent) getParent(parent.id);

      res.push(node.name);
      return res;
    }

    return getParent(subjectId);
  };
};


SubjectsController.Prototype.prototype = PanelController.prototype;
SubjectsController.prototype = new SubjectsController.Prototype();

module.exports = SubjectsController;
