(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Interview = require("./interview");
var SubjectsModel = require("./subjects_model");

Interview.SubjectsModel = SubjectsModel;

module.exports = Interview;
},{"./interview":2,"./subjects_model":14}],2:[function(require,module,exports){
"use strict";

var Substance = require('substance');
var Document = Substance.Document;

// Nodes
// --------------

var DocumentNode = require("./nodes/document_node");
var TextNode = require("./nodes/text_node");
var Emphasis = require("./nodes/emphasis");
var Strong = require("./nodes/strong");
var Remark = require("./nodes/remark");
var Comment = require("./nodes/comment");
var Reply = require("./nodes/reply");
var Timecode = require("./nodes/timecode");
var SubjectReference = require("./nodes/subject_reference");
var EntityReference = require("./nodes/entity_reference");
var Waypoint = require("./nodes/waypoint");

var schema = new Document.Schema("archivist-interview", "0.2.0");

schema.getDefaultTextType = function() {
  return "text";
};

schema.addNodes([
  DocumentNode,
  Emphasis,
  Strong,
  Remark, // Legacy
  Comment,
  Reply,
  Timecode,
  SubjectReference,
  EntityReference,
  Waypoint
]);

var Interview = function() {
  Interview.super.call(this, schema);
};

Interview.Prototype = function() {

  this.initialize = function() {
    this.super.initialize.apply(this, arguments);

    this.create({
      type: "container",
      id: "content",
      nodes: []
    });

    this.entityReferencesIndex = this.addIndex('entityReferencesIndex', Substance.Data.Index.create({
      type: "entity_reference",
      property: "target"
    }));

    // Legacy
    this.remarksIndex = this.addIndex('remarksIndex', Substance.Data.Index.create({
      type: "remark",
      property: "id"
    }));

    this.commentsIndex = this.addIndex('commentsIndex', Substance.Data.Index.create({
      type: "comment",
      property: "id"
    }));

    this.subjectReferencesIndex = this.addIndex('subjectReferencesIndex', Substance.Data.Index.create({
      type: "subject_reference",
      property: "target"
    }));
  };

  this.documentDidLoad = function() {
    Interview.super.prototype.documentDidLoad.call(this);
  };

  // TODO: implement!
  this.toXml = function() {
    // return new ArticleXmlExporter().convert(this);
  };

};


Substance.inherit(Interview, Document);

Interview.schema = schema;

Interview.fromJson = function(json) {
  var doc = new Interview();
  doc.loadSeed(json);
  return doc;
};

Interview.fromXml = function(xml) {
  // $root = $(xml);
  // var doc = new Interview();
  // new ArticleHtmlImporter().convert($root, doc);
  // doc.documentDidLoad();
  // return doc;
};


module.exports = Interview;
},{"./nodes/comment":3,"./nodes/document_node":4,"./nodes/emphasis":5,"./nodes/entity_reference":6,"./nodes/remark":7,"./nodes/reply":8,"./nodes/strong":9,"./nodes/subject_reference":10,"./nodes/text_node":11,"./nodes/timecode":12,"./nodes/waypoint":13,"substance":306}],3:[function(require,module,exports){
var ContainerAnnotation = require("substance").Document.ContainerAnnotation;

var Comment = ContainerAnnotation.extend({
  name: "comment",
  properties: {
    "content": "string",
    "creator": "string",
    "created_at": "date",
    "replies": ["array", "id"]
  }
});

module.exports = Comment;
},{"substance":306}],4:[function(require,module,exports){
var Substance = require('substance');

var DocumentNode = Substance.Document.Node.extend({
  name: "document",
  properties: {
    // General stuff
    "guid": "string",
    "creator": "string",
    "title": "string",
    "short_summary": "string",
    "short_summary_en": "string",
    "abstract": "string",
    "abstract_en": "string",
    "abstract_de": "string",
    "created_at": "string",
    "updated_at": "string",
    "published_on": "string",

    // Project related
    "project_name": "string",
    "project_location": "string", // points to an entity id
    "conductor": "string",
    "operator": "string",
    "sound_operator": "string",
    "record_type": "string", // "video" or "audio"
    "media_id": "string",
    "interview_location": "string",
    "interview_date": "string",
    "persons_present": "string",
    "interview_duration": "number",

    // Subject related
    "interviewee_bio": "string",
    "interviewee_bio_en": "string",
    "interviewee_bio_de": "string",
    "interviewee_waypoints": ["array", "waypoint"],

    // Workflow
    "transcripted": "boolean",
    "verified": "boolean",
    "finished": "boolean",
    "published": "boolean"
  },

  getWaypoints: function() {
    return this.interviewee_waypoints.map(function(waypointId) {
      return this.getDocument().get(waypointId);
    }.bind(this));
  }
});

module.exports = DocumentNode;
},{"substance":306}],5:[function(require,module,exports){
var Substance = require("substance");

var Document = Substance.Document;

var Emphasis = Document.Annotation.extend({
  name: "emphasis"
});

// Html import
// -----------

Emphasis.static.matchElement = function(el) {
  var tagName = el.tagName.toLowerCase();
  return (tagName === 'i' || tagName === 'em');
};

module.exports = Emphasis;

},{"substance":306}],6:[function(require,module,exports){
var Document = require('substance').Document;

var EntityReference = Document.Annotation.extend({
  name: "entity_reference",
  properties: {
    "target": "string"
  }
});

module.exports = EntityReference;
},{"substance":306}],7:[function(require,module,exports){
var ContainerAnnotation = require("substance").Document.ContainerAnnotation;

var Remark = ContainerAnnotation.extend({
  name: "remark",
  properties: {
    "content": "string"
  }
});

module.exports = Remark;

},{"substance":306}],8:[function(require,module,exports){
var ContainerAnnotation = require("substance").Document.ContainerAnnotation;

var Reply = ContainerAnnotation.extend({
  name: "reply",
  properties: {
    "content": "string"
  }
});

module.exports = Reply;
},{"substance":306}],9:[function(require,module,exports){
var Substance = require("substance");
var Document = Substance.Document;

var Strong = Document.Annotation.extend({
  name: "strong"
});

Strong.static.matchElement = function(el) {
  var tagName = el.tagName.toLowerCase();
  return (tagName === 'b' || tagName === 'strong');
};

module.exports = Strong;
},{"substance":306}],10:[function(require,module,exports){
var ContainerAnnotation = require("substance").Document.ContainerAnnotation;

var SubjectReference = ContainerAnnotation.extend({
  name: "subject_reference",
  properties: {
    "target": ["array", "string"]
  }
});

module.exports = SubjectReference;

},{"substance":306}],11:[function(require,module,exports){
var Substance = require("substance");
var Document = Substance.Document;

// Note: in archivist paragraphs are called text nodes.
var TextNode = Document.TextNode.extend({
  name: "text"
});

// Html import
// -----------

TextNode.static.blockType = true;

TextNode.static.matchElement = function(el) {
  var tagName = el.tagName.toLowerCase();
  return (tagName === 'p');
};

TextNode.static.fromHtml = function(el, converter) {
  var text = {
    id: el.dataset.id || Substance.uuid('text'),
    content: ''
  };
  text.content = converter.annotatedText(el, [text.id, 'content']);
  return text;
};


module.exports = TextNode;
},{"substance":306}],12:[function(require,module,exports){
var Substance = require('substance');

var Timecode = Substance.Document.Annotation.extend({
  name: "timecode"
});

module.exports = Timecode;
},{"substance":306}],13:[function(require,module,exports){
var Substance = require('substance');

var Waypoint = Substance.Document.Node.extend({
  name: "waypoint",
  properties: {
    "entityId": "string",
    "density": "string"
  }
});

module.exports = Waypoint;
},{"substance":306}],14:[function(require,module,exports){
var Tree = require("./tree");
var Substance = require("substance");
var _ = require("substance/helpers");

var SubjectsModel = function(doc, subjects) {
  this.doc = doc;
  
  // Convert subjects to hash
  this.subjects = {};
  Substance.each(subjects, function(subject) {
    var references = doc.subjectReferencesIndex.get(subject.id);
    this.subjects[subject.id] = subject;
    this.subjects[subject.id].references = Substance._.pluck(references, 'id');
  }, this);
  this.tree = new Tree(this.subjects);
};


// Get tree representation suitable for jsTree widget
// ----------------

SubjectsModel.prototype.getTree = function() {
  var tree = this.tree;

  function getChildren(parentId) {
    var res = [];
    var nodes = tree.getChildren(parentId);
    if (nodes.length === 0) return res; // exit condition

    Substance.each(nodes, function(node) {
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


SubjectsModel.prototype.getAllReferencedSubjects = function() {
  var doc = this.doc;
  var subjectRefs = doc.subjectReferencesIndex.get();
  var subjects = [];

  Substance.each(subjectRefs, function(subjectRef) {
    Substance.each(subjectRef.target, function(subjectId) {
      var subject = this.tree.get(subjectId);
      if (!Substance.includes(subjects, subject)) {
        if(subject === undefined) {
          console.log('You have outdated subjects in this interview')
        } else {
          subjects.push(subject);
        }  
      }
    }, this);
  }, this);

  return subjects;
};


SubjectsModel.prototype.getTree = function() {
  return this.tree;
};

SubjectsModel.prototype.getReferencedSubjectsTree = function() {
  var referencedSubjects = this.getAllReferencedSubjectsWithParents();
  var filteredModel = new SubjectsModel(this.doc, referencedSubjects);
  return filteredModel.tree;
};

SubjectsModel.prototype.getFullPathForSubject = function(subjectId) {
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
  
// Used in state_handlers.js
SubjectsModel.prototype.getReferencesForSubject = function(subjectId) {
  var tree = this.getReferencedSubjectsTree();
  var relevantSubjects = tree.getAllChildren(subjectId).concat(subjectId);
  var doc = this.doc;
  var references = [];

  _.each(relevantSubjects, function(subjectId) {
    references = references.concat(Object.keys(doc.subjectReferencesIndex.get(subjectId)));
  });

  return _.uniq(references);
};

SubjectsModel.prototype.getAllReferencedSubjectsWithParents = function() {
  var referencedSubjects = this.getAllReferencedSubjects();
  var subjects = Substance.clone(referencedSubjects);
  var tree = this.tree;
  
  Substance.each(referencedSubjects, function(subject) {
    collectParents(subject.id);
  });

  function collectParents(nodeId) {
    var node = tree.get(nodeId);
    var parent = tree.getParent(nodeId);
    if (parent) collectParents(parent.id);

    subjects.push(node);
    return;
  }

  subjects = Substance.uniq(subjects);
  
  return subjects;
};

module.exports = SubjectsModel;
},{"./tree":15,"substance":306,"substance/helpers":305}],15:[function(require,module,exports){
var Substance = require("substance");
var _ = require("substance/helpers");

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
    Substance.each(this.nodes, function(node) {
      var parent = node.parent || "root";
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

  // Collect all parent ids of a given node
  this.getParents = function(nodeId) {
    var node = this.get(nodeId);
    var parents = [];
    while (node = this.getParent(node.id)) {
      parents.push(node.id);
    }
    return parents;
  };

  // Collect all child nodes of a node
  // returns list of ids
  this.getAllChildren = function(nodeId) {
    var childNodes = this.getChildren(nodeId);
    if (childNodes.length === 0) return [];
    var allChildren = _.pluck(childNodes, 'id');
    _.each(childNodes, function(childNode) {
      allChildren = allChildren.concat(this.getAllChildren(childNode.id))
    }, this);
    return allChildren;
  }

  // Walk the tree
  this.walkTree = function(fn, ctx) {
    var self = this;
    if (!ctx) ctx = this;

    function _walkTree(rootNode, fn, ctx) {
      if (rootNode !== "root") {
        fn.call(ctx, rootNode);
      }
      var children = self.getChildren(rootNode.id);
      Substance.each(self.getChildren(rootNode.id || rootNode), function(child) {
        _walkTree(child, fn, ctx);
      });
    }

    return _walkTree("root", fn, ctx);
  };
};

Tree.prototype = new Tree.Prototype();

module.exports = Tree;
},{"substance":306,"substance/helpers":305}],16:[function(require,module,exports){
var CustomWriter = require('./src');

module.exports = CustomWriter;
},{"./src":291}],17:[function(require,module,exports){
"use strict";

var $$ = React.createElement;

var AnnotationComponent = React.createClass({
  name: "annotation-component",
  displayName: "AnnotationComponent",
  getClassName: function getClassName() {
    var typeNames = this.props.node.getTypeNames();
    var classNames = typeNames.join(" ");
    if (this.props.classNames) {
      classNames += " " + this.props.classNames.join(" ");
    }
    return classNames.replace(/_/g, "-");
  },
  render: function render() {
    return $$("span", {
      className: this.getClassName(),
      "data-id": this.props.node.id }, this.props.children);
  }
});

module.exports = AnnotationComponent;

},{}],18:[function(require,module,exports){
"use strict";

var $$ = React.createElement;
var Substance = require("substance");

var _ = require("substance/helpers");
var Scrollbar = require("./scrollbar");
var PanelMixin = require("./panel_mixin");

var ContentPanelMixin = _.extend({}, PanelMixin, {

  contextTypes: {
    app: React.PropTypes.object.isRequired,
    componentRegistry: React.PropTypes.object.isRequired
  },

  getDefautlProps: function getDefautlProps() {
    return {
      containerId: "content"
    };
  },

  // Since component gets rendered multiple times we need to update
  // the scrollbar and reattach the scroll event
  componentDidMount: function componentDidMount() {
    var app = this.context.app;
    this.updateScrollbar();
    this.updateScroll();
    $(window).on("resize", this.updateScrollbar);

    var doc = app.doc;
    doc.connect(this, {
      "document:changed": this.onDocumentChange,
      "app:toc-entry-selected": this.onTOCEntrySelected
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    var app = this.context.app;
    var doc = app.doc;
    doc.disconnect(this);
    $(window).off("resize");
  },

  onDocumentChange: function onDocumentChange() {
    setTimeout((function () {
      this.updateScrollbar();
    }).bind(this), 0);
  },

  onTOCEntrySelected: function onTOCEntrySelected(nodeId) {
    this.scrollToNode(nodeId);
  },

  componentDidUpdate: function componentDidUpdate() {
    this.updateScrollbar();
    this.updateScroll();
  },

  updateScroll: function updateScroll() {
    var app = this.context.app;
    if (app.state.noScroll) return;
    var targetNodes = app.getHighlightedNodes();
    if (targetNodes && targetNodes.length > 0) {
      this.scrollToNode(targetNodes[0]);
    }
  },

  updateScrollbar: function updateScrollbar() {
    var scrollbar = this.refs.scrollbar;
    var panelContentEl = React.findDOMNode(this.refs.panelContent);

    // We need to await next repaint, otherwise dimensions will be wrong
    Substance.delay((function () {
      scrollbar.update(panelContentEl, this);
    }).bind(this), 0);

    // (Re)-Bind scroll event on new panelContentEl
    $(panelContentEl).off("scroll");
    $(panelContentEl).on("scroll", this._onScroll);
  },

  _onScroll: function _onScroll(e) {
    var panelContentEl = React.findDOMNode(this.refs.panelContent);
    this.refs.scrollbar.update(panelContentEl, this);
    this.markActiveTOCEntry();
  },

  markActiveTOCEntry: function markActiveTOCEntry() {
    var panelContentEl = React.findDOMNode(this.refs.panelContent);

    var contentHeight = this.getContentHeight();
    var panelHeight = this.getPanelHeight();
    var scrollTop = this.getScrollPosition();

    var scrollBottom = scrollTop + panelHeight;

    var regularScanline = scrollTop;
    var smartScanline = 2 * scrollBottom - contentHeight;
    var scanline = Math.max(regularScanline, smartScanline);

    // $('.scanline').css({
    //   top: (scanline - scrollTop)+'px'
    // });

    // TODO: this should be generic
    var headings = $(panelContentEl).find(".content-node.heading");

    if (headings.length === 0) return;

    // Use first heading as default
    var activeNode = _.first(headings).dataset.id;
    headings.each(function () {
      if (scanline >= $(this).position().top) {
        activeNode = this.dataset.id;
      }
    });

    var doc = this.getDocument();
    doc.emit("app:toc-entry:changed", activeNode);
  },

  // Rendering
  // -----------------

  getContentEditor: function getContentEditor() {
    var app = this.context.app;
    var doc = app.doc;

    var componentRegistry = this.context.componentRegistry;
    var ContentContainerClass;
    // FIXME: this is called getContentEditor() but requires 'content_container'
    if (componentRegistry.contains("content_container")) {
      ContentContainerClass = componentRegistry.get("content_container");
    } else {
      ContentContainerClass = componentRegistry.get("content_editor");
    }

    return $$(ContentContainerClass, {
      doc: doc,
      node: doc.get(this.props.containerId),
      ref: "contentEditor"
    });
  },

  render: function render() {
    var app = this.context.app;

    return $$("div", { className: "panel content-panel-component" }, // usually absolutely positioned
    $$(Scrollbar, {
      id: "content-scrollbar",
      contextId: app.state.contextId,
      // React says that we do not need to bind this method
      highlights: app.getHighlightedNodes,
      ref: "scrollbar"
    }),
    // $$('div', {className: 'scanline'}),
    $$("div", { className: "panel-content", ref: "panelContent" }, // requires absolute positioning, overflow=auto
    this.getContentEditor()));
  }
});

var ContentPanel = React.createClass({
  mixins: [ContentPanelMixin],
  displayName: "ContentPanel"
});

module.exports = ContentPanel;

},{"./panel_mixin":31,"./scrollbar":33,"substance":46,"substance/helpers":45}],19:[function(require,module,exports){
"use strict";

var $$ = React.createElement;

// The Content Panel
// ----------------

var ContentTools = React.createClass({

  contextTypes: {
    app: React.PropTypes.object.isRequired
  },

  displayName: "ContentTools",
  render: function render() {
    var app = this.context.app;
    var tools = app.getTools();

    var props = {
      doc: this.props.doc,
      switchContext: this.props.switchContext
    };

    var toolComps = tools.map(function (tool, index) {
      props.key = index;
      return $$(tool, props);
    });

    return $$("div", { className: "content-tools-component" }, $$("div", { className: "tools" }, toolComps));
  }
});

module.exports = ContentTools;

},{}],20:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var _ = require("substance/helpers");
var Highlight = require("./text_property").Highlight;
var ExtensionManager = require("./extension_manager");
var Modal = require("./modal");

var Document = Substance.Document;
var Selection = Document.Selection;
var Surface = Substance.Surface;
var Clipboard = Surface.Clipboard;
var SurfaceManager = Surface.SurfaceManager;

var $$ = React.createElement;

// Mixin with helpers to implement a DocumentController
// ----------------

var DocumentControllerMixin = {

  getDefaultProps: function getDefaultProps() {
    return {
      contentContainer: "content"
    };
  },

  // Internal Methods
  // ----------------------

  _initializeController: function _initializeController() {

    // We need to do this manually since we can't call the EventEmitter constructor function
    this.__events__ = {};

    // Initialize doc
    var doc = this.getDocument();

    // For compatibility with extensions which rely on the app.doc instance
    this.doc = doc;

    var config = this.getConfig();

    // Initialize surface registry
    this.surfaces = {};

    doc.connect(this, {
      "transaction:started": this._transactionStarted,
      "document:changed": this._onDocumentChanged
    });

    this._onSelectionChangedDebounced = _.debounce(this._onSelectionChanged, 100);

    // Note: we are treating basics as extension internally
    var basics = {
      name: "_basics",
      components: config.components || {},
      stateHandlers: config.stateHandlers || {},
      tools: config.tools || []
    };
    var extensions = [basics];
    if (config.extensions) {
      extensions = extensions.concat(config.extensions);
    }

    this.extensionManager = new ExtensionManager(extensions, this);

    var componentRegistry = new Substance.Registry();
    _.each(extensions, function (extension) {
      _.each(extension.components, function (ComponentClass, name) {
        componentRegistry.add(name, ComponentClass);
      });
    });
    this.componentRegistry = componentRegistry;

    var toolRegistry = new Substance.Surface.ToolRegistry();
    _.each(extensions, function (extension) {
      _.each(extension.tools, function (ToolClass, name) {
        // WARN: this could potentially get problematic, if React derives
        // the current context differently.
        var context = _.extend({}, this.context, this.getChildContext());
        toolRegistry.add(name, new ToolClass(context));
      }, this);
    }, this);
    this.toolRegistry = toolRegistry;

    this.surfaceManager = new SurfaceManager(doc);
    this.clipboard = new Clipboard(this.surfaceManager, this.doc.getClipboardImporter(), this.doc.getClipboardExporter());
  },

  _transactionStarted: function _transactionStarted(tx) {
    // store the state so that it can be recovered when undo/redo
    tx.before.state = this.state;
    tx.before.selection = this.getSelection();
    if (this.activeSurface) {
      tx.before.surfaceName = this.activeSurface.name;
    }
  },

  _onDocumentChanged: function _onDocumentChanged(change, info) {
    this.doc.__dirty = true;
    var notifications = this.context.notifications;
    notifications.addMessage({
      type: "info",
      message: "Unsaved changes"
    });
    // This is the undo/redo case
    if (info.replay) {
      this.replaceState(change.after.state);
    }
  },

  _onSelectionChanged: function _onSelectionChanged(sel, surface) {
    this.updateSurface(surface);
    // var modules = this.getModules();
    this.extensionManager.handleSelectionChange(sel);
    this.toolRegistry.each(function (tool) {
      // console.log('Updating tool', tool.constructor.static.name, surface, sel);
      tool.update(surface, sel);
    }, this);
    this.emit("selection:changed", sel);
  },

  requestSave: function requestSave() {
    var doc = this.props.doc;
    var backend = this.context.backend;
    var notifications = this.context.notifications;

    if (doc.__dirty && !doc.__isSaving) {
      notifications.addMessage({
        type: "info",
        message: "Saving ..."
      });

      doc.__isSaving = true;
      backend.saveDocument(doc, function (err) {
        doc.__isSaving = false;
        if (err) {
          notifications.addMessage({
            type: "error",
            message: err.message || err.toString()
          });
        } else {
          doc.emit("document:saved");
          notifications.addMessage({
            type: "info",
            message: "No changes"
          });
          doc.__dirty = false;
        }
      });
    }
  },

  // Surface related
  // ----------------------

  registerSurface: function registerSurface(surface, options) {
    options = options || {};
    var name = surface.getName();
    this.surfaces[name] = surface;
    // HACK: we store enabled tools on the surface instance for later lookup
    surface.enabledTools = options.enabledTools || [];

    surface.connect(this, {
      "selection:changed": this._onSelectionChangedDebounced
    });
  },

  unregisterSurface: function unregisterSurface(surface) {
    Substance.each(this.surfaces, function (s, name) {
      if (surface === s) {
        delete this.surfaces[name];
      }
    }, this);
    surface.disconnect(this);
  },

  updateSurface: function updateSurface(surface) {
    this.activeSurface = surface;
  },

  getSurface: function getSurface() {
    return this.activeSurface;
  },

  getSelection: function getSelection() {
    if (!this.activeSurface) return Document.nullSelection;
    return this.activeSurface.getSelection();
  },

  // Checks based on the surface registry if a certain tool is enabled
  isToolEnabled: function isToolEnabled(toolName) {
    var activeSurface = this.getSurface();
    var enabledTools = activeSurface.enabledTools;
    return _.includes(enabledTools, toolName);
  },

  executeAction: function executeAction(actionName) {
    return this.extensionManager.handleAction(actionName);
  },

  closeModal: function closeModal() {
    var newState = _.cloneDeep(this.state);
    delete newState.modal;
    this.replaceState(newState);
  },

  _panelPropsFromState: function _panelPropsFromState(state) {
    var props = _.omit(state, "contextId");
    props.doc = this.doc;
    // Legacy: panels should only access the app using this.context.app
    props.app = this;
    return props;
  },

  getActivePanelElement: function getActivePanelElement() {
    var panelComponent = this.componentRegistry.get(this.state.contextId);

    if (panelComponent) {
      return $$(panelComponent, this._panelPropsFromState(this.state));
    } else {
      console.warn("Could not find component for contextId:", this.state.contextId);
    }
  },

  getActiveModalPanelElement: function getActiveModalPanelElement() {
    var state = this.state;

    if (state.modal) {
      var modalPanelComponent = this.componentRegistry.get(state.modal.contextId);
      if (modalPanelComponent) {
        return $$(modalPanelComponent, this._panelPropsFromState(state.modal));
      } else {
        console.warn("Could not find component for contextId:", state.modal.contextId);
      }
    }
  },

  getActiveContainerAnnotations: function getActiveContainerAnnotations() {
    return this.extensionManager.getActiveContainerAnnotations();
  },

  getHighlightedNodes: function getHighlightedNodes() {
    return this.extensionManager.getHighlightedNodes();
  },

  deleteAnnotation: function deleteAnnotation(annotationId) {
    var anno = this.doc.get(annotationId);
    var tx = this.doc.startTransaction({ selection: this.getSelection() });
    tx["delete"](annotationId);
    tx.save({ selection: Selection.create(anno.path, anno.startOffset, anno.endOffset) });
  },

  annotate: function annotate(annoSpec) {
    var sel = this.getSelection();
    var path = annoSpec.path;
    var startOffset = annoSpec.startOffset;
    var endOffset = annoSpec.endOffset;

    // Use active selection for retrieving path and range
    if (!path) {
      if (sel.isNull()) throw new Error("Selection is null");
      if (!sel.isPropertySelection()) throw new Error("Selection is not a PropertySelection");
      path = sel.getPath();
      startOffset = sel.getStartOffset();
      endOffset = sel.getEndOffset();
    }

    var annotation = Substance.extend({}, annoSpec);
    annotation.id = annoSpec.id || annoSpec.type + "_" + Substance.uuid();
    annotation.path = path;
    annotation.startOffset = startOffset;
    annotation.endOffset = endOffset;

    // Start the transaction with an initial selection
    var tx = this.doc.startTransaction({ selection: this.getSelection() });
    annotation = tx.create(annotation);
    tx.save({ selection: sel });

    return annotation;
  },

  undo: function undo() {
    if (this.doc.done.length > 0) {
      this.doc.undo();
    }
  },

  redo: function redo() {
    if (this.doc.undone.length > 0) {
      this.doc.redo();
    }
  },

  // React.js specific
  // ----------------------

  contextTypes: {
    backend: React.PropTypes.object.isRequired,
    notifications: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    // used by text properties to render 'active' annotations
    // For active container annotations annotation fragments are inserted
    // which can be used to highlight the associated range
    doc: React.PropTypes.object,
    app: React.PropTypes.object,
    getHighlightedNodes: React.PropTypes.func,
    getHighlightsForTextProperty: React.PropTypes.func,
    componentRegistry: React.PropTypes.object,
    toolRegistry: React.PropTypes.object,
    surfaceManager: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    var context = {
      app: this,
      doc: this.doc,
      getHighlightedNodes: this.getHighlightedNodes,
      getHighlightsForTextProperty: this.getHighlightsForTextProperty,
      componentRegistry: this.componentRegistry,
      toolRegistry: this.toolRegistry,
      surfaceManager: this.surfaceManager
    };
    return context;
  },

  getInitialState: function getInitialState() {
    var defaultContextId = this.props.contextId;
    return { "contextId": defaultContextId || "toc" };
  },

  // Internal methods
  // ----------------

  getDocument: function getDocument() {
    return this.props.doc;
  },

  getConfig: function getConfig() {
    return this.props.config;
  },

  // Events
  // ----------------

  componentWillMount: function componentWillMount() {
    this._initializeController();
  },

  componentWillUnmount: function componentWillUnmount() {
    // some tools might need to get disposed
    this.toolRegistry.dispose();
    this.clipboard.detach(React.findDOMNode(this));
    this.surfaceManager.dispose();
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    var sprevState = JSON.stringify(this.state);
    var snextState = JSON.stringify(nextState);
    if (Substance.isEqual(sprevState, snextState)) {
      return false;
    }
    return true;
  },

  componentDidMount: function componentDidMount() {
    // if (!window.devMode) {
    //   setInterval(function() {
    //     this.requestAutoSave();
    //   }.bind(this), 10000);
    // }
    var rootElement = React.findDOMNode(this);
    this.clipboard.attach(rootElement);
  },

  handleAction: function handleAction(actionName) {
    this.extensionManager.handleAction(actionName);
  },

  // E.g. when a tool requests a context switch
  handleContextSwitch: function handleContextSwitch(contextId) {
    this.replaceState({
      contextId: contextId
    });
  },

  handleCloseDialog: function handleCloseDialog(e) {
    e.preventDefault();
    console.log("handling close");
    this.replaceState(this.getInitialState());
  },

  // Triggered by Writer UI
  handleContextToggle: function handleContextToggle(e) {
    e.preventDefault();
    var newContext = $(e.currentTarget).attr("data-id");
    this.handleContextSwitch(newContext);
  },

  // Rendering
  // ----------------

  // Toggles for explicitly switching between context panels
  createContextToggles: function createContextToggles() {
    var panelOrder = this.props.config.panelOrder;
    var contextId = this.state.contextId;
    var toggleComps = [];

    _.each(panelOrder, function (panelId) {
      var panelClass = this.componentRegistry.get(panelId);
      var className = ["toggle-context"];
      if (panelClass.contextId === contextId) {
        className.push("active");
      }

      toggleComps.push($$("a", {
        className: className.join(" "),
        href: "#",
        key: panelClass.contextId,
        "data-id": panelClass.contextId,
        onClick: this.handleContextToggle,
        dangerouslySetInnerHTML: { __html: "<i class=\"fa " + panelClass.icon + "\"></i> <span class=\"label\">" + panelClass.displayName + "</span>" }
      }));
    }, this);

    return $$("div", { className: "context-toggles" }, toggleComps);
  },

  createModalPanel: function createModalPanel() {
    var modalPanelElement = this.getActiveModalPanelElement();
    if (!modalPanelElement) {
      // Just render an empty div if no modal active available
      return $$("div");
    }
    return $$(Modal, {
      panelElement: modalPanelElement
    });
  },

  // Create a new panel based on current writer state (contextId)
  createContextPanel: function createContextPanel() {
    var panelElement = this.getActivePanelElement();
    if (!panelElement) {
      return $$("div", null, "No panels are registered");
    }
    return panelElement;
  }

};

module.exports = DocumentControllerMixin;

},{"./extension_manager":22,"./modal":29,"./text_property":34,"substance":46,"substance/helpers":45}],21:[function(require,module,exports){
'use strict';

var _ = require('substance/helpers');
var $$ = React.createElement;

var DropdownComponent = React.createClass({
  displayName: 'DropdownComponent',

  // Prevent click behavior as we want to preserve the text selection in the doc
  handleClick: function handleClick(e) {
    e.preventDefault();
  },

  handleDropdownToggle: function handleDropdownToggle(e) {
    e.preventDefault();

    var open = this.state.open;
    var self = this;

    if (open) return;
    this.setState({ open: !this.state.open });

    setTimeout(function () {
      $(window).one('mousedown', function (e) {
        // e.preventDefault();
        // e.stopPropagation();
        self.close();
      });
    }, 0);
  },

  close: function close() {
    this.setState({
      open: false
    });
  },

  getInitialState: function getInitialState() {
    return {
      open: false
    };
  },

  // Note: It's important that all children tools are rendered (even if not shown)
  // because only that way we can keep the disabled states accurate
  render: function render() {
    var classNames = ['dropdown'];
    if (this.props.classNames) {
      classNames = classNames.concat(this.props.classNames);
    }
    if (this.state.open) {
      classNames.push('open');
    }
    return $$('div', { className: classNames.join(' ') }, $$('button', {
      title: this.props.title,
      className: 'toggle',
      onMouseDown: this.handleDropdownToggle,
      onClick: this.handleClick
    }, this.props.label), $$('div', { className: 'options shadow border fill-white' }, this.props.children));
  }
});

module.exports = DropdownComponent;

},{"substance/helpers":45}],22:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var _ = require("substance/helpers");

var ExtensionManager = function ExtensionManager(extensions, writer) {
  this.extensions = extensions;
  this.writer = writer;
};

ExtensionManager.Prototype = function () {

  // Get all available extensions
  this.getExtensions = function () {
    return this.extensions;
  };

  // Get all available tools from core and extensions
  this.getTools = function () {
    var extensions = this.extensions;
    var tools = [];

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];
      if (ext.tools) {
        tools = tools.concat(ext.tools);
      }
    }
    return tools;
  };

  // Generic function to call a state handler
  // ---------------

  this.handle = function (handlerName) {
    var result = null;
    var extensions = this.extensions;

    for (var i = 0; i < extensions.length && !result; i++) {
      var stateHandlers = extensions[i].stateHandlers;
      if (stateHandlers && stateHandlers[handlerName]) {
        result = stateHandlers[handlerName](this.writer, arguments[1], arguments[2]); // .handleContextPanelCreation(this)
      }
    }
    return result;
  };

  this.handleSelectionChange = function (sel) {
    return this.handle("handleSelectionChange", sel);
  };

  this.handleAction = function (actionName) {
    return this.handle("handleAction", actionName);
  };

  this.handleAnnotationToggle = function (annotationId) {
    return this.handle("handleAnnotationToggle", annotationId);
  };

  // Based on a certain writer state, determine which nodes
  // should be highlighted in the scrollbar and in the document
  this.getHighlightedNodes = function () {
    var highlightedNodes = this.handle("getHighlightedNodes");
    return highlightedNodes || [];
  };

  // Desired implementation
  this.getActiveContainerAnnotations = function () {
    var activeContainerAnnotations = this.handle("getActiveContainerAnnotations");
    return activeContainerAnnotations || [];
  };
};

Substance.initClass(ExtensionManager);

module.exports = ExtensionManager;

},{"substance":46,"substance/helpers":45}],23:[function(require,module,exports){
'use strict';

var $$ = React.createElement;

var FontAwesomeIcon = React.createClass({
  displayName: 'FontAwesomeIcon',
  render: function render() {
    return $$('i', { className: 'fa ' + this.props.icon });
  }
});

module.exports = FontAwesomeIcon;

},{}],24:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var TextProperty = require('substance-ui/text_property');
var $$ = React.createElement;

var HeadingComponent = (function (_React$Component) {
  _inherits(HeadingComponent, _React$Component);

  function HeadingComponent() {
    _classCallCheck(this, HeadingComponent);

    _get(Object.getPrototypeOf(HeadingComponent.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(HeadingComponent, [{
    key: 'render',
    value: function render() {
      var level = this.props.node.level;
      return $$('div', { className: 'content-node heading level-' + level, 'data-id': this.props.node.id }, $$(TextProperty, {
        ref: 'textProp',
        doc: this.props.doc,
        path: [this.props.node.id, 'content']
      }));
    }
  }]);

  return HeadingComponent;
})(React.Component);

HeadingComponent.displayName = 'HeadingComponent';

module.exports = HeadingComponent;

},{"substance-ui/text_property":34}],25:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var $$ = React.createElement;

// Body container
// ----------------
//
// A simple rich text editor implementation based on Substance

var BodyContainer = (function (_React$Component) {
  _inherits(BodyContainer, _React$Component);

  function BodyContainer() {
    _classCallCheck(this, BodyContainer);

    _get(Object.getPrototypeOf(BodyContainer.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(BodyContainer, [{
    key: 'componentWillMount',

    // before it will be mounted the first time
    value: function componentWillMount() {
      var doc = this.props.doc;
      doc.connect(this, {
        'document:changed': this.onDocumentChanged
      });
    }
  }, {
    key: 'componentWillReceiveProps',

    // new doc arriving (bind change events again to new document)
    value: function componentWillReceiveProps(props) {
      this.props.doc.disconnect(this);

      var doc = props.doc;
      doc.connect(this, {
        'document:changed': this.onDocumentChanged
      });
    }
  }, {
    key: 'componentWillUnmount',

    // unbind event handlers before component gets unmounted
    value: function componentWillUnmount() {
      this.props.doc.disconnect(this);
    }
  }, {
    key: 'onDocumentChanged',
    value: function onDocumentChanged(change) {
      if (change.isAffected(['body', 'nodes'])) {
        this.forceUpdate();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var doc = this.props.doc;
      var containerNode = doc.get('body');
      var componentRegistry = this.context.componentRegistry;

      // Prepare container components (aka nodes)
      // ---------

      var components = [];
      components = components.concat(containerNode.nodes.map((function (nodeId) {
        var node = doc.get(nodeId);
        var ComponentClass = componentRegistry.get(node.type);
        return $$(ComponentClass, { key: node.id, doc: doc, node: node });
      }).bind(this)));

      return $$('div', { className: 'body-nodes', contentEditable: true, spellCheck: false }, components);
    }
  }]);

  return BodyContainer;
})(React.Component);

BodyContainer.contextTypes = {
  componentRegistry: React.PropTypes.object.isRequired
};

module.exports = BodyContainer;

},{}],26:[function(require,module,exports){
'use strict';

var Substance = require('substance');
var Document = Substance.Document;
var Paragraph = Document.Paragraph;
var Heading = Document.Heading;
var Emphasis = Document.Emphasis;
var Strong = Document.Strong;

var HtmlImporter = Substance.Document.HtmlImporter;
var HtmlExporter = Substance.Document.HtmlExporter;

// Schema
// ----------------

var schema = new Document.Schema('html-article', '1.0.0');

schema.getDefaultTextType = function () {
  return 'paragraph';
};

schema.addNodes([Paragraph, Heading, Emphasis, Strong]);

// Importer
// ----------------

function Importer() {
  Importer['super'].call(this, { schema: schema });
}

Importer.Prototype = function () {
  this.convert = function ($rootEl, doc) {
    this.initialize(doc, $rootEl);
    this.convertContainer($rootEl, 'body');
    this.finish();
  };
};

Substance.inherit(Importer, HtmlImporter);

// Exporter
// ----------------

function Exporter() {
  Exporter['super'].call(this, { schema: schema });
}

Exporter.Prototype = function () {

  this.convert = function (doc, options) {
    this.initialize(doc, options);

    var doc = this.state.doc;
    var body = doc.get('body');
    var bodyNodes = this.convertContainer(body);
    var $el = $('<div>');
    $el.append(bodyNodes);
    return $el.html();
    return 'foo';
  };
};

Substance.inherit(Exporter, HtmlExporter);

// Article Class
// ----------------

var HtmlArticle = function HtmlArticle() {
  HtmlArticle['super'].call(this, schema);
};

HtmlArticle.Prototype = function () {
  this.initialize = function () {
    this['super'].initialize.apply(this, arguments);

    this.create({
      type: 'container',
      id: 'body',
      nodes: []
    });
  };

  this.toHtml = function () {
    return new Exporter().convert(this);
  };
};

Substance.inherit(HtmlArticle, Document);

HtmlArticle.schema = schema;

HtmlArticle.fromJson = function (json) {
  var doc = new HtmlArticle();
  doc.loadSeed(json);
  return doc;
};

HtmlArticle.fromHtml = function (html) {
  var $root = $('<div>' + html + '</div>');
  var doc = new HtmlArticle();
  new Importer().convert($root, doc);
  doc.documentDidLoad();
  return doc;
};

HtmlArticle.Importer = Importer;

module.exports = HtmlArticle;

},{"substance":46}],27:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Substance = require('substance');
var $$ = React.createElement;
var Surface = Substance.Surface;
var _ = require('substance/helpers');

var HtmlArticle = require('./html_article');
var ContainerEditor = Surface.ContainerEditor;

var Clipboard = Surface.Clipboard;
var SurfaceManager = Surface.SurfaceManager;
var ToolComponent = require('substance-ui/tool_component');
var TextToolComponent = require('substance-ui/text_tool_component');
var BodyContainer = require('./body_container');

var components = {
  'paragraph': require('substance-ui/paragraph_component'),
  'heading': require('substance-ui/heading_component')
};

var tools = Surface.Tools;

// HtmlEditor
// ----------------
//
// A simple rich text editor implementation based on Substance

var HtmlEditor = (function (_React$Component) {
  _inherits(HtmlEditor, _React$Component);

  _createClass(HtmlEditor, [{
    key: 'computeStateFromProps',
    value: function computeStateFromProps(props) {
      var doc = HtmlArticle.fromHtml(props.content);

      var surfaceManager = new SurfaceManager(doc);
      var clipboard = new Clipboard(surfaceManager, doc.getClipboardImporter(), doc.getClipboardExporter());
      var editor = new ContainerEditor('body');
      var surface = new Surface(surfaceManager, doc, editor);

      var debouncedOnContentChanged;

      if (props.onContentChanged) {
        debouncedOnContentChanged = _.debounce(props.onContentChanged, 1000);
      }

      return {
        doc: doc,
        surfaceManager: surfaceManager,
        clipboard: clipboard,
        editor: editor,
        surface: surface,
        debouncedOnContentChanged: debouncedOnContentChanged
      };
    }
  }, {
    key: 'initializeComponent',
    value: function initializeComponent() {
      // We may have already initialized the stuff
      var doc = this.state.doc;
      var surfaceManager = this.state.surfaceManager;
      var surface = this.state.surface;
      var clipboard = this.state.clipboard;
      var bodyContainerEl = React.findDOMNode(this.refs.bodyContainer);

      surfaceManager.registerSurface(surface, {
        enabledTools: this.props.enabledTools
      });

      surface.attach(bodyContainerEl);
      surface.connect(this, {
        'selection:changed': this.onSelectionChanged
      });

      clipboard.attach(React.findDOMNode(this));

      // Needed?
      // this.forceUpdate(function() {
      //   this.surface.rerenderDomSelection();
      // }.bind(this));
    }
  }]);

  function HtmlEditor(props) {
    _classCallCheck(this, HtmlEditor);

    _get(Object.getPrototypeOf(HtmlEditor.prototype), 'constructor', this).call(this, props);

    // Component registry
    this.componentRegistry = new Substance.Registry();
    _.each(components, function (ComponentClass, name) {
      this.componentRegistry.add(name, ComponentClass);
    }, this);

    // Tool registry
    this.toolRegistry = new Substance.Registry();
    _.each(tools, function (ToolClass) {
      this.toolRegistry.add(ToolClass['static'].name, new ToolClass());
    }, this);
  }

  _createClass(HtmlEditor, [{
    key: 'componentWillMount',

    // Lifecycle
    // -------------

    // Creation

    value: function componentWillMount() {
      this.setState(this.computeStateFromProps(this.props));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initializeComponent();
    }
  }, {
    key: 'componentWillReceiveProps',

    // Updating

    value: function componentWillReceiveProps(nextProps) {
      this.dispose(); // clean up before setting up new state
      this.setState(this.computeStateFromProps(nextProps));
    }
  }, {
    key: 'componentDidUpdate',

    // a new doc has arrived
    value: function componentDidUpdate() {
      this.initializeComponent();
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      return this.state.doc.toHtml();
    }
  }, {
    key: 'onSelectionChanged',
    value: function onSelectionChanged(sel, surface) {
      this.toolRegistry.each(function (tool) {
        tool.update(surface, sel);
      }, this);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        surface: this.state.surface,
        componentRegistry: this.componentRegistry,
        toolRegistry: this.toolRegistry
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var doc = this.state.doc;

      return $$('div', { className: 'editor-component' }, this.props.toolbar ? $$(this.props.toolbar) : $$('div'), $$(BodyContainer, {
        ref: 'bodyContainer',
        doc: doc
      }));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.dispose();
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      var surface = this.state.surface;
      var clipboard = this.state.clipboard;
      var surfaceManager = this.state.surfaceManager;

      if (surface) {
        surface.disconnect(this);
        surface.dispose();
      }
      if (clipboard) clipboard.detach(React.findDOMNode(this));
      if (surfaceManager) surfaceManager.dispose();
    }
  }]);

  return HtmlEditor;
})(React.Component);

HtmlEditor.displayName = 'HtmlEditor';

// child context signature provided to editor components
HtmlEditor.childContextTypes = {
  surface: React.PropTypes.object,
  componentRegistry: React.PropTypes.object,
  toolRegistry: React.PropTypes.object
};

// Expose some more useful components
HtmlEditor.ToolComponent = ToolComponent;
HtmlEditor.TextToolComponent = TextToolComponent;

module.exports = HtmlEditor;

},{"./body_container":25,"./html_article":26,"substance":46,"substance-ui/heading_component":24,"substance-ui/paragraph_component":32,"substance-ui/text_tool_component":35,"substance-ui/tool_component":36,"substance/helpers":45}],28:[function(require,module,exports){
'use strict';

module.exports = require('./html_editor');

},{"./html_editor":27}],29:[function(require,module,exports){
"use strict";

var _ = require("substance/helpers");
var $$ = React.createElement;

var ModalPanel = React.createClass({
  contextTypes: {
    app: React.PropTypes.object.isRequired
  },

  displayName: "ManageBibItemsPanel",

  componentDidMount: function componentDidMount() {
    var modalEl = React.findDOMNode(this);
    $(modalEl).on("click", ".close-modal", this.handleCloseModal);
  },

  componentWillUnmount: function componentWillUnmount() {
    var modalEl = React.findDOMNode(this);
    $(modalEl).off("click", ".close-modal", this.handleCloseModal);
  },

  handleCloseModal: function handleCloseModal(e) {
    this.context.app.closeModal();
    e.preventDefault();
  },

  // setTimeout(function() {
  //   $(window).one('mousedown', function(e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     self.close();
  //   });
  // }, 0);

  preventBubbling: function preventBubbling(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  render: function render() {
    return $$("div", { className: "modal " + this.props.panelElement.type.modalSize, onClick: this.handleCloseModal }, $$("div", { className: "body", onClick: this.preventBubbling }, this.props.panelElement));
  }
});

module.exports = ModalPanel;

},{"substance/helpers":45}],30:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var $$ = React.createElement;

// This is an abstract class

var Panel = (function (_React$Component) {
  _inherits(Panel, _React$Component);

  function Panel() {
    _classCallCheck(this, Panel);

    _get(Object.getPrototypeOf(Panel.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Panel, [{
    key: "getDocument",
    value: function getDocument() {
      var app = this.context.app;
      return app.doc;
    }
  }, {
    key: "getPanelContentElement",
    value: function getPanelContentElement() {
      return React.findDOMNode(this.refs.panelContent);
    }
  }, {
    key: "getScrollableContainer",
    value: function getScrollableContainer() {
      return React.findDOMNode(this.refs.panelContent);
    }
  }, {
    key: "getContentHeight",

    // Returns the cumulated height of a panel's content
    value: function getContentHeight() {
      // initialized lazily as this element is not accessible earlier (e.g. during construction)
      // get the new dimensions
      // TODO: better use outerheight for contentheight determination?
      var contentHeight = 0;
      var panelContentEl = this.getPanelContentElement();

      $(panelContentEl).children().each(function () {
        contentHeight += $(this).outerHeight();
      });
      return contentHeight;
    }
  }, {
    key: "getPanelHeight",

    // Returns the height of panel (inner content overflows)
    value: function getPanelHeight() {
      var panelContentEl = this.getPanelContentElement();
      return $(panelContentEl).height();
    }
  }, {
    key: "getScrollPosition",
    value: function getScrollPosition() {
      var panelContentEl = this.getPanelContentElement();
      return $(panelContentEl).scrollTop();
    }
  }, {
    key: "render",

    // This method must be overriden with your panel implementation
    value: function render() {
      return $$("div", { className: "panel" }, $$("div", { className: "panel-content" }, "YOUR_PANEL_CONTENT"));
    }
  }]);

  return Panel;
})(React.Component);

Panel.displayName = "Panel";

module.exports = Panel;

},{}],31:[function(require,module,exports){
// Deprecated API : Inherit from panel.js instead!

"use strict";

var $$ = React.createElement;

var Substance = require("substance");
var Panel = Substance.Surface.Panel;

var PanelMixin = Substance.extend({}, Panel.prototype, {

  getDocument: function getDocument() {
    var app = this.context.app;
    return app.doc;
  },

  getPanelContentElement: function getPanelContentElement() {
    return React.findDOMNode(this.refs.panelContent);
  },

  getScrollableContainer: function getScrollableContainer() {
    return React.findDOMNode(this.refs.panelContent);
  },

  // Returns the cumulated height of a panel's content
  getContentHeight: function getContentHeight() {
    // initialized lazily as this element is not accessible earlier (e.g. during construction)
    // get the new dimensions
    // TODO: use outerheight for contentheight determination?
    var contentHeight = 0;
    var panelContentEl = this.getPanelContentElement();

    $(panelContentEl).children().each(function () {
      contentHeight += $(this).outerHeight();
    });
    return contentHeight;
  },

  // Returns the height of panel (inner content overflows)
  getPanelHeight: function getPanelHeight() {
    var panelContentEl = this.getPanelContentElement();
    return $(panelContentEl).height();
  },

  getScrollPosition: function getScrollPosition() {
    var panelContentEl = this.getPanelContentElement();
    return $(panelContentEl).scrollTop();
  }

});

module.exports = PanelMixin;

},{"substance":46}],32:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var TextProperty = require('substance-ui/text_property');
var $$ = React.createElement;

var Paragraph = (function (_React$Component) {
  _inherits(Paragraph, _React$Component);

  function Paragraph() {
    _classCallCheck(this, Paragraph);

    _get(Object.getPrototypeOf(Paragraph.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Paragraph, [{
    key: 'render',
    value: function render() {
      return $$('div', { className: 'content-node paragraph', 'data-id': this.props.node.id }, $$(TextProperty, {
        doc: this.props.doc,
        path: [this.props.node.id, 'content']
      }));
    }
  }]);

  return Paragraph;
})(React.Component);

Paragraph.displayName = 'Paragraph';

module.exports = Paragraph;

},{"substance-ui/text_property":34}],33:[function(require,module,exports){
"use strict";

var $$ = React.createElement;
var _ = require("substance/helpers");

// A rich scrollbar implementation that supports highlights
// ----------------

var THUMB_MIN_HEIGHT = 7;

var Scrollbar = React.createClass({
  displayName: "Scrollbar",

  getInitialState: function getInitialState() {
    return {
      thumb: { top: 0, height: 20 }, // just render at the top
      highlights: [] // no highlights until state derived
    };
  },

  componentDidMount: function componentDidMount() {
    // HACK global window object!
    $(window).mousemove(this.mouseMove);
    $(window).mouseup(this.mouseUp);
  },

  mouseDown: function mouseDown(e) {
    this._mouseDown = true;
    var scrollBarOffset = $(React.findDOMNode(this)).offset().top;
    var y = e.pageY - scrollBarOffset;
    var thumbEl = this.refs.thumb.getDOMNode();

    if (e.target !== thumbEl) {
      // Jump to mousedown position
      this.offset = $(thumbEl).height() / 2;
      this.mouseMove(e);
    } else {
      this.offset = y - $(thumbEl).position().top;
    }
    return false;
  },

  // Handle Mouse Up
  // -----------------
  //
  // Mouse lifted, no scroll anymore

  mouseUp: function mouseUp() {
    this._mouseDown = false;
  },

  // Handle Scroll
  // -----------------
  //
  // Handle scroll event
  // .visible-area handle

  mouseMove: function mouseMove(e) {
    if (this._mouseDown) {
      var scrollBarOffset = $(React.findDOMNode(this)).offset().top;
      var y = e.pageY - scrollBarOffset;

      // find offset to visible-area.top
      var scroll = (y - this.offset) * this.factor;
      this.scrollTop = $(this.panelContentEl).scrollTop(scroll);
    }
  },

  update: function update(panelContentEl, panel) {
    var self = this;

    this.panelContentEl = panelContentEl;

    var contentHeight = panel.getContentHeight();
    var panelHeight = panel.getPanelHeight();
    var scrollTop = panel.getScrollPosition();

    // Needed for scrollbar interaction
    this.factor = contentHeight / panelHeight;

    var highlights = [];
    // Compute highlights
    this.props.highlights().forEach(function (nodeId) {
      var nodeEl = $(self.panelContentEl).find("*[data-id=" + nodeId + "]");
      if (!nodeEl.length) return;

      var top = nodeEl.position().top / self.factor;
      var height = nodeEl.outerHeight(true) / self.factor;

      // HACK: make all highlights at least 3 pxls high, and centered around the desired top pos
      if (height < Scrollbar.overlayMinHeight) {
        height = Scrollbar.overlayMinHeight;
        top = top - 0.5 * Scrollbar.overlayMinHeight;
      }

      var data = {
        id: nodeId,
        top: top,
        height: height
      };
      highlights.push(data);
    });

    var thumbProps = {
      top: scrollTop / this.factor,
      height: panelHeight / this.factor
    };

    this.setState({
      thumb: thumbProps,
      highlights: highlights
    });
  },

  render: function render() {
    var highlightEls = this.state.highlights.map(function (h) {

      return $$("div", {
        className: "highlight",
        key: h.id,
        style: {
          top: h.top,
          height: h.height
        }
      });
    });

    var thumbEl = $$("div", {
      ref: "thumb",
      className: "thumb",
      style: {
        top: this.state.thumb.top,
        height: Math.max(this.state.thumb.height, THUMB_MIN_HEIGHT)
      }
    });

    return $$("div", { className: "scrollbar-component " + this.props.contextId, onMouseDown: this.mouseDown }, thumbEl, $$("div", { className: "highlights" }, highlightEls));
  }
});

Scrollbar.overlayMinHeight = 5;

module.exports = Scrollbar;

},{"substance/helpers":45}],34:[function(require,module,exports){
'use strict';

var Substance = require('substance');
var _ = require('substance/helpers');
var $$ = React.createElement;
var TextProperty = Substance.Surface.TextProperty;
var Annotator = Substance.Document.Annotator;
var AnnotationComponent = require('./annotation_component');

// TextPropertyComponent
// ----------------
//
var TextPropertyComponent = React.createClass(Substance.extend({}, TextProperty.prototype, {
  displayName: 'TextProperty',

  contextTypes: {
    surface: React.PropTypes.object.isRequired,
    componentRegistry: React.PropTypes.object.isRequired,
    getHighlightedNodes: React.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return { highlights: [] };
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    var textAnnotations = _.pluck(this.getAnnotations(), 'id');
    var textHighlights = _.intersection(textAnnotations, this.getHighlights());
    var shouldUpdate = true;
    if (this._prevTextAnnotations) {
      if (_.isEqual(textAnnotations, this._prevTextAnnotations) && _.isEqual(textHighlights, this._prevTextHighlights)) {
        shouldUpdate = false;
      }
    }
    // Remember so we can check the next update
    this._prevTextAnnotations = textAnnotations;
    this._prevTextHighlights = textHighlights;
    return shouldUpdate;
  },

  componentDidMount: function componentDidMount() {
    var doc = this.props.doc;
    doc.getEventProxy('path').add(this.props.path, this, this.textPropertyDidChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    var doc = this.props.doc;
    doc.getEventProxy('path').remove(this.props.path, this);
  },

  render: function render() {
    return $$(this.props.tagName || 'span', {
      className: 'text-property ' + (this.props.className || ''),
      spellCheck: false,
      style: {
        whiteSpace: 'pre-wrap'
      },
      'data-path': this.props.path.join('.')
    }, this.renderChildren());
  },

  renderChildren: function renderChildren() {
    var componentRegistry = this.context.componentRegistry;
    var doc = this.getDocument();
    var path = this.getPath();
    var text = doc.get(path) || '';
    var annotations = this.getAnnotations();

    // plus fragments of active container annotations

    var highlightedAnnotations = this.getHighlights();

    var annotator = new Annotator();
    var fragmentCounters = {};
    // for debugging
    // var _level = 0;
    // var _logIndent = function(level) {
    //   var prefix = "";
    //   for (var i = 0; i < level; i++) {
    //     prefix = prefix.concat("  ");
    //   }
    //   return prefix;
    // };
    // var _logPrefix = "";
    annotator.onText = function (context, text) {
      // console.log(_logPrefix+text);
      context.children.push(text);
    };
    annotator.onEnter = function (entry) {
      // for debugging
      // _logPrefix = _logIndent(++_level);
      var node = entry.node;
      var id = node.id;
      if (!fragmentCounters[id]) {
        fragmentCounters[id] = 0;
      }
      fragmentCounters[id] = fragmentCounters[id] + 1;
      var key = id + '_' + fragmentCounters[id];
      // for debugging
      // console.log(_logPrefix+"<"+node.type+" key="+key+">");

      var highlighted = highlightedAnnotations.indexOf(node.id) >= 0;
      // TODO: we need a component factory, so that we can create the appropriate component
      var ViewClass;

      if (componentRegistry.contains(node.type)) {
        ViewClass = componentRegistry.get(node.type);
      } else {
        ViewClass = AnnotationComponent;
      }

      var classNames = [];
      // special support for container annotation fragments
      if (node.type === 'container_annotation_fragment') {
        // TODO: this seems a bit messy
        classNames = classNames.concat(node.anno.getTypeNames().join(' ').replace(/_/g, '-').split());
        classNames.push('annotation-fragment');
      } else if (node.type === 'container-annotation-anchor') {
        classNames = classNames.concat(node.anno.getTypeNames().join(' ').replace(/_/g, '-').split());
        classNames.push('anchor');
        classNames.push(node.isStart ? 'start-anchor' : 'end-anchor');
      }
      if (highlighted) {
        classNames.push('active');
      }
      return {
        ViewClass: ViewClass,
        props: {
          key: key,
          doc: doc,
          node: node,
          classNames: classNames
        },
        children: []
      };
    };
    annotator.onExit = function (entry, context, parentContext) {
      // for debugging
      // _logPrefix = _logIndent(_level--);
      // console.log(_logPrefix+"</"+entry.node.type+">");
      var args = [context.ViewClass, context.props].concat(context.children);
      var view = $$.apply(React, args);
      parentContext.children.push(view);
    };
    var root = { children: [] };
    annotator.start(root, text, annotations);
    // NOTE: this is particularly necessary for text-properties of
    // block level text nodes. Otherwise, the element will not y-expand
    // as desired, and soft-breaks are not visible.
    // TODO: sometimes we do not want to do this. Make it configurable.
    root.children.push($$('br', { key: 'br' }));
    return root.children;
  },

  getAnnotations: function getAnnotations() {
    var doc = this.props.doc;
    var surface = this.context.surface;
    var path = this.props.path;
    var annotations = doc.getIndex('annotations').get(path);
    var containerName = surface.getContainerName();
    if (containerName) {
      // Anchors
      var anchors = doc.getIndex('container-annotation-anchors').get(path, containerName);
      annotations = annotations.concat(anchors);
      // Fragments
      // FIXME: ATM containerAnnotationIndex is not registered as a regular document index
      // but is updated as a change listener instead.
      var fragments = doc.containerAnnotationIndex.getFragments(path, containerName);
      annotations = annotations.concat(fragments);
    }
    return annotations;
  },

  // Annotations that are active (not just visible)
  // The ones that have will get an .active class
  getHighlights: function getHighlights() {
    if (this.context.getHighlightedNodes) {
      return this.context.getHighlightedNodes();
    } else {
      return [];
    }
  },

  textPropertyDidChange: function textPropertyDidChange() {
    this.forceUpdate();
  },

  getContainer: function getContainer() {
    return this.getSurface().getContainer();
  },

  getDocument: function getDocument() {
    return this.props.doc;
  },

  getPath: function getPath() {
    return this.props.path;
  },

  getElement: function getElement() {
    return React.findDOMNode(this);
  },

  getSurface: function getSurface() {
    return this.context.surface;
  }

}));

module.exports = TextPropertyComponent;

},{"./annotation_component":17,"substance":46,"substance/helpers":45}],35:[function(require,module,exports){
"use strict";

var $$ = React.createElement;
var _ = require("substance/helpers");

// Text Tool
// ----------------

var TextTool = React.createClass({
  displayName: "TextToolComponent",

  contextTypes: {
    toolRegistry: React.PropTypes.object.isRequired
  },

  componentWillMount: function componentWillMount() {
    var toolName = this.props.tool;
    if (!toolName) {
      throw new Error("Prop \"tool\" is mandatory.");
    }

    this.tool = this.context.toolRegistry.get(toolName);
    if (!this.tool) {
      console.error("No tool registered with name %s", toolName);
    }
    this.tool.connect(this, {
      "toolstate:changed": this.onToolstateChanged
    });
  },

  onToolstateChanged: function onToolstateChanged(toolState, tool, oldState) {
    this.replaceState(toolState);
  },

  handleClick: function handleClick(e) {
    e.preventDefault();
  },

  handleSwitchTextType: function handleSwitchTextType(e) {
    e.preventDefault();
    this.tool.switchTextType(e.currentTarget.dataset.type);
  },

  getInitialState: function getInitialState() {
    return {
      disabled: true,
      open: false
    };
  },

  toggleAvailableTextTypes: function toggleAvailableTextTypes(e) {
    e.preventDefault();
    if (this.tool.isDisabled()) return;

    // HACK: This only updates the view state state.open is not set on the tool itself
    // That way the dropdown automatically closes when the selection changes
    this.setState({
      open: !this.state.open
    });
  },

  render: function render() {
    var classNames = ["text-tool-component", "select"];
    var textTypes = this.tool.getAvailableTextTypes();

    // Note: this is a view internal state for opening the select dropdown
    if (this.state.open) classNames.push("open");
    if (this.state.disabled) classNames.push("disabled");

    var isTextContext = textTypes[this.state.currentTextType];
    var label;

    if (isTextContext) {
      label = textTypes[this.state.currentTextType].label;
    } else if (this.state.currentContext) {

      label = this.state.currentContext // i18n.t(this.state.currentContext);
      ;
    } else {
      label = "No selection";
    }

    var currentTextTypeEl = $$("button", {
      href: "#",
      className: "toggle",
      onMouseDown: this.toggleAvailableTextTypes,
      onClick: this.handleClick
    }, label);

    var availableTextTypes = [];
    availableTextTypes = _.map(textTypes, (function (textType, textTypeId) {
      return $$("button", {
        key: textTypeId,
        className: "option " + textTypeId,
        "data-type": textTypeId,
        onMouseDown: this.handleSwitchTextType,
        onClick: this.handleClick
      }, textType.label);
    }).bind(this));

    return $$("div", { className: classNames.join(" ") }, currentTextTypeEl, $$("div", { className: "options shadow border fill-white" }, availableTextTypes));
  }
});

module.exports = TextTool;

},{"substance/helpers":45}],36:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var $$ = React.createElement;
var Substance = require('substance');

// ToolComponent
// -------------

var ToolComponent = (function (_React$Component) {
  _inherits(ToolComponent, _React$Component);

  function ToolComponent(props) {
    _classCallCheck(this, ToolComponent);

    _get(Object.getPrototypeOf(ToolComponent.prototype), 'constructor', this).call(this, props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onToolstateChanged = this.onToolstateChanged.bind(this);
  }

  _createClass(ToolComponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var toolName = this.props.tool;
      if (!toolName) {
        throw new Error('Prop "tool" is mandatory.');
      }

      this.tool = this.context.toolRegistry.get(toolName);
      if (!this.tool) {
        console.warn('No tool registered with name %s', toolName);
        this.tool = new ToolComponent.StubTool(toolName);
      }

      // Derive initial state from tool
      this.state = this.tool.state;
      this.tool.connect(this, {
        'toolstate:changed': this.onToolstateChanged
      });
    }
  }, {
    key: 'onToolstateChanged',
    value: function onToolstateChanged(toolState /*, tool, oldState*/) {
      this.setState(toolState);
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      e.preventDefault();
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      e.preventDefault();
      if (this.state.disabled) {
        return;
      }
      this.tool.performAction();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.disabled !== nextState.disabled || this.state.active !== nextState.active;
    }
  }, {
    key: 'render',
    value: function render() {
      var classNames = [];

      if (this.props.classNames) {
        classNames = this.props.classNames.slice();
      }

      if (this.state.disabled) {
        classNames.push('disabled');
      }
      if (this.state.active) {
        classNames.push('active');
      }

      return $$('button', {
        className: classNames.join(' '),
        title: this.props.title,
        onMouseDown: this.onMouseDown,
        onClick: this.onClick
      }, this.props.children);
    }
  }]);

  return ToolComponent;
})(React.Component);

ToolComponent.displayName = 'ToolComponent';

ToolComponent.contextTypes = {
  toolRegistry: React.PropTypes.object.isRequired
};

ToolComponent.StubTool = Substance.Surface.Tool.extend({

  init: function init(name) {
    this.name = name;
  },

  performAction: function performAction() {
    console.log('Stub-Tool %s', this.name);
  }
});

module.exports = ToolComponent;

},{"substance":46}],37:[function(require,module,exports){
"use strict";

module.exports = require("./writer");

},{"./writer":43}],38:[function(require,module,exports){
"use strict";

var $$ = React.createElement;

var ICONS_FOR_TYPE = {
  "error": "fa-exclamation-circle",
  "info": "fa-info",
  "progress": "fa-exchange",
  "success": "fa-check-circle"
};

// The Status Bar
// ----------------

var StatusBar = React.createClass({
  contextTypes: {
    notifications: React.PropTypes.object.isRequired
  },

  displayName: "StatusBar",

  getInitialState: function getInitialState() {
    return {
      message: null
    };
  },

  componentDidMount: function componentDidMount() {
    var notifications = this.context.notifications;

    notifications.connect(this, {
      "messages:updated": this.handleNotificationUpdate
    });
  },

  handleNotificationUpdate: function handleNotificationUpdate(messages) {
    var currentMessage = messages.pop();
    this.setState({
      message: currentMessage
    });
  },

  render: function render() {
    var message = this.state.message;
    var notificationsEl;

    var classNames = ["status-bar-component fill-light"];

    if (message) {
      classNames.push(message.type);

      notificationsEl = $$("div", { className: "notifications" }, $$("div", {
        className: "icon",
        dangerouslySetInnerHTML: { __html: "<i class=\"fa " + ICONS_FOR_TYPE[message.type] + "\"></i>" }
      }), $$("div", { className: "message" }, message.message));
    } else {
      notificationsEl = $$("div");
    }

    return $$("div", { className: classNames.join(" ") }, $$("div", { className: "document-status" }, this.props.doc.getDocumentMeta().title), notificationsEl);
  }
});

module.exports = StatusBar;

},{}],39:[function(require,module,exports){
"use strict";

module.exports = {
  "redo": require("./redo"),
  "undo": require("./undo"),
  "save": require("./save")
};

},{"./redo":40,"./save":41,"./undo":42}],40:[function(require,module,exports){
"use strict";

var Substance = require("substance");

var RedoTool = Substance.Surface.Tool.extend({

  name: "redo",

  update: function update(surface) {
    this.surface = surface;
    var doc = surface.getDocument();
    if (!surface.isEnabled() || doc.undone.length === 0) {
      this.setDisabled();
    } else {
      this.setEnabled();
    }
  },

  performAction: function performAction() {
    var doc = this.getDocument();
    if (this.isEnabled() && doc.undone.length > 0) {
      doc.redo();
    }
  }

});

module.exports = RedoTool;

},{"substance":46}],41:[function(require,module,exports){
'use strict';

var Substance = require('substance');

var SaveTool = Substance.Surface.Tool.extend({

  name: 'save',

  init: function init(props) {
    this.app = props.app;
    this.doc = props.doc;
    this.doc.connect(this, {
      'document:changed': this.handleDocumentChange,
      'document:saved': this.handleDocumentSaved
    });
  },

  dispose: function dispose() {
    this.doc.disconnect(this);
  },

  handleDocumentChange: function handleDocumentChange() {
    this.setEnabled();
  },

  handleDocumentSaved: function handleDocumentSaved() {
    this.setDisabled();
  },

  performAction: function performAction() {
    this.app.requestSave();
  }

});

module.exports = SaveTool;

},{"substance":46}],42:[function(require,module,exports){
"use strict";

var Substance = require("substance");

var UndoTool = Substance.Surface.Tool.extend({

  name: "undo",

  update: function update(surface) {
    this.surface = surface;
    var doc = surface.getDocument();
    if (!surface.isEnabled() || doc.done.length === 0) {
      this.setDisabled();
    } else {
      this.setEnabled();
    }
  },

  performAction: function performAction() {
    var doc = this.getDocument();
    if (this.isEnabled() && doc.done.length > 0) {
      doc.undo();
    }
  }

});

module.exports = UndoTool;

},{"substance":46}],43:[function(require,module,exports){
/* global $ */
"use strict";

var $$ = React.createElement;

var Substance = require("substance");
var _ = require("substance/helpers");
var ContentTools = require("../content_tools");
var ContentPanel = require("../content_panel");
var WriterControllerMixin = require("./writer_controller_mixin");
var StatusBar = require("./status_bar");

// The Substance Writer Component
// ----------------

var WriterMixin = _.extend({}, WriterControllerMixin, Substance.EventEmitter.prototype, {

  render: function render() {
    var ContentToolbar = this.componentRegistry.get("content_toolbar") || ContentTools;
    return $$("div", { className: "writer-component", onKeyDown: this.handleApplicationKeyCombos }, $$("div", { className: "main-container" }, $$(ContentToolbar), $$(ContentPanel, { containerId: this.props.contentContainer })), $$("div", { className: "resource-container" }, this.createContextToggles(), this.createContextPanel(this)), this.createModalPanel(), $$(StatusBar, {
      doc: this.props.doc
    }), $$("div", { className: "clipboard" }));
  },

  // return true when you handled a key combo
  handleApplicationKeyCombos: function handleApplicationKeyCombos(e) {
    // console.log('####', e.keyCode, e.metaKey, e.ctrlKey, e.shiftKey);
    var handled = false;
    // TODO: we could make this configurable via extensions
    // Undo/Redo: cmd+z, cmd+shift+z
    if (e.keyCode === 90 && (e.metaKey || e.ctrlKey)) {
      if (e.shiftKey) {
        this.redo();
      } else {
        this.undo();
      }
      handled = true;
    }
    // Reset to default state
    else if (e.keyCode === 27) {
      this.replaceState(this.getInitialState());
      handled = true;
    }
    // Save: cmd+s
    else if (e.keyCode === 83 && (e.metaKey || e.ctrlKey)) {
      this.requestSave();
      handled = true;
    }
    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
});

// Create React class
var Writer = React.createClass({
  mixins: [WriterMixin],
  displayName: "Writer"
});

module.exports = Writer;

},{"../content_panel":18,"../content_tools":19,"./status_bar":38,"./writer_controller_mixin":44,"substance":46,"substance/helpers":45}],44:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var Document = Substance.Document;
var _ = require("substance/helpers");

var ToolManager = require("substance").Surface.ToolManager;
var Highlight = require("../text_property").Highlight;
var ExtensionManager = require("../extension_manager");
var DocumentController = require("../document_controller_mixin");

var coreTools = require("./tools");

// Mixin to control a Writer
// ----------------

var WriterControllerMixin = _.extend({}, DocumentController, {
  // Get all available tools from core and extensions
  getTools: function getTools() {
    return coreTools.concat(this.extensionManager.getTools());
  }
});

module.exports = WriterControllerMixin;

},{"../document_controller_mixin":20,"../extension_manager":22,"../text_property":34,"./tools":39,"substance":46,"substance/helpers":45}],45:[function(require,module,exports){
module.exports = require('./src/basics/helpers');

},{"./src/basics/helpers":168}],46:[function(require,module,exports){

var Substance = require('./src/basics');

Substance.Data = require('./src/data');
Substance.Document = require('./src/document');
Substance.Operator = require('./src/operator');
Substance.Surface = require('./src/surface');

Substance._ = require('./src/basics/helpers');

module.exports = Substance;

},{"./src/basics":169,"./src/basics/helpers":168,"./src/data":175,"./src/document":198,"./src/operator":233,"./src/surface":242}],47:[function(require,module,exports){
/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array ? array.length : 0,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = compact;

},{}],48:[function(require,module,exports){
var baseCallback = require('../internal/baseCallback');

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for, instead of the element itself.
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(chr) {
 *   return chr.user == 'barney';
 * });
 * // => 0
 *
 * // using the `_.matches` callback shorthand
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.findIndex(users, 'active', false);
 * // => 0
 *
 * // using the `_.property` callback shorthand
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, thisArg) {
  var index = -1,
      length = array ? array.length : 0;

  predicate = baseCallback(predicate, thisArg, 3);
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = findIndex;

},{"../internal/baseCallback":73}],49:[function(require,module,exports){
/**
 * Gets the first element of `array`.
 *
 * @static
 * @memberOf _
 * @alias head
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _.first([1, 2, 3]);
 * // => 1
 *
 * _.first([]);
 * // => undefined
 */
function first(array) {
  return array ? array[0] : undefined;
}

module.exports = first;

},{}],50:[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    cacheIndexOf = require('../internal/cacheIndexOf'),
    createCache = require('../internal/createCache'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of unique values in all provided arrays using `SameValueZero`
 * for equality comparisons.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of shared values.
 * @example
 * _.intersection([1, 2], [4, 2], [2, 1]);
 * // => [2]
 */
function intersection() {
  var args = [],
      argsIndex = -1,
      argsLength = arguments.length,
      caches = [],
      indexOf = baseIndexOf,
      isCommon = true;

  while (++argsIndex < argsLength) {
    var value = arguments[argsIndex];
    if (isArray(value) || isArguments(value)) {
      args.push(value);
      caches.push((isCommon && value.length >= 120) ? createCache(argsIndex && value) : null);
    }
  }
  argsLength = args.length;
  var array = args[0],
      index = -1,
      length = array ? array.length : 0,
      result = [],
      seen = caches[0];

  outer:
  while (++index < length) {
    value = array[index];
    if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value)) < 0) {
      argsIndex = argsLength;
      while (--argsIndex) {
        var cache = caches[argsIndex];
        if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(value);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = intersection;

},{"../internal/baseIndexOf":87,"../internal/cacheIndexOf":104,"../internal/createCache":112,"../lang/isArguments":143,"../lang/isArray":144}],51:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],52:[function(require,module,exports){
var baseFlatten = require('../internal/baseFlatten'),
    baseUniq = require('../internal/baseUniq');

/**
 * Creates an array of unique values, in order, of the provided arrays using
 * `SameValueZero` for equality comparisons.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([1, 2], [4, 2], [2, 1]);
 * // => [1, 2, 4]
 */
function union() {
  return baseUniq(baseFlatten(arguments, false, true));
}

module.exports = union;

},{"../internal/baseFlatten":83,"../internal/baseUniq":100}],53:[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseUniq = require('../internal/baseUniq'),
    isIterateeCall = require('../internal/isIterateeCall'),
    sortedUniq = require('../internal/sortedUniq');

/**
 * Creates a duplicate-value-free version of an array using `SameValueZero`
 * for equality comparisons. Providing `true` for `isSorted` performs a faster
 * search algorithm for sorted arrays. If an iteratee function is provided it
 * is invoked for each value in the array to generate the criterion by which
 * uniqueness is computed. The `iteratee` is bound to `thisArg` and invoked
 * with three arguments; (value, index, array).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @alias unique
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {boolean} [isSorted] Specify the array is sorted.
 * @param {Function|Object|string} [iteratee] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new duplicate-value-free array.
 * @example
 *
 * _.uniq([1, 2, 1]);
 * // => [1, 2]
 *
 * // using `isSorted`
 * _.uniq([1, 1, 2], true);
 * // => [1, 2]
 *
 * // using an iteratee function
 * _.uniq([1, 2.5, 1.5, 2], function(n) {
 *   return this.floor(n);
 * }, Math);
 * // => [1, 2.5]
 *
 * // using the `_.property` callback shorthand
 * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniq(array, isSorted, iteratee, thisArg) {
  var length = array ? array.length : 0;
  if (!length) {
    return [];
  }
  if (isSorted != null && typeof isSorted != 'boolean') {
    thisArg = iteratee;
    iteratee = isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
    isSorted = false;
  }
  iteratee = iteratee == null ? iteratee : baseCallback(iteratee, thisArg, 3);
  return (isSorted)
    ? sortedUniq(array, iteratee)
    : baseUniq(array, iteratee);
}

module.exports = uniq;

},{"../internal/baseCallback":73,"../internal/baseUniq":100,"../internal/isIterateeCall":127,"../internal/sortedUniq":139}],54:[function(require,module,exports){
var baseDifference = require('../internal/baseDifference'),
    baseSlice = require('../internal/baseSlice');

/**
 * Creates an array excluding all provided values using `SameValueZero` for
 * equality comparisons.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to filter.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.without([1, 2, 1, 3], 1, 2);
 * // => [3]
 */
function without(array) {
  return baseDifference(array, baseSlice(arguments, 1));
}

module.exports = without;

},{"../internal/baseDifference":79,"../internal/baseSlice":97}],55:[function(require,module,exports){
var arrayFilter = require('../internal/arrayFilter'),
    baseCallback = require('../internal/baseCallback'),
    baseFilter = require('../internal/baseFilter'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias select
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * _.filter([4, 5, 6], function(n) {
 *   return n % 2 == 0;
 * });
 * // => [4, 6]
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // using the `_.matches` callback shorthand
 * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
 * // => ['barney']
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.pluck(_.filter(users, 'active', false), 'user');
 * // => ['fred']
 *
 * // using the `_.property` callback shorthand
 * _.pluck(_.filter(users, 'active'), 'user');
 * // => ['barney']
 */
function filter(collection, predicate, thisArg) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  predicate = baseCallback(predicate, thisArg, 3);
  return func(collection, predicate);
}

module.exports = filter;

},{"../internal/arrayFilter":70,"../internal/baseCallback":73,"../internal/baseFilter":81,"../lang/isArray":144}],56:[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    baseFind = require('../internal/baseFind'),
    findIndex = require('../array/findIndex'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.result(_.find(users, function(chr) {
 *   return chr.age < 40;
 * }), 'user');
 * // => 'barney'
 *
 * // using the `_.matches` callback shorthand
 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
 * // => 'pebbles'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.result(_.find(users, 'active', false), 'user');
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.result(_.find(users, 'active'), 'user');
 * // => 'barney'
 */
function find(collection, predicate, thisArg) {
  if (isArray(collection)) {
    var index = findIndex(collection, predicate, thisArg);
    return index > -1 ? collection[index] : undefined;
  }
  predicate = baseCallback(predicate, thisArg, 3);
  return baseFind(collection, predicate, baseEach);
}

module.exports = find;

},{"../array/findIndex":48,"../internal/baseCallback":73,"../internal/baseEach":80,"../internal/baseFind":82,"../lang/isArray":144}],57:[function(require,module,exports){
var arrayEach = require('../internal/arrayEach'),
    baseEach = require('../internal/baseEach'),
    bindCallback = require('../internal/bindCallback'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection). Iterator functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a `length` property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from left to right and returns the array
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
 *   console.log(n, key);
 * });
 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
 */
function forEach(collection, iteratee, thisArg) {
  return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
    ? arrayEach(collection, iteratee)
    : baseEach(collection, bindCallback(iteratee, thisArg, 3));
}

module.exports = forEach;

},{"../internal/arrayEach":69,"../internal/baseEach":80,"../internal/bindCallback":102,"../lang/isArray":144}],58:[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    isArray = require('../lang/isArray'),
    isLength = require('../internal/isLength'),
    isString = require('../lang/isString'),
    values = require('../object/values');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection` using `SameValueZero` for equality
 * comparisons. If `fromIndex` is negative, it is used as the offset from
 * the end of `collection`.
 *
 * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
 * e.g. `===`, except that `NaN` matches `NaN`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * for more details.
 *
 * @static
 * @memberOf _
 * @alias contains, include
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {*} target The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {boolean} Returns `true` if a matching element is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
 * // => true
 *
 * _.includes('pebbles', 'eb');
 * // => true
 */
function includes(collection, target, fromIndex) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    collection = values(collection);
    length = collection.length;
  }
  if (!length) {
    return false;
  }
  if (typeof fromIndex == 'number') {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
  } else {
    fromIndex = 0;
  }
  return (typeof collection == 'string' || !isArray(collection) && isString(collection))
    ? (fromIndex < length && collection.indexOf(target, fromIndex) > -1)
    : (baseIndexOf(collection, target, fromIndex) > -1);
}

module.exports = includes;

},{"../internal/baseIndexOf":87,"../internal/isLength":128,"../lang/isArray":144,"../lang/isString":152,"../object/values":159}],59:[function(require,module,exports){
var createAggregator = require('../internal/createAggregator');

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value
 * of each key is the last element responsible for generating the key. The
 * iteratee function is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * var keyData = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ];
 *
 * _.indexBy(keyData, 'dir');
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 *
 * _.indexBy(keyData, function(object) {
 *   return String.fromCharCode(object.code);
 * });
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 *
 * _.indexBy(keyData, function(object) {
 *   return this.fromCharCode(object.code);
 * }, String);
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 */
var indexBy = createAggregator(function(result, value, key) {
  result[key] = value;
});

module.exports = indexBy;

},{"../internal/createAggregator":109}],60:[function(require,module,exports){
var arrayMap = require('../internal/arrayMap'),
    baseCallback = require('../internal/baseCallback'),
    baseMap = require('../internal/baseMap'),
    isArray = require('../lang/isArray');

/**
 * Creates an array of values by running each element in `collection` through
 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
 * arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * Many lodash methods are guarded to work as interatees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`, `drop`,
 * `dropRight`, `fill`, `flatten`, `invert`, `max`, `min`, `parseInt`, `slice`,
 * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimLeft`, `trimRight`,
 * `trunc`, `random`, `range`, `sample`, `uniq`, and `words`
 *
 * @static
 * @memberOf _
 * @alias collect
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 *  create a `_.property` or `_.matches` style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function timesThree(n) {
 *   return n * 3;
 * }
 *
 * _.map([1, 2], timesThree);
 * // => [3, 6]
 *
 * _.map({ 'a': 1, 'b': 2 }, timesThree);
 * // => [3, 6] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // using the `_.property` callback shorthand
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee, thisArg) {
  var func = isArray(collection) ? arrayMap : baseMap;
  iteratee = baseCallback(iteratee, thisArg, 3);
  return func(collection, iteratee);
}

module.exports = map;

},{"../internal/arrayMap":71,"../internal/baseCallback":73,"../internal/baseMap":92,"../lang/isArray":144}],61:[function(require,module,exports){
var baseProperty = require('../internal/baseProperty'),
    map = require('./map');

/**
 * Gets the value of `key` from all elements in `collection`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {string} key The key of the property to pluck.
 * @returns {Array} Returns the property values.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 }
 * ];
 *
 * _.pluck(users, 'user');
 * // => ['barney', 'fred']
 *
 * var userIndex = _.indexBy(users, 'user');
 * _.pluck(userIndex, 'age');
 * // => [36, 40] (iteration order is not guaranteed)
 */
function pluck(collection, key) {
  return map(collection, baseProperty(key));
}

module.exports = pluck;

},{"../internal/baseProperty":95,"./map":60}],62:[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    baseSortBy = require('../internal/baseSortBy'),
    compareAscending = require('../internal/compareAscending'),
    isIterateeCall = require('../internal/isIterateeCall'),
    isLength = require('../internal/isLength');

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection through `iteratee`. This method performs
 * a stable sort, that is, it preserves the original sort order of equal elements.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Array|Function|Object|string} [iteratee=_.identity] The function
 *  invoked per iteration. If a property name or an object is provided it is
 *  used to create a `_.property` or `_.matches` style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * _.sortBy([1, 2, 3], function(n) {
 *   return Math.sin(n);
 * });
 * // => [3, 1, 2]
 *
 * _.sortBy([1, 2, 3], function(n) {
 *   return this.sin(n);
 * }, Math);
 * // => [3, 1, 2]
 *
 * var users = [
 *   { 'user': 'fred' },
 *   { 'user': 'pebbles' },
 *   { 'user': 'barney' }
 * ];
 *
 * // using the `_.property` callback shorthand
 * _.pluck(_.sortBy(users, 'user'), 'user');
 * // => ['barney', 'fred', 'pebbles']
 */
function sortBy(collection, iteratee, thisArg) {
  var index = -1,
      length = collection ? collection.length : 0,
      result = isLength(length) ? Array(length) : [];

  if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
    iteratee = null;
  }
  iteratee = baseCallback(iteratee, thisArg, 3);
  baseEach(collection, function(value, key, collection) {
    result[++index] = { 'criteria': iteratee(value, key, collection), 'index': index, 'value': value };
  });
  return baseSortBy(result, compareAscending);
}

module.exports = sortBy;

},{"../internal/baseCallback":73,"../internal/baseEach":80,"../internal/baseSortBy":98,"../internal/compareAscending":106,"../internal/isIterateeCall":127,"../internal/isLength":128}],63:[function(require,module,exports){
var isNative = require('../lang/isNative');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeNow = isNative(nativeNow = Date.now) && nativeNow;

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 * (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Date
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => logs the number of milliseconds it took for the deferred function to be invoked
 */
var now = nativeNow || function() {
  return new Date().getTime();
};

module.exports = now;

},{"../lang/isNative":149}],64:[function(require,module,exports){
var baseSlice = require('../internal/baseSlice'),
    createWrapper = require('../internal/createWrapper'),
    replaceHolders = require('../internal/replaceHolders');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    PARTIAL_FLAG = 32;

/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and prepends any additional `_.bind` arguments to those provided to the
 * bound function.
 *
 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind` this method does not set the `length`
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} [args] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var greet = function(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * };
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = _.bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // using placeholders
 * var bound = _.bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 */
function bind(func, thisArg) {
  var bitmask = BIND_FLAG;
  if (arguments.length > 2) {
    var partials = baseSlice(arguments, 2),
        holders = replaceHolders(partials, bind.placeholder);

    bitmask |= PARTIAL_FLAG;
  }
  return createWrapper(func, bitmask, thisArg, partials, holders);
}

// Assign default placeholders.
bind.placeholder = {};

module.exports = bind;

},{"../internal/baseSlice":97,"../internal/createWrapper":116,"../internal/replaceHolders":136}],65:[function(require,module,exports){
var isObject = require('../lang/isObject'),
    now = require('../date/now');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time it was invoked. The created function comes
 * with a `cancel` method to cancel delayed invocations. Provide an options
 * object to indicate that `func` should be invoked on the leading and/or
 * trailing edge of the `wait` timeout. Subsequent calls to the debounced
 * function return the result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=false] Specify invoking on the leading
 *  edge of the timeout.
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
 *  delayed before it is invoked.
 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
 *  edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // ensure `batchLog` is invoked once after 1 second of debounced calls
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', _.debounce(batchLog, 250, {
 *   'maxWait': 1000
 * }));
 *
 * // cancel a debounced call
 * var todoChanges = _.debounce(batchLog, 1000);
 * Object.observe(models.todo, todoChanges);
 *
 * Object.observe(models, function(changes) {
 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
 *     todoChanges.cancel();
 *   }
 * }, ['delete']);
 *
 * // ...at some point `models.todo` is changed
 * models.todo.completed = true;
 *
 * // ...before 1 second has passed `models.todo` is deleted
 * // which cancels the debounced `todoChanges` call
 * delete models.todo;
 */
function debounce(func, wait, options) {
  var args,
      maxTimeoutId,
      result,
      stamp,
      thisArg,
      timeoutId,
      trailingCall,
      lastCalled = 0,
      maxWait = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = wait < 0 ? 0 : (+wait || 0);
  if (options === true) {
    var leading = true;
    trailing = false;
  } else if (isObject(options)) {
    leading = options.leading;
    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
    trailing = 'trailing' in options ? options.trailing : trailing;
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
  }

  function delayed() {
    var remaining = wait - (now() - stamp);
    if (remaining <= 0 || remaining > wait) {
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
      }
      var isCalled = trailingCall;
      maxTimeoutId = timeoutId = trailingCall = undefined;
      if (isCalled) {
        lastCalled = now();
        result = func.apply(thisArg, args);
        if (!timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
      }
    } else {
      timeoutId = setTimeout(delayed, remaining);
    }
  }

  function maxDelayed() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
    if (trailing || (maxWait !== wait)) {
      lastCalled = now();
      result = func.apply(thisArg, args);
      if (!timeoutId && !maxTimeoutId) {
        args = thisArg = null;
      }
    }
  }

  function debounced() {
    args = arguments;
    stamp = now();
    thisArg = this;
    trailingCall = trailing && (timeoutId || !leading);

    if (maxWait === false) {
      var leadingCall = leading && !timeoutId;
    } else {
      if (!maxTimeoutId && !leading) {
        lastCalled = stamp;
      }
      var remaining = maxWait - (stamp - lastCalled),
          isCalled = remaining <= 0 || remaining > maxWait;

      if (isCalled) {
        if (maxTimeoutId) {
          maxTimeoutId = clearTimeout(maxTimeoutId);
        }
        lastCalled = stamp;
        result = func.apply(thisArg, args);
      }
      else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(maxDelayed, remaining);
      }
    }
    if (isCalled && timeoutId) {
      timeoutId = clearTimeout(timeoutId);
    }
    else if (!timeoutId && wait !== maxWait) {
      timeoutId = setTimeout(delayed, wait);
    }
    if (leadingCall) {
      isCalled = true;
      result = func.apply(thisArg, args);
    }
    if (isCalled && !timeoutId && !maxTimeoutId) {
      args = thisArg = null;
    }
    return result;
  }
  debounced.cancel = cancel;
  return debounced;
}

module.exports = debounce;

},{"../date/now":63,"../lang/isObject":151}],66:[function(require,module,exports){
var baseDelay = require('../internal/baseDelay');

/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it is invoked.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke the function with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _.delay(function(text) {
 *   console.log(text);
 * }, 1000, 'later');
 * // => logs 'later' after one second
 */
function delay(func, wait) {
  return baseDelay(func, wait, arguments, 2);
}

module.exports = delay;

},{"../internal/baseDelay":78}],67:[function(require,module,exports){
(function (global){
var cachePush = require('./cachePush'),
    isNative = require('../lang/isNative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":149,"./cachePush":105}],68:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],69:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],70:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],71:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],72:[function(require,module,exports){
var baseCopy = require('./baseCopy'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize assigning values.
 * @returns {Object} Returns the destination object.
 */
function baseAssign(object, source, customizer) {
  var props = keys(source);
  if (!customizer) {
    return baseCopy(source, object, props);
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? result !== value : value === value) ||
        (typeof value == 'undefined' && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

module.exports = baseAssign;

},{"../object/keys":156,"./baseCopy":76}],73:[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    baseProperty = require('./baseProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity'),
    isBindable = require('./isBindable');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return (typeof thisArg != 'undefined' && isBindable(func))
      ? bindCallback(func, thisArg, argCount)
      : func;
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return typeof thisArg == 'undefined'
    ? baseProperty(func + '')
    : baseMatchesProperty(func + '', thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":163,"./baseMatches":93,"./baseMatchesProperty":94,"./baseProperty":95,"./bindCallback":102,"./isBindable":125}],74:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    arrayEach = require('./arrayEach'),
    baseCopy = require('./baseCopy'),
    baseForOwn = require('./baseForOwn'),
    initCloneArray = require('./initCloneArray'),
    initCloneByTag = require('./initCloneByTag'),
    initCloneObject = require('./initCloneObject'),
    isArray = require('../lang/isArray'),
    isObject = require('../lang/isObject'),
    keys = require('../object/keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[stringTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[mapTag] = cloneableTags[setTag] =
cloneableTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding `customizer` functions.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The object `value` belongs to.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object) : customizer(value);
  }
  if (typeof result != 'undefined') {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return arrayCopy(value, result);
    }
  } else {
    var tag = objToString.call(value),
        isFunc = tag == funcTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return baseCopy(value, result, keys(value));
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return corresponding clone.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // Add the source value to the stack of traversed objects and associate it with its clone.
  stackA.push(value);
  stackB.push(result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
  });
  return result;
}

module.exports = baseClone;

},{"../lang/isArray":144,"../lang/isObject":151,"../object/keys":156,"./arrayCopy":68,"./arrayEach":69,"./baseCopy":76,"./baseForOwn":86,"./initCloneArray":122,"./initCloneByTag":123,"./initCloneObject":124}],75:[function(require,module,exports){
/**
 * The base implementation of `compareAscending` which compares values and
 * sorts them in ascending order without guaranteeing a stable sort.
 *
 * @private
 * @param {*} value The value to compare to `other`.
 * @param {*} other The value to compare to `value`.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function baseCompareAscending(value, other) {
  if (value !== other) {
    var valIsReflexive = value === value,
        othIsReflexive = other === other;

    if (value > other || !valIsReflexive || (typeof value == 'undefined' && othIsReflexive)) {
      return 1;
    }
    if (value < other || !othIsReflexive || (typeof other == 'undefined' && valIsReflexive)) {
      return -1;
    }
  }
  return 0;
}

module.exports = baseCompareAscending;

},{}],76:[function(require,module,exports){
/**
 * Copies the properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Array} props The property names to copy.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, object, props) {
  if (!props) {
    props = object;
    object = {};
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],77:[function(require,module,exports){
(function (global){
var isObject = require('../lang/isObject');

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function Object() {}
  return function(prototype) {
    if (isObject(prototype)) {
      Object.prototype = prototype;
      var result = new Object;
      Object.prototype = null;
    }
    return result || global.Object();
  };
}());

module.exports = baseCreate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isObject":151}],78:[function(require,module,exports){
var baseSlice = require('./baseSlice');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * The base implementation of `_.delay` and `_.defer` which accepts an index
 * of where to slice the arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Object} args The `arguments` object to slice and provide to `func`.
 * @returns {number} Returns the timer id.
 */
function baseDelay(func, wait, args, fromIndex) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return setTimeout(function() { func.apply(undefined, baseSlice(args, fromIndex)); }, wait);
}

module.exports = baseDelay;

},{"./baseSlice":97}],79:[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/**
 * The base implementation of `_.difference` which accepts a single array
 * of values to exclude.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values) {
  var length = array ? array.length : 0,
      result = [];

  if (!length) {
    return result;
  }
  var index = -1,
      indexOf = baseIndexOf,
      isCommon = true,
      cache = (isCommon && values.length >= 200) ? createCache(values) : null,
      valuesLength = values.length;

  if (cache) {
    indexOf = cacheIndexOf;
    isCommon = false;
    values = cache;
  }
  outer:
  while (++index < length) {
    var value = array[index];

    if (isCommon && value === value) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === value) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (indexOf(values, value) < 0) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./baseIndexOf":87,"./cacheIndexOf":104,"./createCache":112}],80:[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
function baseEach(collection, iteratee) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    return baseForOwn(collection, iteratee);
  }
  var index = -1,
      iterable = toObject(collection);

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
  }
  return collection;
}

module.exports = baseEach;

},{"./baseForOwn":86,"./isLength":128,"./toObject":140}],81:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.filter` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;

},{"./baseEach":80}],82:[function(require,module,exports){
/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey] Specify returning the key of the found element
 *  instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],83:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays and `arguments` objects.
 * @param {number} [fromIndex=0] The index to start from.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, fromIndex) {
  var index = (fromIndex || 0) - 1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (isObjectLike(value) && isLength(value.length) && (isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        value = baseFlatten(value, isDeep, isStrict);
      }
      var valIndex = -1,
          valLength = value.length;

      result.length += valLength;
      while (++valIndex < valLength) {
        result[++resIndex] = value[valIndex];
      }
    } else if (!isStrict) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"../lang/isArguments":143,"../lang/isArray":144,"./isLength":128,"./isObjectLike":129}],84:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iterator functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
function baseFor(object, iteratee, keysFunc) {
  var index = -1,
      iterable = toObject(object),
      props = keysFunc(object),
      length = props.length;

  while (++index < length) {
    var key = props[index];
    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }
  return object;
}

module.exports = baseFor;

},{"./toObject":140}],85:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keysIn = require('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":157,"./baseFor":84}],86:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":156,"./baseFor":84}],87:[function(require,module,exports){
var indexOfNaN = require('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = (fromIndex || 0) - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":121}],88:[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
  // Exit early for identical values.
  if (value === other) {
    // Treat `+0` vs. `-0` as not equal.
    return value !== 0 || (1 / value == 1 / other);
  }
  var valType = typeof value,
      othType = typeof other;

  // Exit early for unlike primitive values.
  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
      value == null || other == null) {
    // Return `false` unless both values are `NaN`.
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isWhere, stackA, stackB);
}

module.exports = baseIsEqual;

},{"./baseIsEqualDeep":89}],89:[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
      othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

  if (valWrapped || othWrapped) {
    return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isWhere, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":144,"../lang/isTypedArray":153,"./equalArrays":117,"./equalByTag":118,"./equalObjects":119}],90:[function(require,module,exports){
/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

module.exports = baseIsFunction;

},{}],91:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The source property names to match.
 * @param {Array} values The source values to match.
 * @param {Array} strictCompareFlags Strict comparison flags for source values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
  var length = props.length;
  if (object == null) {
    return !length;
  }
  var index = -1,
      noCustomizer = !customizer;

  while (++index < length) {
    if ((noCustomizer && strictCompareFlags[index])
          ? values[index] !== object[props[index]]
          : !hasOwnProperty.call(object, props[index])
        ) {
      return false;
    }
  }
  index = -1;
  while (++index < length) {
    var key = props[index];
    if (noCustomizer && strictCompareFlags[index]) {
      var result = hasOwnProperty.call(object, key);
    } else {
      var objValue = object[key],
          srcValue = values[index];

      result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (typeof result == 'undefined') {
        result = baseIsEqual(srcValue, objValue, customizer, true);
      }
    }
    if (!result) {
      return false;
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":88}],92:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.map` without support for callback shorthands
 * or `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var result = [];
  baseEach(collection, function(value, key, collection) {
    result.push(iteratee(value, key, collection));
  });
  return result;
}

module.exports = baseMap;

},{"./baseEach":80}],93:[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    isStrictComparable = require('./isStrictComparable'),
    keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var props = keys(source),
      length = props.length;

  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && object[key] === value && hasOwnProperty.call(object, key);
      };
    }
  }
  var values = Array(length),
      strictCompareFlags = Array(length);

  while (length--) {
    value = source[props[length]];
    values[length] = value;
    strictCompareFlags[length] = isStrictComparable(value);
  }
  return function(object) {
    return baseIsMatch(object, props, values, strictCompareFlags);
  };
}

module.exports = baseMatches;

},{"../object/keys":156,"./baseIsMatch":91,"./isStrictComparable":130}],94:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    isStrictComparable = require('./isStrictComparable');

/**
 * The base implementation of `_.matchesProperty` which does not coerce `key`
 * to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} value The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(key, value) {
  if (isStrictComparable(value)) {
    return function(object) {
      return object != null && object[key] === value;
    };
  }
  return function(object) {
    return object != null && baseIsEqual(value, object[key], null, true);
  };
}

module.exports = baseMatchesProperty;

},{"./baseIsEqual":88,"./isStrictComparable":130}],95:[function(require,module,exports){
/**
 * The base implementation of `_.property` which does not coerce `key` to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],96:[function(require,module,exports){
var identity = require('../utility/identity'),
    metaMap = require('./metaMap');

/**
 * The base implementation of `setData` without support for hot loop detection.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;

},{"../utility/identity":163,"./metaMap":132}],97:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (typeof end == 'undefined' || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : (end - start) >>> 0;
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],98:[function(require,module,exports){
/**
 * The base implementation of `_.sortBy` and `_.sortByAll` which uses `comparer`
 * to define the sort order of `array` and replaces criteria objects with their
 * corresponding values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

module.exports = baseSortBy;

},{}],99:[function(require,module,exports){
/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],100:[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/**
 * The base implementation of `_.uniq` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function baseUniq(array, iteratee) {
  var index = -1,
      indexOf = baseIndexOf,
      length = array.length,
      isCommon = true,
      isLarge = isCommon && length >= 200,
      seen = isLarge ? createCache() : null,
      result = [];

  if (seen) {
    indexOf = cacheIndexOf;
    isCommon = false;
  } else {
    isLarge = false;
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (isCommon && value === value) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (indexOf(seen, computed) < 0) {
      if (iteratee || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./baseIndexOf":87,"./cacheIndexOf":104,"./createCache":112}],101:[function(require,module,exports){
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * returned by `keysFunc`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],102:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (typeof thisArg == 'undefined') {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":163}],103:[function(require,module,exports){
(function (global){
var constant = require('../utility/constant'),
    isNative = require('../lang/isNative');

/** Native method references. */
var ArrayBuffer = isNative(ArrayBuffer = global.ArrayBuffer) && ArrayBuffer,
    bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
    floor = Math.floor,
    Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/** Used to clone array buffers. */
var Float64Array = (function() {
  // Safari 5 errors when using an array buffer to initialize a typed array
  // where the array buffer's `byteLength` is not a multiple of the typed
  // array's `BYTES_PER_ELEMENT`.
  try {
    var func = isNative(func = global.Float64Array) && func,
        result = new func(new ArrayBuffer(10), 0, 1) && func;
  } catch(e) {}
  return result;
}());

/** Used as the size, in bytes, of each `Float64Array` element. */
var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  return bufferSlice.call(buffer, 0);
}
if (!bufferSlice) {
  // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
  bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
    var byteLength = buffer.byteLength,
        floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
        offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
        result = new ArrayBuffer(byteLength);

    if (floatLength) {
      var view = new Float64Array(result, 0, floatLength);
      view.set(new Float64Array(buffer, 0, floatLength));
    }
    if (byteLength != offset) {
      view = new Uint8Array(result, offset);
      view.set(new Uint8Array(buffer, offset));
    }
    return result;
  };
}

module.exports = bufferClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":149,"../utility/constant":162}],104:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

module.exports = cacheIndexOf;

},{"../lang/isObject":151}],105:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

module.exports = cachePush;

},{"../lang/isObject":151}],106:[function(require,module,exports){
var baseCompareAscending = require('./baseCompareAscending');

/**
 * Used by `_.sortBy` to compare transformed elements of a collection and stable
 * sort them in ascending order.
 *
 * @private
 * @param {Object} object The object to compare to `other`.
 * @param {Object} other The object to compare to `object`.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareAscending(object, other) {
  return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
}

module.exports = compareAscending;

},{"./baseCompareAscending":75}],107:[function(require,module,exports){
/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders) {
  var holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      leftIndex = -1,
      leftLength = partials.length,
      result = Array(argsLength + leftLength);

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    result[holders[argsIndex]] = args[argsIndex];
  }
  while (argsLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgs;

},{}],108:[function(require,module,exports){
/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array|Object} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders) {
  var holdersIndex = -1,
      holdersLength = holders.length,
      argsIndex = -1,
      argsLength = nativeMax(args.length - holdersLength, 0),
      rightIndex = -1,
      rightLength = partials.length,
      result = Array(argsLength + rightLength);

  while (++argsIndex < argsLength) {
    result[argsIndex] = args[argsIndex];
  }
  var pad = argsIndex;
  while (++rightIndex < rightLength) {
    result[pad + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    result[pad + holders[holdersIndex]] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgsRight;

},{}],109:[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseEach = require('./baseEach'),
    isArray = require('../lang/isArray');

/**
 * Creates a function that aggregates a collection, creating an accumulator
 * object composed from the results of running each element in the collection
 * through an iteratee.
 *
 * @private
 * @param {Function} setter The function to set keys and values of the accumulator object.
 * @param {Function} [initializer] The function to initialize the accumulator object.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return function(collection, iteratee, thisArg) {
    var result = initializer ? initializer() : {};
    iteratee = baseCallback(iteratee, thisArg, 3);

    if (isArray(collection)) {
      var index = -1,
          length = collection.length;

      while (++index < length) {
        var value = collection[index];
        setter(result, value, iteratee(value, index, collection), collection);
      }
    } else {
      baseEach(collection, function(value, key, collection) {
        setter(result, value, iteratee(value, key, collection), collection);
      });
    }
    return result;
  };
}

module.exports = createAggregator;

},{"../lang/isArray":144,"./baseCallback":73,"./baseEach":80}],110:[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isIterateeCall = require('./isIterateeCall');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return function() {
    var length = arguments.length,
        object = arguments[0];

    if (length < 2 || object == null) {
      return object;
    }
    if (length > 3 && isIterateeCall(arguments[1], arguments[2], arguments[3])) {
      length = 2;
    }
    // Juggle arguments.
    if (length > 3 && typeof arguments[length - 2] == 'function') {
      var customizer = bindCallback(arguments[--length - 1], arguments[length--], 5);
    } else if (length > 2 && typeof arguments[length - 1] == 'function') {
      customizer = arguments[--length];
    }
    var index = 0;
    while (++index < length) {
      var source = arguments[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  };
}

module.exports = createAssigner;

},{"./bindCallback":102,"./isIterateeCall":127}],111:[function(require,module,exports){
var createCtorWrapper = require('./createCtorWrapper');

/**
 * Creates a function that wraps `func` and invokes it with the `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new bound function.
 */
function createBindWrapper(func, thisArg) {
  var Ctor = createCtorWrapper(func);

  function wrapper() {
    return (this instanceof wrapper ? Ctor : func).apply(thisArg, arguments);
  }
  return wrapper;
}

module.exports = createBindWrapper;

},{"./createCtorWrapper":113}],112:[function(require,module,exports){
(function (global){
var SetCache = require('./SetCache'),
    constant = require('../utility/constant'),
    isNative = require('../lang/isNative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
  return new SetCache(values);
};

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":149,"../utility/constant":162,"./SetCache":67}],113:[function(require,module,exports){
var baseCreate = require('./baseCreate'),
    isObject = require('../lang/isObject');

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtorWrapper(Ctor) {
  return function() {
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, arguments);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

module.exports = createCtorWrapper;

},{"../lang/isObject":151,"./baseCreate":77}],114:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    composeArgs = require('./composeArgs'),
    composeArgsRight = require('./composeArgsRight'),
    createCtorWrapper = require('./createCtorWrapper'),
    reorder = require('./reorder'),
    replaceHolders = require('./replaceHolders');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_FLAG = 8,
    CURRY_RIGHT_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64,
    ARY_FLAG = 256;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that wraps `func` and invokes it with optional `this`
 * binding of, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & ARY_FLAG,
      isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurry = bitmask & CURRY_FLAG,
      isCurryBound = bitmask & CURRY_BOUND_FLAG,
      isCurryRight = bitmask & CURRY_RIGHT_FLAG;

  var Ctor = !isBindKey && createCtorWrapper(func),
      key = func;

  function wrapper() {
    // Avoid `arguments` object use disqualifying optimizations by
    // converting it to an array before providing it to other functions.
    var length = arguments.length,
        index = length,
        args = Array(length);

    while (index--) {
      args[index] = arguments[index];
    }
    if (partials) {
      args = composeArgs(args, partials, holders);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight);
    }
    if (isCurry || isCurryRight) {
      var placeholder = wrapper.placeholder,
          argsHolders = replaceHolders(args, placeholder);

      length -= argsHolders.length;
      if (length < arity) {
        var newArgPos = argPos ? arrayCopy(argPos) : null,
            newArity = nativeMax(arity - length, 0),
            newsHolders = isCurry ? argsHolders : null,
            newHoldersRight = isCurry ? null : argsHolders,
            newPartials = isCurry ? args : null,
            newPartialsRight = isCurry ? null : args;

        bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
        bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

        if (!isCurryBound) {
          bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
        }
        var result = createHybridWrapper(func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity);
        result.placeholder = placeholder;
        return result;
      }
    }
    var thisBinding = isBind ? thisArg : this;
    if (isBindKey) {
      func = thisBinding[key];
    }
    if (argPos) {
      args = reorder(args, argPos);
    }
    if (isAry && ary < args.length) {
      args.length = ary;
    }
    return (this instanceof wrapper ? (Ctor || createCtorWrapper(func)) : func).apply(thisBinding, args);
  }
  return wrapper;
}

module.exports = createHybridWrapper;

},{"./arrayCopy":68,"./composeArgs":107,"./composeArgsRight":108,"./createCtorWrapper":113,"./reorder":135,"./replaceHolders":136}],115:[function(require,module,exports){
var createCtorWrapper = require('./createCtorWrapper');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` and invokes it with the optional `this`
 * binding of `thisArg` and the `partials` prepended to those provided to
 * the wrapper.
 *
 * @private
 * @param {Function} func The function to partially apply arguments to.
 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to the new function.
 * @returns {Function} Returns the new bound function.
 */
function createPartialWrapper(func, bitmask, thisArg, partials) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtorWrapper(func);

  function wrapper() {
    // Avoid `arguments` object use disqualifying optimizations by
    // converting it to an array before providing it `func`.
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(argsLength + leftLength);

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return (this instanceof wrapper ? Ctor : func).apply(isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartialWrapper;

},{"./createCtorWrapper":113}],116:[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    createBindWrapper = require('./createBindWrapper'),
    createHybridWrapper = require('./createHybridWrapper'),
    createPartialWrapper = require('./createPartialWrapper'),
    getData = require('./getData'),
    mergeData = require('./mergeData'),
    setData = require('./setData');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of flags.
 *  The bitmask may be composed of the following flags:
 *     1 - `_.bind`
 *     2 - `_.bindKey`
 *     4 - `_.curry` or `_.curryRight` of a bound function
 *     8 - `_.curry`
 *    16 - `_.curryRight`
 *    32 - `_.partial`
 *    64 - `_.partialRight`
 *   128 - `_.rearg`
 *   256 - `_.ary`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
    partials = holders = null;
  }
  length -= (holders ? holders.length : 0);
  if (bitmask & PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = null;
  }
  var data = !isBindKey && getData(func),
      newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

  if (data && data !== true) {
    mergeData(newData, data);
    bitmask = newData[1];
    arity = newData[9];
  }
  newData[9] = arity == null
    ? (isBindKey ? 0 : func.length)
    : (nativeMax(arity - length, 0) || 0);

  if (bitmask == BIND_FLAG) {
    var result = createBindWrapper(newData[0], newData[2]);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
    result = createPartialWrapper.apply(undefined, newData);
  } else {
    result = createHybridWrapper.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setter(result, newData);
}

module.exports = createWrapper;

},{"./baseSetData":96,"./createBindWrapper":111,"./createHybridWrapper":114,"./createPartialWrapper":115,"./getData":120,"./mergeData":131,"./setData":137}],117:[function(require,module,exports){
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length,
      result = true;

  if (arrLength != othLength && !(isWhere && othLength > arrLength)) {
    return false;
  }
  // Deep compare the contents, ignoring non-numeric properties.
  while (result && ++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    result = undefined;
    if (customizer) {
      result = isWhere
        ? customizer(othValue, arrValue, index)
        : customizer(arrValue, othValue, index);
    }
    if (typeof result == 'undefined') {
      // Recursively compare arrays (susceptible to call stack limits).
      if (isWhere) {
        var othIndex = othLength;
        while (othIndex--) {
          othValue = other[othIndex];
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
  }
  return !!result;
}

module.exports = equalArrays;

},{}],118:[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        // But, treat `-0` vs. `+0` as not equal.
        : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],119:[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isWhere) {
    return false;
  }
  var hasCtor,
      index = -1;

  while (++index < objLength) {
    var key = objProps[index],
        result = hasOwnProperty.call(other, key);

    if (result) {
      var objValue = object[key],
          othValue = other[key];

      result = undefined;
      if (customizer) {
        result = isWhere
          ? customizer(othValue, objValue, key)
          : customizer(objValue, othValue, key);
      }
      if (typeof result == 'undefined') {
        // Recursively compare objects (susceptible to call stack limits).
        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
    if (!result) {
      return false;
    }
    hasCtor || (hasCtor = key == 'constructor');
  }
  if (!hasCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":156}],120:[function(require,module,exports){
var metaMap = require('./metaMap'),
    noop = require('../utility/noop');

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

module.exports = getData;

},{"../utility/noop":164,"./metaMap":132}],121:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 * If `fromRight` is provided elements of `array` are iterated from right to left.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} [fromIndex] The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromRight ? (fromIndex || length) : ((fromIndex || 0) - 1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],122:[function(require,module,exports){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add array properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],123:[function(require,module,exports){
var bufferClone = require('./bufferClone');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return bufferClone(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      var result = new Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

module.exports = initCloneByTag;

},{"./bufferClone":103}],124:[function(require,module,exports){
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  var Ctor = object.constructor;
  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
    Ctor = Object;
  }
  return new Ctor;
}

module.exports = initCloneObject;

},{}],125:[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    isNative = require('../lang/isNative'),
    support = require('../support');

/** Used to detect named functions. */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Checks if `func` is eligible for `this` binding.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is eligible, else `false`.
 */
function isBindable(func) {
  var result = !(support.funcNames ? func.name : support.funcDecomp);

  if (!result) {
    var source = fnToString.call(func);
    if (!support.funcNames) {
      result = !reFuncName.test(source);
    }
    if (!result) {
      // Check if `func` references the `this` keyword and store the result.
      result = reThis.test(source) || isNative(func);
      baseSetData(func, result);
    }
  }
  return result;
}

module.exports = isBindable;

},{"../lang/isNative":149,"../support":161,"./baseSetData":96}],126:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],127:[function(require,module,exports){
var isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number') {
    var length = object.length,
        prereq = isLength(length) && isIndex(index, length);
  } else {
    prereq = type == 'string' && index in object;
  }
  if (prereq) {
    var other = object[index];
    return value === value ? value === other : other !== other;
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":151,"./isIndex":126,"./isLength":128}],128:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on ES `ToLength`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],129:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

module.exports = isObjectLike;

},{}],130:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
}

module.exports = isStrictComparable;

},{"../lang/isObject":151}],131:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    composeArgs = require('./composeArgs'),
    composeArgsRight = require('./composeArgsRight'),
    replaceHolders = require('./replaceHolders');

/** Used to compose bitmasks for wrapper metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_RIGHT_FLAG = 16,
    REARG_FLAG = 128,
    ARY_FLAG = 256;

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers required to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
 * augment function arguments, making the order in which they are executed important,
 * preventing the merging of metadata. However, we make an exception for a safe
 * common case where curried functions have `_.ary` and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */
function mergeData(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask;

  var arityFlags = ARY_FLAG | REARG_FLAG,
      bindFlags = BIND_FLAG | BIND_KEY_FLAG,
      comboFlags = arityFlags | bindFlags | CURRY_BOUND_FLAG | CURRY_RIGHT_FLAG;

  var isAry = bitmask & ARY_FLAG && !(srcBitmask & ARY_FLAG),
      isRearg = bitmask & REARG_FLAG && !(srcBitmask & REARG_FLAG),
      argPos = (isRearg ? data : source)[7],
      ary = (isAry ? data : source)[8];

  var isCommon = !(bitmask >= REARG_FLAG && srcBitmask > bindFlags) &&
    !(bitmask > bindFlags && srcBitmask >= REARG_FLAG);

  var isCombo = (newBitmask >= arityFlags && newBitmask <= comboFlags) &&
    (bitmask < REARG_FLAG || ((isRearg || isAry) && argPos.length <= ary));

  // Exit early if metadata can't be merged.
  if (!(isCommon || isCombo)) {
    return data;
  }
  // Use source `thisArg` if available.
  if (srcBitmask & BIND_FLAG) {
    data[2] = source[2];
    // Set when currying a bound function.
    newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
  }
  // Compose partial arguments.
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
  }
  // Compose partial right arguments.
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
  }
  // Use source `argPos` if available.
  value = source[7];
  if (value) {
    data[7] = arrayCopy(value);
  }
  // Use source `ary` if it's smaller.
  if (srcBitmask & ARY_FLAG) {
    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
  }
  // Use source `arity` if one is not provided.
  if (data[9] == null) {
    data[9] = source[9];
  }
  // Use source `func` and merge bitmasks.
  data[0] = source[0];
  data[1] = newBitmask;

  return data;
}

module.exports = mergeData;

},{"./arrayCopy":68,"./composeArgs":107,"./composeArgsRight":108,"./replaceHolders":136}],132:[function(require,module,exports){
(function (global){
var isNative = require('../lang/isNative');

/** Native method references. */
var WeakMap = isNative(WeakMap = global.WeakMap) && WeakMap;

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":149}],133:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * A specialized version of `_.pick` that picks `object` properties specified
 * by the `props` array.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function pickByArray(object, props) {
  object = toObject(object);

  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index];
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

module.exports = pickByArray;

},{"./toObject":140}],134:[function(require,module,exports){
var baseForIn = require('./baseForIn');

/**
 * A specialized version of `_.pick` that picks `object` properties `predicate`
 * returns truthy for.
 *
 * @private
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Object} Returns the new object.
 */
function pickByCallback(object, predicate) {
  var result = {};
  baseForIn(object, function(value, key, object) {
    if (predicate(value, key, object)) {
      result[key] = value;
    }
  });
  return result;
}

module.exports = pickByCallback;

},{"./baseForIn":85}],135:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    isIndex = require('./isIndex');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = arrayCopy(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

module.exports = reorder;

},{"./arrayCopy":68,"./isIndex":126}],136:[function(require,module,exports){
/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    if (array[index] === placeholder) {
      array[index] = PLACEHOLDER;
      result[++resIndex] = index;
    }
  }
  return result;
}

module.exports = replaceHolders;

},{}],137:[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    now = require('../date/now');

/** Used to detect when a function becomes hot. */
var HOT_COUNT = 150,
    HOT_SPAN = 16;

/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity function
 * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var setData = (function() {
  var count = 0,
      lastCalled = 0;

  return function(key, value) {
    var stamp = now(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return key;
      }
    } else {
      count = 0;
    }
    return baseSetData(key, value);
  };
}());

module.exports = setData;

},{"../date/now":63,"./baseSetData":96}],138:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":143,"../lang/isArray":144,"../object/keysIn":157,"../support":161,"./isIndex":126,"./isLength":128}],139:[function(require,module,exports){
/**
 * An implementation of `_.uniq` optimized for sorted arrays without support
 * for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function sortedUniq(array, iteratee) {
  var seen,
      index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (!index || seen !== computed) {
      seen = computed;
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = sortedUniq;

},{}],140:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":151}],141:[function(require,module,exports){
var baseClone = require('../internal/baseClone'),
    bindCallback = require('../internal/bindCallback'),
    isIterateeCall = require('../internal/isIterateeCall');

/**
 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
 * otherwise they are assigned by reference. If `customizer` is provided it is
 * invoked to produce the cloned values. If `customizer` returns `undefined`
 * cloning is handled by the method instead. The `customizer` is bound to
 * `thisArg` and invoked with two argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the structured clone algorithm.
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var shallow = _.clone(users);
 * shallow[0] === users[0];
 * // => true
 *
 * var deep = _.clone(users, true);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.clone(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 0
 */
function clone(value, isDeep, customizer, thisArg) {
  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
    isDeep = false;
  }
  else if (typeof isDeep == 'function') {
    thisArg = customizer;
    customizer = isDeep;
    isDeep = false;
  }
  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
  return baseClone(value, isDeep, customizer);
}

module.exports = clone;

},{"../internal/baseClone":74,"../internal/bindCallback":102,"../internal/isIterateeCall":127}],142:[function(require,module,exports){
var baseClone = require('../internal/baseClone'),
    bindCallback = require('../internal/bindCallback');

/**
 * Creates a deep clone of `value`. If `customizer` is provided it is invoked
 * to produce the cloned values. If `customizer` returns `undefined` cloning
 * is handled by the method instead. The `customizer` is bound to `thisArg`
 * and invoked with two argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the structured clone algorithm.
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the deep cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var deep = _.cloneDeep(users);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.cloneDeep(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(true);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 20
 */
function cloneDeep(value, customizer, thisArg) {
  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
  return baseClone(value, true, customizer);
}

module.exports = cloneDeep;

},{"../internal/baseClone":74,"../internal/bindCallback":102}],143:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return (isLength(length) && objToString.call(value) == argsTag) || false;
}

module.exports = isArguments;

},{"../internal/isLength":128,"../internal/isObjectLike":129}],144:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('./isNative'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
};

module.exports = isArray;

},{"../internal/isLength":128,"../internal/isObjectLike":129,"./isNative":149}],145:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return (value === true || value === false || isObjectLike(value) && objToString.call(value) == boolTag) || false;
}

module.exports = isBoolean;

},{"../internal/isObjectLike":129}],146:[function(require,module,exports){
var isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isFunction = require('./isFunction'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike'),
    isString = require('./isString'),
    keys = require('../object/keys');

/**
 * Checks if a value is empty. A value is considered empty unless it is an
 * `arguments` object, array, string, or jQuery-like collection with a length
 * greater than `0` or an object with own enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  var length = value.length;
  if (isLength(length) && (isArray(value) || isString(value) || isArguments(value) ||
      (isObjectLike(value) && isFunction(value.splice)))) {
    return !length;
  }
  return !keys(value).length;
}

module.exports = isEmpty;

},{"../internal/isLength":128,"../internal/isObjectLike":129,"../object/keys":156,"./isArguments":143,"./isArray":144,"./isFunction":148,"./isString":152}],147:[function(require,module,exports){
var baseIsEqual = require('../internal/baseIsEqual'),
    bindCallback = require('../internal/bindCallback'),
    isStrictComparable = require('../internal/isStrictComparable');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent. If `customizer` is provided it is invoked to compare values.
 * If `customizer` returns `undefined` comparisons are handled by the method
 * instead. The `customizer` is bound to `thisArg` and invoked with three
 * arguments; (value, other [, index|key]).
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Objects are compared by
 * their own, not inherited, enumerable properties. Functions and DOM nodes
 * are **not** supported. Provide a customizer function to extend support
 * for comparing other values.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * object == other;
 * // => false
 *
 * _.isEqual(object, other);
 * // => true
 *
 * // using a customizer callback
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * _.isEqual(array, other, function(value, other) {
 *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
 *     return true;
 *   }
 * });
 * // => true
 */
function isEqual(value, other, customizer, thisArg) {
  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 3);
  if (!customizer && isStrictComparable(value) && isStrictComparable(other)) {
    return value === other;
  }
  var result = customizer ? customizer(value, other) : undefined;
  return typeof result == 'undefined' ? baseIsEqual(value, other, customizer) : !!result;
}

module.exports = isEqual;

},{"../internal/baseIsEqual":88,"../internal/bindCallback":102,"../internal/isStrictComparable":130}],148:[function(require,module,exports){
(function (global){
var baseIsFunction = require('../internal/baseIsFunction'),
    isNative = require('./isNative');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/baseIsFunction":90,"./isNative":149}],149:[function(require,module,exports){
var escapeRegExp = require('../string/escapeRegExp'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

module.exports = isNative;

},{"../internal/isObjectLike":129,"../string/escapeRegExp":160}],150:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isNumber(8.4);
 * // => true
 *
 * _.isNumber(NaN);
 * // => true
 *
 * _.isNumber('8.4');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag) || false;
}

module.exports = isNumber;

},{"../internal/isObjectLike":129}],151:[function(require,module,exports){
/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (value && type == 'object') || false;
}

module.exports = isObject;

},{}],152:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag) || false;
}

module.exports = isString;

},{"../internal/isObjectLike":129}],153:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
}

module.exports = isTypedArray;

},{"../internal/isLength":128,"../internal/isObjectLike":129}],154:[function(require,module,exports){
var baseAssign = require('../internal/baseAssign'),
    createAssigner = require('../internal/createAssigner');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments;
 * (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return typeof value == 'undefined' ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(baseAssign);

module.exports = assign;

},{"../internal/baseAssign":72,"../internal/createAssigner":110}],155:[function(require,module,exports){
module.exports = require('./assign');

},{"./assign":154}],156:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('../lang/isNative'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (object) {
    var Ctor = object.constructor,
        length = object.length;
  }
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
     (typeof object != 'function' && (length && isLength(length)))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/isLength":128,"../internal/shimKeys":138,"../lang/isNative":149,"../lang/isObject":151}],157:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":126,"../internal/isLength":128,"../lang/isArguments":143,"../lang/isArray":144,"../lang/isObject":151,"../support":161}],158:[function(require,module,exports){
var arrayMap = require('../internal/arrayMap'),
    baseDifference = require('../internal/baseDifference'),
    baseFlatten = require('../internal/baseFlatten'),
    bindCallback = require('../internal/bindCallback'),
    keysIn = require('./keysIn'),
    pickByArray = require('../internal/pickByArray'),
    pickByCallback = require('../internal/pickByCallback');

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 * Property names may be specified as individual arguments or as arrays of
 * property names. If `predicate` is provided it is invoked for each property
 * of `object` omitting the properties `predicate` returns truthy for. The
 * predicate is bound to `thisArg` and invoked with three arguments;
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|...(string|string[])} [predicate] The function invoked per
 *  iteration or property names to omit, specified as individual property
 *  names or arrays of property names.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.omit(object, 'age');
 * // => { 'user': 'fred' }
 *
 * _.omit(object, _.isNumber);
 * // => { 'user': 'fred' }
 */
function omit(object, predicate, thisArg) {
  if (object == null) {
    return {};
  }
  if (typeof predicate != 'function') {
    var props = arrayMap(baseFlatten(arguments, false, false, 1), String);
    return pickByArray(object, baseDifference(keysIn(object), props));
  }
  predicate = bindCallback(predicate, thisArg, 3);
  return pickByCallback(object, function(value, key, object) {
    return !predicate(value, key, object);
  });
}

module.exports = omit;

},{"../internal/arrayMap":71,"../internal/baseDifference":79,"../internal/baseFlatten":83,"../internal/bindCallback":102,"../internal/pickByArray":133,"../internal/pickByCallback":134,"./keysIn":157}],159:[function(require,module,exports){
var baseValues = require('../internal/baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return baseValues(object, keys(object));
}

module.exports = values;

},{"../internal/baseValues":101,"./keys":156}],160:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":99}],161:[function(require,module,exports){
(function (global){
var isNative = require('./lang/isNative');

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to detect DOM support. */
var document = (document = global.window) && document.document;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if functions can be decompiled by `Function#toString`
   * (all but Firefox OS certified apps, older Opera mobile browsers, and
   * the PlayStation 3; forced `false` for Windows 8 apps).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

  /**
   * Detect if `Function#name` is supported (all but IE).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcNames = typeof Function.name == 'string';

  /**
   * Detect if the DOM is supported.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.dom = document.createDocumentFragment().nodeType === 11;
  } catch(e) {
    support.dom = false;
  }

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lang/isNative":149}],162:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],163:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],164:[function(require,module,exports){
/**
 * A no-operation function which returns `undefined` regardless of the
 * arguments it receives.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.noop(object) === undefined;
 * // => true
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

},{}],165:[function(require,module,exports){
'use strict';

var OO = require('./oo');

/**
 * Base class for Substance errors.
 *
 * @class SubstanceError
 * @extends Error
 * @constructor
 * @module Basics
 */
function SubstanceError() {
  Error.apply(this, arguments);
}

OO.inherit(SubstanceError, Error);

module.exports = SubstanceError;

},{"./oo":170}],166:[function(require,module,exports){
'use strict';

var OO = require("./oo");

/**
 * Event support.
 *
 * Inspired by VisualEditor's EventEmitter class.
 *
 * @class EventEmitter
 * @constructor
 * @module Basics
 */
function EventEmitter() {
  this.__events__ = {};
}

EventEmitter.Prototype = function() {

  function validateMethod( method, context ) {
    // Validate method and context
    if ( typeof method === 'string' ) {
      // Validate method
      if ( context === undefined || context === null ) {
        throw new Error( 'Method name "' + method + '" has no context.' );
      }
      if ( !( method in context ) ) {
        // Technically the method does not need to exist yet: it could be
        // added before call time. But this probably signals a typo.
        throw new Error( 'Method not found: "' + method + '"' );
      }
      if ( typeof context[method] !== 'function' ) {
        // Technically the property could be replaced by a function before
        // call time. But this probably signals a typo.
        throw new Error( 'Property "' + method + '" is not a function' );
      }
    } else if ( typeof method !== 'function' ) {
      throw new Error( 'Invalid callback. Function or method name expected.' );
    }
  }

  /**
   * Internal implementation for registering a listener.
   *
   * @param {String} event
   * @param {Function} method
   * @param {Object} context
   */
  this._on = function ( event, method, context, priority) {
    var bindings;
    validateMethod( method, context );
    if ( this.__events__.hasOwnProperty( event ) ) {
      bindings = this.__events__[event];
    } else {
      // Auto-initialize bindings list
      bindings = this.__events__[event] = [];
    }
    // Add binding
    bindings.push({
      method: method,
      context: context || null,
      priority: priority
    });
    return this;
  };

  /**
   * Remove a listener.
   *
   * @method off
   * @param {String} event
   * @param {Function} method
   * @param {Object} context
   * @chainable
   */
  this._off = function ( event, method, context ) {
    var i, bindings;
    if ( arguments.length === 1 ) {
      // Remove all bindings for event
      delete this.__events__[event];
      return this;
    }
    validateMethod( method, context );
    if ( !( event in this.__events__ ) || !this.__events__[event].length ) {
      // No matching bindings
      return this;
    }
    // Default to null context
    if ( arguments.length < 3 ) {
      context = null;
    }
    // Remove matching handlers
    bindings = this.__events__[event];
    i = bindings.length;
    while ( i-- ) {
      if ( bindings[i].method === method && bindings[i].context === context ) {
        bindings.splice( i, 1 );
      }
    }
    // Cleanup if now empty
    if ( bindings.length === 0 ) {
      delete this.__events__[event];
    }
    return this;
  };

  /**
   * Emit an event.
   *
   * @method emit
   * @param {String} event
   * @param ...arguments
   * @return true if a listener was notified, false otherwise.
   */
  this.emit = function (event) {
    if ( event in this.__events__ ) {
      // Clone the list of bindings so that handlers can remove or add handlers during the call.
      var bindings = this.__events__[event].slice();
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0, len = bindings.length; i < len; i++) {
        var binding = bindings[i];
        binding.method.apply(binding.context, args);
      }
      return true;
    }
    return false;
  };

  // sort descending as a listener with higher priority should be
  // called earlier
  function byPriorityDescending(a, b) {
    return b.priority - a.priority;
  }

  /**
   * Connect a listener to a set of events.
   *
   * Optionally, a `priority` can be provided to control the order
   * of all bindings. The default priority is 0. All listeners with the
   * same priority remain in order of registration.
   * A lower priority will make the listener be called later, a higher
   * priority earlier.
   *
   * @method emit
   * @param {Object} listener
   * @param {Object} hash with event as keys, and handler functions as values.
   * @param {Number} hash with `priority` as ordering hint (default is 0).
   * @chainable
   */
  this.connect = function (obj, methods, options) {
    var priority = 0;
    if (arguments.length === 3) {
      priority = options.priority || priority;
    }
    for ( var event in methods ) {
      var method = methods[event];
      this._on( event, method, obj, priority);
    }
    this.__events__[event].sort(byPriorityDescending);
    return this;
  };

  this.on = function ( event, method, context, options) {
    var priority = 0;
    if (arguments.length === 3) {
      priority = options.priority || priority;
    }
    this._on(event, method, context, priority);
    this.__events__[event].sort(byPriorityDescending);
  };

  /**
   * Disconnect a listener (all bindings).
   *
   * @method emit
   * @param {Object} listener
   * @chainable
   */
  this.disconnect = function (context) {
    var i, event, bindings;
    // Remove all connections to the context
    for ( event in this.__events__ ) {
      bindings = this.__events__[event];
      i = bindings.length;
      while ( i-- ) {
        // bindings[i] may have been removed by the previous step's
        // this.off so check it still exists
        if ( bindings[i] && bindings[i].context === context ) {
          this._off( event, bindings[i].method, context );
        }
      }
    }
    return this;
  };
};

OO.initClass( EventEmitter );

module.exports = EventEmitter;

},{"./oo":170}],167:[function(require,module,exports){
'use strict';

var OO = require('./oo');
var Registry = require('./registry');

/**
 * Factory
 * -------
 * Simple factory implementation.
 *
 * @class Factory
 * @extends Registry
 * @constructor
 * @module Basics
 */
function Factory() {
  Factory.super.call(this);
}

Factory.Prototype = function() {

  /**
   * Create an instance of the clazz with a given name.
   *
   * @param {String} name
   * @return A new instance.
   * @method create
   */
  this.create = function ( name ) {
    var clazz = this.get(name);
    if ( !clazz ) {
      throw new Error( 'No class registered by that name: ' + name );
    }
    // call the clazz providing the remaining arguments
    var args = Array.prototype.slice.call( arguments, 1 );
    var obj = Object.create( clazz.prototype );
    clazz.apply( obj, args );
    return obj;
  };

};

OO.inherit(Factory, Registry);

module.exports = Factory;

},{"./oo":170,"./registry":172}],168:[function(require,module,exports){
'use strict';

/**
 * Mostly taken from lodash.
 *
 * @class Helpers
 * @static
 * @module Basics
 */
var Helpers = {};

// Lang helpers

/**
 * See https://lodash.com/docs#isEqual
 * @method isEqual
 */
Helpers.isEqual = require('lodash/lang/isEqual');
/**
 * See https://lodash.com/docs#isObject
 * @method isObject
 */
Helpers.isObject = require('lodash/lang/isObject');
/**
 * See https://lodash.com/docs#isArray
 * @method isArray
 */
Helpers.isArray = require('lodash/lang/isArray');
/**
 * See https://lodash.com/docs#isString
 * @method isString
 */
Helpers.isString = require('lodash/lang/isString');
/**
 * See https://lodash.com/docs#isNumber
 * @method isNumber
 */
Helpers.isNumber = require('lodash/lang/isNumber');
/**
 * See https://lodash.com/docs#isBoolean
 * @method isBoolean
 */
Helpers.isBoolean = require('lodash/lang/isBoolean');
/**
 * See https://lodash.com/docs#isFunction
 * @method isFunction
 */
Helpers.isFunction = require('lodash/lang/isFunction');
/**
 * See https://lodash.com/docs#cloneDeep
 * @method cloneDeep
 */
Helpers.cloneDeep = require('lodash/lang/cloneDeep');

/**
 * See https://lodash.com/docs#clone
 * @method clone
 */
Helpers.clone = require('lodash/lang/clone');

/**
 * See https://lodash.com/docs#isEmpty
 * @method isEmpty
 */
Helpers.isEmpty = require('lodash/lang/isEmpty');

// Function helpers

/**
 * See https://lodash.com/docs#bind
 * @method bind
 */
Helpers.bind = require('lodash/function/bind');
/**
 * See https://lodash.com/docs#delay
 * @method delay
 */
Helpers.delay = require('lodash/function/delay');
/**
 * See https://lodash.com/docs#debounce
 * @method debounce
 */
Helpers.debounce = require('lodash/function/debounce');

// Object helpers

/**
 * See https://lodash.com/docs#extend
 * @method extend
 */
Helpers.extend = require('lodash/object/extend');
/**
 * See https://lodash.com/docs#omit
 * @method omit
 */
Helpers.omit = require('lodash/object/omit');

// Array helpers

/**
 * See https://lodash.com/docs#last
 * @method last
 */
Helpers.last = require('lodash/array/last');
/**
 * See https://lodash.com/docs#first
 * @method first
 */
Helpers.first = require('lodash/array/first');
/**
 * See https://lodash.com/docs#compact
 * @method compact
 */
Helpers.compact = require('lodash/array/compact');
/**
 * See https://lodash.com/docs#uniq
 * @method uniq
 */
Helpers.uniq = require('lodash/array/uniq');
/**
 * See https://lodash.com/docs#intersection
 * @method intersection
 */
Helpers.intersection = require('lodash/array/intersection');
/**
 * See https://lodash.com/docs#union
 * @method union
 */
Helpers.union = require('lodash/array/union');
/**
 * See https://lodash.com/docs#without
 * @method without
 */
Helpers.without = require('lodash/array/without');

// Collection helpers

/**
 * See https://lodash.com/docs#each
 * @method each
 */
Helpers.each = require('lodash/collection/forEach');
/**
 * See https://lodash.com/docs#filter
 * @method filter
 */
Helpers.filter = require('lodash/collection/filter');
/**
 * See https://lodash.com/docs#includes
 * @method includes
 */
Helpers.includes = require('lodash/collection/includes');
/**
 * See https://lodash.com/docs#find
 * @method find
 */
Helpers.find = require('lodash/collection/find');
/**
 * See https://lodash.com/docs#map
 * @method map
 */
Helpers.map = require('lodash/collection/map');
/**
 * See https://lodash.com/docs#pluck
 * @method pluck
 */
Helpers.pluck = require('lodash/collection/pluck');
/**
 * See https://lodash.com/docs#indexBy
 * @method indexBy
 */
Helpers.indexBy = require('lodash/collection/indexBy');
/**
 * See https://lodash.com/docs#sortBy
 * @method sortBy
 */
Helpers.sortBy = require('lodash/collection/sortBy');

/**
 * Check if two arrays are equal.
 *
 * @method isArrayEqual
 * @param {Array} a
 * @param {Array} b
 * @deprecated use `Helpers.isEqual` instead.
 */
Helpers.isArrayEqual = function(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length != b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

/**
 * Removes all occurrence of value in array using Array.splice
 * I.e., this changes the array instead of creating a new one
 * as _.without() does.
 *
 * @method deleteFromArray
 * @param {Array} array
 * @param value
 */
Helpers.deleteFromArray = function(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      array.splice(i, 1);
      i--;
    }
  }
};

/**
 * Clones a given object.
 * Uses obj.clone() if available, otherwise delegates to _.cloneDeep().
 *
 * @method clone
 * @param {Object} obj
 * @return The cloned object.
 */
Helpers.deepclone = function(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Helpers.isFunction(obj.clone)) {
    return obj.clone();
  }
  return Helpers.deepclone(obj);
};

/**
 * Alias for {{#crossLink "Helpers/cloneDeep:method"}}{{/crossLink}}.
 * @method deepClone
 */
Helpers.deepclone = Helpers.cloneDeep;

/**
 * Web helper to compute the relative offset of an element to an ancestor element.
 *
 * @method getRelativeOffset
 * @param {jQuery.Selector} $element
 * @param {jQuery.Selector} $ancestor
 * @return An object with properties
 *   - top: Number
 *   - left: Number
 */
Helpers.getRelativeOffset = function ( $element, $ancestor ) {
  var pos = $element.offset();
  var ancestorPos = $ancestor.offset();
  pos.left -= ancestorPos.left;
  pos.top -= ancestorPos.top;
  return pos;
};

/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/**
 * Generates a unique id.
 *
 * @method uuid
 * @param {String} [prefix] if provided the UUID will be prefixed.
 * @param {Number} [len] if provided a UUID with given length will be created.
 * @return A generated uuid.
 */
Helpers.uuid = function (prefix, len) {
  if (prefix && prefix[prefix.length-1] !== "_") {
    prefix = prefix.concat("_");
  }
  var chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split(''),
      uuid = [],
      radix = 16,
      idx;
  len = len || 32;
  if (len) {
    // Compact form
    for (idx = 0; idx < len; idx++) uuid[idx] = chars[0 | Math.random()*radix];
  } else {
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (idx = 0; idx < 36; idx++) {
      if (!uuid[idx]) {
        r = 0 | Math.random()*16;
        uuid[idx] = chars[(idx == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return (prefix ? prefix : "") + uuid.join('');
};

module.exports = Helpers;

},{"lodash/array/compact":47,"lodash/array/first":49,"lodash/array/intersection":50,"lodash/array/last":51,"lodash/array/union":52,"lodash/array/uniq":53,"lodash/array/without":54,"lodash/collection/filter":55,"lodash/collection/find":56,"lodash/collection/forEach":57,"lodash/collection/includes":58,"lodash/collection/indexBy":59,"lodash/collection/map":60,"lodash/collection/pluck":61,"lodash/collection/sortBy":62,"lodash/function/bind":64,"lodash/function/debounce":65,"lodash/function/delay":66,"lodash/lang/clone":141,"lodash/lang/cloneDeep":142,"lodash/lang/isArray":144,"lodash/lang/isBoolean":145,"lodash/lang/isEmpty":146,"lodash/lang/isEqual":147,"lodash/lang/isFunction":148,"lodash/lang/isNumber":150,"lodash/lang/isObject":151,"lodash/lang/isString":152,"lodash/object/extend":155,"lodash/object/omit":158}],169:[function(require,module,exports){
'use strict';

var _ = require('./helpers');

/**
 * Substance.Basics
 * ----------------
 * A collection of helpers pulled together from different sources, such as lodash.
 *
 * @module Basics
 * @main Basics
 */
var Basics = {};

_.extend(Basics, require('./helpers'));
_.extend(Basics, require('./oo'));
Basics.PathAdapter = require('./path_adapter');
Basics.EventEmitter = require('./event_emitter');
Basics.Error = require('./error');
Basics.Registry = require('./registry');
Basics.Factory = require('./factory');

module.exports = Basics;

},{"./error":165,"./event_emitter":166,"./factory":167,"./helpers":168,"./oo":170,"./path_adapter":171,"./registry":172}],170:[function(require,module,exports){
'use strict';

var _ = require('./helpers');

/**
 * Helpers for OO programming.
 *
 * Inspired by VisualEditor's OO module.
 *
 * @class OO
 * @static
 * @module Basics
 */
var OO = {};

var extend = function( parent, proto ) {
  var ctor = function $$$() {
    parent.apply(this, arguments);
    if (this.init) {
      this.init.apply(this, arguments);
    }
  };
  OO.inherit(ctor, parent);
  for(var key in proto) {
    if (proto.hasOwnProperty(key)) {
      if (key === "name") {
        continue;
      }
      ctor.prototype[key] = proto[key];
    }
  }
  ctor.static.name = proto.name;
  return ctor;
};

/**
 * Initialize a class.
 *
 * @param {Constructor} clazz
 * @method initClass
 */
OO.initClass = function(clazz) {
  if (clazz.Prototype && !(clazz.prototype instanceof clazz.Prototype)) {
    clazz.prototype = new clazz.Prototype();
    clazz.prototype.constructor = clazz;
  }
  clazz.static = clazz.static || {};
  clazz.extend = clazz.extend || _.bind(extend, null, clazz);
};

/**
 * Inherit from a parent class.
 *
 * @param clazz {Constructor} class constructor
 * @param parentClazz {Constructor} parent constructor
 *
 * @method inherit
 */
OO.inherit =  function(clazz, parentClazz) {
  if (clazz.prototype instanceof parentClazz) {
    throw new Error('Target already inherits from origin');
  }
  var targetConstructor = clazz.prototype.constructor;
  // Customization: supporting a prototype constructor function
  // defined as a static member 'Prototype' of the target function.
  var TargetPrototypeCtor = clazz.Prototype;
  // Provide a shortcut to the parent constructor
  clazz.super = parentClazz;
  if (TargetPrototypeCtor) {
    TargetPrototypeCtor.prototype = parentClazz.prototype;
    clazz.prototype = new TargetPrototypeCtor();
    clazz.prototype.constructor = clazz;
  } else {
    clazz.prototype = Object.create(parentClazz.prototype, {
      // Restore constructor property of clazz
      constructor: {
        value: targetConstructor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }
  // provide a shortcut to the parent prototype
  clazz.prototype.super = parentClazz.prototype;
  // Extend static properties - always initialize both sides
  OO.initClass( parentClazz );
  clazz.static = Object.create(parentClazz.static);
  clazz.extend = _.bind(extend, null, clazz);
};

/**
 * @param clazz {Constructor} class constructor
 * @param mixinClazz {Constructor} parent constructor
 * @method mixin
 */
OO.mixin = function(clazz, mixinClazz) {
  var key;
  var prototype = mixinClazz.prototype;
  if (mixinClazz.Prototype) {
    prototype = new mixinClazz.Prototype();
  }
  // Copy prototype properties
  for ( key in prototype ) {
    if ( key !== 'constructor' && prototype.hasOwnProperty( key ) ) {
      clazz.prototype[key] = prototype[key];
    }
  }
  // make sure the clazz is initialized
  OO.initClass(clazz);
  // Copy static properties
  if ( mixinClazz.static ) {
    for ( key in mixinClazz.static ) {
      if ( mixinClazz.static.hasOwnProperty( key ) ) {
        clazz.static[key] = mixinClazz.static[key];
      }
    }
  } else {
    OO.initClass(mixinClazz);
  }
};

module.exports = OO;

},{"./helpers":168}],171:[function(require,module,exports){
'use strict';

var _ = require('./helpers');
var oo = require('./oo');

/**
 * An adapter to access an object via path.
 *
 * @class PathAdapter
 * @module Basics
 * @constructor
 */
function PathAdapter(obj) {
  if (obj) {
    this.root = obj;
  }
}

PathAdapter.Prototype = function() {

  // use this to create extra scope for children ids
  // Example: {
  //   "foo": {
  //      "bar": true
  //      "children": {
  //          "bla": {
  //            "blupp": true
  //          }
  //      }
  //   }
  // }
  this.childrenScope = false;

  this.getRoot = function() {
    return this.root || this;
  };

  this._resolve = function(path, create) {
    var lastIdx = path.length-1;
    var context = this.getRoot();
    for (var i = 0; i < lastIdx; i++) {
      var key = path[i];
      if (context[key] === undefined) {
        if (create) {
          context[key] = {};
          if (this.childrenScope) {
            context[key].children = {};
          }
        } else {
          return undefined;
        }
      }
      context = context[key];
      if (this.childrenScope) {
        context = context.children;
      }
    }
    return context;
  };

  this.get = function(path) {
    if (_.isString(path)) {
      return this[path];
    } else if (!path || path.length === 0) {
      return this.getRoot();
    } else {
      var key = path[path.length-1];
      var context = this._resolve(path);
      if (context) {
        return context[key];
      } else {
        return undefined;
      }
    }
  };

  this.set = function(path, value) {
    if (_.isString(path)) {
      this[path] = value;
    } else {
      var key = path[path.length-1];
      this._resolve(path, true)[key] = value;
    }
  };

  this.delete = function(path, strict) {
    if (_.isString(path)) {
      delete this[path];
    } else {
      var key = path[path.length-1];
      var obj = this._resolve(path);
      if (strict && !obj || !obj[key]) {
        throw new Error('Invalid path.');
      }
      delete obj[key];
    }
  };

  this.clear = function() {
    var root = this.getRoot();
    for (var key in root) {
      if (root.hasOwnProperty(key)) {
        delete root[key];
      }
    }
  };

  this._traverse = function(root, path, fn, ctx) {
    for (var id in root) {
      if (!root.hasOwnProperty(id)) continue;
      if (id !== '__values__') {
        var childPath = path.concat([id]);
        fn.call(ctx, childPath, root[id]);
        this._traverse(root[id], childPath, fn, ctx);
      }
    }
  };

  this.traverse = function(fn, ctx) {
    this._traverse(this.getRoot(), [], fn, ctx);
  };

};

oo.initClass( PathAdapter );

PathAdapter.Arrays = function() {
  PathAdapter.apply(this, arguments);
};

PathAdapter.Arrays.Prototype = function() {

  this.get = function(path) {
    if (_.isString(path)) {
      return this[path];
    } else if (!path || path.length === 0) {
      return this.getRoot();
    } else {
      var key = path[path.length-1];
      var context = this._resolve(path);
      if (context && context[key]) {
        return context[key].__values__;
      } else {
        return undefined;
      }
    }
  };

  this.add = function(path, value) {
    var key = path[path.length-1];
    var context = this._resolve(path, true);
    if (!context[key]) {
      context[key] = {__values__: []};
    }
    var values = context[key].__values__;
    values.push(value);
  };

  this.remove = function(path, value) {
    var values = this.get(path);
    if (values) {
      _.deleteFromArray(values, value);
    } else {
      console.warn('Warning: trying to remove a value for an unknown path.', path, value);
    }
  };

  this.removeAll = function(path) {
    var values = this.get(path);
    values.splice(0, values.length);
  };

  this.set = function() {
    throw new Error('This method is not available for PathAdapter.Arrays');
  };

  this._traverse = function(root, path, fn, ctx) {
    for (var id in root) {
      if (!root.hasOwnProperty(id)) continue;
      if (id === '__values__') {
        fn.call(ctx, path, root.__values__);
      } else {
        var childPath = path.concat([id]);
        this._traverse(root[id], childPath, fn, ctx);
      }
    }
  };

};

oo.inherit(PathAdapter.Arrays, PathAdapter);

module.exports = PathAdapter;

},{"./helpers":168,"./oo":170}],172:[function(require,module,exports){
'use strict';

var oo = require('./oo');

/**
 * Simple registry implementation.
 *
 * @class Registry
 * @constructor
 * @module Basics
 */
function Registry() {
  this.entries = {};
  // used to control order
  this.names = [];
}

Registry.Prototype = function() {

  /**
   * Check if an entry is registered for a given name.
   *
   * @param {String} name
   * @method contains
   */
  this.contains = function(name) {
    return !!this.entries[name];
  };

  /**
   * Add an entry to the registry.
   *
   * @param {String} name
   * @param {Object} entry
   * @method add
   */
  this.add = function(name, entry) {
    if (this.contains(name)) {
      this.remove(name);
    }
    this.entries[name] = entry;
    this.names.push(name);
  };

  /**
   * Remove an entry from the registry.
   *
   * @param {String} name
   * @method remove
   */
  this.remove = function(name) {
    var pos = this.names.indexOf(name);
    if (pos >= 0) {
      this.names.splice(pos, 1);
    }
    delete this.entries[name];
  };

  this.clear = function() {
    this.names = [];
    this.entries = [];
  };

  /**
   * Get the entry registered for a given name.
   *
   * @param {String} name
   * @return The registered entry
   * @method get
   */
  this.get = function(name) {
    var res = this.entries[name];

    if (!res) {
      console.error("No entry with name", name);
    }
    return res;
  };

  /**
   * Iterate all registered entries in the order they were registered.
   *
   * @param {Function} callback with signature function(entry, name)
   * @param {Object} execution context
   * @method each
   */
  this.each = function(callback, ctx) {
    for (var i = 0; i < this.names.length; i++) {
      var name = this.names[i];
      var _continue = callback.call(ctx, this.entries[name], name);
      if (_continue === false) {
        break;
      }
    }
  };
};

oo.initClass(Registry);

module.exports = Registry;

},{"./oo":170}],173:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;
var EventEmitter = Substance.EventEmitter;

/**
 * A data storage implemention.
 *
 * @class Data
 * @extends EventEmitter
 * @constructor
 * @param {Schema} schema
 * @param {Object} [options]
 * @module Data
 */
function Data(schema, options) {
  EventEmitter.call(this);

  this.schema = schema;
  this.nodes = new PathAdapter();
  this.indexes = {};
  // Handlers that are called after a node was created or deleted
  options = options || {};
  // For example in Substance.Document this is used to attach and detach a document from a node.
  this.didCreateNode = options.didCreateNode || function() {};
  this.didDeleteNode = options.didDeleteNode || function() {};
}

Data.Prototype = function() {

  /**
   * Get a node or value via path.
   *
   * @method get
   * @param {String|Array} path node id or path to property.
   * @return a Node instance, a value or undefined if not found.
   */
  this.get = function(path) {
    if (!path) {
      throw new Error('Path or id required');
    }
    return this.nodes.get(path);
  };

  /**
   * Get the internal storage for nodes.
   *
   * @method getNodes
   * @return The internal node storage.
   */
  this.getNodes = function() {
    return this.nodes;
  };

  /**
   * Create a node from the given data.
   *
   * @method create
   * @return {Node} The created node.
   */
  this.create = function(nodeData) {
    var node = this.schema.getNodeFactory().create(nodeData.type, nodeData);
    if (!node) {
      throw new Error('Illegal argument: could not create node for data:', nodeData);
    }
    if (this.contains(node.id)) {
      throw new Error("Node already exists: " + node.id);
    }
    if (!node.id || !node.type) {
      throw new Error("Node id and type are mandatory.");
    }
    this.nodes[node.id] = node;
    _.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.create(node);
      }
    });
    this.didCreateNode(node);
    return node;
  };

  /**
   * Delete the node with given id.
   *
   * @method delete
   * @param {String} nodeId
   * @return {Node} The deleted node.
   */
  this.delete = function(nodeId) {
    var node = this.nodes[nodeId];
    delete this.nodes[nodeId];
    this.didDeleteNode(node);
    _.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.delete(node);
      }
    });
    return node;
  };

  /**
   * Set a property to a new value.
   *
   * @method set
   * @param {Array} property path
   * @param {Object} newValue
   * @return {Node} The deleted node.
   */
  this.set = function(path, newValue) {
    var node = this.get(path[0]);
    var oldValue = this.nodes.get(path);
    this.nodes.set(path, newValue);
    _.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.update(node, path, newValue, oldValue);
      }
    });
    return oldValue;
  };

  // TODO: do we really want this incremental implementation here?
  this.update = function(path, diff) {
    var oldValue = this.nodes.get(path);
    var newValue;
    if (diff.isOperation) {
      newValue = diff.apply(oldValue);
    } else {
      var start, end, pos, val;
      if (_.isString(oldValue)) {
        if (diff['delete']) {
          // { delete: [2, 5] }
          start = diff['delete'].start;
          end = diff['delete'].end;
          newValue = oldValue.split('').splice(start, end-start).join('');
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          newValue = [oldValue.substring(0, pos), val, oldValue.substring(pos)].join('');
        } else {
          throw new Error('Diff is not supported:', JSON.stringify(diff));
        }
      } else if (_.isArray(oldValue)) {
        newValue = oldValue.slice(0);
        if (diff['delete']) {
          // { delete: 2 }
          pos = diff['delete'].offset;
          newValue.splice(pos, 1);
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          newValue.splice(pos, 0, val);
        } else {
          throw new Error('Diff is not supported:', JSON.stringify(diff));
        }
      } else {
        throw new Error('Diff is not supported:', JSON.stringify(diff));
      }
    }
    this.nodes.set(path, newValue);
    var node = this.get(path[0]);
    _.each(this.indexes, function(index) {
      if (index.select(node)) {
        index.update(node, path, oldValue, newValue);
      }
    });
    return oldValue;
  };

  /**
   * Convert to JSON.
   *
   * @method toJSON
   * @return {Object} Plain content.
   */
  this.toJSON = function() {
    return {
      schema: [this.schema.id, this.schema.version],
      nodes: _.deepclone(this.nodes)
    };
  };

  /**
   * Check if this storage contains a node with given id.
   *
   * @method contains
   * @return {Boolean} `true` if a node with id exists, `false` otherwise.
   */
  this.contains = function(id) {
    return (!!this.nodes[id]);
  };

  /**
   * Clear nodes.
   *
   * @method reset
   */
  this.reset = function() {
    this.nodes = new PathAdapter();
  };

  /**
   * Add a node index.
   *
   * @method addIndex
   * @param {String} name
   * @param {NodeIndex} index
   */
  this.addIndex = function(name, index) {
    if (this.indexes[name]) {
      console.error('Index with name %s already exists.', name);
    }
    index.reset(this);
    this.indexes[name] = index;
    return index;
  };

  /**
   * Get the node index with given name.
   *
   * @method getIndex
   * @param {String} name
   * @return The node index.
   */
  this.getIndex = function(name) {
    return this.indexes[name];
  };

};

Substance.inherit(Data, EventEmitter);

module.exports = Data;

},{"../basics":169,"../basics/helpers":168}],174:[function(require,module,exports){
'use strict';

var OO = require('../basics/oo');
var _ = require('../basics/helpers');

var Data = require('./data');
var Operator = require('../operator');
var ObjectOperation = Operator.ObjectOperation;
var ArrayOperation = Operator.ArrayOperation;
var TextOperation = Operator.TextOperation;

/**
 * Incremental data storage implemention.
 *
 * @class Data.Incremental
 * @extends Data
 * @constructor
 * @param {Schema} schema
 * @param {Object} [options]
 * @module Data
 */
var IncrementalData = function(schema, options) {
  IncrementalData.super.call(this, schema, options);
};

IncrementalData.Prototype = function() {

  /**
   * Create a new node.
   *
   * @method create
   * @param {Object} nodeData
   * @return The applied operation.
   */
  this.create = function(nodeData) {
    var op = ObjectOperation.Create([nodeData.id], nodeData);
    this.apply(op);
    return op;
  };

  /**
   * Delete a node.
   *
   * @method delete
   * @param {String} nodeId
   * @return The applied operation.
   */
  this.delete = function(nodeId) {
    var op = null;
    var node = this.get(nodeId);
    if (node) {
      var nodeData = node.toJSON();
      op = ObjectOperation.Delete([nodeId], nodeData);
      this.apply(op);
    }
    return op;
  };

  /**
   * Update a property incrementally.
   *
   * The diff can be of the following forms (depending on the updated property type):
   *   - String:
   *     - `{ insert: { offset: Number, value: Object } }`
   *     - `{ delete: { start: Number, end: Number } }`
   *   - Array:
   *     - `{ insert: { offset: Number, value: Object } }`
   *     - `{ delete: { offset: Number } }`
   *
   * @method update
   * @param {Array} path
   * @param {Object} diff
   * @return The applied operation.
   */
  this.update = function(path, diff) {
    var diffOp = this._getDiffOp(path, diff);
    var op = ObjectOperation.Update(path, diffOp);
    this.apply(op);
    return op;
  };

  /**
   * Set a property to a new value
   *
   * @method set
   * @param {Array} path
   * @param {Object} newValue
   * @return The applied operation.
   */
  this.set = function(path, newValue) {
    var oldValue = this.get(path);
    var op = ObjectOperation.Set(path, oldValue, newValue);
    this.apply(op);
    return op;
  };

  /**
   * Apply a given operation.
   *
   * @method apply
   * @param {ObjectOperation} op
   */
  this.apply = function(op) {
    if (op.type === ObjectOperation.NOP) return;
    else if (op.type === ObjectOperation.CREATE) {
      // clone here as the operations value must not be changed
      this.super.create.call(this, _.deepclone(op.val));
    } else if (op.type === ObjectOperation.DELETE) {
      this.super.delete.call(this, op.val.id);
    } else if (op.type === ObjectOperation.UPDATE) {
      var oldVal = this.get(op.path);
      var diff = op.diff;
      if (op.propertyType === 'array') {
        if (! (diff instanceof ArrayOperation) ) {
          diff = ArrayOperation.fromJSON(diff);
        }
        // array ops work inplace
        diff.apply(oldVal);
      } else if (op.propertyType === 'string') {
        if (! (diff instanceof TextOperation) ) {
          diff = TextOperation.fromJSON(diff);
        }
        var newVal = diff.apply(oldVal);
        this.super.set.call(this, op.path, newVal);
      } else {
        throw new Error("Unsupported type for operational update.");
      }
    } else if (op.type === ObjectOperation.SET) {
      this.super.set.call(this, op.path, op.val);
    } else {
      throw new Error("Illegal state.");
    }
    this.emit('operation:applied', op, this);
  };

  this._getDiffOp = function(path, diff) {
    var diffOp = null;
    if (diff.isOperation) {
      diffOp = diff;
    } else {
      var value = this.get(path);
      var start, end, pos, val;
      if (_.isString(value)) {
        if (diff['delete']) {
          // { delete: [2, 5] }
          start = diff['delete'].start;
          end = diff['delete'].end;
          diffOp = TextOperation.Delete(start, value.substring(start, end));
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          diffOp = TextOperation.Insert(pos, val);
        }
      } else if (_.isArray(value)) {
        if (diff['delete']) {
          // { delete: 2 }
          pos = diff['delete'].offset;
          diffOp = ArrayOperation.Delete(pos, value[pos]);
        } else if (diff['insert']) {
          // { insert: [2, "foo"] }
          pos = diff['insert'].offset;
          val = diff['insert'].value;
          diffOp = ArrayOperation.Insert(pos, val);
        }
      }
    }
    if (!diffOp) {
      throw new Error('Unsupported diff: ' + JSON.stringify(diff));
    }
    return diffOp;
  };

};

OO.inherit(IncrementalData, Data);

module.exports = IncrementalData;

},{"../basics/helpers":168,"../basics/oo":170,"../operator":233,"./data":173}],175:[function(require,module,exports){
'use strict';

/**
 * Substance.Data
 * --------------
 * Provides a data model with a simple CRUD style manuipulation API,
 * support for OT based incremental manipulations, etc.
 *
 * @module Data
 * @main Data
 */

var Data = require('./data');

Data.Incremental = require('./incremental_data');
Data.Node = require('./node');
Data.Schema = require('./schema');
Data.Index = require('./node_index');

module.exports = Data;

},{"./data":173,"./incremental_data":174,"./node":176,"./node_index":178,"./schema":179}],176:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var EventEmitter = Substance.EventEmitter;

/**
 * Base node implemention.
 *
 * @class Data.Node
 * @extends EventEmitter
 * @constructor
 * @param {Object} properties
 * @module Data
 */
function Node( properties ) {
  EventEmitter.call(this);

  /**
   * The internal storage for properties.
   * @property properties {Object}
   */
  this.properties = Substance.extend({}, this.getDefaultProperties(), properties);
  this.properties.type = this.constructor.static.name;
  this.properties.id = this.properties.id || Substance.uuid(this.properties.type);
}

Node.Prototype = function() {

  /**
   * Serialize to JSON.
   *
   * @method toJSON
   * @return Plain object.
   */
  this.toJSON = function() {
    return this.properties;
  };

  /**
   * Get default properties.
   *
   * Stub implementation.
   *
   * @method getDefaultProperties
   * @return An object containing default properties.
   */
  this.getDefaultProperties = function() {};

  /**
   * Check if the node is of a given type.
   *
   * @method isInstanceOf
   * @param {String} typeName
   * @return true if the node has a parent with given type, false otherwise.
   */
  this.isInstanceOf = function(typeName) {
    return Node.isInstanceOf(this.constructor, typeName);
  };

  /**
   * Get a the list of all polymorphic types.
   *
   * @method getTypeNames
   * @return An array of type names.
   */
  this.getTypeNames = function() {
    var typeNames = [];
    var staticData = this.constructor.static;
    while (staticData && staticData.name !== "node") {
      typeNames.push(staticData.name);
      staticData = Object.getPrototypeOf(staticData);
    }
    return typeNames;
  };

  /**
   * Get the type of a property.
   *
   * @method getPropertyType
   * @param {String} propertyName
   * @return The property's type.
   */
  this.getPropertyType = function(propertyName) {
    var schema = this.constructor.static.schema;
    return schema[propertyName];
  };

};

Substance.inherit(Node, EventEmitter);

/**
 * Symbolic name for this model class. Must be set to a unique string by every subclass.
 * @static
 * @property name {String}
 */
Node.static.name = "node";

/**
 * The node schema.
 *
 * @property schema {Object}
 * @static
 */
Node.static.schema = {
  type: 'string',
  id: 'string'
};

/**
 * Read-only properties.
 *
 * @property readOnlyProperties {Array}
 * @static
 */
Node.static.readOnlyProperties = ['type', 'id'];

/**
 * Internal implementation of Node.prototype.isInstanceOf.
 *
 * @method isInstanceOf
 * @static
 * @private
 */
 Node.isInstanceOf = function(NodeClass, typeName) {
  var staticData = NodeClass.static;
  while (staticData && staticData.name !== "node") {
    if (staticData && staticData.name === typeName) {
      return true;
    }
    staticData = Object.getPrototypeOf(staticData);
  }
  return false;
};

Node.static.isInstanceOf = Node.isInstanceOf;

var defineProperty = function(prototype, property, readonly) {
  var getter, setter;
  getter = function() {
    return this.properties[property];
  };
  if (readonly) {
    setter = function() {
      throw new Error("Property " + property + " is readonly!");
    };
  } else {
    setter = function(val) {
      this.properties[property] = val;
      return this;
    };
  }
  var spec = {
    get: getter,
    set: setter
  };
  Object.defineProperty(prototype, property, spec);
};

var defineProperties = function(NodeClass) {
  var prototype = NodeClass.prototype;
  if (!NodeClass.static.schema) return;
  var properties = Object.keys(NodeClass.static.schema);
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (prototype.hasOwnProperty(property)) continue;
    var readonly = ( NodeClass.static.readOnlyProperties &&
      NodeClass.static.readOnlyProperties.indexOf(property) > 0 );
    defineProperty(prototype, property, readonly);
  }
};

var extend;

var prepareSchema = function(NodeClass) {
  var schema = NodeClass.static.schema;
  var parentStatic = Object.getPrototypeOf(NodeClass.static);
  var parentSchema = parentStatic.schema;
  if (parentSchema) {
    NodeClass.static.schema = Substance.extend(Object.create(parentSchema), schema);
  }
};

var initNodeClass = function(NodeClass) {
  // add a extend method so that this class can be used to create child models.
  NodeClass.extend = Substance.bind(extend, null, NodeClass);
  // define properties and so on
  defineProperties(NodeClass);
  prepareSchema(NodeClass);
  NodeClass.type = NodeClass.static.name;
};

extend = function( parent, modelSpec ) {
  var ctor = function NodeClass() {
    parent.apply(this, arguments);
    if (this.init) {
      this.init.apply(this, arguments);
    }
  };
  Substance.inherit(ctor, parent);
  for(var key in modelSpec) {
    if (modelSpec.hasOwnProperty(key)) {
      if (key === "name" || key === "properties") {
        continue;
      }
      ctor.prototype[key] = modelSpec[key];
    }
  }
  ctor.static.name = modelSpec.name;
  ctor.static.schema = modelSpec.properties;
  initNodeClass(ctor);
  return ctor;
};

initNodeClass(Node);

Node.initNodeClass = initNodeClass;

module.exports = Node;

},{"../basics":169}],177:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Node = require('./node');
var Factory = Substance.Factory;

/**
 * Factory for Nodes.
 *
 * @class Data.NodeFactory
 * @extends Factory
 * @constructor
 * @module Data
 */
function NodeFactory() {
  Factory.call(this);
}

NodeFactory.Prototype = function() {
  /**
   * Register a Node class.
   *
   * @method register
   * @param {Class} nodeClass
   */
  this.register = function ( nodeClazz ) {
    var name = nodeClazz.static && nodeClazz.static.name;
    if ( typeof name !== 'string' || name === '' ) {
      throw new Error( 'Node names must be strings and must not be empty' );
    }
    if ( !( nodeClazz.prototype instanceof Node) ) {
      throw new Error( 'Nodes must be subclasses of Substance.Data.Node' );
    }

    if (this.contains(name)) {
      throw new Error('Node class is already registered: ' + name);
    }

    this.add(name, nodeClazz);
  };
};

Substance.inherit(NodeFactory, Factory);

module.exports = NodeFactory;

},{"../basics":169,"./node":176}],178:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

/**
 * Index for Nodes.
 *
 * Node indexes are first-class citizens in Substance.Data.
 * I.e., they are updated after each operation.
 *
 * @class Data.NodeIndex
 * @constructor
 * @module Data
 */
var NodeIndex = function() {
  /**
   * Internal storage.
   * @property {PathAdapter} index
   * @private
   */
  this.index = new PathAdapter();
};

NodeIndex.Prototype = function() {

  /**
   * Reset the index using a Data instance.
   *
   * @method reset
   * @private
   */
  this.reset = function(data) {
    this.index.clear();
    this._initialize(data);
  };

  this._initialize = function(data) {
    Substance.each(data.getNodes(), function(node) {
      if (this.select(node)) {
        this.create(node);
      }
    }, this);
  };

  /**
   * The property used for indexing.
   *
   * @property {String} property
   * @protected
   */
  this.property = "id";

  /**
   * Check if a node should be indexed.
   *
   * Used internally only. Override this in subclasses to achieve a custom behavior.
   *
   * @method select
   * @protected
   */
  this.select = function(node) {
    if(!this.type) {
      return true;
    } else {
      return node.isInstanceOf(this.type);
    }
  };

  /**
   * Get all indexed nodes for a given path.
   *
   * @method get
   * @param {Array} path
   * @return A node or an object with ids and nodes as values.
   */
  // TODO: what is the correct return value. We have arrays at some places.
  this.get = function(path) {
    // HACK: unwrap objects on the index when method is called without a path
    if (!path) return this.getAll();
    return this.index.get(path) || {};
  };

  /**
   * Collects all indexed nodes.
   *
   * @method getAll
   * @return An object with ids as keys and nodes as values.
   */
  // TODO: is that true?
  this.getAll = function() {
    var result = {};
    Substance.each(this.index, function(values) {
      Substance.extend(result, values);
    });
    return result;
  };

  /**
   * Called when a node has been created.
   *
   * Override this in subclasses for customization.
   *
   * @method create
   * @param {Node} node
   * @protected
   */
  this.create = function(node) {
    var values = node[this.property];
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.set([value, node.id], node);
    }, this);
  };

  /**
   * Called when a node has been deleted.
   *
   * Override this in subclasses for customization.
   *
   * @method delete
   * @param {Node} node
   * @protected
   */
  this.delete = function(node) {
    var values = node[this.property];
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.delete([value, node.id]);
    }, this);
  };

  /**
   * Called when a property has been updated.
   *
   * Override this in subclasses for customization.
   *
   * @method update
   * @param {Node} node
   * @protected
   */
  this.update = function(node, path, newValue, oldValue) {
    if (!this.select(node) || path[1] !== this.property) return;
    var values = oldValue;
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.delete([value, node.id]);
    }, this);
    values = newValue;
    if (!Substance.isArray(values)) {
      values = [values];
    }
    Substance.each(values, function(value) {
      this.index.set([value, node.id], node);
    }, this);
  };

  /**
   * Clone this index.
   *
   * @method clone
   * @return A cloned NodeIndex.
   */
  this.clone = function() {
    var NodeIndexClass = this.constructor;
    var clone = new NodeIndexClass();
    return clone;
  };
};

Substance.initClass( NodeIndex );

/**
 * Create a new NodeIndex using the given prototype as mixin.
 *
 * @method create
 * @param {Object} prototype
 * @static
 * @return A customized NodeIndex.
 */
NodeIndex.create = function(prototype) {
  var index = Substance.extend(new NodeIndex(), prototype);
  index.clone = function() {
    return NodeIndex.create(prototype);
  };
  return index;
};

module.exports = NodeIndex;

},{"../basics":169}],179:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var Node = require('./node');
var NodeFactory = require('./node_factory');

/**
 * Data Schema.
 *
 * @class Data.Schema
 * @constructor
 * @param {String} name
 * @param {String} version
 * @module Data
 */
function Schema(name, version) {
  /**
   * @property {String} name
   */
  this.name = name;
  /**
   * @property {String} version
   */
  this.version = version;
  /**
   * @property {NodeFactory} nodeFactory
   * @private
   */
  this.nodeFactory = new NodeFactory();
  /**
   * @property {Array} _tocTypes all Node classes which have `Node.static.tocType = true`
   * @private
   */
  this.tocTypes = [];

  // add built-in node classes
  this.addNodes(this.getBuiltIns());
}

Schema.Prototype = function() {

  /**
   * Add nodes to the schema.
   *
   * @method addNodes
   * @param {Array} nodes Array of Node classes
   */
  this.addNodes = function(nodes) {
    if (!nodes) return;
    for (var i = 0; i < nodes.length; i++) {
      var NodeClass = nodes[i];
      this.nodeFactory.register(NodeClass);
      if (NodeClass.static.tocType) {
        this.tocTypes.push(NodeClass.static.name);
      }
    }
  };

  /**
   * Get the node class for a type name.
   *
   * @method getNodeClass
   * @param {String} name
   */
  this.getNodeClass = function(name) {
    return this.nodeFactory.get(name);
  };

  /**
   * Provide the node factory.
   *
   * @method getNodeFactory
   * @return A NodeFactory instance.
   * @deprecated Use `this.createNode(type, data)` instead.
   */
  this.getNodeFactory = function() {
    return this.nodeFactory;
  };

  function getJsonForNodeClass(nodeClass) {
    var nodeSchema = {};
    if (nodeClass.static.hasOwnProperty('schema')) {
      nodeSchema.properties = _.clone(nodeClass.static.schema);
    }
    // add 'parent' attribute if the nodeClass has a parent
    return nodeSchema;
  }

  /**
   * Serialize to JSON.
   *
   * @method toJSON
   * @return A plain object describing the schema.
   */
  // TODO: what is this used for? IMO this is not necessary anymore
  this.toJSON = function() {
    var data = {
      id: this.name,
      version: this.version,
      types: {}
    };
    this.nodeFactory.each(function(nodeClass, name) {
      data.types[name] = getJsonForNodeClass(nodeClass);
    });
    return data;
  };

  /**
   * Create a node instance.
   *
   * @method createNode
   * @param {String} type
   * @param {Object} properties
   * @return A new Node instance.
   */
  this.createNode = function(type, properties) {
    var node = this.nodeFactory.create(type, properties);
    return node;
  };

  /**
   * Provide all built-in node classes.
   *
   * Used internally.
   *
   * @method getBuiltIns
   * @protected
   * @return An array of Node classes.
   */
  this.getBuiltIns = function() {
    return [ Node ];
  };

  /**
   * Check if a given type is of given parent type.
   *
   * @method isInstanceOf
   * @param {String} type
   * @param {String} parentType
   * @return True if type instanceof parentType.
   */
  this.isInstanceOf = function(type, parentType) {
    var NodeClass = this.getNodeClass(type);
    if (NodeClass) {
      return Node.static.isInstanceOf(NodeClass, parentType);
    }
    return false;
  };

  /**
   * Iterate over all registered node classes.
   *
   * See {{#crossLink "Registry/each:method"}}Registry.each{{/crossLink}}
   *
   * @method each
   * @param {Function} callback
   * @param {Object} context
   */
  this.each = function() {
    this.nodeFactory.each.apply(this.nodeFactory, arguments);
  };

  /**
   * @method getTocTypes
   * @return list of types that should appear in a TOC
   */
  this.getTocTypes = function() {
    return this.tocTypes;
  };

  this.getDefaultTextType = function() {
    throw new Error('Schmema.prototype.getDefaultTextType() must be overridden.');
  };

};

OO.initClass(Schema);

module.exports = Schema;

},{"../basics/helpers":168,"../basics/oo":170,"./node":176,"./node_factory":177}],180:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var Substance = require('../basics');
var Data = require('../data');
var Selection = require('./selection');
var PropertySelection = require('./property_selection');
var ContainerSelection = require('./container_selection');
var TableSelection = require('./table_selection');

function AbstractDocument(schema) {
  Substance.EventEmitter.call(this);
  this.schema = schema;

  this.AUTO_ATTACH = true;
  this.FOR_CLIPBOARD = false;

  this.data = new Data.Incremental(schema, {
    didCreateNode: _.bind(this._didCreateNode, this),
    didDeleteNode: _.bind(this._didDeleteNode, this),
  });
}

AbstractDocument.Prototype = function() {

  this.isTransaction = function() {
    return false;
  };

  this.isClipboard = function() {
    return this.FOR_CLIPBOARD;
  };

  this.newInstance = function() {
    throw new Error('Must be implemented in subclass.');
  };

  this.initialize = function() {
    // add things to the document, such as containers etc.
  };

  this.addIndex = function(name, index) {
    return this.data.addIndex(name, index);
  };

  this.getIndex = function(name) {
    return this.data.getIndex(name);
  };

  /**
   * Enable or disable auto-attaching of nodes.
   * When this is enabled (default), a created node
   * gets attached to the document instantly.
   * Otherwise you need to take care of that yourself.
   *
   * Used internally e.g., by AbstractDocument.prototype.loadSeed()
   */
  this._setAutoAttach = function(val) {
    this.AUTO_ATTACH = val;
  };

  this._setForClipboard = function(val) {
    this.FOR_CLIPBOARD = val;
  };

  this._resetContainers = function() {
    var containers = this.getIndex('type').get('container');
    // reset containers initially
    Substance.each(containers, function(container) {
      container.reset();
    });
  };

  this._create = function(nodeData) {
    var op = this.data.create(nodeData);
    this._updateContainers(op);
    return op;
  };

  this._delete = function(nodeId) {
    var op = this.data.delete(nodeId);
    this._updateContainers(op);
    return op;
  };

  this._update = function(path, diff) {
    var op = this.data.update(path, diff);
    this._updateContainers(op);
    return op;
  };

  this._set = function(path, value) {
    var op = this.data.set(path, value);
    this._updateContainers(op);
    return op;
  };

  this.documentDidLoad = function() {};

  this.getSchema = function() {
    return this.schema;
  };

  this.get = function(path) {
    return this.data.get(path);
  };

  this.getNodes = function() {
    return this.data.getNodes();
  };

  this.addIndex = function(name, index) {
    return this.data.addIndex(name, index);
  };

  this.getIndex = function(name) {
    return this.data.getIndex(name);
  };

  this.loadSeed = function(seed) {
    // Attention: order of nodes may be 'invalid'
    // so that we should not attach the doc a created note
    // until all its dependencies are created
    //
    // Thus we disable AUTO_ATTACH when creating nodes

    // 1. clear all existing nodes (as they should be there in the seed)
    _.each(this.data.nodes, function(node) {
      this.delete(node.id);
    }, this);
    // 2. create nodes with AUTO_ATTACH disabled
    this._setAutoAttach(false);
    _.each(seed.nodes, function(nodeData) {
      this.create(nodeData);
    }, this);
    this._setAutoAttach(true);
    // 3. attach all nodes
    _.each(this.data.nodes, function(node) {
      node.attach(this);
    }, this);

    this.documentDidLoad();
  };

  this.getTextForSelection = function(sel) {
    var result = [];
    var text;
    if (!sel || sel.isNull()) {
      return "";
    } else if (sel.isPropertySelection()) {
      text = this.get(sel.start.path);
      result.push(text.substring(sel.start.offset, sel.end.offset));
    } else if (sel.isContainerSelection()) {
      var container = this.get(sel.containerId);
      var components = container.getComponentsForRange(sel.range);
      for (var i = 0; i < components.length; i++) {
        var comp = components[i];
        text = this.get(comp.path);
        if (components.length === 1) {
          result.push(text.substring(sel.start.offset, sel.end.offset));
        } else if (i===0) {
          result.push(text.substring(sel.start.offset));
        } else if (i===components.length-1) {
          result.push(text.substring(0, sel.end.offset));
        } else {
          result.push(text);
        }
      }
    }
    return result.join('');
  };

  this.toJSON = function() {
    var nodes = {};
    _.each(this.getNodes(), function(node) {
      nodes[node.id] = node.toJSON();
    });
    return {
      schema: [this.schema.name, this.schema.version],
      nodes: nodes
    };
  };

  this.create = function(nodeData) {
    /* jshint unused:false */
    throw new Error('Method is abstract.');
  };

  this.delete = function(nodeId) {
    /* jshint unused:false */
    throw new Error('Method is abstract.');
  };

  this.set = function(path, value) {
    /* jshint unused:false */
    throw new Error('Method is abstract.');
  };

  this.update = function(path, diff) {
    /* jshint unused:false */
    throw new Error('Method is abstract.');
  };

  this.setText = function(path, text, annotations) {
    var idx;
    var oldAnnos = this.getIndex('annotations').get(path);
    // TODO: what to do with container annotations
    for (idx = 0; idx < oldAnnos.length; idx++) {
      this.delete(oldAnnos[idx].id);
    }
    this.set(path, text);
    for (idx = 0; idx < annotations.length; idx++) {
      this.create(annotations[idx]);
    }
  };

  /**
   * Creates a selection which is attached to this document.
   * Every selection implementation provides its own
   * parameter format which is basically a JSON representation.
   *
   * @param an object describing the selection.
   * @example
   *   doc.createSelection({
   *     type: 'property',
   *     path: [ 'text1', 'content'],
   *     startOffset: 10,
   *     endOffset: 20
   *   })
   */
  this.createSelection = function(sel) {
    if (!sel) {
      return Selection.nullSelection;
    }
    switch(sel.type) {
      case 'property':
        return new PropertySelection(sel).attach(this);
      case 'container':
        return new ContainerSelection(sel).attach(this);
      case 'table':
        return new TableSelection(sel).attach(this);
      default:
        throw new Error('Unsupported selection type', sel.type);
    }
  };

  // Called back by Substance.Data after a node instance has been created
  this._didCreateNode = function(node) {
    if (this.AUTO_ATTACH) {
      // create the node from schema
      node.attach(this);
    } 
  };

  this._didDeleteNode = function(node) {
    // create the node from schema
    node.detach(this);
  };

  this._updateContainers = function(op) {
    var containers = this.getIndex('type').get('container');
    _.each(containers, function(container) {
      container.update(op);
    });
  };
};

Substance.inherit(AbstractDocument, Substance.EventEmitter);

module.exports = AbstractDocument;

},{"../basics":169,"../basics/helpers":168,"../data":175,"./container_selection":191,"./property_selection":214,"./selection":216,"./table_selection":217}],181:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;
var Data = require('../data');
var ContainerAnnotation = require('./container_annotation');

var ContainerAnnotationAnchorIndex = function(doc) {
  this.doc = doc;
  this.byPath = new PathAdapter.Arrays();
  this.byId = {};
};

ContainerAnnotationAnchorIndex.Prototype = function() {

  this.select = function(node) {
    return (node instanceof ContainerAnnotation);
  };

  this.reset = function(data) {
    this.byPath.clear();
    this.byId = {};
    this._initialize(data);
  };

  this.get = function(path, containerName) {
    var anchors = this.byPath.get(path) || [];
    if (!Substance.isArray(anchors)) {
      var _anchors = [];
      this.byPath._traverse(anchors, [], function(path, anchors) {
        _anchors = _anchors.concat(anchors);
      });
      anchors = _anchors;
    }
    if (containerName) {
      return Substance.filter(anchors, function(anchor) {
        return (anchor.container === containerName);
      });
    } else {
      // return a copy of the array
      return anchors.slice(0);
    }
    return anchors;
  };

  this.create = function(containerAnno) {
    var startAnchor = containerAnno.getStartAnchor();
    var endAnchor = containerAnno.getEndAnchor();
    this.byPath.add(startAnchor.path, startAnchor);
    this.byPath.add(endAnchor.path, endAnchor);
    this.byId[containerAnno.id] = containerAnno;
  };

  this.delete = function(containerAnno) {
    var startAnchor = containerAnno.getStartAnchor();
    var endAnchor = containerAnno.getEndAnchor();
    this.byPath.remove(startAnchor.path, startAnchor);
    this.byPath.remove(endAnchor.path, endAnchor);
    delete this.byId[containerAnno.id];
  };

  this.update = function(node, path, newValue, oldValue) {
    if (this.select(node)) {
      var anchor = null;
      if (path[1] === 'startPath') {
        anchor = node.getStartAnchor();
      } else if (path[1] === 'endPath') {
        anchor = node.getEndAnchor();
      } else {
        return;
      }
      this.byPath.remove(oldValue, anchor);
      this.byPath.add(anchor.path, anchor);
    }
  };

};

Substance.inherit(ContainerAnnotationAnchorIndex, Data.Index);

module.exports = ContainerAnnotationAnchorIndex;

},{"../basics":169,"../data":175,"./container_annotation":189}],182:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Node = require('./node');
var Selection = require('./selection');

// Annotation
// --------
//
// An annotation can be used to overlay text and give it a special meaning.
// Annotations only work on text properties. If you want to annotate multiple
// nodes you have to use a ContainerAnnotation.
//
// Properties:
//   - path: Identifies a text property in the document (e.g. ["text_1", "content"])
//   - startOffset: the character where the annoation starts
//   - endOffset: the character where the annoation starts

// TODO: in current terminology this is a PropertyAnnotation
var Annotation = Node.extend({
  name: "annotation",

  properties: {
    path: ['array', 'string'],
    startOffset: 'number',
    endOffset: 'number'
  },

  canSplit: function() {
    return true;
  },

  getSelection: function() {
    return this.getDocument().createSelection({
      type: 'property',
      path: this.path,
      startOffset: this.startOffset,
      endOffset: this.endOffset
    });
  },

  updateRange: function(tx, sel) {
    if (!sel.isPropertySelection()) {
      throw new Error('Cannot change to ContainerAnnotation.');
    }
    if (!Substance.isEqual(this.startPath, sel.start.path)) {
      tx.set([this.id, 'path'], sel.start.path);
    }
    if (this.startOffset !== sel.start.offset) {
      tx.set([this.id, 'startOffset'], sel.start.offset);
    }
    if (this.endOffset !== sel.end.offset) {
      tx.set([this.id, 'endOffset'], sel.end.offset);
    }
  },

  getText: function() {
    var doc = this.getDocument();
    if (!doc) {
      console.warn('Trying to use an Annotation which is not attached to the document.');
      return "";
    }
    var text = doc.get(this.path);
    return text.substring(this.startOffset, this.endOffset);
  }

});

Annotation.static.isInline = true;

// default implementation for inline elements
// Attention: there is a difference between the implementation
// of toHtml for annotations and general nodes.
// Annotations are modeled as overlays, so they do not 'own' their content.
// Thus, during conversion HtmlExporter serves the content as a prepared
// array of children element which just need to be wrapped (or can be manipulated).
Annotation.static.toHtml = function(anno, converter, children) {
  var id = anno.id;
  var tagName = anno.constructor.static.tagName || 'span';
  var $el = $('<' + tagName + '>')
    .attr('id', id)
    .append(children);
  return $el;
};

Object.defineProperties(Annotation.prototype, {
  startPath: {
    get: function() {
      return this.path;
    }
  },
  endPath: {
    get: function() {
      return this.path;
    }
  }
});

module.exports = Annotation;

},{"../basics":169,"./node":199,"./selection":216}],183:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;
var Data = require('../data');
var Annotation = require('./annotation');

// Annotation Index
// ----------------
//
// Lets us look up existing annotations by path and type
//
// To get all annotations for the content of a text node
//
//    var aIndex = doc.annotationIndex;
//    aIndex.get(["text_1", "content"]);
//
// You can also scope for a specific range
//
//    aIndex.get(["text_1", "content"], 23, 45);

var AnnotationIndex = function() {
  this.byPath = new PathAdapter();
  this.byType = new PathAdapter();
};

AnnotationIndex.Prototype = function() {

  this.property = "path";

  this.select = function(node) {
    return (node instanceof Annotation);
  };

  this.reset = function(data) {
    this.byPath.clear();
    this.byType.clear();
    this._initialize(data);
  };

  // TODO: use object interface? so we can combine filters (path and type)
  this.get = function(path, start, end, type) {
    var annotations = this.byPath.get(path) || {};
    if (Substance.isString(path) || path.length === 1) {
      // flatten annotations if this is called via node id
      var _annos = annotations;
      annotations = [];
      Substance.each(_annos, function(level) {
        annotations = annotations.concat(Substance.map(level, function(anno) {
          return anno;
        }));
      });
    } else {
      annotations = Substance.map(annotations, function(anno) {
        return anno;
      });
    }
    /* jshint eqnull:true */
    // null check for null or undefined
    if (start != null) {
      annotations = Substance.filter(annotations, AnnotationIndex.filterByRange(start, end));
    }
    if (type) {
      annotations = Substance.filter(annotations, AnnotationIndex.filterByType(type));
    }
    return annotations;
  };

  this.create = function(anno) {
    this.byType.set([anno.type, anno.id], anno);
    this.byPath.set(anno.path.concat([anno.id]), anno);
  };

  this.delete = function(anno) {
    this.byType.delete([anno.type, anno.id]);
    this.byPath.delete(anno.path.concat([anno.id]));
  };

  this.update = function(node, path, newValue, oldValue) {
    if (this.select(node) && path[1] === this.property) {
      this.delete({ id: node.id, type: node.type, path: oldValue });
      this.create(node);
    }
  };

};

Substance.inherit(AnnotationIndex, Data.Index);

AnnotationIndex.filterByRange = function(start, end) {
  return function(anno) {
    var aStart = anno.startOffset;
    var aEnd = anno.endOffset;
    var overlap = (aEnd >= start);
    // Note: it is allowed to omit the end part
    /* jshint eqnull: true */
    if (end != null) {
      overlap = overlap && (aStart <= end);
    }
    /* jshint eqnull: false */
    return overlap;
  };
};

AnnotationIndex.filterByType = function(type) {
  return function(anno) {
    return anno.isInstanceOf(type);
  };
};

module.exports = AnnotationIndex;
},{"../basics":169,"../data":175,"./annotation":182}],184:[function(require,module,exports){
"use strict";

var _ = require('../basics/helpers');

// A collection of methods to update annotations
// --------
//
// As we treat annotations as overlay of plain text we need to keep them up-to-date during editing.

var insertedText = function(doc, coordinate, length) {
  if (!length) return;
  var index = doc.getIndex('annotations');
  var annotations = index.get(coordinate.path);
  _.each(annotations, function(anno) {
    var pos = coordinate.offset;
    var start = anno.startOffset;
    var end = anno.endOffset;
    var newStart = start;
    var newEnd = end;
    if ( (pos < start) ||
         (pos === start) ) {
      newStart += length;
    }
    // Node: external nodes do not expand automatically
    if ( (pos < end) ||
         (pos === end && !anno.isExternal()) ) {
      newEnd += length;
    }
    if (newStart !== start) {
      doc.set([anno.id, 'startOffset'], newStart);
    }
    if (newEnd !== end) {
      doc.set([anno.id, 'endOffset'], newEnd);
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotation-anchors');
  var anchors = index.get(coordinate.path);
  _.each(anchors, function(anchor) {
    var pos = coordinate.offset;
    var start = anchor.offset;
    var changed = false;
    if ( (pos < start) ||
         (pos === start && !coordinate.after) ) {
      start += length;
      changed = true;
    }
    if (changed) {
      var property = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, property], start);
    }
  });
};

var deletedText = function(doc, path, startOffset, endOffset) {
  if (startOffset === endOffset) return;
  var index = doc.getIndex('annotations');
  var annotations = index.get(path);
  var length = endOffset - startOffset;
  _.each(annotations, function(anno) {
    var pos1 = startOffset;
    var pos2 = endOffset;
    var start = anno.startOffset;
    var end = anno.endOffset;
    var newStart = start;
    var newEnd = end;
    if (pos2 <= start) {
      newStart -= length;
      newEnd -= length;
      doc.set([anno.id, 'startOffset'], newStart);
      doc.set([anno.id, 'endOffset'], newEnd);
    } else {
      if (pos1 <= start) {
        newStart = start - Math.min(pos2-pos1, start-pos1);
      }
      if (pos1 <= end) {
        newEnd = end - Math.min(pos2-pos1, end-pos1);
      }
      // delete the annotation if it has collapsed by this delete
      if (start !== end && newStart === newEnd) {
        doc.delete(anno.id);
      } else {
        if (start !== newStart) {
          doc.set([anno.id, 'startOffset'], newStart);
        }
        if (end !== newEnd) {
          doc.set([anno.id, 'endOffset'], newEnd);
        }
      }
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotation-anchors');
  var anchors = index.get(path);
  var containerAnnoIds = [];
  _.each(anchors, function(anchor) {
    containerAnnoIds.push(anchor.id);
    var pos1 = startOffset;
    var pos2 = endOffset;
    var start = anchor.offset;
    var changed = false;
    if (pos2 <= start) {
      start -= length;
      changed = true;
    } else {
      if (pos1 <= start) {
        var newStart = start - Math.min(pos2-pos1, start-pos1);
        if (start !== newStart) {
          start = newStart;
          changed = true;
        }
      }
    }
    if (changed) {
      var property = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, property], start);
    }
  });
  // check all anchors after that if they have collapsed and remove the annotation in that case
  _.each(_.uniq(containerAnnoIds), function(id) {
    var anno = doc.get(id);
    var annoSel = anno.getSelection();
    if(annoSel.isCollapsed()) {
      console.log("...deleting container annotation because it has collapsed" + id);
      doc.delete(id);
    }
  });
};

// used when breaking a node to transfer annotations to the new property
var transferAnnotations = function(doc, path, offset, newPath, newOffset) {
  var index = doc.getIndex('annotations');
  var annotations = index.get(path, offset);
  _.each(annotations, function(a) {
    var isInside = (offset > a.startOffset && offset < a.endOffset);
    var start = a.startOffset;
    var end = a.endOffset;
    var newStart, newEnd;
    // 1. if the cursor is inside an annotation it gets either split or truncated
    if (isInside) {
      // create a new annotation if the annotation is splittable
      if (a.canSplit()) {
        var newAnno = _.clone(a.properties);
        newAnno.id = _.uuid(a.type + "_");
        newAnno.startOffset = newOffset;
        newAnno.endOffset = newOffset + a.endOffset - offset;
        newAnno.path = newPath;
        doc.create(newAnno);
      }
      // in either cases truncate the first part
      newStart = a.startOffset;
      newEnd = offset;
      // if after truncate the anno is empty, delete it
      if (newEnd === newStart) {
        doc.delete(a.id);
      }
      // ... otherwise update the range
      else {
        if (newStart !== start) {
          doc.set([a.id, "startOffset"], newStart);
        }
        if (newEnd !== end) {
          doc.set([a.id, "endOffset"], newEnd);
        }
      }
    }
    // 2. if the cursor is before an annotation then simply transfer the annotation to the new node
    else if (a.startOffset >= offset) {
      // Note: we are preserving the annotation so that anything which is connected to the annotation
      // remains valid.
      newStart = newOffset + a.startOffset - offset;
      newEnd = newOffset + a.endOffset - offset;
      doc.set([a.id, "path"], newPath);
      doc.set([a.id, "startOffset"], newStart);
      doc.set([a.id, "endOffset"], newEnd);
    }
  });
  // same for container annotation anchors
  index = doc.getIndex('container-annotation-anchors');
  var anchors = index.get(path);
  var containerAnnoIds = [];
  _.each(anchors, function(anchor) {
    containerAnnoIds.push(anchor.id);
    var start = anchor.offset;
    if (offset <= start) {
      var pathProperty = (anchor.isStart?'startPath':'endPath');
      var offsetProperty = (anchor.isStart?'startOffset':'endOffset');
      doc.set([anchor.id, pathProperty], newPath);
      doc.set([anchor.id, offsetProperty], newOffset + anchor.offset - offset);
    }
  });
  // check all anchors after that if they have collapsed and remove the annotation in that case
  _.each(_.uniq(containerAnnoIds), function(id) {
    var anno = doc.get(id);
    var annoSel = anno.getSelection();
    if(annoSel.isCollapsed()) {
      console.log("...deleting container annotation because it has collapsed" + id);
      doc.delete(id);
    }
  });
};

module.exports = {
  insertedText: insertedText,
  deletedText: deletedText,
  transferAnnotations: transferAnnotations
};

},{"../basics/helpers":168}],185:[function(require,module,exports){
"use strict";

var Substance = require('../basics');

var ENTER = 1;
var EXIT = -1;
// Markers are put before other opening tags
var ENTER_EXIT = -2;

// Annotator
// --------
//
// An algorithm that is used to fragment overlapping structure elements
// following a priority rule set.
// E.g., we use this for creating DOM elements for annotations. The annotations
// can partially be overlapping. However this is not allowed in general for DOM elements
// or other hierarchical structures.
//
// Example: For the Annotation use casec consider a 'comment' spanning partially
// over an 'emphasis' annotation.
// 'The <comment>quick brown <bold>fox</comment> jumps over</bold> the lazy dog.'
// We want to be able to create a valid XML structure:
// 'The <comment>quick brown <bold>fox</bold></comment><bold> jumps over</bold> the lazy dog.'
//
// For that one would choose
//
//     {
//        'comment': 0,
//        'bold': 1
//     }
//
// as priority levels.
// In case of structural violations as in the example, elements with a higher level
// would be fragmented and those with lower levels would be preserved as one piece.
//
// TODO: If a violation for nodes of the same level occurs an Error should be thrown.
// Currently, in such cases the first element that is opened earlier is preserved.

var Annotator = function(options) {
  Substance.extend(this, options);
};

Annotator.Prototype = function() {

  // This is a sweep algorithm wich uses a set of ENTER/EXIT entries
  // to manage a stack of active elements.
  // Whenever a new element is entered it will be appended to its parent element.
  // The stack is ordered by the annotation types.
  //
  // Examples:
  //
  // - simple case:
  //
  //       [top] -> ENTER(idea1) -> [top, idea1]
  //
  //   Creates a new 'idea' element and appends it to 'top'
  //
  // - stacked ENTER:
  //
  //       [top, idea1] -> ENTER(bold1) -> [top, idea1, bold1]
  //
  //   Creates a new 'bold' element and appends it to 'idea1'
  //
  // - simple EXIT:
  //
  //       [top, idea1] -> EXIT(idea1) -> [top]
  //
  //   Removes 'idea1' from stack.
  //
  // - reordering ENTER:
  //
  //       [top, bold1] -> ENTER(idea1) -> [top, idea1, bold1]
  //
  //   Inserts 'idea1' at 2nd position, creates a new 'bold1', and appends itself to 'top'
  //
  // - reordering EXIT
  //
  //       [top, idea1, bold1] -> EXIT(idea1)) -> [top, bold1]
  //
  //   Removes 'idea1' from stack and creates a new 'bold1'
  //

  // Orders sweep events according to following precedences:
  //
  // 1. pos
  // 2. EXIT < ENTER
  // 3. if both ENTER: ascending level
  // 4. if both EXIT: descending level

  var _compare = function(a, b) {
    if (a.pos < b.pos) return -1;
    if (a.pos > b.pos) return 1;

    if (a.id === b.id) {
      return b.mode - a.mode;
    }

    if (a.mode < b.mode) return -1;
    if (a.mode > b.mode) return 1;

    if (a.mode === ENTER) {
      if (a.level < b.level) return -1;
      if (a.level > b.level) return 1;
    }

    if (a.mode === EXIT) {
      if (a.level > b.level) return -1;
      if (a.level < b.level) return 1;
    }

    return 0;
  };

  var extractEntries = function(annotations) {
    var entries = [];
    Substance.each(annotations, function(a) {
      // special treatment for zero-width annos such as ContainerAnnotation.Anchors
      if (a.zeroWidth) {
        entries.push({ pos: a.offset, mode: ENTER_EXIT, id: a.id, level: Number.MAX_VALUE, type: 'anchor', node: a });
      } else {
        // use a weak default level when not given
        var l = a.constructor.static.level || 1000;
        entries.push({ pos : a.startOffset, mode: ENTER, level: l, id: a.id, type: a.type, node: a });
        entries.push({ pos : a.endOffset, mode: EXIT, level: l, id: a.id, type: a.type, node: a });
      }
    });
    return entries;
  };

  this.onText = function(/*context, text*/) {};

  // should return the created user context
  this.onEnter = function(/*entry, parentContext*/) {
    return null;
  };

  this.onExit = function(/*entry, context, parentContext*/) {};

  this.enter = function(entry, parentContext) {
    return this.onEnter(entry, parentContext);
  };

  this.exit = function(entry, context, parentContext) {
    this.onExit(entry, context, parentContext);
  };

  this.createText = function(context, text) {
    if (text.length > 0) {
      this.onText(context, text);
    }
  };

  this.start = function(rootContext, text, annotations) {
    var self = this;

    var entries = extractEntries.call(this, annotations);
    entries.sort(_compare.bind(this));
    var stack = [{context: rootContext, entry: null}];
    var pos = 0;

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      // in any case we add the last text to the current element
      this.createText(stack[stack.length-1].context, text.substring(pos, entry.pos));

      pos = entry.pos;
      var stackLevel, idx;
      if (entry.mode === ENTER || entry.mode === ENTER_EXIT) {
        // find the correct position and insert an entry
        for (stackLevel = 1; stackLevel < stack.length; stackLevel++) {
          if (entry.level < stack[stackLevel].entry.level) {
            break;
          }
        }
        // create elements which are open, and are now stacked ontop of the
        // entered entry
        for (idx = stack.length-1; idx >= stackLevel; idx--) {
          this.exit(stack[idx].entry, stack[idx].context, stack[idx-1].context);
        }
        stack.splice(stackLevel, 0, {entry: entry});
        // create new elements for all lower entries
        for (idx = stackLevel; idx < stack.length; idx++) {
          stack[idx].context = self.enter(stack[idx].entry, stack[idx-1].context);
        }
      }
      if (entry.mode === EXIT || entry.mode === ENTER_EXIT) {
        // find the according entry and remove it from the stack
        for (stackLevel = 1; stackLevel < stack.length; stackLevel++) {
          if (stack[stackLevel].entry.node === entry.node) {
            break;
          }
        }
        for (idx = stack.length-1; idx >= stackLevel; idx--) {
          this.exit(stack[idx].entry, stack[idx].context, stack[idx-1].context);
        }
        stack.splice(stackLevel, 1);
        // create new elements for all lower entries
        for (idx = stackLevel; idx < stack.length; idx++) {
          stack[idx].context = self.enter(stack[idx].entry, stack[idx-1].context);
        }
      }
    }

    // Finally append a trailing text node
    this.createText(rootContext, text.substring(pos));
  };

};

Substance.initClass( Annotator );

module.exports = Annotator;

},{"../basics":169}],186:[function(require,module,exports){
var OO = require('../basics/oo');
var ClipboardImporter = require('./clipboard_importer');
var HtmlExporter = require('./html_exporter');

function ClipboardExporter() {
  ClipboardExporter.super.call(this);
}

ClipboardExporter.Prototype = function() {


  this.convert = function(doc, options) {
    this.initialize(doc, options);
    var $doc = this.createHtmlDocument();
    // Note: the content of a clipboard document
    // is coming as container with id 'clipboard'
    var content = doc.get('clipboard_content');
    $doc.find('body').append(this.convertContainer(content));

    // This is not working with jquery
    //return $doc.html();

    return $doc.find('html').html();
  };

};

OO.inherit(ClipboardExporter, HtmlExporter);

module.exports = ClipboardExporter;

},{"../basics/oo":170,"./clipboard_importer":187,"./html_exporter":196}],187:[function(require,module,exports){
var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var HtmlImporter = require('./html_importer');
var CLIPBOARD_CONTAINER_ID = require('./transformations/copy_selection').CLIPBOARD_CONTAINER_ID;

function ClipboardImporter(config) {
  if (!config.schema) {
    throw new Error('Missing argument: config.schema is required.');
  }
  _.extend(config, {
    trimWhitespaces: true,
    REMOVE_INNER_WS: true,
  });
  ClipboardImporter.super.call(this, config);
}

ClipboardImporter.Prototype = function() {

  this.convert = function($rootEl, doc) {
    this.initialize(doc, $rootEl);

    var $body = $rootEl.find('body');
    $body = this.sanitizeBody($body);
    // TODO: the containerId for the clipboard content should be
    // shared via a constant (see)
    this.convertContainer($body, CLIPBOARD_CONTAINER_ID);
    this.finish();
  };

  this.sanitizeBody = function($body) {
    // Look for paragraphs in <b> which is served by GDocs.
    var $gdocs = $body.find('b > p');
    if ($gdocs.length) {
      $body = $($gdocs[0].parentNode);
    }
    return $body;
  };

  this.checkQuality = function($rootEl) {
    var $body = $rootEl.find('body');
    // TODO: proper GDocs detection
    if ($body.children('b').children('p').length) {
      return true;
    }
    // Are there any useful block-level elements?
    // For example this works if you copy'n'paste a set of paragraphs from a wikipedia page
    if ($body.children('p').length) {
      return true;
    }
    // if we have paragraphs on a deeper level, it is fishy
    if ($body.find('* p').length) {
      return false;
    }
    if ($body.children('a,b,i,strong,italic').length) {
      return true;
    }
    // TODO: how does the content for inline data look like?
    return false;
  };

};

OO.inherit(ClipboardImporter, HtmlImporter);

module.exports = ClipboardImporter;

},{"../basics/helpers":168,"../basics/oo":170,"./html_importer":197,"./transformations/copy_selection":221}],188:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var PathAdapter = require('../basics/path_adapter');
var Node = require('./node');
var ContainerAnnotation = require('./container_annotation');

// Container
// --------
//
// A Container in first place represents a list of node ids.
// At the same time it bookkeeps a sequence of components which are the editable properties of
// the nodes within this container.
// While most editing occurs on a property level (such as editing text), other things
// happen on a node level, e.g., breaking or mergin nodes, or spanning annotations or so called
// ContainerAnnotations. A Container provides a bridge between those two worlds: nodes and properties.
//
// Example:
// A figure node might consist of a title, an image, and a caption.
// As the image is not editable via conventional editing, we can say, the figure consists of
// two editable properties 'title' and 'caption'.
//
// In our data model we can describe selections by a start coordinate and an end
// coordinate, such as
//      start: { path: ['paragraph_1', 'content'],   offset: 10 } },
//      end:   { path: ['figure_10',   'caption'],   offset: 5  } }
// I.e. such a selection starts in a component of a paragraph, and ends in the caption of a figure.
// If you want to use that selection for deleting, you need to derive somehow what exactly
// lies between those coordinates. For example, there could be some paragraphs, which would
// get deleted completely and the paragraph and the figure where the selection started and ended
// would only be updated.
//
function Container() {
  Node.apply(this, arguments);
  this.components = [];
  this.nodeComponents = {};
  this.byPath = new PathAdapter({});
}

Container.Prototype = function() {

  this.didAttach = function() {
    this.reset();
  };

  this.getPosition = function(nodeId) {
    var pos = this.nodes.indexOf(nodeId);
    return pos;
  };

  this.show = function(nodeId, pos) {
    var doc = this.getDocument();
    // Note: checking with ==  is what we want here
    /* jshint eqnull: true */
    if (pos == null) {
      pos = this.nodes.length;
    }
    /* jshint eqnull: false */
    doc.update([this.id, 'nodes'], { insert: { offset: pos, value: nodeId } });
  };

  this.hide = function(nodeId) {
    var doc = this.getDocument();
    var pos = this.nodes.indexOf(nodeId);
    if (pos >= 0) {
      doc.update([this.id, 'nodes'], { delete: { offset: pos } });
    }
  };

  this.getComponents = function() {
    return this.components;
  };

  this.getComponent = function(path) {
    var comp = this.byPath.get(path);
    return comp;
  };

  this.getComponentsForRange = function(range) {
    var comps = [];
    var startComp = this.byPath.get(range.start.path);
    var endComp = this.byPath.get(range.end.path);
    var startIdx = startComp.getIndex();
    var endIdx = endComp.getIndex();
    comps.push(startComp);
    for (var idx = startIdx+1; idx <= endIdx; idx++) {
      comps.push(this.getComponentAt(idx));
    }
    return comps;
  };

  this.getComponentAt = function(idx) {
    return this.components[idx];
  };

  this.getFirstComponent = function() {
    return this.components[0];
  };

  this.getLastComponent = function() {
    return _.last(this.components);
  };

  this.getComponentsForNode = function(nodeId) {
    var nodeComponent = this.nodeComponents[nodeId];
    if (nodeComponent) {
      return nodeComponent.components.slice(0);
    }
  };

  this.getNodeForComponentPath = function(path) {
    var comp = this.getComponent(path);
    if (!comp) return null;
    var nodeId = comp.rootId;
    return this.getDocument().get(nodeId);
  };

  this.getAnnotationFragments = function(containerAnnotation) {
    var fragments = [];
    var doc = containerAnnotation.getDocument();
    var anno = containerAnnotation;
    var startAnchor = anno.getStartAnchor();
    var endAnchor = anno.getEndAnchor();
    // if start and end anchors are on the same property, then there is only one fragment
    if (_.isEqual(startAnchor.path, endAnchor.path)) {
      fragments.push(new ContainerAnnotation.Fragment(anno, startAnchor.path, "property"));
    }
    // otherwise create a trailing fragment for the property of the start anchor,
    // full-spanning fragments for inner properties,
    // and one for the property containing the end anchor.
    else {
      var text = doc.get(startAnchor.path);
      var startComp = this.getComponent(startAnchor.path);
      var endComp = this.getComponent(endAnchor.path);
      if (!startComp || !endComp) {
        throw new Error('Could not find components of AbstractContainerAnnotation');
      }
      fragments.push(new ContainerAnnotation.Fragment(anno, startAnchor.path, "start"));
      for (var idx = startComp.idx + 1; idx < endComp.idx; idx++) {
        var comp = this.getComponentAt(idx);
        text = doc.get(comp.path);
        fragments.push(new ContainerAnnotation.Fragment(anno, comp.path, "inner"));
      }
      fragments.push(new ContainerAnnotation.Fragment(anno, endAnchor.path, "end"));
    }
    return fragments;
  };

  this.reset = function() {
    this.byPath = new PathAdapter();
    var doc = this.getDocument();
    var components = [];
    _.each(this.nodes, function(id) {
      var node = doc.get(id);
      components = components.concat(_getNodeComponents(node));
    }, this);
    this.components = [];
    this.nodeComponents = {};
    this._insertComponentsAt(0, components);
    this._updateComponentPositions(0);
  };

  // Incrementally updates the container based on a given operation.
  // Gets called by Substance.Document for every applied operation.
  this.update = function(op) {
    if (op.type === "create" || op.type === "delete") {
      return;
    }
    if (op.path[0] === this.id && op.path[1] === 'nodes') {
      if (op.type === 'set') {
        this.reset();
      } else {
        var diff = op.diff;
        if (diff.isInsert()) {
          var insertPos = this._handleInsert(diff.getValue(), diff.getOffset());
          this._updateComponentPositions(insertPos);
        } else if (diff.isDelete()) {
          var deletePos = this._handleDelete(diff.getValue());
          this._updateComponentPositions(deletePos);
        } else {
          throw new Error('Illegal state');
        }
      }
    }
  };

  // TODO: nested structures such as tables and lists should
  // call this whenever they change
  this.updateNode = function(nodeId) {
    var node = this.getDocument().get(nodeId);
    var deletePos = this._handleDelete(nodeId);
    var components = _getNodeComponents(node);
    this._insertComponentsAt(deletePos, components);
    this._updateComponentPositions(deletePos);
  };

  this._insertComponentsAt = function(pos, components) {
    var before = this.components[pos-1];
    var after = this.components[pos];
    var nodeComponents = this.nodeComponents;
    var byPath = this.byPath;
    for (var i = 0; i < components.length; i++) {
      var comp = components[i];
      var nodeId = comp.rootId;
      var nodeComponent = nodeComponents[nodeId];
      if (!nodeComponent) {
        nodeComponent = new Container.NodeComponent(nodeId);
        nodeComponents[nodeId] = nodeComponent;
      }
      comp.parentNode = nodeComponent;
      if (i === 0 && before) {
        before.next = comp;
        comp.previous = before;
      } else if (i > 0) {
        comp.previous = components[i-1];
        components[i-1].next = comp;
      }
      nodeComponent.components.push(comp);
      byPath.set(comp.path, comp);
    }
    if (after) {
      components[components.length-1].next = after;
      after.previous = components[components.length-1];
    }
    this.components.splice.apply(this.components, [pos, 0].concat(components));
  };

  this._updateComponentPositions = function(startPos) {
    for (var i = startPos; i < this.components.length; i++) {
      this.components[i].idx = i;
    }
  };

  // if something has been inserted, we need to get the next id
  // and insert before its first component.
  this._handleInsert = function(nodeId, nodePos) {
    var doc = this.getDocument();
    var node = doc.get(nodeId);
    var length = this.nodes.length;
    var componentPos;
    // NOTE: the original length of the nodes was one less
    // Thus, we detect an 'append' situation by comparing the insertPosition with
    // the previous length
    if (nodePos === length-1) {
      componentPos = this.components.length;
    } else {
      var afterId = this.nodes[nodePos+1];
      var after = this.nodeComponents[afterId].components[0];
      componentPos = after.getIndex();
    }
    var components = _getNodeComponents(node);
    this._insertComponentsAt(componentPos, components);
    return componentPos;
  };

  this._handleDelete = function(nodeId) {
    var nodeComponent = this.nodeComponents[nodeId];
    var components = nodeComponent.components;
    var start = nodeComponent.components[0].getIndex();
    var end = _.last(components).getIndex();

    // remove the components from the tree
    for (var i = 0; i < components.length; i++) {
      var comp = components[i];
      this.byPath.delete(comp.path);
    }
    // and delete the nodeComponent
    delete this.nodeComponents[nodeId];

    this.components.splice(start, end-start+1);
    if (this.components.length > start) {
      this.components[start].previous = this.components[start-1];
    }
    if (start>0) {
      this.components[start-1].next = this.components[start];
    }
    return start;
  };

  var _getNodeComponents = function(node, rootNode) {
    rootNode = rootNode || node;
    var components = [];
    var componentNames = node.getComponents();
    var childNode;
    for (var i = 0; i < componentNames.length; i++) {
      var name = componentNames[i];
      var propertyType = node.getPropertyType(name);
      // text property
      if ( propertyType === "string" ) {
        var path = [node.id, name];
        components.push(new Container.Component(path, rootNode.id));
      }
      // child node
      else if (propertyType === "id") {
        var childId = node[name];
        childNode = node.getDocument().get(childId);
        components = components.concat(_getNodeComponents(childNode, rootNode));
      }
      // array of children
      else if (_.isEqual(propertyType, ['array', 'id'])) {
        var ids = node[name];
        for (var j = 0; j < ids.length; j++) {
          childNode = node.getDocument().get(ids[j]);
          components = components.concat(_getNodeComponents(childNode, rootNode));
        }
      } else {
        throw new Error('Not yet implemented.');
      }
    }
    return components;
  };
};

OO.inherit(Container, Node);

Container.static.name = "container";

Container.static.schema = {
  nodes: ["array", "string"]
};

// HACK: ATM we do a lot of Node initialization, but we only do it using Node.extend(..)
Node.initNodeClass(Container);

Container.Component = function Component(path, rootId) {
  this.path = path;
  this.rootId = rootId;
  // computed dynamically
  this.idx = -1;
  this.parentNode = null;
  this.previous = null;
  this.next = null;
};

Container.Component.Prototype = function() {

  this.hasPrevious = function() {
    return !!this.previous;
  };

  this.getPrevious = function() {
    return this.previous;
  };

  this.hasNext = function() {
    return !!this.next;
  };

  this.getNext = function() {
    return this.next;
  };

  this.getIndex = function() {
    return this.idx;
  };

  this.getParentNode = function() {
    return this.parentNode;
  };
};

OO.initClass(Container.Component);

Container.NodeComponent = function NodeComponent(id) {
  this.id = id;
  this.components = [];
};

OO.initClass(Container.NodeComponent);

module.exports = Container;

},{"../basics/helpers":168,"../basics/oo":170,"../basics/path_adapter":171,"./container_annotation":189,"./node":199}],189:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Node = require('./node');
var Selection = require('./selection');


// Container Annotation
// ----------------
//
// Describes an annotation sticking on a container that can span over multiple
// nodes.
//
// Here's an example:
//
// {
//   "id": "subject_reference_1",
//   "type": "subject_reference",
//   "container": "content",
//   "startPath": ["text_2", "content"],
//   "startOffset": 100,
//   "endPath": ["text_4", "content"],
//   "endOffset": 40
// }


var ContainerAnnotation = Node.extend({
  name: "container_annotation",

  properties: {
    // id of container node
    container: 'string',
    startPath: ['array', 'string'],
    startOffset: 'number',
    endPath: ['array', 'string'],
    endOffset: 'number'
  },

  getStartAnchor: function() {
    if (!this._startAnchor) {
      this._startAnchor = new ContainerAnnotation.Anchor(this, 'isStart');
    }
    return this._startAnchor;
  },

  getEndAnchor: function() {
    if (!this._endAnchor) {
      this._endAnchor = new ContainerAnnotation.Anchor(this);
    }
    return this._endAnchor;
  },

  // Provide a selection which has the same range as this annotation.
  getSelection: function() {
    var doc = this.getDocument();
    // Guard: when this is called while this node has been detached already.
    if (!doc) {
      console.warn('Trying to use a ContainerAnnotation which is not attached to the document.');
      return Selection.nullSelection();
    }
    return doc.createSelection({
      type: "container",
      containerId: this.container,
      startPath: this.startPath,
      startOffset: this.startOffset,
      endPath: this.endPath,
      endOffset: this.endOffset
    });
  },

  getText: function() {
    var doc = this.getDocument();
    if (!doc) {
      console.warn('Trying to use a ContainerAnnotation which is not attached to the document.');
      return "";
    }
    return doc.getTextForSelection(this.getSelection());
  },

  updateRange: function(tx, sel) {
    if (!sel.isContainerSelection()) {
      throw new Error('Cannot change to ContainerAnnotation.');
    }
    if (!Substance.isEqual(this.startPath, sel.start.path)) {
      tx.set([this.id, 'startPath'], sel.start.path);
    }
    if (this.startOffset !== sel.start.offset) {
      tx.set([this.id, 'startOffset'], sel.start.offset);
    }
    if (!Substance.isEqual(this.endPath, sel.end.path)) {
      tx.set([this.id, 'endPath'], sel.end.path);
    }
    if (this.endOffset !== sel.end.offset) {
      tx.set([this.id, 'endOffset'], sel.end.offset);
    }
  },

});

ContainerAnnotation.Anchor = function(anno, isStart) {
  this.type = "container-annotation-anchor";
  this.anno = anno;
  // TODO: remove this.node in favor of this.anno
  this.node = anno;
  this.id = anno.id;
  this.container = anno.container;
  this.isStart = !!isStart;
  Object.freeze(this);
};

ContainerAnnotation.Anchor.Prototype = function() {
  this.zeroWidth = true;

  this.getTypeNames = function() {
    return [this.type];
  };
};

Substance.initClass(ContainerAnnotation.Anchor);

ContainerAnnotation.Fragment = function(anno, path, mode) {
  this.type = "container_annotation_fragment";
  this.anno = anno;
  // HACK: id is necessary for Annotator
  this.id = anno.id;
  this.path = path;
  this.mode = mode;
};

ContainerAnnotation.Fragment.Prototype = function() {
  this.getTypeNames = function() {
    return [this.type];
  };
};

Substance.initClass(ContainerAnnotation.Fragment);

Object.defineProperties(ContainerAnnotation.Fragment.prototype, {
  startOffset: {
    get: function() {
      return ( (this.mode === "start" || this.mode === "property") ? this.anno.startOffset : 0);
    },
    set: function() { throw new Error('Immutable!'); }
  },
  endOffset: {
    get: function() {
      return ( (this.mode === "end" || this.mode === "property") ? this.anno.endOffset : this.anno.getDocument().get(this.path).length);
    },
    set: function() { throw new Error('Immutable!'); }
  },
});


ContainerAnnotation.Fragment.static.level = Number.MAX_VALUE;

Object.defineProperties(ContainerAnnotation.Anchor.prototype, {
  path: {
    get: function() {
      return (this.isStart ? this.node.startPath : this.node.endPath);
    },
    set: function() { throw new Error('Immutable!'); }
  },
  offset: {
    get: function() {
      return (this.isStart ? this.node.startOffset : this.node.endOffset);
    },
    set: function() { throw new Error('Immutable!'); }
  },
});

module.exports = ContainerAnnotation;
},{"../basics":169,"./node":199,"./selection":216}],190:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var PathAdapter = require('../basics/path_adapter');
var Data = require('../data');
var ContainerAnnotation = require('./container_annotation');

// HACK: this is not the final version
var ContainerAnnotationIndex = function(doc) {
  this.doc = doc;
  this.indexes = {};
  this.containers = {};
  this.containerAnnotations = {};

  // connect with high-priority so that gets updated before any UI
  doc.connect(this, { "document:changed": this.onDocumentChange }, 1000);
};

ContainerAnnotationIndex.Prototype = function() {

  this.getFragments = function(path, containerName) {
    var index = this.indexes[containerName];
    if (index) {
      return index.get(path) || [];
    }
    return [];
  };

  this.getAllContainerAnnotations = function() {
    return this.containerAnnotations;
  };

  this.reset = function() {
    this.indexes = {};
    this._initialize(this.doc.data);
  };

  // this.reset = function(data) {
  //   this.indexes = {};
  //   this._initialize(data);
  // };

  this._initialize = function(data) {
    _.each(data.getNodes(), function(node) {
      if (this.select(node)) {
        this.create(node, "isInitializing");
      }
    }, this);
    _.each(this.containers, function(container) {
      this.recompute(container.id);
    }, this);
  };

  this.select = function(node) {
    return (node.type === "container" || node.isInstanceOf(ContainerAnnotation.static.name));
  };

  this.create = function(node, isInitializing) {
    if (node.type === "container") {
      this.containers[node.id] = node;
      this.indexes[node.id] = new PathAdapter.Arrays();
    } else if (node.isInstanceOf(ContainerAnnotation.static.name)) {
      var containerId = node.container;
      this.containerAnnotations[node.id] = node;
      if (!isInitializing) {
        this.recompute(containerId);
      }
    }
  };

  // this.delete = function(node) {
  //   if (node.type === "container") {
  //     delete this.containers[node.id];
  //     delete this.indexes[node.id];
  //   } else if (node.isInstanceOf('container_annotation')) {
  //     var containerId = node.container;
  //     delete this.containerAnnotations[node.id];
  //     this.recompute(containerId);
  //   }
  // };

  // this.update = function(node, path, newValue, oldValue) {
  //   /* jshint unused: false */
  //   if (node.type === "container") {
  //     this.recompute(node.id);
  //   } else if (node.isInstanceOf('container_annotation')) {
  //     var containerId = node.container;
  //     this.recompute(containerId);
  //   }
  // };

  this.recompute = function(containerId) {
    var container = this.containers[containerId];
    this.indexes[containerId] = new PathAdapter.Arrays();
    var index = this.indexes[containerId];
    _.each(this.containerAnnotations, function(anno) {
      var fragments = container.getAnnotationFragments(anno);
      _.each(fragments, function(frag) {
        index.add(frag.path, frag);
      });
    });
  };

  this.onDocumentChange = function(change) {
    var needsUpdate = false;
    var dirtyContainers = {};
    var doc = this.doc;
    var schema = doc.getSchema();
    for (var i = 0; i < change.ops.length; i++) {
      var op = change.ops[i];
      if (op.isCreate() || op.isDelete()) {
        var nodeData = op.getValue();
        if (nodeData.type === "container") {
          dirtyContainers[nodeData.id] = true;
          if (op.isCreate()) {
            this.containers[nodeData.id] = doc.get(nodeData.id);
          } else {
            delete this.containers[nodeData.id];
          }
          needsUpdate = true;
        } else if (schema.isInstanceOf(nodeData.type, ContainerAnnotation.static.name)) {
          dirtyContainers[nodeData.container] = true;
          if (op.isCreate()) {
            this.containerAnnotations[nodeData.id] = doc.get(nodeData.id);
          } else {
            delete this.containerAnnotations[nodeData.id];
          }
          needsUpdate = true;
        }
      } else {
        var nodeId = op.path[0];
        // skip updates on nodes which have been deleted by this change
        if (change.deleted[nodeId]) {
          continue;
        }
        var node = doc.get(nodeId);
        if (node.type === "container") {
          dirtyContainers[node.id] = true;
          needsUpdate = true;
        } else if (node.isInstanceOf(ContainerAnnotation.static.name)) {
          dirtyContainers[node.container] = true;
          needsUpdate = true;
        }
      }
    }
    if (needsUpdate) {
      _.each(dirtyContainers, function(val, containerId) {
        this.recompute(containerId);
      }, this);
    }
  };

};

OO.inherit(ContainerAnnotationIndex, Data.Index);

module.exports = ContainerAnnotationIndex;


},{"../basics/helpers":168,"../basics/oo":170,"../basics/path_adapter":171,"../data":175,"./container_annotation":189}],191:[function(require,module,exports){
'use strict';

var OO = require('../basics/oo');
var _ = require('../basics/helpers');
var PropertySelection = require('./property_selection');
var Selection = require('./selection');
var Range = require('./range');
var Coordinate = require('./coordinate');

function ContainerSelection(properties) {
  // Note: not calling the super ctor as it freezes the instance
  var containerId = properties.containerId;
  var startPath = properties.startPath;
  var endPath = properties.endPath || properties.startPath;
  var startOffset = properties.startOffset;
  var endOffset = properties.endOffset || properties.startOffset;
  if (!containerId || !startPath || !_.isNumber(startOffset)) {
    throw new Error('Invalid arguments: `containerId`, `startPath` and `startOffset` are mandatory');
  }

  // TODO: validate arguments
  this.containerId = containerId;
  this.range = new Range(
    new Coordinate(startPath, startOffset),
    new Coordinate(endPath, endOffset)
  );
  this.reverse = properties.reverse;
  this._internal = {};
  Object.freeze(this);
}

ContainerSelection.Prototype = function() {

  this.toJSON = function() {
    return {
      type: 'container',
      containerId: this.containerId,
      startPath: this.startPath,
      startOffset: this.startOffset,
      endPath: this.endPath,
      endOffset: this.endOffset,
      reverse: this.reverse
    };
  };

  this.attach = function(doc) {
    this._internal.doc = doc;
    return this;
  };

  this.isPropertySelection = function() {
    return false;
  };

  this.isContainerSelection = function() {
    return true;
  };

  this.toString = function() {
    return "ContainerSelection("+ JSON.stringify(this.range.start.path) + ":" + this.range.start.offset + " -> " +  JSON.stringify(this.range.end.path) + ":" + this.range.end.offset + (this.reverse ? ", reverse" : "") + ")";
  };

  this.getDocument = function() {
    var doc = this._internal.doc;
    if (!doc) {
      throw new Error('Selection is not attached to a document.');
    }
    return doc;
  };

  this.getContainer = function() {
    return this.getDocument().get(this.containerId);
  };

  this.expand = function(other) {
    var c1 = this._coordinates(this);
    var c2 = this._coordinates(other);
    var c1s = c1.start;
    var c2s = c2.start;
    var c1e = c1.end;
    var c2e = c2.end;
    var newCoors = {
      start: { pos: c1s.pos, offset: c1s.offset },
      end: { pos: c1e.pos, offset: c1e.offset }
    };
    if (c1s.pos > c2s.pos) {
      newCoors.start.pos = c2s.pos;
      newCoors.start.offset = c2s.offset;
    } else if (c1s.pos === c2s.pos) {
      newCoors.start.offset = Math.min(c1s.offset, c2s.offset);
    }
    if (c1e.pos < c2e.pos) {
      newCoors.end.pos = c2e.pos;
      newCoors.end.offset = c2e.offset;
    } else if (c1e.pos === c2e.pos) {
      newCoors.end.offset = Math.max(c1e.offset, c2e.offset);
    }
    return _createNewSelection(this, newCoors);
  };

  // There should be exactly one
  this.truncate = function(other) {
    var c1 = this._coordinates(this);
    var c2 = this._coordinates(other);
    var newCoors = {};
    if (_isBefore(c2.start, c1.start, 'strict')) {
      newCoors.start = c1.start;
      newCoors.end = c2.end;
    } else if (_isBefore(c1.end, c2.end, 'strict')) {
      newCoors.start = c2.start;
      newCoors.end = c1.end;
    } else if (_isEqual(c1.start, c2.start)) {
      if (_isEqual(c1.end, c2.end)) {
        return Selection.nullSelection;
      } else {
        newCoors.start = c2.end;
        newCoors.end = c1.end;
      }
    } else if (_isEqual(c1.end, c2.end)) {
      newCoors.start = c1.start;
      newCoors.end = c2.start;
    }
    return _createNewSelection(this, newCoors);
  };

  this.isInsideOf = function(other, strict) {
    if (other.isNull()) return false;
    var c1 = this._coordinates(this);
    var c2 = this._coordinates(other);
    return (_isBefore(c2.start, c1.start, strict) && _isBefore(c1.end, c2.end, strict));
  };

  this.contains = function(other) {
    var c1 = this._coordinates(this);
    var c2 = this._coordinates(other);
    return (_isBefore(c1.start, c2.start) && _isBefore(c2.end, c1.end));
  };

  // includes and at least one boundary
  this.includesWithOneBoundary = function(other) {
    var c1 = this._coordinates(this);
    var c2 = this._coordinates(other);
    return (
      (_isEqual(c1.start, c2.start) && _isBefore(c2.end, c1.end)) ||
      (_isEqual(c1.end, c2.end) && _isBefore(c1.start, c2.start))
    );
  };

  this.overlaps = function(other) {
    var c1 = this._coordinates(this);
    var c2 = this._coordinates(other);
    // it overlaps if they are not disjunct
    return !(_isBefore(c1.end, c2.start) || _isBefore(c2.end, c1.start));
  };

  this.isLeftAlignedWith = function(other) {
    var c1 = this._coordinates(this);
    var c2 = this._coordinates(other);
    return _isEqual(c1.start, c2.start);
  };

  this.isRightAlignedWith = function(other) {
    var c1 = this._coordinates(this);
    var c2 = this._coordinates(other);
    return _isEqual(c1.end, c2.end);
  };

  this.splitIntoPropertySelections = function() {
    var sels = [];
    var container = this.getContainer();
    var comps = container.getComponentsForRange(this.range);
    var doc = container.getDocument();
    for (var i = 0; i < comps.length; i++) {
      var comp = comps[i];
      var startOffset, endOffset;
      if (i===0) {
        startOffset = this.startOffset;
      } else {
        startOffset = 0;
      }
      if (i===comps.length-1) {
        endOffset = this.endOffset;
      } else {
        endOffset = doc.get(comp.path).length;
      }
      sels.push(doc.createSelection({
        type: 'property',
        path: comp.path,
        startOffset: startOffset,
        endOffset: endOffset
      }));
    }
    return sels;
  };

  this._coordinates = function(sel) {
    if (sel._internal.containerRange) {
      return sel._internal.containerRange;
    }
    var container = this.getContainer();
    var range = sel.getRange();
    var startPos = container.getComponent(range.start.path).getIndex();
    var endPos;
    if (sel.isCollapsed()) {
      endPos = startPos;
    } else {
      endPos = container.getComponent(range.end.path).getIndex();
    }
    var containerRange = {
      start: {
        pos: startPos,
        offset: range.start.offset,
      },
      end: {
        pos: endPos,
        offset: range.end.offset
      }
    };
    if (sel instanceof ContainerSelection) {
      sel._internal.containerRange = containerRange;
    }
    return containerRange;
  };

  var _isBefore = function(c1, c2, strict) {
    if (strict) {
      if (c1.pos >= c2.pos) return false;
      if (c1.pos == c2.pos && c1.offset >= c2.offset) return false;
      return true;
    } else {
      if (c1.pos > c2.pos) return false;
      if (c1.pos == c2.pos && c1.offset > c2.offset) return false;
      return true;
    }
  };

  var _isEqual = function(c1, c2) {
    return (c1.pos === c2.pos && c1.offset === c2.offset);
  };

  var _createNewSelection = function(containerSel, newCoors) {
    var container = containerSel.getContainer();
    newCoors.start.path = container.getComponentAt(newCoors.start.pos).path;
    newCoors.end.path = container.getComponentAt(newCoors.end.pos).path;
    return new ContainerSelection({
      containerId: containerSel.containerId,
      startPath: newCoors.start.path,
      startOffset: newCoors.start.offset,
      endPath: newCoors.end.path,
      endOffset: newCoors.end.offset
    });
  };
};

OO.inherit(ContainerSelection, PropertySelection);

Object.defineProperties(ContainerSelection.prototype, {
  path: {
    get: function() {
      throw new Error('ContainerSelection has no path property. Use startPath and endPath instead');
    },
    set: function() { throw new Error('immutable.'); }
  },
  startPath: {
    get: function() {
      return this.range.start.path;
    },
    set: function() { throw new Error('immutable.'); }
  },
  endPath: {
    get: function() {
      return this.range.end.path;
    },
    set: function() { throw new Error('immutable.'); }
  }
});

module.exports = ContainerSelection;

},{"../basics/helpers":168,"../basics/oo":170,"./coordinate":192,"./property_selection":214,"./range":215,"./selection":216}],192:[function(require,module,exports){
'use strict';

var OO = require('../basics/oo');
var _ = require('../basics/helpers');

// path: the address of a property, such as ['text_1', 'content']
// offset: the position in the property
// after: an internal flag indicating if the address should be associated to the left or right side
//   Note: at boundaries of annotations there are two possible positions with the same address
//       foo <strong>bar</strong> ...
//     With offset=7 normally we associate this position:
//       foo <strong>bar|</strong> ...
//     With after=true we can describe this position:
//       foo <strong>bar</strong>| ...
function Coordinate(path, offset, after) {
  this.path = path;
  this.offset = offset;
  this.after = after;
  if (!_.isArray(path)) {
    throw new Error('Invalid arguments: path should be an array.');
  }
  if (!_.isNumber(offset) || offset < 0) {
    throw new Error('Invalid arguments: offset must be a positive number.');
  }
  // make sure that path can't be changed afterwards
  if (!Object.isFrozen(path)) {
    Object.freeze(path);
  }
  Object.freeze(this);
}

Coordinate.Prototype = function() {

  this.equals = function(other) {
    return (other === this ||
      (_.isArrayEqual(other.path, this.path) && other.offset === this.offset) );
  };

  this.withCharPos = function(offset) {
    return new Coordinate(this.path, offset);
  };

  this.getNodeId = function() {
    return this.path[0];
  };

  this.getPath = function() {
    return this.path;
  };

  this.getOffset = function() {
    return this.offset;
  };

};

OO.initClass( Coordinate );

module.exports = Coordinate;
},{"../basics/helpers":168,"../basics/oo":170}],193:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var Substance = require('../basics');
var Data = require('../data');
var AbstractDocument = require('./abstract_document');

var AnnotationIndex = require('./annotation_index');
var AnchorIndex = require('./anchor_index');
var ContainerAnnotationIndex = require('./container_annotation_index');

var TransactionDocument = require('./transaction_document');
var DocumentChange = require('./document_change');

var PathEventProxy = require('./path_event_proxy');
var ClipboardImporter = require('./clipboard_importer');
var ClipboardExporter = require('./clipboard_exporter');

var __id__ = 0;

function Document(schema) {
  AbstractDocument.call(this, schema);
  this.__id__ = __id__++;
  // all by type
  this.nodeIndex = this.addIndex('type', Data.Index.create({
    property: "type"
  }));

  // special index for (property-scoped) annotations
  this.annotationIndex = this.addIndex('annotations', new AnnotationIndex());

  // special index for (contaoiner-scoped) annotations
  this.anchorIndex = this.addIndex('container-annotation-anchors', new AnchorIndex());

  // HACK: ATM we can't register this as Data.Index, as it depends on Containers to be up2date,
  // but containers are updated after indexes.
  // This must not be used from within transactions.
  this.containerAnnotationIndex = new ContainerAnnotationIndex(this);

  this.done = [];
  this.undone = [];

  // change event proxies are triggered after a document change has been applied
  // before the regular document:changed event is fired.
  // They serve the purpose of making the event notification more efficient
  // In earlier days all observers such as node views where listening on the same event 'operation:applied'.
  // This did not scale with increasing number of nodes, as on every operation all listeners where notified.
  // The proxies filter the document change by interest and then only notify a small set of observers.
  // Example: NotifyByPath notifies only observers which are interested in changes to a certain path.
  this.eventProxies = {
    'path': new PathEventProxy(this),
  };

  this.initialize();

  // the stage is a essentially a clone of this document
  // used to apply a sequence of document operations
  // without touching this document
  this.stage = new TransactionDocument(this);
  this.isTransacting = false;

  this.FORCE_TRANSACTIONS = false;
}

Document.Prototype = function() {

  this.isTransaction = function() {
    return false;
  };

  this.newInstance = function() {
    var DocumentClass = this.constructor;
    return new DocumentClass(this.schema);
  };

  this.fromSnapshot = function(data) {
    var doc = this.newInstance();
    doc.loadSeed(data);
    return doc;
  };

  this.documentDidLoad = function() {
    // HACK: need to reset the stage
    this.stage.reset();
    this.containerAnnotationIndex.reset();
    this.done = [];
    // do not allow non-transactional changes after that
    this.FORCE_TRANSACTIONS = true;
  };

  this.getEventProxy = function(name) {
    return this.eventProxies[name];
  };

  // Document manipulation
  //

  /**
   * @param beforeState object which will be used as before start of transaction
   * @param eventData object which will be used as payload for the emitted change event
   * @param transformation a function(tx) that performs actions on the transaction document tx
   *
   * @example
   * ```
   *   doc.transaction({ selection: sel }, {'event-hack': true}, function(tx, args) {
   *     tx.update(...);
   *     ...
   *     return {
   *       selection: newSelection
   *     };
   *   })
   * ```
   */
  this.transaction = function(beforeState, eventData, transformation) {
    if (arguments.length === 1) {
      transformation = arguments[0];
      eventData = {};
      beforeState = {};
    }
    if (arguments.length === 2) {
      transformation = arguments[1];
      eventData = {};
    } else {
      eventData = eventData || {};
    }
    if (!_.isFunction(transformation)) {
      throw new Error('Document.transaction() requires a transformation function.');
    }
    // var time = Date.now();
    // HACK: ATM we can't deep clone as we do not have a deserialization
    // for selections.
    var tx = this.startTransaction(_.clone(beforeState));
    // console.log('Starting the transaction took', Date.now() - time);
    try {
      // time = Date.now();
      var result = transformation(tx);
      // console.log('Executing the transformation took', Date.now() - time);
      var afterState = {};
      // only keys that are in the beforeState can be in the afterState
      // TODO: maybe this is to sharp?
      // we could also just merge the transformation result with beforeState
      // but then we might have non-state related information in the after state.
      for (var key in beforeState) {
        if (result[key]) {
          afterState[key] = result[key];
        } else {
          afterState[key] = beforeState[key];
        }
      }
      // save automatically if not yet saved or cancelled
      if (this.isTransacting) {
        tx.save(afterState, eventData);
      }
    } finally {
      tx.finish();
    }
  };

  this.startTransaction = function(beforeState) {
    if (this.isTransacting) {
      throw new Error('Nested transactions are not supported.');
    }
    this.isTransacting = true;
    // TODO: maybe we need to prepare the stage
    this.stage.before = beforeState || {};
    this.emit('transaction:started', this.stage);
    return this.stage;
  };

  this.create = function(nodeData) {
    if (this.FORCE_TRANSACTIONS) {
      throw new Error('Use a transaction!');
    }
    if (this.isTransacting) {
      this.stage.create(nodeData);
    } else {
      if (this.stage) {
        this.stage.create(nodeData);
      }
      this._create(nodeData);
    }
    return this.data.get(nodeData.id);
  };

  this.delete = function(nodeId) {
    if (this.FORCE_TRANSACTIONS) {
      throw new Error('Use a transaction!');
    }
    if (this.isTransacting) {
      this.stage.delete(nodeId);
    } else {
      if (this.stage) {
        this.stage.delete(nodeId);
      }
      this._delete(nodeId);
    }
  };

  this.set = function(path, value) {
    if (this.FORCE_TRANSACTIONS) {
      throw new Error('Use a transaction!');
    }
    if (this.isTransacting) {
      this.stage.set(path, value);
    } else {
      if (this.stage) {
        this.stage.set(path, value);
      }
      this._set(path, value);
    }
  };

  this.update = function(path, diff) {
    if (this.FORCE_TRANSACTIONS) {
      throw new Error('Use a transaction!');
    }
    if (this.isTransacting) {
      this.stage.update(path, diff);
    } else {
      this._update(path, diff);
      if (this.stage) {
        this.stage.update(path, diff);
      }
    }
  };

  this.undo = function() {
    var change = this.done.pop();
    if (change) {
      var inverted = change.invert();
      this._apply(inverted);
      this.undone.push(inverted);
      this._notifyChangeListeners(inverted, { 'replay': true });
    } else {
      console.error('No change can be undone.');
    }
  };

  this.redo = function() {
    var change = this.undone.pop();
    if (change) {
      var inverted = change.invert();
      this._apply(inverted);
      this.done.push(inverted);
      this._notifyChangeListeners(inverted, { 'replay': true });
    } else {
      console.error('No change can be redone.');
    }
  };

  // sel: PropertySelection
  // options:
  //   container: container instance
  //   type: string (annotation type filter)
  //
  // WARNING: Returns an empty array when selection is a container selection
  this.getAnnotationsForSelection = function(sel, options) {
    options = options || {};
    var annotations;
    var path, startOffset, endOffset;

    if (sel.isPropertySelection()) {
      path = sel.getPath();
      startOffset = sel.getStartOffset();
      endOffset = sel.getEndOffset();
    } else {
      return [];
    }
    annotations = this.annotationIndex.get(path, startOffset, endOffset);
    if (options.type) {
      annotations = _.filter(annotations, AnnotationIndex.filterByType(options.type));
    }
    return annotations;
  };

  // Attention: looking for container annotations is not as efficient
  // as property selections, as we do not have an index that has
  // notion of the spatial extend of an annotation
  // (which would depend on a model-side implementation of Container).
  // Opposed to that, common annotations are bound to properties which make it easy to lookup.
  this.getContainerAnnotationsForSelection = function(sel, container, options) {
    if (!container) {
      // Fail more silently
      return [];
      // throw new Error('Container required.');
    }
    var annotations;
    // Also look for container annotations if a Container instance is given
    if (options.type) {
      annotations = this.getIndex('type').get(options.type);
    } else {
      annotations = this.getIndex('container-annotation-anchors').byId;
    }
    annotations = _.filter(annotations, function(anno) {
      var annoSel = anno.getSelection();
      return sel.overlaps(annoSel);
    });
    return annotations;
  };

  this.getDocumentMeta = function() {
    return this.get('document');
  };

  this.getClipboardImporter = function() {
    return new ClipboardImporter({ schema: this.getSchema()});
  };

  this.getClipboardExporter = function() {
    return new ClipboardExporter();
  };

  /**
   * Enable or disable auto-attaching of nodes.
   * When this is enabled (default), a created node
   * gets attached to the document instantly.
   * Otherwise you need to take care of that yourself.
   *
   * Used internally e.g., by AbstractDocument.prototype.loadSeed()
   */
  this._setAutoAttach = function(val) {
    Document.super.prototype._setAutoAttach.call(this, val);
    this.stage._setAutoAttach(val);
  };


  this._saveTransaction = function(beforeState, afterState, info) {
    // var time = Date.now();
    if (!this.isTransacting) {
      throw new Error('Not in a transaction.');
    }
    this.isTransacting = false;
    var ops = this.stage.getOperations();
    if (ops.length > 0) {
      var documentChange = new DocumentChange(ops, beforeState, afterState);
      // apply the change
      this._apply(documentChange, 'skipStage');
      // push to undo queue and wipe the redo queue
      this.done.push(documentChange);
      this.undone = [];
      // console.log('Document._saveTransaction took %s ms', (Date.now() - time));
      // time = Date.now();
      this._notifyChangeListeners(documentChange, info);
      // console.log('Notifying change listener took %s ms', (Date.now() - time));
    }
  };

  this._cancelTransaction = function() {
    if (!this.isTransacting) {
      throw new Error('Not in a transaction.');
    }
    this.isTransacting = false;
  };

  this._apply = function(documentChange, mode) {
    if (this.isTransacting) {
      throw new Error('Can not replay a document change during transaction.');
    }
    // Note: we apply everything doubled, to keep the staging clone up2date.
    if (mode !== 'skipStage') {
      this.stage.apply(documentChange);
    }
    _.each(documentChange.ops, function(op) {
      this.data.apply(op);
      this._updateContainers(op);
      this.emit('operation:applied', op);
    }, this);
  };

  this._notifyChangeListeners = function(documentChange, info) {
    info = info || {};
    _.each(this.eventProxies, function(proxy) {
      proxy.onDocumentChanged(documentChange, info, this);
    }, this);
    this.emit('document:changed', documentChange, info, this);
  };

};

Substance.inherit(Document, AbstractDocument);

Object.defineProperty(Document.prototype, 'id', {
  get: function() {
    return this.getDocumentMeta().guid;
  },
  set: function() {
    throw new Error("Id is an immutable property.");
  }
});

module.exports = Document;

},{"../basics":169,"../basics/helpers":168,"../data":175,"./abstract_document":180,"./anchor_index":181,"./annotation_index":183,"./clipboard_exporter":186,"./clipboard_importer":187,"./container_annotation_index":190,"./document_change":194,"./path_event_proxy":213,"./transaction_document":219}],194:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

function DocumentChange(ops, before, after) {
  this.id = Substance.uuid();
  this.ops = ops.slice(0);
  this.before = before;
  this.after = after;
  this.updated = null;
  this.created = null;
  this.deleted = null;
  this._init();
  Object.freeze(this);
  Object.freeze(this.ops);
  Object.freeze(this.before);
  Object.freeze(this.after);
  // FIXME: ATM this is not possible, as NotifyPropertyChange monkey patches this info
  // Object.freeze(this.updated);
  // Object.freeze(this.deleted);
  // Object.freeze(this.created);
}

DocumentChange.Prototype = function() {

  this._init = function() {
    var ops = this.ops;
    var created = {};
    var deleted = {};
    var updated = new PathAdapter.Arrays();
    var i;
    for (i = 0; i < ops.length; i++) {
      var op = ops[i];
      if (op.type === "create") {
        created[op.val.id] = op.val;
        delete deleted[op.val.id];
      }
      if (op.type === "delete") {
        delete created[op.val.id];
        delete updated[op.val.id];
        deleted[op.val.id] = op.val;
      }
      if (op.type === "set" || op.type === "update") {
        // The old as well the new one is affected
        updated.add(op.path, op);
      }
    }
    this.created = created;
    this.deleted = deleted;
    this.updated = updated;
  };

  this.isAffected = function(path) {
    return !!this.updated.get(path);
  };

  this.isUpdated = this.isAffected;

  this.invert = function() {
    var ops = [];
    for (var i = this.ops.length - 1; i >= 0; i--) {
      ops.push(this.ops[i].invert());
    }
    var before = this.after;
    var after = this.before;
    return new DocumentChange(ops, before, after);
  };

  this.traverse = function(fn, ctx) {
    this.updated.traverse(function() {
      fn.apply(ctx, arguments);
    });
  };

  this.getUpdates = function(path) {
    return this.updated.get(path) || [];
  };

  this.getCreated = function() {
    return this.created;
  };

  this.getDeleted = function() {
    return this.deleted;
  };

};

Substance.initClass(DocumentChange);

module.exports = DocumentChange;

},{"../basics":169}],195:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Data = require('../data');

var Node = require('./node');
var Annotation = require('./annotation');
var Container = require('./container');
var ContainerAnnotation = require('./container_annotation');
var TextNode = require('./text_node');

function DocumentSchema(name, version) {
  DocumentSchema.super.call(this, name, version);
}

DocumentSchema.Prototype = function() {

  this.getDefaultTextType = function() {
    throw new Error('DocumentSchema.getDefaultTextType() is abstract and must be overridden.');
  };

  this.isAnnotationType = function(type) {
    var nodeClass = this.getNodeClass(type);
    return (nodeClass && nodeClass.prototype instanceof Annotation);
  };

  this.getBuiltIns = function() {
    return [ Node, Annotation, Container, ContainerAnnotation, TextNode ];
  };

};

Substance.inherit( DocumentSchema, Data.Schema );

module.exports = DocumentSchema;

},{"../basics":169,"../data":175,"./annotation":182,"./container":188,"./container_annotation":189,"./node":199,"./text_node":218}],196:[function(require,module,exports){
"use strict";

var Substance = require('../basics');
var Annotator = require('./annotator');

var inBrowser = (typeof window !== 'undefined');

function HtmlExporter(config) {
  this.config = config || {};
  this.state = null;
}

HtmlExporter.Prototype = function() {

  /**
   * @param doc Substance.Document instance
   * @param object options TODO: what options are available?
   * @return $element
   */
  this.convert = function(doc, options) {
    /* jshint unused:false */
    throw new Error('Method is abstract.');

    /**
      Example:

      this.initialize(doc, options);
      var body = doc.get('body');
      this.convertContainer(body);
      return this.state.$root;
    */
  };

  this.getNodeConverter = function(node) {
    return node.constructor;
  };

  this.convertProperty = function(doc, path, options) {
    this.initialize(doc, options);
    var $wrapper = $('<div>')
      .append(this.annotatedText(path));
    return $wrapper.html();
  };

  this.initialize = function(doc, options) {
    options = {} || options;
    this.state =  {
      doc: doc,
      options: options
    };
  };

  this.convertNode = function(node) {
    var NodeConverter = this.getNodeConverter(node);
    return NodeConverter.static.toHtml(node, this);
  };

  this.convertContainer = function(containerNode) {
    var state = this.state;
    var nodeIds = containerNode.nodes;
    var elements = [];
    for (var i = 0; i < nodeIds.length; i++) {
      var node = state.doc.get(nodeIds[i]);
      var $el = this.convertNode(node);
      if (!$el || !this.isElementNode($el[0])) {
        throw new Error('Contract: Node.static.toHtml() must return a DOM element. NodeType: '+node.type);
      }
      $el.attr('id', node.id);
      elements.push($el);
    }
    return elements;
  };

  this.annotatedText = function(path) {
    var self = this;
    var doc = this.state.doc;
    var annotations = doc.getIndex('annotations').get(path);
    var text = doc.get(path);

    var annotator = new Annotator();
    annotator.onText = function(context, text) {
      context.children.push(text);
    };
    annotator.onEnter = function(entry) {
      var anno = entry.node;
      return {
        annotation: anno,
        children: []
      };
    };
    annotator.onExit = function(entry, context, parentContext) {
      var anno = context.annotation;
      var NodeConverter = self.getNodeConverter(anno);
      var $el = NodeConverter.static.toHtml(anno, self, context.children);
      if (!$el || !self.isElementNode($el[0])) {
        throw new Error('Contract: Annotation.toHtml() must return a DOM element.');
      }
      $el.attr('id', anno.id);
      parentContext.children.push($el);
    };
    var wrapper = { children: [] };
    annotator.start(wrapper, text, annotations);
    return wrapper.children;
  };

  this.isElementNode = function(el) {
    if (inBrowser) {
      return (el.nodeType === window.Node.ELEMENT_NODE);
    } else {
      return el.type === "tag";
    }
  };

  this.createHtmlDocument = function() {
    var EMPTY_DOC = '<!DOCTYPE html><html><head></head><body></body></html>';
    if (inBrowser) {
      var parser = new window.DOMParser();
      var doc = parser.parseFromString(EMPTY_DOC, "text/html");
      return $(doc);
    } else {
      // creating document using cheerio
      var $root = $.load(EMPTY_DOC).root();
      return $root;
    }
  };

  this.createXmlDocument = function() {
    // We provide xmlns="http://www.w3.org/1999/xhtml" so we don't get the whole doc
    // polluted with xmlns attributes
    // See: http://stackoverflow.com/questions/8084175/how-do-i-prevent-jquery-from-inserting-the-xmlns-attribute-in-an-xml-object
    var EMPTY_DOC = '<article xmlns="http://www.w3.org/1999/xhtml"></article>';
    if (inBrowser) {
      var parser = new window.DOMParser();
      var doc = parser.parseFromString(EMPTY_DOC, "text/xml");
      return $(doc);
    } else {
      // creating document using cheerio
      var $root = $.load(EMPTY_DOC).root();
      return $root;
    }
  };
};

Substance.initClass(HtmlExporter);

module.exports = HtmlExporter;

},{"../basics":169,"./annotator":185}],197:[function(require,module,exports){
(function (global){
var Substance = require('../basics');
var _ = Substance;

var inBrowser = (typeof window !== 'undefined');

function HtmlImporter( config ) {
  this.config = config || {};
  this.nodeTypesByName = {};
  this.nodeTypes = [];
  this.blockTypes = [];
  this.inlineTypes = [];
  // register converters defined in schema
  if (this.config.schema) {
    this.config.schema.each(function(NodeClass) {
      this.defineNodeImporter(NodeClass);
    }, this);
  }
  this.$ = global.$;
}

HtmlImporter.Prototype = function HtmlImporterPrototype() {

  this.defineNodeImporter = function(NodeClass) {
    // ATM Node.matchElement is required
    if (!NodeClass.static.matchElement) {
      return;
    }
    this.nodeTypes.push(NodeClass);
    this.nodeTypesByName[NodeClass.static.name] = NodeClass;
    if (NodeClass.static.blockType) {
      this.blockTypes.push(NodeClass);
    } else if (NodeClass.static.isInline){
      this.inlineTypes.push(NodeClass);
    }
  };

  this.defaultConverter = function($el, converter) {
    /* jshint unused:false */
    console.warn('This element is not handled by the converters you provided. This is the default implementation which just skips conversion. Override HtmlImporter.defaultConverter(el, converter) to change this behavior.', this.$toStr($el));
    var defaultTextType = this.state.doc.getSchema().getDefaultTextType();
    var DefaultBlockTextClass = this.nodeTypesByName[defaultTextType];
    if (!DefaultBlockTextClass) {
      throw new Error('Could not class for default text type', defaultTextType);
    }
    var node = DefaultBlockTextClass.static.fromHtml($el, converter);
    if (node) {
      node.type = defaultTextType;
    }
    return node;
  };

  this.initialize = function(doc, $root) {
    var state = {
      doc: doc,
      $root: $root,
      inlineNodes: [],
      trimWhitespaces: !!this.config.trimWhitespaces,
      // stack of contexts to handle reentrant calls
      stack: [],
      lastChar: "",
      skipTypes: {},
      ignoreAnnotations: false,
    };
    this.state = state;
  };

  this.convert = function($root, doc) {
    /* jshint unused:false */
    throw new Error('This method is abstract.');

    /* Example:

    this.initialize(doc, $root);
    var $body = $root.find('body');
    this.convertContainer($body, 'body');
    this.finish();

    */
  };

  // convert a container with block level elements and show
  // the result in the container node with given id
  this.convertContainer = function($containerEl, containerId) {
    var state = this.state;
    var doc = state.doc;
    var containerNode = doc.get(containerId);
    state.containerNode = containerNode;
    var childIterator = new HtmlImporter.ChildNodeIterator($containerEl[0]);
    while(childIterator.hasNext()) {
      var el = childIterator.next();
      var $el = this.$(el);
      var blockType = this._getBlockTypeForElement($el);
      var node;
      if (blockType) {
        node = blockType.static.fromHtml($el, this);
        if (!node) {
          throw new Error("Contract: a Node's fromHtml() method must return a node", this.$toStr($el));
        } else {
          node.type = blockType.static.name;
          node.id = node.id || $el.attr('id') || Substance.uuid(node.type);
          doc.create(node);
          containerNode.show(node.id);
        }
      } else {
        if (this.isCommentNode(el)) {
          // skip comment nodes on block level
        } else if (this.isTextNode(el)) {
          var text = $el.text();
          if (/^\s*$/.exec(text)) continue;
          // If we find text nodes on the block level we wrap
          // it into a paragraph element (or what is configured as default block level element)
          childIterator.back();
          this.wrapInlineElementsIntoBlockElement(childIterator);
        } else if (this.isElementNode(el)) {
          var inlineType = this._getInlineTypeForElement($el);
          // NOTE: hard to tell if unsupported nodes on this level
          // should be treated as inline or not.
          // ATM we only support spans as entry to the catch-all implementation
          // that collects inline elements and wraps into a paragraph.
          // TODO: maybe this should be the default?
          if (inlineType || this.getTagName(el) === "span") {
            childIterator.back();
            this.wrapInlineElementsIntoBlockElement(childIterator);
          } else {
            this.createDefaultBlockElement($el);
          }
        }
      }
    }
  };

  this.finish = function() {
    var doc = this.state.doc;
    // create annotations afterwards so that the targeted nodes
    // exist for sure
    for (var i = 0; i < this.state.inlineNodes.length; i++) {
      doc.create(this.state.inlineNodes[i]);
    }
  };

  this.convertProperty = function(doc, path, html) {
    var $el = this.$('<div>').html(html);
    this.initialize(doc, $el);
    var text = this.annotatedText($el, path);
    doc.setText(path, text, this.state.inlineNodes);
  };

  this.convertElement = function($el, data) {
    var doc = this.state.doc;
    var nodeType = this._getNodeTypeForElement($el);
    if (!nodeType) {
      throw new Error("Could not find a node class associated to element:" + this.$toStr($el));
    }
    var node = nodeType.static.fromHtml($el, this);
    node.type = nodeType.static.name;
    node.id = node.id || this.defaultId($el, node.type);
    _.extend(node, data);
    return doc.create(node);
  };

  this.getDocument = function() {
    return this.state.doc;
  };

  this.getTagName = function(el) {
    if (!el.tagName) {
      return "";
    } else {
      return el.tagName.toLowerCase();
    }
  };

  this.isTextNode = function(el) {
    if (inBrowser) {
      return (el.nodeType === window.Node.TEXT_NODE);
    } else {
      // cheerio text node
      return el.type === "text";
    }
  };

  this.isElementNode = function(el) {
    if (inBrowser) {
      return (el.nodeType === window.Node.ELEMENT_NODE);
    } else {
      return el.type === "tag";
    }
  };

  this.isCommentNode = function(el) {
    if (inBrowser) {
      return (el.nodeType === window.Node.COMMENT_NODE);
    } else {
      return el.type === "comment";
    }
  };

  this.wrapInlineElementsIntoBlockElement = function(childIterator) {
    var state = this.state;
    var doc = state.doc;
    var containerNode = state.containerNode;
    var $wrapper = this.$('<div>');
    while(childIterator.hasNext()) {
      var el = childIterator.next();
      var $el = this.$(el);
      var blockType = this._getBlockTypeForElement($el);
      if (blockType) {
        childIterator.back();
        break;
      }
      $wrapper.append($el.clone());
    }
    var node = this.defaultConverter($wrapper, this);
    if (node) {
      if (!node.type) {
        throw new Error('Contract: Html.defaultConverter() must return a node with type.');
      }
      node.id = node.id || this.nextId(node.type);
      doc.create(node);
      containerNode.show(node.id);
    }
  };

  this.createDefaultBlockElement = function($el) {
    var state = this.state;
    var doc = state.doc;
    var containerNode = state.containerNode;
    var node = this.defaultConverter($el, this);
    if (node) {
      if (!node.type) {
        throw new Error('Contract: Html.defaultConverter() must return a node with type.', this.$toStr($el));
      }
      node.id = node.id || this.defaultId($el, node.type);
      doc.create(node);
      containerNode.show(node.id);
    }
  };

  /**
   * Parse annotated text
   *
   * Make sure you call this method only for elements where `this.isParagraphish(elements) === true`
   */
  this.annotatedText = function($el, path) {
    var state = this.state;
    if (path) {
      if (state.stack.length>0) {
        throw new Error('Contract: it is not allowed to bind a new call annotatedText to a path while the previous has not been completed.', this.$toStr($el));
      }
      state.stack = [{ path: path, offset: 0, text: ""}];
    } else {
      if (state.stack.length===0) {
        throw new Error("Contract: HtmlImporter.annotatedText() requires 'path' for non-reentrant call.", this.$toStr($el));
      }
    }
    var iterator = new HtmlImporter.ChildNodeIterator($el[0]);
    var text = this._annotatedText(iterator);
    if (path) {
      state.stack.pop();
    }
    return text;
  };

  this.plainText = function($el) {
    var state = this.state;
    var text = $el.text();
    if (state.stack.length > 0) {
      var context = _.last(state.stack);
      context.offset += text.length;
      context.text += context.text.concat(text);
    }
    return text;
  };

  this.customText = function(text) {
    var state = this.state;
    if (state.stack.length > 0) {
      var context = _.last(state.stack);
      context.offset += text.length;
      context.text += context.text.concat(text);
    }
    return text;
  };

  this.nextId = function(prefix) {
    // TODO: we could create more beautiful ids?
    // however we would need to be careful as there might be another
    // element in the HTML coming with that id
    // For now we use shas
    return Substance.uuid(prefix);
  };

  // TODO: maybe we want to capture warnings and errors in future
  this.warning = function(msg) {
    console.warn('[HtmlImporter] ' + msg);
  };

  this.error = function(msg) {
    console.error('[HtmlImporter] ' + msg);
  };

  this.defaultId = function($el, type) {
    var id = $el.attr('id') || this.nextId(type);
    while (this.state.doc.get(id)) {
      id = this.nextId(type)
    }
    // TODO: check for collisions
    return id;
  };

  // Internal function for parsing annotated text
  // --------------------------------------------
  //
  this._annotatedText = function(iterator) {
    var state = this.state;
    var context = _.last(state.stack);
    if (!context) {
      throw new Error('Illegal state: context is null.');
    }
    while(iterator.hasNext()) {
      var el = iterator.next();
      var $el = this.$(el);
      var text = "";
      // Plain text nodes...
      if (this.isTextNode(el)) {
        text = this._prepareText(state, $el.text());
        if (text.length) {
          // Note: text is not merged into the reentrant state
          // so that we are able to return for this reentrant call
          context.text = context.text.concat(text);
          context.offset += text.length;
        }
      } else if (this.isCommentNode(el)) {
        // skip comment nodes
        continue;
      } else if (this.isElementNode(el)) {
        var inlineType = this._getInlineTypeForElement($el);
        if (!inlineType) {
          var blockType = this._getInlineTypeForElement($el);
          if (blockType) {
            throw new Error('Expected inline element. Found block element:', this.$toStr($el));
          }
          console.warn('Unsupported inline element. We will not create an annotation for it, but process its children to extract annotated text.', this.$toStr($el));
          // Note: this will store the result into the current context
          this.annotatedText($el);
          continue;
        }
        // reentrant: we delegate the conversion to the inline node class
        // it will either call us back (this.annotatedText) or give us a finished
        // node instantly (self-managed)
        var startOffset = context.offset;
        var inlineNode;
        if (inlineType.static.fromHtml) {
          // push a new context so we can deal with reentrant calls
          state.stack.push({ path: context.path, offset: startOffset, text: ""});
          inlineNode = inlineType.static.fromHtml($el, this);
          if (!inlineNode) {
            throw new Error("Contract: a Node's fromHtml() method must return a node", this.$toStr($el));
          }
          // external nodes are attached to an invisible character
          if (inlineType.static.external) {
            this.customText("\u200B");
          }
          // ... and transfer the result into the current context
          var result = state.stack.pop();
          context.offset = result.offset;
          context.text = context.text.concat(result.text);
        } else {
          inlineNode = {};
          this.annotatedText($el);
        }
        // in the mean time the offset will probably have changed to reentrant calls
        var endOffset = context.offset;
        inlineNode.type = inlineType.static.name;
        inlineNode.id = inlineType.id || this.nextId(inlineNode.type);
        inlineNode.startOffset = startOffset;
        inlineNode.endOffset = endOffset;
        inlineNode.path = context.path.slice(0);
        state.inlineNodes.push(inlineNode);
      } else {
        console.warn('Unknown element type. Taking plain text.', this.$toStr($el));
        text = this._prepareText(state, $el.text());
        context.text = context.text.concat(text);
        context.offset += text.length;
      }
    }
    // return the plain text collected during this reentrant call
    return context.text;
  };

  this._getBlockTypeForElement = function($el) {
    // HACK: tagName does not exist for prmitive nodes such as DOM TextNode.
    if (!$el[0].tagName) return null;
    for (var i = 0; i < this.blockTypes.length; i++) {
      if (this.blockTypes[i].static.matchElement($el)) {
        return this.blockTypes[i];
      }
    }
  };

  this._getInlineTypeForElement = function($el) {
    for (var i = 0; i < this.inlineTypes.length; i++) {
      if (this.inlineTypes[i].static.matchElement($el)) {
        return this.inlineTypes[i];
      }
    }
  };

  this._getNodeTypeForElement = function($el) {
    for (var i = 0; i < this.nodeTypes.length; i++) {
      if (this.nodeTypes[i].static.matchElement($el)) {
        return this.nodeTypes[i];
      }
    }
  };

  this._getDomNodeType = function(el) {
    if (this.isTextNode(el)) {
      return "text";
    } else if (this.isCommentNode(el)) {
      return "comment";
    } else if (el.tagName) {
      return el.tagName.toLowerCase();
    } else {
      throw new Error("Unknown node type");
    }
  };

  var WS_LEFT = /^\s+/g;
  var WS_LEFT_ALL = /^\s*/g;
  var WS_RIGHT = /\s+$/g;
  var WS_ALL = /\s+/g;
  // var ALL_WS_NOTSPACE_LEFT = /^[\t\n]+/g;
  // var ALL_WS_NOTSPACE_RIGHT = /[\t\n]+$/g;
  var SPACE = " ";
  var TABS_OR_NL = /[\t\n\r]+/g;

  this._prepareText = function(state, text) {
    if (!state.trimWhitespaces) {
      return text;
    }
    // EXPERIMENTAL: drop all 'formatting' white-spaces (e.g., tabs and new lines)
    // (instead of doing so only at the left and right end)
    //text = text.replace(ALL_WS_NOTSPACE_LEFT, "");
    //text = text.replace(ALL_WS_NOTSPACE_RIGHT, "");
    text = text.replace(TABS_OR_NL, SPACE);
    if (state.lastChar === SPACE) {
      text = text.replace(WS_LEFT_ALL, SPACE);
    } else {
      text = text.replace(WS_LEFT, SPACE);
    }
    text = text.replace(WS_RIGHT, SPACE);
    // EXPERIMENTAL: also remove white-space within
    if (this.config.REMOVE_INNER_WS) {
      text = text.replace(WS_ALL, SPACE);
    }
    state.lastChar = text[text.length-1] || state.lastChar;
    return text;
  };

  // for error messages
  this.$toStr = function($el) {
    var $clone = $el.clone();
    $clone.empty();
    return $('<p>').append($clone).html();
  };

};
HtmlImporter.prototype = new HtmlImporter.Prototype();

HtmlImporter.ChildNodeIterator = function(arg) {
  this.nodes = arg.childNodes;
  this.length = this.nodes.length;
  this.pos = -1;
};

HtmlImporter.ChildNodeIterator.Prototype = function() {
  this.hasNext = function() {
    return this.pos < this.length - 1;
  };
  this.next = function() {
    this.pos += 1;
    return this.nodes[this.pos];
  };
  this.back = function() {
    if (this.pos >= 0) {
      this.pos -= 1;
    }
    return this;
  };
};
HtmlImporter.ChildNodeIterator.prototype = new HtmlImporter.ChildNodeIterator.Prototype();

module.exports = HtmlImporter;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../basics":169}],198:[function(require,module,exports){
'use strict';

var Document = require('./document');

Document.Schema = require('./document_schema');

Document.Node = require('./node');
Document.Annotation = require('./annotation');
Document.Container = require('./container');
Document.ContainerAnnotation = require('./container_annotation');
Document.TextNode = require('./text_node');

Document.Coordinate = require('./coordinate');
Document.Range = require('./range');
Document.Selection = require('./selection');
Document.nullSelection = Document.Selection.nullSelection;
Document.PropertySelection = require('./property_selection');
Document.ContainerSelection = require('./container_selection');
Document.TableSelection = require('./table_selection');

Document.Annotator = require('./annotator');
Document.AnnotationUpdates = require('./annotation_updates');

Document.HtmlImporter = require('./html_importer');
Document.HtmlExporter = require('./html_exporter');
Document.ClipboardImporter = require('./clipboard_importer');
Document.ClipboardExporter = require('./clipboard_exporter');

// Standard node implementations
Document.Include = require('./nodes/include');
Document.Paragraph = require('./nodes/paragraph');
Document.Heading = require('./nodes/heading');
Document.Emphasis = require('./nodes/emphasis');
Document.Strong = require('./nodes/strong');
Document.Link = require('./nodes/link');
Document.Table = require('./nodes/table');
Document.TableSection = require('./nodes/table_section');
Document.TableRow = require('./nodes/table_row');
Document.TableCell = require('./nodes/table_cell');
Document.List = require('./nodes/list');
Document.ListItem = require('./nodes/list_item');

Document.Transformations = require('./transformations');

module.exports = Document;

},{"./annotation":182,"./annotation_updates":184,"./annotator":185,"./clipboard_exporter":186,"./clipboard_importer":187,"./container":188,"./container_annotation":189,"./container_selection":191,"./coordinate":192,"./document":193,"./document_schema":195,"./html_exporter":196,"./html_importer":197,"./node":199,"./nodes/emphasis":200,"./nodes/heading":201,"./nodes/include":202,"./nodes/link":203,"./nodes/list":204,"./nodes/list_item":205,"./nodes/paragraph":206,"./nodes/strong":207,"./nodes/table":208,"./nodes/table_cell":209,"./nodes/table_row":211,"./nodes/table_section":212,"./property_selection":214,"./range":215,"./selection":216,"./table_selection":217,"./text_node":218,"./transformations":225}],199:[function(require,module,exports){
'use strict';

var _ = require('../basics');
var Data = require('../data');

var Node = Data.Node.extend({

  name: "node",

  attach: function(document) {
    this.document = document;
    this.didAttach(document);
  },

  detach: function() {
    var doc = this.document;
    this.document = null;
    this.didDetach(doc);
  },

  didAttach: function() {},

  didDetach: function() {},

  isAttached: function() {
    return this.document !== null;
  },

  getDocument: function() {
    return this.document;
  },

  hasParent: function() {
    return !!this.parent;
  },

  getParent: function() {
    return this.document.get(this.parent);
  },

  getRoot: function() {
    var node = this;
    while (node.hasParent()) {
      node = node.getParent();
    }
    return node;
  },

  getComponents: function() {
    var componentNames = this.constructor.static.components || [];
    if (componentNames.length === 0) {
      console.warn('Contract: a node must define its editable properties.', this.constructor.static.name);
    }
    return componentNames;
  },

  isExternal: function() {
    return this.constructor.static.external;
  },

  // Note: children are provided for inline nodes only.
  toHtml: function(converter, children) {
    return this.constructor.static.toHtml(this, converter, children);
  },

});

Node.initNodeClass = Data.Node.initNodeClass;

// default HTML serialization
Node.static.toHtml = function(node, converter) {
  var $ = converter.$;
  var $el = $('<div itemscope>')
    .attr('data-id', node.id)
    .attr('data-type', node.type);
  _.each(node.properties, function(value, name) {
    var $prop = $('<div').attr('itemprop', name);
    if (node.getPropertyType === 'string') {
      $prop[0].appendChild(converter.annotatedText([node.id, name]));
    } else {
      $prop.text(value);
    }
    $el.append($prop);
  });
  return $el[0];
};

Node.static.external = false;

module.exports = Node;

},{"../basics":169,"../data":175}],200:[function(require,module,exports){
var Annotation = require('../annotation');

var Emphasis = Annotation.extend({
  name: "emphasis",

  splitContainerSelections: true
});

Emphasis.static.tagName = "em";

Emphasis.static.matchElement = function($el) {
  return $el.is("em,i");
};

module.exports = Emphasis;

},{"../annotation":182}],201:[function(require,module,exports){
var TextNode = require('../text_node');

var Heading = TextNode.extend({
  name: "heading",
  properties: {
    "level": "number"
  }
});

// HtmlImporter

Heading.static.blockType = true;

Heading.static.tocType = true;

Heading.static.matchElement = function($el) {
  return /^h\d$/.exec($el[0].tagName.toLowerCase());
};

Heading.static.fromHtml = function($el, converter) {
  var id = converter.defaultId($el, 'heading');
  var heading = {
    id: id,
    level: parseInt(''+$el[0].tagName[1], 10),
    content: ''
  };
  heading.content = converter.annotatedText($el, [id, 'content']);
  return heading;
};

// HtmlExporter

Heading.static.toHtml = function(heading, converter) {
  var id = heading.id;
  var $el = $('<h' + heading.level + '>')
  $el.append(converter.annotatedText([id, 'content']));
  return $el;
};

module.exports = Heading;

},{"../text_node":218}],202:[function(require,module,exports){
var DocumentNode = require('../node');

var Include = DocumentNode.extend({
  name: "include",
  properties: {
    "nodeType": "string",
    "nodeId": "id"
  },

  getIncludedNode: function() {
    return this.getDocument().get(this.nodeId);
  },
});

Include.static.components = ['nodeId'];

Include.static.blockType = true;

Include.static.matchElement = function($el) {
  return $el.is('include');
};

Include.static.fromHtml = function($el, converter) {
  var id = converter.defaultId($el, 'include');
  var inc = {
    id: id,
    nodeId: $el.attr('data-rid'),
    nodeType: $el.attr('data-rtype'),
  };
  return inc;
};

Include.static.toHtml = function(inc, converter) {
  var id = inc.id;
  var $el = $('<include>')
    .attr('id', id)
    .attr('data-rtype', inc.nodeType)
    .attr('data-rid', inc.nodeId);
  return $el;
};

module.exports = Include;
},{"../node":199}],203:[function(require,module,exports){
var Annotation = require('../annotation');

var Link = Annotation.extend({
  name: "link",

  properties: {
    url: 'string'
  }
});

// HtmlImporter

Link.static.tagName = 'a';

Link.static.matchElement = function($el) {
  return $el.is('a');
};

Link.static.fromHtml = function($el, converter) {
  var link = {
    url: $el.attr('href')
  };
  // Note: we need to call back the converter
  // that it can process the element's inner html.
  // We do not need it for the link itself, though
  // TODO: maybe it is possible to detect if it has called back
  converter.annotatedText($el);
  return link;
};

Link.static.toHtml = function(link, converter, children) {
  var $el = Annotation.static.toHtml(link, converter, children);
  $el.attr('href', link.url);
  return $el;
};

module.exports = Link;

},{"../annotation":182}],204:[function(require,module,exports){
'use strict';

var _ = require('../../basics/helpers');
var DocumentNode = require('../node');

var List = DocumentNode.extend({
  name: "list",
  properties: {
    ordered: "bool",
    items: ["array", "id"]
  },
  getItems: function() {
    var doc = this.getDocument();
    return _.map(this.items, function(id) {
      return doc.get(id);
    }, this);
  },
});

List.static.components = ['items'];

// HtmlImporter

List.static.blockType = true;

List.static.matchElement = function($el) {
  return $el.is('ul,ol');
};

List.static.fromHtml = function($el, converter) {
  var id = converter.defaultId($el, 'list');
  var list = {
    id: id,
    ordered: false,
    items: []
  };
  if ($el.is('ol')) {
    list.ordered = true;
  }
  // Note: nested lists are not supported yet
  var level = 1;
  $el.children().each(function() {
    var $child = $(this);
    if ($child.is('li')) {
      var listItem = converter.convertElement($child, { parent: id, level: level });
      list.items.push(listItem.id);
    } else {
      converter.warning('List: unsupported child element. ' + converter.$toStr($child));
    }
  });
  return list;
};

List.static.toHtml = function(list, converter) {
  var tagName = list.ordered ? 'ol' : 'ul';
  var id = list.id;
  var $el = ('<' + tagName + '>')
    .attr('id', id);
  _.each(list.getItems(), function(item) {
    $el.append(item.toHtml(converter));
  });
  return $el;
};

Object.defineProperties(List.prototype, {
  itemNodes: {
    'get': function() {
      return this.getItems();
    }
  }
});

module.exports = List;

},{"../../basics/helpers":168,"../node":199}],205:[function(require,module,exports){
var Node = require('../node');

var ListItem = Node.extend({
  name: "list-item",
  properties: {
    parent: "id",
    level: "number",
    content: "string",
  },
});

ListItem.static.components = ['content'];

// HtmlImporter

ListItem.static.matchElement = function($el) {
  return $el.is('li');
};

ListItem.static.fromHtml = function($el, converter) {
  var level = $el.data('level') || 1;
  var id = converter.defaultId($el, 'li');
  var item = {
    id: id,
    level: level,
    content: ''
  };
  item.content = converter.annotatedText($el, [id, 'content']);
  return item;
};

ListItem.static.toHtml = function(item, converter) {
  var id = item.id;
  var $el = $('<li>')
    .attr('id', item.id)
    .data('level', item.level)
    .append(converter.annotatedText([id, 'content']))
  return $el;
};

module.exports = ListItem;

},{"../node":199}],206:[function(require,module,exports){
var TextNode = require('../text_node');

var Paragraph = TextNode.extend({
  name: "paragraph"
});

// HtmlImporter

Paragraph.static.blockType = true;

Paragraph.static.matchElement = function($el) {
  return $el.is('p');
};

Paragraph.static.fromHtml = function($el, converter) {
  var id = converter.defaultId($el, 'p');
  var paragraph = {
    id: id,
    content: ''
  };
  paragraph.content = converter.annotatedText($el, [id, 'content']);
  return paragraph;
};

// HtmlExporter

Paragraph.static.toHtml = function(paragraph, converter) {
  var id = paragraph.id;
  var $el = $('<p>')
    .attr('id', id);
  $el.append(converter.annotatedText([id, 'content']));
  return $el;
};

module.exports = Paragraph;

},{"../text_node":218}],207:[function(require,module,exports){
var Annotation = require('../annotation');

var Strong = Annotation.extend({
  name: "strong",

  // this means that it will annotate also when you have
  // selected multiple paragraphs, creating a single annotation
  // for every paragraph
  splitContainerSelections: true

});

Strong.static.tagName = 'strong';

Strong.static.matchElement = function($el) {
  return $el.is('strong,b');
};

module.exports = Strong;

},{"../annotation":182}],208:[function(require,module,exports){
var OO = require('../../basics/oo');
var _ = require('../../basics/helpers');
var Node = require('../node');
var TableMatrix = require('./table_matrix');

var Table = Node.extend({

  name: "table",

  matrix: null,

  properties: {
    "sections": ["array", "id"],
  },

  getSections: function() {
    var doc = this.getDocument();
    return _.map(this.sections, function(id) {
      return doc.get(id);
    }, this);
  },

  getSectionAt: function(secIdx) {
    var doc = this.getDocument();
    var secId = this.sections[secIdx];
    if (secId) {
      return doc.get(secId);
    } else {
      return null;
    }
  },

  attach: function() {
    this.super.attach.apply(this, arguments);
  },

  getMatrix: function() {
    if (!this.matrix) {
      this.matrix = new TableMatrix(this);
      this.matrix.update();
    }
    return this.matrix;
  },

  /**
   * Provides a cell iterator that allows convenient traversal regardless of
   * the structure with respect to sections.
   *
   * @return {ve.dm.TableNode.CellIterator}
   */
  getIterator: function() {
    return new Table.CellIterator(this);
  },

  /**
   */
  getSize: function ( dimension ) {
    var dim = this.matrix.getSize();
    if ( dimension === 'row' ) {
      return dim[0];
    } else if ( dimension === 'col' ) {
      return dim[1];
    } else {
      return dim;
    }
  }

});

Table.static.components = ['sections'];

// HtmlImporter

Table.static.blockType = true;

Table.static.matchElement = function($el) {
  return $el.is("table");
};

Table.static.fromHtml = function($el, converter) {
  var id = converter.defaultId($el, 'table');
  var table = {
    id: id,
    sections: []
  };
  // either we find thead, tbody, tfoot
  // or we take the rows right away
  _.each(["thead", "tbody", "tfoot"], function(name) {
    var $tsec = $el.find(name);
    if ($tsec.length) {
      var sectionNode = converter.convertElement($tsec, { parent: id });
      table.sections.push(sectionNode.id);
    }
  });

  if (table.sections.length === 0) {
    var sectionNode = {
      id: converter.nextId('tbody'),
      parent: id,
      type: "table-section",
      sectionType: "body",
      rows: []
    };
    $el.find('tr').each(function() {
      var $row = $(this);
      var rowNode = converter.convertElement($row, { parent: id });
      sectionNode.rows.push(rowNode.id);
    });
    converter.getDocument().create(sectionNode);
    table.sections.push(sectionNode.id);
  }

  return table;
};

Table.static.toHtml = function(table, converter) {
  var id = table.id;
  var $el = $('<table>')
    .attr('id', id);
  _.each(table.getSections(), function(sec) {
    $el.append(sec.toHtml(converter));
  });
  return $el;
};

Object.defineProperties(Table.prototype, {
  rowNodes: {
    'get': function() {
      return this.getRows();
    }
  }
});

/**
 * A helper class to iterate over the cells of a table node.
 *
 * It provides a unified interface to iterate cells in presence of table sections,
 * e.g., providing consecutive row indexes.
 *
 * @class
 * @constructor
 * @param {ve.dm.TableNode} [tableNode]
 */
Table.CellIterator = function(tableNode) {
  this.table = tableNode;

  this.__it = {
    sectionIndex: -1,
    rowIndex: -1,
    rowNode: null,
    cellIndex: -1,
    cellNode: null,
    sectionNode: null,
    finished: false
  };

  // hooks
  this.onNewSection = function() {};
  this.onNewRow = function() {};
};

Table.CellIterator.Prototype = function() {

  this.next = function() {
    if (this.__it.finished) throw new Error("TableCellIterator has no more cells left.");
    this.nextCell(this.__it);
    if (this.__it.finished) return null;
    else return this.__it.cellNode;
  };

  this.nextSection = function(it) {
    it.sectionIndex++;
    it.sectionNode = this.table.getSectionAt(it.sectionIndex);
    if (!it.sectionNode) {
      it.finished = true;
    } else {
      it.rowIndex = 0;
      it.rowNode = it.sectionNode.getRowAt(0);
      this.onNewSection(it.sectionNode);
    }
  };

  this.nextRow = function(it) {
    it.rowIndex++;
    if (it.sectionNode) {
      it.rowNode = it.sectionNode.getRowAt(it.rowIndex);
    }
    while (!it.rowNode && !it.finished) {
      this.nextSection(it);
    }
    if (it.rowNode) {
      it.cellIndex = 0;
      it.cellNode = it.rowNode.getCellAt(0);
      this.onNewRow(it.rowNode);
    }
  };

  this.nextCell = function(it) {
    if (it.cellNode) {
      it.cellIndex++;
      it.cellNode = it.rowNode.getCellAt(it.cellIndex);
    }
    // step into the next row if there is no next cell or if the column is
    // beyond the rectangle boundaries
    while (!it.cellNode && !it.finished) {
      this.nextRow(it);
    }
  };
};
OO.initClass(Table.CellIterator);

module.exports = Table;

},{"../../basics/helpers":168,"../../basics/oo":170,"../node":199,"./table_matrix":210}],209:[function(require,module,exports){
var Node = require('../node');

var TableCell = Node.extend({
  name: "table-cell",
  properties: {
    "parent": "id",
    "cellType": "string", // "head" or "data"
    "colspan": "number",
    "rowspan": "number",
    "content": "string"
  },
  getSpan: function(dim) {
    if (dim === "col") {
      return this.colspan || 1;
    } else if (dim === "row") {
      return this.rowspan || 1;
    }
  }
});

TableCell.static.components = ['content'];

// HtmlImporter

TableCell.static.matchElement = function($el) {
  return $el.is('th, td');
};

TableCell.static.fromHtml = function($el, converter) {
  var id = converter.defaultId($el, 'tcell');
  var tableCell = {
    id: id,
    content: ""
  };
  if ($el.is('th')) {
    tableCell.cellType = "head";
  } else {
    tableCell.cellType = "data";
  }
  var colspan = $el.attr('colspan');
  if (colspan) {
    tableCell.colspan = parseInt(colspan, 10);
  }
  var rowspan = $el.attr('rowspan');
  if (rowspan) {
    tableCell.rowspan = parseInt(rowspan, 10);
  }
  tableCell.content = converter.annotatedText($el, [id, 'content']);
  return tableCell;
};

TableCell.static.toHtml = function(cell, converter) {
  var id = cell.id;
  var tagName = (cell.cellType==="head" ? "th" : "td");
  var $el = $('<' + tagName + '>')
    .attr('id', 'id')
    .append(converter.annotatedText([id, 'content']));
  return $el;
};

Object.defineProperties(TableCell.prototype, {
  isData: {
    'get': function() {
      return this.cellType === "data";
    }
  }
});

module.exports = TableCell;

},{"../node":199}],210:[function(require,module,exports){
var OO = require('../../basics/oo');

/**
 * A helper class that allows random access to the table cells
 * and introduces place-holders for fields occupied by spanning cells,
 * making it a non-sparse representation of the sparse HTML model.
 * This is essential for the implementation of table manipulations, such as row insertions or deletions.
 *
 * Example:
 *
 * <table>
 *   <tr><td rowspan=2>1</td><td colspan=2>2</td><td rowspan=2 colspan=2>3</td></tr>
 *   <tr><td>4</td><td>5</td></tr>
 * </table>
 *
 * Visually this table would look like:
 *
 *  -------------------
 * | 1 | 2     | 3     |
 * |   |-------|       |
 * |   | 4 | 5 |       |
 *  -------------------
 *
 * The HTML model is sparse which makes it hard to read but also difficult to work with programmatically.
 * The corresponding TableCellMatrix would look like:
 *
 * | C[1] | C[2] | P[2] | C[3] | P[3] |
 * | P[1] | C[4] | C[5] | P[3] | P[3] |
 *
 * Where C[1] represents a Cell instance wrapping cell 1,
 * and P[1] a PlaceHolder instance owned by that cell.
 *
 * @class
 * @constructor
 * @param {ve.dm.TableNode} [tableNode] Reference to a table instance
 */
function TableMatrix(tableNode) {
  this.tableNode = tableNode;
  // Do not access these directly as they get invalidated on structural changes
  // Use the accessor methods instead.
  this._matrix = null;
  this._rowNodes = null;
};

TableMatrix.Prototype = function() {
  /**
   * Invalidates the matrix structure.
   *
   * This is called by ve.dm.TableNode on structural changes.
   */
  this.invalidate = function() {
    this._matrix = null;
    this._rowNodes = null;
  };

  /**
   * Recreates the matrix structure.
   */
  this.update = function() {
    var cellNode, cell,
      rowSpan, colSpan, i, j, _row, _col,
      matrix = [],
      rowNodes = [],
      iterator = this.tableNode.getIterator(),
      row = -1, col = -1;

    // hook to react on row transitions
    iterator.onNewRow = function( rowNode ) {
      row++; col = -1;
      // initialize a matrix row
      matrix[row] = matrix[row] || [];
      // store the row node
      rowNodes.push(rowNode);
    };

    // Iterates through all cells and stores the cells as well as
    // so called placeholders into the matrix.
    while ((cellNode = iterator.next()) !== null)  {
      col++;
      // skip placeholders
      while (matrix[row][col]) {
        col++;
      }
      cell = new TableMatrix.Cell(cellNode, row, col);
      // store indexes
      cellNode.rowIdx = row;
      cellNode.colIdx = col;
      // store the cell in the matrix
      matrix[row][col] = cell;
      // add place holders for spanned cells
      rowSpan = cellNode.getSpan('row');
      colSpan = cellNode.getSpan('col');
      if (rowSpan === 1 && colSpan === 1) continue;
      for (i = 0; i < rowSpan; i++) {
        for (j = 0; j < colSpan; j++) {
          if (i===0 && j===0) continue;
          _row = row + i;
          _col = col + j;
          // initialize the cell matrix row if not yet present
          matrix[_row] = matrix[_row] || [];
          matrix[_row][_col] = new TableMatrix.Placeholder(cell, _row, _col);
        }
      }
    }
    this._matrix = matrix;
    this._rowNodes = rowNodes;
  };

  /**
   * Retrieves a single cell.
   *
   * @param {Number} [row]
   * @param {Number} [col]
   * @return {ve.dm.TableMatrix.Cell}
   */
  this.getCell = function(row, col) {
    var matrix = this.getMatrix();
    return matrix[row][col];
  };

  /**
   * Retrieves all cells of a column with given index.
   *
   * @param {Number} [col]
   * @return {ve.dm.TableMatrix.Cell[]} The cells of a column
   */
  this.getColumn = function(col) {
    var cells, row,
      matrix = this.getMatrix();
    cells = [];
    for (row = 0; row < matrix.length; row++) {
      cells.push(matrix[row][col]);
    }
    return cells;
  };

  /**
   * Retrieves all cells of a row with given index.
   *
   * @param {Number} [row]
   * @return {ve.dm.TableMatrix.Cell[]} The cells of a row
   */
  this.getRow = function(row) {
    var matrix = this.getMatrix();
    return matrix[row];
  };

  /**
   * Retrieves the row node of a row with given index.
   *
   * @param {Number} [row]
   * @return {ve.dm.TableRowNode}
   */
  this.getRowNode = function(row) {
    var rowNodes = this.getRowNodes();
    return rowNodes[row];
  };

  /**
   * Provides a reference to the internal cell matrix.
   *
   * Note: this is primarily for internal use. Do not change the delivered matrix
   * and do not store as it may be invalidated.
   *
   * @return {ve.dm.TableMatrix.Cell[]}
   */
  this.getMatrix = function() {
    if (!this._matrix) this.update();
    return this._matrix;
  };

  /**
   * Provides a reference to the internal array of row nodes.
   *
   * Note: this is primarily for internal use. Do not change the delivered array
   * and do not store it as it may be invalidated.
   *
   * @return {ve.dm.TableRowNode[]}
   */
  this.getRowNodes = function() {
    if (!this._rowNodes) this.update();
    return this._rowNodes;
  };

  /**
   * Computes a the rectangle for a given start and end cell node.
   *
   *
   * @param {ve.dm.TableCellNode} [startCellNode] start anchor
   * @param {ve.dm.TableCellNode} [endCellNode] end anchor
   * @return {ve.dm.TableMatrix.Rectangle}
   */
  this.getRectangle = function ( startCellNode, endCellNode ) {
    var startCell, endCell, minRow, maxRow, minCol, maxCol;
    startCell = this.lookupCell(startCellNode);
    if (!startCell) return null;
    if (startCellNode === endCellNode) {
      endCell = startCell;
    } else {
      endCell = this.lookupCell(endCellNode);
    }
    minRow = Math.min(startCell.row, endCell.row);
    maxRow = Math.max(startCell.row, endCell.row);
    minCol = Math.min(startCell.col, endCell.col);
    maxCol = Math.max(startCell.col, endCell.col);
    return new TableMatrix.Rectangle(minRow, minCol, maxRow, maxCol);
  };

  /**
   * Retrieves all cells (no placeholders) within a given rectangle.
   *
   * @param {ve.dm.TableMatrix.Rectangle} [rect]
   * @return {ve.dm.TableMatrix.Cell[]}
   */
  this.getCellsForRectangle = function ( rect ) {
    var row, col, cells, visited, cell;
    cells = [];
    visited = {};
    for (row = rect.start.row; row <= rect.end.row; row++) {
      for (col = rect.start.col; col <= rect.end.col; col++) {
        cell = this.getCell(row, col);
        if (cell.type === 'placeholder') cell = cell.owner;
        if (!visited[cell.key]) {
          cells.push(cell);
          visited[cell.key] = true;
        }
      }
    }
    return cells;
  };

  /**
   * Retrieves a bounding rectangle for all cells described by a given rectangle.
   * This takes spanning cells into account.
   *
   * @param {ve.dm.TableMatrix.Rectangle} [rect]
   * @return {ve.dm.TableMatrix.Rectangle} A new rectangle
   */
  this.getBoundingRectangle = function (rect) {
    var cells, cell, i;
    rect = TableMatrix.Rectangle.copy(rect);
    cells = this.getCellsForRectangle(rect);
    if (!cells || cells.length === 0) return null;
    for (i = 0; i < cells.length; i++) {
      cell = cells[i];
      rect.start.row = Math.min(rect.start.row, cell.row);
      rect.start.col = Math.min(rect.start.col, cell.col);
      rect.end.row = Math.max(rect.end.row, cell.row + cell.node.getSpan('row') - 1);
      rect.end.col = Math.max(rect.end.col, cell.col + cell.node.getSpan('col') - 1);
    }
    return rect;
  };

  /**
   * Provides a tuple with number of rows and columns.
   *
   * @return {Number[2]} (number of rows) X (number of columns)
   */
  this.getSize = function () {
    var matrix = this.getMatrix();
    if (matrix.length === 0) {
      return { rows: 0,  cols: 0 };
    } else {
      return { rows: matrix.length,  cols: matrix[0].length };
    }
  };

  /**
   * Looks up the cell for a given cell node.
   *
   * @return {ve.dm.TableMatrix.Cell} The cell or null if not found
   */
  this.lookupCell = function( cellNode ) {
    var row, col, cell, rowCells,
      matrix = this.getMatrix(),
      rowNodes = this.getRowNodes();
    row = rowNodes.indexOf(cellNode.parent);
    if (row < 0) return null;
    cell = null;
    rowCells = matrix[row];
    for (col = 0; col < rowCells.length; col++) {
      cell = rowCells[col];
      if (cell.node === cellNode) {
        break;
      }
    }
    return cell;
  };

  /**
   * Finds the closest cell not being a placeholder for a given cell.
   *
   * @return {ve.dm.TableMatrix.Cell}
   */
  this.findClosestCell = function(cell) {
    var col, rowCells,
      matrix = this.getMatrix();
    rowCells = matrix[cell.row];
    for (col = cell.col; col >= 0; col--) {
      if (rowCells[col].type === 'cell') return rowCells[col];
    }
    for (col = cell.col + 1; col < rowCells.length; col++) {
      if (rowCells[col].type === 'cell') return rowCells[col];
    }
    return null;
  };
};

OO.initClass(TableMatrix);

/**
 * An object wrapping a table cell node, augmenting it with row and column indexes.
 *
 * @class
 * @constructor
 * @param {ve.dm.TableCellNode} [node]
 * @param {Number} [row] row index
 * @param {Number} [col] column index
 */
TableMatrix.Cell = function Cell(node, row, col) {
  this.type = 'cell';
  this.node = node;
  this.row = row;
  this.col = col;
  this.key = row + '_' + col;
};

TableMatrix.Cell.sortDescending = function( a, b ) {
  if (a.row !== b.row) return b.row - a.row;
  return b.col - a.col;
};

/**
 * An object representing a cell which is occupied by another cell with 'rowspan' or 'colspan' attribute.
 * Placeholders are used to create a dense representation of the sparse HTML table model.
 *
 * @class
 * @constructor
 * @param {ve.dm.TableMatrix.Cell} [owner]
 * @param {Number} [row] row index
 * @param {Number} [col] column index
 */
TableMatrix.Placeholder = function PlaceHolder( owner, row, col ) {
  TableMatrix.Cell.call(this, owner.node, row, col);
  this.type = 'placeholder';
  this.owner = owner;
};

OO.inherit(TableMatrix.Placeholder, TableMatrix.Cell);

/**
 * An object describing a rectangular selection in a table matrix.
 * It has two properties, 'start' and 'end', which both are objects with
 * properties 'row' and 'col'. 'start' describes the upper-left, and
 * 'end' the lower-right corner of the rectangle.
 *
 * @class
 * @constructor
 * @param {Number} [minRow] row index of upper-left corner
 * @param {Number} [minCol] column index of upper-left corner
 * @param {Number} [maxRow] row index of lower-left corner
 * @param {Number} [maxCol] column index of lower-left corner
 */
TableMatrix.Rectangle = function( minRow, minCol, maxRow, maxCol ) {
  this.start = { row: minRow, col: minCol };
  this.end = { row: maxRow, col: maxCol };
};

TableMatrix.Rectangle.copy = function( rect ) {
  return new TableMatrix.Rectangle(rect.start.row, rect.start.col, rect.end.row, rect.end.col);
};

module.exports = TableMatrix;

},{"../../basics/oo":170}],211:[function(require,module,exports){
var Node = require('../node');
var _ = require('../../basics/helpers');

var TableRow = Node.extend({
  name: "table-row",
  properties: {
    "parent": "id",
    "cells": ["array", "id"]
  },
  getCells: function() {
    var doc = this.getDocument();
    return _.map(this.cells, function(id) {
      return doc.get(id);
    }, this);
  },
  getCellAt: function(cellIdx) {
    var doc = this.getDocument();
    var cellId = this.cells[cellIdx];
    if (cellId) {
      return doc.get(cellId);
    } else {
      return null;
    }
  },
});

TableRow.static.components = ['cells'];


// HtmlImporter

TableRow.static.matchElement = function($el) {
  return $el.is('tr');
};

TableRow.static.fromHtml = function($el, converter) {
  var id = converter.defaultId($el, 'tr');
  var tableRow = {
    id: id,
    cells: []
  };
  $el.find('th,td').each(function() {
    var $cell = $(this);
    var cellNode = converter.convertElement($cell, { parent: id });
    tableRow.cells.push(cellNode.id);
  });
  return tableRow;
};

TableRow.static.toHtml = function(row, converter) {
  var id = row.id;
  var $el = $('<tr>').attr('id', id);
  _.each(row.getCells(), function(cell) {
    $el.append(cell.toHtml(converter));
  });
  return $el;
};

Object.defineProperties(TableRow.prototype, {
  cellNodes: {
    'get': function() {
      return this.getCells();
    }
  }
});

module.exports = TableRow;

},{"../../basics/helpers":168,"../node":199}],212:[function(require,module,exports){
var Node = require('../node');
var _ = require('../../basics/helpers');

var TableSection = Node.extend({
  name: "table-section",
  properties: {
    "parent": "id",
    "rows": ["array", "id"],
    "sectionType": "string",
  },
  getRows: function() {
    var doc = this.getDocument();
    return _.map(this.rows, function(id) {
      return doc.get(id);
    }, this);
  },
  getRowAt: function(rowIdx) {
    var doc = this.getDocument();
    var rowId = this.rows[rowIdx];
    if (rowId) {
      return doc.get(rowId);
    } else {
      return null;
    }
  },
});

TableSection.static.components = ['rows'];


// HtmlImporter

TableSection.static.matchElement = function($el) {
  return $el.is('thead, tbody, tfoot');
};

TableSection.static.fromHtml = function($el, converter) {
  var tagName = $el[0].tagName.toLowerCase();
  var sectionType = tagName.substring(1);
  var id = converter.defaultId($el, tagName);
  var tableSection = {
    id: id,
    sectionType: sectionType,
    rows: []
  };
  $el.find('tr').each(function() {
    var $row = $(this);
    var rowNode = converter.convertElement($row, { parent: id });
    tableSection.rows.push(rowNode.id);
  });
  return tableSection;
};

TableSection.static.toHtml = function(sec, converter) {
  var id = sec.id;
  var $el = $('<t' + sec.sectionType + '>')
    .attr('id', id);
  _.each(sec.getRows(), function(row) {
    $el.append(row.toHtml(converter));
  });
  return $el;
};

Object.defineProperties(TableSection.prototype, {
  cellNodes: {
    'get': function() {
      return this.getCells();
    }
  }
});

module.exports = TableSection;

},{"../../basics/helpers":168,"../node":199}],213:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var PathAdapter = require('../basics/path_adapter');

var NotifyByPathProxy = function(doc) {
  this.listeners = new PathAdapter();
  this._list = [];
  this.doc = doc;
};

NotifyByPathProxy.Prototype = function() {

  this.onDocumentChanged = function(change, info, doc) {
    var listeners = this.listeners;
    var updated = change.updated;

    function _updated(path, op) {
      if (!change.deleted[path[0]]) {
        updated.add(path, op);
      }
    }

    _.each(change.ops, function(op) {
      if ( (op.type === "create" || op.type === "delete") && (op.val.path || op.val.startPath)) {
        if (op.val.path) {
          _updated(op.val.path, op);
        } else if (op.val.startPath) {
          _updated(op.val.startPath, op);
          _updated(op.val.endPath, op);
        }
      }
      else if (op.type === "set" && (op.path[1] === "path" || op.path[1] === "startPath" || op.path[1] === "endPath")) {
        _updated(op.val, op);
        _updated(op.original, op);
      }
      else if (op.type === "set" && (op.path[1] === "startOffset" || op.path[1] === "endOffset")) {
        var anno = this.doc.get(op.path[0]);
        if (anno) {
          if (anno.path) {
            _updated(anno.path, op);
          } else {
            _updated(anno.startPath, op);
            _updated(anno.endPath, op);
          }
        }
      }
    }, this);
    change.traverse(function(path) {
      var key = path.concat(['listeners']);
      var scopedListeners = listeners.get(key);
      _.each(scopedListeners, function(entry) {
        entry.method.call(entry.listener, change, info, doc);
      });
    }, this);
  };

  this.add = function(path, listener, method) {
    var key = path.concat(['listeners']);
    var listeners = this.listeners.get(key);
    if (!listeners) {
      listeners = [];
      this.listeners.set(key, listeners);
    }
    if (!method) {
      throw new Error('Invalid argument: expected function but got ' + method);
    }
    listeners.push({ method: method, listener: listener });
  };

  this.connect = function(listener, path, method) {
    this.add(path, listener, method);
  };

  // TODO: it would be cool if we would just need to provide the listener instance, no path
  this.remove = function(path, listener) {
    var key = path.concat(['listeners']);
    var listeners = this.listeners.get(key);
    if (listeners) {
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].listener === listener) {
          listeners.splice(i, 1);
          return;
        }
      }
    }
  };

  this.disconnect = function(listener, path) {
    this.remove(path, listener);
  };

};

OO.initClass(NotifyByPathProxy);

module.exports = NotifyByPathProxy;

},{"../basics/helpers":168,"../basics/oo":170,"../basics/path_adapter":171}],214:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var Selection = require('./selection');
var Coordinate = require('./coordinate');
var Range = require('./range');

function PropertySelection(properties) {
  var path = properties.path;
  var startOffset = properties.startOffset;
  var endOffset = properties.endOffset || properties.startOffset;
  if (!path || !_.isNumber(startOffset)) {
    throw new Error('Invalid arguments: `path` and `startOffset` are mandatory');
  }
  this.range = new Range(
    new Coordinate(path, startOffset),
    new Coordinate(path, endOffset)
  );
  this.reverse = properties.reverse;
  this._internal = {};
  Object.freeze(this);
}

PropertySelection.Prototype = function() {

  _.extend(this, Selection.prototype);

  this.toJSON = function() {
    return {
      type: 'property',
      path: this.path,
      startOffset: this.startOffset,
      endOffset: this.endOffset,
      reverse: this.reverse
    };
  };

  this.attach = function(doc) {
    this._internal.doc = doc;
    return this;
  };

  this.isNull = function() {
    return false;
  };

  this.getRanges = function() {
    return [this.range];
  };

  this.getRange = function() {
    return this.range;
  };

  this.isCollapsed = function() {
    return this.range.isCollapsed();
  };

  this.isReverse = function() {
    return this.reverse;
  };

  this.isPropertySelection = function() {
    return true;
  };

  this.isMultiSeletion = function() {
    return false;
  };

  this.equals = function(other) {
    return (
      Selection.prototype.equals.call(this, other) &&
      !other.isTableSelection() &&
      this.range.equals(other.range)
    );
  };

  this.collapse = function(direction) {
    var coor;
    if (direction === 'left') {
      coor = this.range.start;
    } else {
      coor = this.range.end;
    }
    return this.createWithNewRange(coor.offset, coor.offset);
  };

  // Helper Methods
  // ----------------------

  this.getPath = function() {
    return this.range.start.path;
  };

  this.getStartOffset = function() {
    return this.range.start.offset;
  };

  this.getEndOffset = function() {
    return this.range.end.offset;
  };

  this.toString = function() {
    return [
      "PropertySelection(", JSON.stringify(this.range.start.path), ", ",
        this.range.start.offset, " -> ", this.range.end.offset,
        (this.reverse?", reverse":""),
        (this.range.start.after?", after":""),
      ")"
    ].join('');
  };

  this.isInsideOf = function(other, strict) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.isInsideOf: delegating to ContainerSelection.contains...');
      return other.contains(this);
    }
    if (strict) {
      return (_.isEqual(this.path, other.path) &&
        this.start.offset > other.start.offset &&
        this.end.offset < other.end.offset);
    } else {
      return (_.isEqual(this.path, other.path) &&
        this.start.offset >= other.start.offset &&
        this.end.offset <= other.end.offset);
    }
  };

  this.contains = function(other, strict) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.contains: delegating to ContainerSelection.isInsideOf...');
      return other.isInsideOf(this);
    }
    if (strict) {
      return (_.isEqual(this.path, other.path) &&
        this.start.offset < other.start.offset &&
        this.end.offset > other.end.offset);
    } else {
      return (_.isEqual(this.path, other.path) &&
        this.start.offset <= other.start.offset &&
        this.end.offset >= other.end.offset);
    }
  };

  this.overlaps = function(other, strict) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.overlaps: delegating to ContainerSelection.overlaps...');
      return other.overlaps(this);
    }
    if (!_.isEqual(this.getPath(), other.getPath())) return false;
    if (strict) {
      return (! (this.startOffset>=other.endOffset||this.endOffset<=other.startOffset) );
    } else {
      return (! (this.startOffset>other.endOffset||this.endOffset<other.startOffset) );
    }
  };

  this.isRightAlignedWith = function(other) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.isRightAlignedWith: delegating to ContainerSelection.isRightAlignedWith...');
      return other.isRightAlignedWith(this);
    }
    return (_.isEqual(this.getPath(), other.getPath()) &&
      this.getEndOffset() === other.getEndOffset());
  };

  this.isLeftAlignedWith = function(other) {
    if (other.isNull()) return false;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.isLeftAlignedWith: delegating to ContainerSelection.isLeftAlignedWith...');
      return other.isLeftAlignedWith(this);
    }
    return (_.isEqual(this.getPath(), other.getPath()) &&
      this.getStartOffset() === other.getStartOffset());
  };

  this.expand = function(other) {
    if (other.isNull()) return this;
    if (other.isContainerSelection()) {
      // console.log('PropertySelection.expand: delegating to ContainerSelection.expand...');
      return other.expand(this);
    }
    if (!_.isEqual(this.path, other.path)) {
      throw new Error('Can not expand PropertySelection to a different property.');
    }
    var newStartOffset = Math.min(this.startOffset, other.startOffset);
    var newEndOffset = Math.max(this.endOffset, other.endOffset);
    return this.createWithNewRange(newStartOffset, newEndOffset);
  };

  this.createWithNewRange = function(startOffset, endOffset) {
    return new PropertySelection({
      path: this.path,
      startOffset: startOffset,
      endOffset: endOffset
    });
  };

  this.truncate = function(other) {
    if (other.isNull()) return this;
    // Checking that paths are ok
    // doing that in a generalized manner so that other can even be a ContainerSelection
    if (!_.isEqual(this.start.path, other.start.path) ||
      !_.isEqual(this.end.path, other.end.path)) {
      throw new Error('Can not expand PropertySelection to a different property.');
    }
    var newStartOffset;
    var newEndOffset;
    if (this.startOffset === other.startOffset) {
      newStartOffset = other.endOffset;
      newEndOffset = this.endOffset;
    } else if (this.endOffset === other.endOffset) {
      newStartOffset = this.startOffset;
      newEndOffset = other.startOffset;
    }
    return this.createWithNewRange(newStartOffset, newEndOffset);
  };

  this._coordinates = function() {
    return this;
  };
};

OO.inherit(PropertySelection, Selection);

Object.defineProperties(PropertySelection.prototype, {
  start: {
    get: function() {
      return this.range.start;
    },
    set: function() { throw new Error('immutable.'); }
  },
  end: {
    get: function() {
      return this.range.end;
    },
    set: function() { throw new Error('immutable.'); }
  },
  path: {
    get: function() {
      return this.range.start.path;
    },
    set: function() { throw new Error('immutable.'); }
  },
  startOffset: {
    get: function() {
      return this.range.start.offset;
    },
    set: function() { throw new Error('immutable.'); }
  },
  endOffset: {
    get: function() {
      return this.range.end.offset;
    },
    set: function() { throw new Error('immutable.'); }
  },
  collapsed: {
    get: function() {
      return this.isCollapsed();
    },
    set: function() { throw new Error('immutable.'); }
  },

});

module.exports = PropertySelection;

},{"../basics/helpers":168,"../basics/oo":170,"./coordinate":192,"./range":215,"./selection":216}],215:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

var Range = function(start, end) {
  this.start = start;
  this.end = end;
  Object.freeze(this);
};

Range.Prototype = function() {

  this.isCollapsed = function() {
    return this.start.equals(this.end);
  };

  this.equals = function(other) {
    if (this === other) return true;
    else return (this.start.equals(other.start) && this.end.equals(other.end));
  };

};

Substance.initClass(Range);

module.exports = Range;

},{"../basics":169}],216:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

function Selection() {
}

Selection.Prototype = function() {

  this.getRanges = function() {
    return [];
  };

  this.isNull = function() {
    return false;
  };

  this.isMultiSeletion = function() {
    return false;
  };

  this.isPropertySelection = function() {
    return false;
  };

  this.isContainerSelection = function() {
    return false;
  };

  this.isTableSelection = function() {
    return false;
  };

  this.isCollapsed = function() {
    return true;
  };

  this.isReverse = function() {
    return false;
  };

  this.equals = function(other) {
    if (this === other) {
      return true ;
    } else if (!other) {
      return false;
    } else if (this.isNull() !== other.isNull()) {
      return false;
    } else {
      return true;
    }
  };

  this.toString = function() {
    return "null";
  };

};

Substance.initClass(Selection);

var NullSelection = function() {};
NullSelection.Prototype = function() {
  this.isNull = function() {
    return true;
  };
};
Substance.inherit(NullSelection, Selection);
Selection.nullSelection = Object.freeze(new NullSelection());

module.exports = Selection;

},{"../basics":169}],217:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var _ = require('../basics/helpers');
var Selection = require('./selection');

function TableSelection(properties) {
  this.tableId = properties.tableId;
  if (properties.rectangle) {
    this.rectangle = properties.rectangle;
  } else {
    this.rectangle = new TableSelection.Rectangle(properties.startRow, properties.startCol,
      properties.endRow, properties.endCol);
  }
  if (!this.tableId) {
    throw new Error('Invalid arguments. `tableId` is mandatory.');
  }
  this._internal = {};
  Object.freeze(this);
}

TableSelection.Prototype = function() {

  this.isPropertySelection = function() {
    return false;
  };

  this.isTableSelection = function() {
    return true;
  };

  this.isSingleCell = function() {
    return this.rectangle.isSingleCell();
  };

  this.getTableId = function() {
    return this.tableId;
  };

  this.getRectangle = function() {
    return this.rectangle;
  };

  this.equals = function(other) {
    return (Selection.prototype.equals.call(this, other) &&
      !other.isTableSelection() &&
      (this.startRow === other.startRow && this.endRow === other.endRow &&
       this.startCol === other.startCol && this.ednCol === other.endCol ));
  };

  this.toString = function() {
    var r = this.rectangle;
    return "T[("+ r.start.row + "," + r.start.col + "), ("+ r.end.row + ", " + r.end.col +")]";
  };

  this.attach = function(doc) {
    this._internal.doc = doc;
    return this;
  };

};

Substance.inherit(TableSelection, Selection);

Object.defineProperties(TableSelection.prototype, {
  startRow: {
    get: function() {
      return this.rectangle.start.row;
    }
  },
  endRow: {
    get: function() {
      return this.rectangle.end.row;
    }
  },
  startCol: {
    get: function() {
      return this.rectangle.start.col;
    }
  },
  endCol: {
    get: function() {
      return this.rectangle.end.col;
    }
  },
});

TableSelection.Rectangle = function(startRow, startCol, endRow, endCol) {
  var minRow = Math.min(startRow, endRow);
  var maxRow = Math.max(startRow, endRow);
  var minCol = Math.min(startCol, endCol);
  var maxCol = Math.max(startCol, endCol);

  this.start = {
    row: minRow,
    col: minCol
  };
  this.end = {
    row: maxRow,
    col: maxCol
  };
  Object.freeze(this.start);
  Object.freeze(this.end);
  Object.freeze(this);
};

TableSelection.Rectangle.prototype.isSingleCell = function() {
  return (this.start.row === this.end.row && this.start.col === this.end.col);
};

module.exports = TableSelection;

},{"../basics":169,"../basics/helpers":168,"./selection":216}],218:[function(require,module,exports){
'use strict';

var Node = require('./node');

// Text Node
// ---------
//
// A base class for all text-ish nodes, such as Paragraphs, Headings,
// Prerendered, etc.

var TextNode = Node.extend({
  name: "text",
  properties: {
    content: 'string'
  },
});

TextNode.static.components = ['content'];

module.exports = TextNode;

},{"./node":199}],219:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var AbstractDocument = require('./abstract_document');

var __id__ = 0;

function TransactionDocument(document) {
  AbstractDocument.call(this, document.schema);
  this.__id__ = "TX_"+__id__++;

  this.document = document;
  // ops recorded since transaction start
  this.ops = [];
  // app information state information used to recover the state before the transaction
  // when calling undo
  this.before = {};
  // HACK: copying all indexes
  _.each(document.data.indexes, function(index, name) {
    this.data.addIndex(name, index.clone());
  }, this);

  this.loadSeed(document.toJSON());
}

TransactionDocument.Prototype = function() {

  this.isTransaction = function() {
    return true;
  };

  this.reset = function() {
    this.ops = [];
    this.before = {};
    this._resetContainers();
  };

  this.create = function(nodeData) {
    var op = this.data.create(nodeData);
    if (!op) return;
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
    // TODO: incremental graph returns op not the node,
    // so probably here we should too?
    return this.data.get(nodeData.id);
  };

  this.delete = function(nodeId) {
    var op = this.data.delete(nodeId);
    if (!op) return;
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
    return op;
  };

  this.set = function(path, value) {
    var op = this.data.set(path, value);
    if (!op) return;
    this._updateContainers(op);
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
    return op;
  };

  this.update = function(path, diffOp) {
    var op = this.data.update(path, diffOp);
    if (!op) return;
    this._updateContainers(op);
    if (this.document.isTransacting) {
      this.ops.push(op);
    }
    return op;
  };

  this.save = function(afterState, info) {
    var before = this.before;
    var after = _.extend({}, before, afterState);
    this.document._saveTransaction(before, after, info);
    // reset after finishing
    this.reset();
  };

  this.cancel = function() {
    // revert all recorded changes
    for (var i = this.ops.length - 1; i >= 0; i--) {
      this.data.apply(this.ops[i].invert());
    }
    this.document._cancelTransaction();
    this.reset();
  };

  this.finish = function() {
    if (this.document.isTransacting) {
      this.cancel();
    }
  };

  this.cleanup = this.finish;

  this.getOperations = function() {
    return this.ops;
  };

  this.apply = function(documentChange) {
    _.each(documentChange.ops, function(op) {
      this.data.apply(op);
      this._updateContainers(op);
    }, this);
  };

  this.getIndex = function(name) {
    return this.data.getIndex(name);
  };

  // Called back by Substance.Data after a node instance has been created
  this._didCreateNode = function(node) {
    node.document = this;
  };

  this._didDeleteNode = function(node) {
    node.document = null;
  };

  this.createSelection = function() {
    return this.document.createSelection.apply(this, arguments);
  };

  this.getSchema = function() {
    return this.schema;
  };

};

OO.inherit(TransactionDocument, AbstractDocument);

module.exports = TransactionDocument;

},{"../basics/helpers":168,"../basics/oo":170,"./abstract_document":180}],220:[function(require,module,exports){
'use strict';

var Substance = require('../../basics');
var deleteSelection = require('./delete_selection');
var Annotations = require('../annotation_updates');

/* jshint latedef: false */

/**
 * @params args object with fields `selection`, `containerId`
 */
function breakNode(tx, args) {
  if (!args.selection) {
    throw new Error("Argument 'selection' is mandatory.");
  }
  if (!args.containerId) {
    throw new Error("Argument 'containerId' is mandatory.");
  }
  if (!args.selection.isCollapsed()) {
    var out = deleteSelection(tx, args);
    args.selection = out.selection;
  }
  var range = args.selection.getRange();
  var node = tx.get(range.start.path[0]);
  // TODO: we want to allow custom break behaviors
  // for that to happen we need to learn more
  if (node.isInstanceOf('text')) {
    return breakTextNode(tx, args);
  } else {
    console.info("Breaking is not supported for node type %s.", node.type);
    return args;
  }
}

function breakTextNode(tx, args) {
  var selection = args.selection;
  var containerId = args.containerId;
  if (!selection.isPropertySelection()) {
    throw new Error('Expected property selection.');
  }
  var range = selection.getRange();
  var path = range.start.path;
  var offset = range.start.offset;
  var node = tx.get(path[0]);

  // split the text property and create a new paragraph node with trailing text and annotations transferred
  var text = node.content;
  var container = tx.get(containerId);
  var nodePos = container.getPosition(node.id);
  var id = Substance.uuid(node.type);
  var newPath = [id, 'content'];
  var newNode;
  // when breaking at the first position, a new node of the same
  // type will be inserted.
  if (offset === 0) {
    newNode = tx.create({
      id: id,
      type: node.type,
      content: ""
    });
    // show the new node
    container.show(id, nodePos);
    selection = tx.createSelection({
      type: 'property',
      path: path,
      startOffset: 0
    });
  }
  // otherwise a default text type node is inserted
  else {
    // create a new node
    newNode = tx.create({
      id: id,
      type: tx.getSchema().getDefaultTextType(),
      content: text.substring(offset)
    });
    if (offset < text.length) {
      // transfer annotations which are after offset to the new node
      Annotations.transferAnnotations(tx, path, offset, [id, 'content'], 0);
      // truncate the original property
      tx.update(path, {
        delete: { start: offset, end: text.length }
      });
    }
    // show the new node
    container.show(id, nodePos+1);
    // update the selection
    selection = tx.createSelection({
      type: 'property',
      path: newPath,
      startOffset: 0
    });
  }
  return {
    selection: selection,
    node: newNode
  };
}

module.exports = breakNode;

},{"../../basics":169,"../annotation_updates":184,"./delete_selection":224}],221:[function(require,module,exports){
var _ = require('../../basics/helpers');
var Annotations = require('../annotation_updates');

/* jshint latedef: false */

// create a document instance containing only the selected content
var copySelection = function(doc, args) {
  var selection = args.selection;
  if (selection.isNull()) {
    args.doc = null;
  }
  // return a simplified version if only a piece of text is selected
  else if (selection.isPropertySelection() || _.isEqual(selection.start.path, selection.end.path)) {
    args.doc = _copyPropertySelection(doc, selection);
  }
  else if (selection.isContainerSelection()) {
    args.doc = _copyContainerSelection(doc, selection);
  } else {
    console.error('Copy is not yet supported for selection type.');
    args.doc = null;
  }
  return args;
};

var _copyPropertySelection = function(doc, selection) {
  var copy = doc.newInstance();
  copy._setForClipboard(true);
  var path = selection.start.path;
  var offset = selection.start.offset;
  var endOffset = selection.end.offset;
  var text = doc.get(path);
  var containerNode = copy.get(copySelection.CLIPBOARD_CONTAINER_ID);
  if (!containerNode) {
    containerNode = copy.create({
      type: 'container',
      id: copySelection.CLIPBOARD_CONTAINER_ID,
      nodes: []
    });
  }
  copy.create({
    type: doc.schema.getDefaultTextType(),
    id: 'text',
    content: text.substring(offset, endOffset)
  });
  containerNode.show('text');
  var annotations = doc.getIndex('annotations').get(path, offset, endOffset);
  _.each(annotations, function(anno) {
    var data = _.deepclone(anno.toJSON());
    data.path = ['text', 'content'];
    data.startOffset = Math.max(offset, anno.startOffset)-offset;
    data.endOffset = Math.min(endOffset, anno.endOffset)-offset;
    copy.create(data);
  });
  return copy;
};

var _copyContainerSelection = function(doc, selection) {
  var copy = doc.newInstance();
  copy._setForClipboard(true);
  var annotationIndex = doc.getIndex('annotations');
  var container = doc.get(selection.containerId);
  var startComp = container.getComponent(selection.start.path);
  var endComp = container.getComponent(selection.end.path);
  var containerNode = copy.create({
    type: 'container',
    id: copySelection.CLIPBOARD_CONTAINER_ID,
    nodes: []
  });
  // 1. Copy nodes and annotations.
  var i, comp;
  var created = {};
  for (i = startComp.getIndex(); i <= endComp.getIndex(); i++) {
    comp = container.getComponentAt(i);
    var nodeId = comp.parentNode.id;
    var node = doc.get(nodeId);
    if (!created[nodeId]) {
      created[nodeId] = copy.create(node.toJSON());
      containerNode.show(nodeId);
    }
    var annotations = annotationIndex.get(comp.path);
    for (var j = 0; j < annotations.length; j++) {
      copy.create(_.deepclone(annotations[j].toJSON()));
    }
  }
  // 2. Truncate properties according to the selection.
  // TODO: we need a more sophisticated concept when we introduce dynamic structures
  // such as lists or tables
  var startNodeComponent = startComp.parentNode;
  var text;
  for (i = 0; i < startNodeComponent.components.length; i++) {
    comp = startNodeComponent.components[i];
    if (comp === startComp) {
      if (selection.start.offset > 0) {
        text = doc.get(comp.path);
        copy.update(comp.path, {
          delete: { start: 0, end: selection.start.offset }
        });
        Annotations.deletedText(copy, comp.path, 0, selection.start.offset);
      }
      break;
    } else {
      copy.set(comp.path, "");
    }
  }
  var endNodeComponent = endComp.parentNode;
  for (i = 0; i < endNodeComponent.components.length; i++) {
    comp = endNodeComponent.components[i];
    if (comp === endComp) {
      text = doc.get(comp.path);
      if (selection.end.offset < text.length) {
        copy.update(comp.path, {
          delete: { start: selection.end.offset, end: text.length }
        });
        Annotations.deletedText(copy, comp.path, selection.end.offset, text.length);
      }
      break;
    } else {
      copy.set(comp.path, "");
    }
  }
  return copy;
};

copySelection.CLIPBOARD_CONTAINER_ID = "clipboard_content";

module.exports = copySelection;

},{"../../basics/helpers":168,"../annotation_updates":184}],222:[function(require,module,exports){
'use strict';

var Annotations = require('../annotation_updates');
var merge = require('./merge');

/**
 * The behavior when you press delete or backspace.
 * I.e., it starts with a collapsed PropertySelection and deletes the character before
 * or after the caret.
 * If the caret is at the begin or end it will call `mergeNodes`.
 */
var deleteCharacter = function(tx, args) {
  var selection = args.selection;
  var direction = args.direction;
  var range = selection.getRange();
  var startChar, endChar;
  if (!selection.isCollapsed()) {
    throw new Error('Selection must be collapsed for transformation "deleteCharacter"');
  }
  var prop = tx.get(range.start.path);
  if ((range.start.offset === 0 && direction === 'left') ||
      (range.start.offset === prop.length && direction === 'right')) {
    var result = merge(tx, {
      selection: selection,
      containerId: args.containerId,
      path: range.start.path,
      direction: direction
    });
    selection = result.selection;
  } else {
    // simple delete one character
    startChar = (direction === 'left') ? range.start.offset-1 : range.start.offset;
    endChar = startChar+1;
    tx.update(range.start.path, { delete: { start: startChar, end: endChar } });
    Annotations.deletedText(tx, range.start.path, startChar, endChar);
    selection = tx.createSelection({
      type: 'property',
      path: range.start.path,
      startOffset: startChar
    });
  }
  return { selection: selection };
};

module.exports = deleteCharacter;

},{"../annotation_updates":184,"./merge":228}],223:[function(require,module,exports){
'use strict';

var _ = require('../../basics/helpers');

/**
 * Delete a node and all annotations attached to it,
 * and removes the node from all containers.
 *
 * @param args object with fields: `nodeId`.
 */
function deleteNode(tx, args) {
  if (!args.nodeId) {
    throw new Error('Parameter `nodeId` is mandatory.');
  }
  var nodeId = args.nodeId;
  // remove all associated annotations
  var annos = tx.getIndex('annotations').get(nodeId);
  var i;
  for (i = 0; i < annos.length; i++) {
    tx.delete(annos[i].id);
  }
  // We need to transfer anchors of ContainerAnnotations
  // to previous or next node
  var anchors = tx.getIndex('container-annotation-anchors').get(nodeId);
  for (i = 0; i < anchors.length; i++) {
    var anchor = anchors[i];
    var container = tx.get(anchor.container);
    // Note: during the course of this loop we might have deleted the node already
    // so, do not do it again
    if (!tx.get(anchor.id)) continue;
    var comp = container.getComponent(anchor.path);
    if (anchor.isStart) {
      if (comp.hasNext()) {
        tx.set([anchor.id, 'startPath'], comp.next.path);
        tx.set([anchor.id, 'startOffset'], 0);
      } else {
        tx.delete(anchor.id);
      }
    } else {
      if (comp.hasPrevious()) {
        var prevLength = tx.get(comp.previous.path).length;
        tx.set([anchor.id, 'endPath'], comp.previous.path);
        tx.set([anchor.id, 'endOffset'], prevLength);
      } else {
        tx.delete(anchor.id);
      }
    }
  }
  _.each(tx.getIndex('type').get('container'), function(container) {
    // remove from view first
    container.hide(nodeId);
  });
  // and then delete permanently
  tx.delete(nodeId);
}

module.exports = deleteNode;

},{"../../basics/helpers":168}],224:[function(require,module,exports){
'use strict';

var deleteCharacter = require('./delete_character');
var deleteNode = require('./delete_node');
var merge = require('./merge');
var Annotations = require('../annotation_updates');
var _ = require('../../basics/helpers');

/* jshint latedef:false */

/**
 * Deletes a given selection.
 *
 * @param args object with `selection`
 * @return object with updated `selection`
 */
function deleteSelection(tx, args) {
  var selection = args.selection;
  var result;
  if (selection.isCollapsed()) {
    result = deleteCharacter(tx, args);
  } else if (selection.isPropertySelection()) {
    result = _deletePropertySelection(tx, args);
  } else {
    // deal with container deletes
    result = _deleteContainerSelection(tx, args);
  }
  return result;
}

function _deletePropertySelection(tx, args) {
  var range = args.selection.getRange();
  var path = range.start.path;
  var startOffset = range.start.offset;
  var endOffset = range.end.offset;
  tx.update(path, { delete: { start: startOffset, end: endOffset } });
  Annotations.deletedText(tx, path, startOffset, endOffset);
  return {
    selection: tx.createSelection({
      type: 'property',
      path: path,
      startOffset: startOffset
    })
  };
}

function _deleteContainerSelection(tx, args) {
  var selection = args.selection;
  var containerId = selection.containerId;
  var range = selection.getRange();
  var nodeSels = _getNodeSelection(tx, selection);
  var nodeSel, node, type;
  var result = { selection: null };
  // apply deletion backwards so that we do not to recompute array positions
  var container = tx.get(containerId);
  var firstNodePos = container.getPosition(nodeSels[0].node.id);

  for (var idx = nodeSels.length - 1; idx >= 0; idx--) {
    nodeSel = nodeSels[idx];
    node = nodeSel.node;
    if (nodeSel.isFully) {
      deleteNode(tx, { nodeId: node.id });
    } else {
      _deleteNodePartially(tx, nodeSel);
    }
  }
  // update the selection; take the first component which is not fully deleted
  if (!nodeSels[0].isFully) {
    result.selection = tx.createSelection({
      type: 'property',
      path: range.start.path,
      startOffset: range.start.offset
    });
  } else {
    // if the first node has been deleted fully we need to find the first property
    // which remained and set the selection to the first character.
    result.selection = null;
    for (var i = 1; i < nodeSels.length; i++) {
      nodeSel = nodeSels[i];
      if (!nodeSel.isFully) {
        result.selection = tx.createSelection({
          type: 'property',
          path: nodeSel.components[0].path,
          startOffset: 0
        });
        break;
      }
    }
    // TODO: if we could not find an insertion position,
    // that is the case when nodes were fully selected,
    // insert a default text node and set the cursor into it
    if (result.selection === null) {
      type = tx.getSchema().getDefaultTextType();
      node = {
        type: type,
        id: _.uuid(type),
        content: ""
      };
      tx.create(node);
      container.show(node.id, firstNodePos);
      result.selection = tx.createSelection({
        type: 'property',
        path: [node.id, 'content'],
        startOffset: 0
      });
    }
  }
  // Do a merge
  if (nodeSels.length>1) {
    var firstSel = nodeSels[0];
    var lastSel = nodeSels[nodeSels.length-1];
    if (firstSel.isFully || lastSel.isFully) {
      // TODO: think about if we want to merge in those cases
    } else {
      var secondComp = _.last(lastSel.components);
      result = merge(tx, { selection: result.selection, containerId: containerId, path: secondComp.path, direction: 'left' });
    }
  }
  // If the container is empty after deletion insert a default text node is inserted
  container = tx.get(containerId);
  if (container.nodes.length === 0) {
    type = tx.getSchema().getDefaultTextType();
    node = {
      type: type,
      id: _.uuid(type),
      content: ""
    };
    tx.create(node);
    container.show(node.id, 0);
    result.selection = tx.createSelection({
      type: 'property',
      path: [node.id, 'content'],
      startOffset: 0
    });
  }
  return result;
}

function _deleteNodePartially(tx, nodeSel) {
  // Just go through all components and apply a property deletion
  var components = nodeSel.components;
  var length = components.length;
  for (var i = 0; i < length; i++) {
    var comp = components[i];
    var startOffset = 0;
    var endOffset = tx.get(comp.path).length;
    if (i === 0) {
      startOffset = nodeSel.startOffset;
    }
    if (i === length-1) {
      endOffset = nodeSel.endOffset;
    }
    _deletePropertySelection(tx, {
      selection: tx.createSelection({
        type: 'property',
        path: comp.path,
        startOffset: startOffset,
        endOffset: endOffset
      })
    });
  }
}

// TODO: find a better naming and extract this into its own class
// it generates a data structure containing
// information about a selection range grouped by nodes
// e.g, if a node is fully selected or only partially
function _getNodeSelection(doc, containerSelection) {
  var result = [];
  var groups = {};
  var range = containerSelection.getRange();
  var container = doc.get(containerSelection.containerId);
  var components = container.getComponentsForRange(range);
  for (var i = 0; i < components.length; i++) {
    var comp = components[i];
    var node = doc.get(comp.rootId);
    if (!node) {
      throw new Error('Illegal state: expecting a component to have a proper root node id set.');
    }
    var nodeId = node.id;
    var nodeGroup;
    if (!groups[nodeId]) {
      nodeGroup = {
        node: node,
        isFully: true,
        components: []
      };
      groups[nodeId] = nodeGroup;
      result.push(nodeGroup);
    }
    nodeGroup = groups[nodeId];
    nodeGroup.components.push(comp);
  }
  // finally we analyze the first and last node-selection
  // if these
  var startComp = components[0];
  var endComp = components[components.length-1];
  var startNodeSel = result[0];
  var endNodeSel = result[result.length-1];
  var startLen = doc.get(startComp.path).length;
  var endLen = doc.get(endComp.path).length;
  if (range.start.offset > 0 ||
    (startComp.hasPrevious() && startComp.getPrevious().rootId === startComp.rootId))
  {
    startNodeSel.isFully = false;
    startNodeSel.startOffset = range.start.offset;
    if (result.length === 1) {
      startNodeSel.endOffset = range.end.offset;
    } else {
      startNodeSel.endOffset = startLen;
    }
  }
  if (result.length > 1 &&
      (range.end.offset < endLen ||
        (endComp.hasNext() && endComp.getNext().rootId === endComp.rootId))
     ) {
    endNodeSel.isFully = false;
    endNodeSel.startOffset = 0;
    endNodeSel.endOffset = range.end.offset;
  }
  return result;
}

module.exports = deleteSelection;

},{"../../basics/helpers":168,"../annotation_updates":184,"./delete_character":222,"./delete_node":223,"./merge":228}],225:[function(require,module,exports){
module.exports = {
  breakNode: require('./break_node'),
  copySelection: require('./copy_selection'),
  deleteCharacter: require('./delete_character'),
  deleteNode: require('./delete_node'),
  deleteSelection: require('./delete_selection'),
  insertNode: require('./insert_node'),
  insertText: require('./insert_text'),
  merge: require('./merge'),
  paste: require('./paste'),
  switchTextType: require('./switch_text_type'),
};

},{"./break_node":220,"./copy_selection":221,"./delete_character":222,"./delete_node":223,"./delete_selection":224,"./insert_node":226,"./insert_text":227,"./merge":228,"./paste":229,"./switch_text_type":230}],226:[function(require,module,exports){
'use strict';

var deleteSelection = require('./delete_selection');
var breakNode = require('./break_node');

function insertNode(tx, args) {
  var selection = args.selection;
  var node = args.node;

  if (!args.containerId) {
    throw new Error("containerId is mandatory");
  }
  if (!args.selection) {
    throw new Error("selection is mandatory");
  }
  if (!args.node) {
    throw new Error("node is mandatory");
  }

  var containerId = args.containerId;

  var container = tx.get(containerId);
  var result;
  if (!selection.isCollapsed()) {
    result = deleteSelection(tx, args);
    selection = result.selection;
  }
  result = breakNode(tx, args);
  selection = result.selection;
  if (!tx.get(node.id)) {
    node = tx.create(node);
  }
  var comp = container.getComponent(selection.start.path);
  var pos = container.getPosition(comp.rootId);
  container.show(node.id, pos);
  // TODO: set cursor to first position of inserted node
  return {
    selection: null
  };
}

module.exports = insertNode;

},{"./break_node":220,"./delete_selection":224}],227:[function(require,module,exports){
'use strict';

var deleteSelection = require('./delete_selection');
var Annotations = require('../annotation_updates');

var insertText = function(tx, args) {
  var selection = args.selection;
  var text = args.text;
  if (!selection) {
    throw new Error('Argument `selection` is mandatory for transformation `insertText`.');
  }
  if (!text) {
    throw new Error('Argument `text` is mandatory for transformation `insertText`.');
  }
  if (!(selection.isPropertySelection() || selection.isContainerSelection())) {
    throw new Error('Selection must be property or container selection.')
  }
  var result;
  if (!selection.isCollapsed()) {
    result = deleteSelection(tx, {
      selection: selection,
      direction: 'right'
    });
    selection = result.selection;
  }
  var range = selection.getRange();
  tx.update(range.start.path, { insert: { offset: range.start.offset, value: text } } );
  Annotations.insertedText(tx, range.start, text.length);
  return {
    selection: tx.createSelection({
      type: 'property',
      path: range.start.path,
      startOffset: range.start.offset + text.length
    })
  };
};

module.exports = insertText;

},{"../annotation_updates":184,"./delete_selection":224}],228:[function(require,module,exports){
'use strict';

var Annotations = require('../annotation_updates');

/* jshint latedef: false */

// low-level merge implementation
var merge = function(tx, args) {
  var containerId = args.containerId;
  var path = args.path;
  var direction = args.direction;
  if (!containerId||!path||!direction) {
    throw new Error('Insufficient arguments! mandatory fields: `containerId`, `path`, `direction`');
  }
  var container = tx.get(containerId);
  var component = container.getComponent(path);
  if (direction === 'right' && component.next) {
     return _mergeComponents(tx, containerId, component, component.next);
  } else if (direction === 'left' && component.previous) {
    return _mergeComponents(tx, containerId, component.previous, component);
  } else {
    // No behavior defined for this merge
  }
};

var _mergeComponents = function(tx, containerId, firstComp, secondComp) {
  var firstNode = tx.get(firstComp.parentNode.id);
  var secondNode = tx.get(secondComp.parentNode.id);
  // TODO: it should be possible to extend the merge transformation by providing custom transformations
  // for nodes anc components
  var mergeTrafo = _getMergeTransformation(firstNode, secondNode);
  if (mergeTrafo) {
    return mergeTrafo.call(this, tx, containerId, firstComp, secondComp);
  }
};

var _getMergeTransformation = function(node, otherNode) {
  // TODO: we want to introduce a way to provide custom merge behavior
  var trafo = null;
  // if (merge[node.type] && merge[node.type][otherNode.type]) {
  //   behavior = merge[node.type][otherNode.type];
  // }
  // special convenience to define behaviors when text nodes are involved
  // E.g., you might want to define how to merge a text node into a figure
  // else
  if (node.isInstanceOf('text') && otherNode.isInstanceOf('text')) {
    trafo = _mergeTextNodes;
  }
  // else if (node.isInstanceOf('text') && merge['text']) {
  //   behavior = merge['text'][otherNode.type];
  // } else if (otherNode.isInstanceOf('text') && merge[node.type]) {
  //   behavior = merge[node.type]['text'];
  // }
  if (!trafo) {
    console.info("No merge behavior defined for %s <- %s", node.type, otherNode.type);
  }
  return trafo;
};

var _mergeTextNodes = function(tx, containerId, firstComp, secondComp) {
  var firstPath = firstComp.path;
  var firstText = tx.get(firstPath);
  var firstLength = firstText.length;
  var secondPath = secondComp.path;
  var secondText = tx.get(secondPath);
  var container = tx.get(containerId);
  var selection;
  if (firstLength === 0) {
    // hide the second node
    container.hide(firstPath[0]);
    // delete the second node
    tx.delete(firstPath[0]);
    // set the selection to the end of the first component
    selection = tx.createSelection({
      type: 'property',
      path: secondPath,
      startOffset: 0
    });
  } else {
    // append the second text
    tx.update(firstPath, { insert: { offset: firstLength, value: secondText } });
    // transfer annotations
    Annotations.transferAnnotations(tx, secondPath, 0, firstPath, firstLength);
    // hide the second node
    container.hide(secondPath[0]);
    // delete the second node
    tx.delete(secondPath[0]);
    // set the selection to the end of the first component
    selection = tx.createSelection({
      type: 'property',
      path: firstPath,
      startOffset: firstLength
    });
  }
  return { selection: selection };
};

module.exports = merge;

},{"../annotation_updates":184}],229:[function(require,module,exports){
var _ = require('../../basics/helpers');
var Annotations = require('../annotation_updates');
var deleteSelection = require('./delete_selection');
var insertText = require('./insert_text');
var breakNode = require('./break_node');
var CLIPBOARD_CONTAINER_ID = require('./copy_selection').CLIPBOARD_CONTAINER_ID;

/* jshint latedef: false */

var paste = function(tx, args) {
  if (args.selection.isNull()) {
    console.error("Can not paste, without selection.");
    return args;
  }
  // if paste dataplain text paste is simple
  if (args.text && !args.doc) {
    return insertText(tx, args);
  }
  var pasteDoc = args.doc;
  if (!args.selection.isCollapsed()) {
    var out = deleteSelection(tx, args);
    args.selection = out.selection;
  }
  var nodes = pasteDoc.get(CLIPBOARD_CONTAINER_ID).nodes;
  if (nodes.length > 0) {
    var first = pasteDoc.get(nodes[0]);
    // copy of a property selection creates a doc containing
    // one default text node with id 'text'
    if (nodes.length === 1 && first.isInstanceOf("text")) {
      return _pasteAnnotatedText(tx, args);
    } else {
      return _pasteDocument(tx, args);
    }
  }
  return args;
};

var _pasteAnnotatedText = function(tx, args) {
  var copy = args.doc;
  var selection = args.selection;

  var nodes = copy.get(CLIPBOARD_CONTAINER_ID).nodes;
  var textPath = [nodes[0], 'content'];
  var text = copy.get(textPath);
  var annotations = copy.getIndex('annotations').get(textPath);
  // insert plain text
  var path = selection.start.path;
  var offset = selection.start.offset;
  tx.update(path, { insert: { offset: offset, value: text } } );
  Annotations.insertedText(tx, selection.start, text.length);
  selection = tx.createSelection({
    type: 'property',
    path: selection.start.path,
    startOffset: selection.start.offset+text.length
  });
  // copy annotations
  _.each(annotations, function(anno) {
    var data = anno.toJSON();
    data.path = path.slice(0);
    data.startOffset += offset;
    data.endOffset += offset;
    if (tx.get(data.id)) {
      data.id = _.uuid(data.type);
    }
    tx.create(data);
  });
  return {
    selection: selection
  };
};

var _pasteDocument = function(tx, args) {
  var pasteDoc = args.doc;
  var containerId = args.containerId;
  var selection = args.selection;
  var container = tx.get(containerId);

  // Break, unless we are at the last character of a node,
  // then we can simply insert after the node
  var startComp = container.getComponent(selection.start.path);
  var startNodeComp = startComp.parentNode;
  var insertPos;
  if ( startComp === _.last(startNodeComp.components) &&
    tx.get(startComp.path).length === selection.start.offset )
  {
    insertPos = container.getPosition(selection.start.path[0]) + 1;
  } else {
    var result = breakNode(tx, args);
    selection = result.selection;
    insertPos = container.getPosition(selection.start.path[0]);
  }
  if (insertPos < 0) {
    console.error('Could not find insertion position in ContainerNode.');
  }
  // transfer nodes from content document
  // TODO: transfer annotations
  var nodeIds = pasteDoc.get(CLIPBOARD_CONTAINER_ID).nodes;
  var annoIndex = pasteDoc.getIndex('annotations');
  var insertedNodes = [];
  for (var i = 0; i < nodeIds.length; i++) {
    var nodeId = nodeIds[i];
    var node = pasteDoc.get(nodeId).toJSON();
    // create a new id if the node exists already
    if (tx.get(nodeId)) {
      node.id = _.uuid(node.type);
    }
    tx.create(node);
    container.show(node.id, insertPos++);
    insertedNodes.push(node);

    // transfer annotations
    // what about nodes that are referenced by annotations?
    var annos = annoIndex.get(nodeId);
    for (var j = 0; j < annos.length; j++) {
      var data = annos[j].toJSON();
      if (node.id !== nodeId) {
        data.path[0] = node.id;
      }
      if (tx.get(data.id)) {
        data.id = _.uuid(data.type);
      }
      tx.create(data);
    }
  }

  if (insertedNodes.length === 0) return;

  // set a new selection
  var lastId = _.last(insertedNodes).id;
  var lastComp = _.last(container.getComponentsForNode(lastId));
  var lastLength = tx.get(lastComp.path).length;
  // This version turned out to be useful in some situations
  // as it hightlights the pasted content
  // we leave it here for debugging
  if (false) {
    var firstId = insertedNodes[0].id;
    var firstComp = container.getComponentsForNode(firstId)[0];
    selection = tx.createSelection({
      type: 'container',
      containerId: container.id,
      startPath: firstComp.path,
      startOffset: 0,
      endPath: lastComp.path,
      endOffset: lastLength
    });
  } else {
    selection = tx.createSelection({
      type: 'property',
      path: lastComp.path,
      startOffset: lastLength
    });
  }
  return {
    selection: selection
  };
};

module.exports = paste;

},{"../../basics/helpers":168,"../annotation_updates":184,"./break_node":220,"./copy_selection":221,"./delete_selection":224,"./insert_text":227}],230:[function(require,module,exports){
'use strict';

var _ = require('../../basics/helpers');
var Annotations = require('../annotation_updates');
var deleteNode = require('./delete_node');

// TODO: needs to be overhauled
// should work without a given container

function switchTextType(tx, args) {
  var selection = args.selection;
  if (!selection.isPropertySelection()) {
    console.error("Selection must be a PropertySelection.");
    return;
  }
  
  var nodeId = selection.getPath()[0];
  var data = args.data;
  var node = tx.get(nodeId);
  var path = selection.path;

  if (!(node.isInstanceOf('text'))) {
    console.warn('Trying to use switchTextType on a non text node. Skipping.');
    return;
  }

  // create a new node
  var newNode = _.extend({
    id: _.uuid(data.type),
    type: data.type,
    content: node.content
  }, data);

  var newPath = [newNode.id, 'content'];
  var created = tx.create(newNode);

  Annotations.transferAnnotations(tx, path, 0, newPath, 0);
  
  // TODO: should work without a given container
  // _.each(tx.getContainers(), function(container) {
  //   pos = container.getPosition(nodeId);
  //   ....
  // });

  var container = tx.get(args.containerId);
  var pos = container.getPosition(nodeId);
  if (pos >= 0) {
    container.hide(nodeId);
    container.show(newNode.id, pos);
  }
  
  deleteNode(tx, { nodeId: node.id });

  return {
    selection: tx.createSelection({
      type: 'property',
      path: newPath,
      startOffset: selection.startOffset,
      endOffset: selection.endOffset
    })
  };
}

module.exports = switchTextType;

},{"../../basics/helpers":168,"../annotation_updates":184,"./delete_node":223}],231:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var Operation = require('./operation');
var Conflict = require('./conflict');

var NOP = "NOP";
var DEL = "delete";
var INS = "insert";

var ArrayOperation = function(data) {
  Operation.call(this);

  /* jshint eqnull: true */
  if (!data || data.type == null) {
    throw new Error("Illegal argument: insufficient data.");
  }
  /* jshint eqnull: false */
  this.type = data.type;
  if (this.type === NOP) return;

  if (this.type !== INS && this.type !== DEL) {
    throw new Error("Illegal type.");
  }
  // the position where to apply the operation
  this.pos = data.pos;
  // the value to insert or delete
  this.val = data.val;
  if (!_.isNumber(this.pos) || this.pos < 0) {
    throw new Error("Illegal argument: expecting positive number as pos.");
  }
};

ArrayOperation.fromJSON = function(data) {
  return new ArrayOperation(data);
};

ArrayOperation.Prototype = function() {

  this.apply = function(array) {
    if (this.type === NOP) {
      return array;
    }
    if (this.type === INS) {
      if (array.length < this.pos) {
        throw new Error("Provided array is too small.");
      }
      array.splice(this.pos, 0, this.val);
      return array;
    }
    // Delete
    else /* if (this.type === DEL) */ {
      if (array.length < this.pos) {
        throw new Error("Provided array is too small.");
      }
      if (!_.isEqual(array[this.pos], this.val)) {
        throw Error("Unexpected value at position " + this.pos + ". Expected " + this.val + ", found " + array[this.pos]);
      }
      array.splice(this.pos, 1);
      return array;
    }
  };

  this.clone = function() {
    var data = {
      type: this.type,
      pos: this.pos,
      val: _.deepclone(this.val)
    };
    return new ArrayOperation(data);
  };

  this.invert = function() {
    var data = this.toJSON();
    if (this.type === NOP) data.type = NOP;
    else if (this.type === INS) data.type = DEL;
    else /* if (this.type === DEL) */ data.type = INS;
    return new ArrayOperation(data);
  };

  this.hasConflict = function(other) {
    return ArrayOperation.hasConflict(this, other);
  };

  this.toJSON = function() {
    var result = {
      type: this.type,
    };
    if (this.type === NOP) return result;
    result.pos = this.pos;
    result.val = _.deepclone(this.val);
    return result;
  };

  this.isInsert = function() {
    return this.type === INS;
  };

  this.isDelete = function() {
    return this.type === DEL;
  };

  this.getOffset = function() {
    return this.pos;
  };

  this.getValue = function() {
    return this.val;
  };

  this.isNOP = function() {
    return this.type === NOP;
  };

  this.toString = function() {
    return ["(", (this.isInsert() ? '+' : '-'), ",", this.getOffset(), ",'", this.getValue(), "')"].join('');
  };
};

OO.inherit(ArrayOperation, Operation);

var hasConflict = function(a, b) {
  if (a.type === NOP || b.type === NOP) return false;
  if (a.type === INS && b.type === INS) {
    return a.pos === b.pos;
  } else {
    return false;
  }
};

function transform_insert_insert(a, b) {
  if (a.pos === b.pos) {
    b.pos += 1;
  }
  // a before b
  else if (a.pos < b.pos) {
    b.pos += 1;
  }
  // a after b
  else  {
    a.pos += 1;
  }
}

function transform_delete_delete(a, b) {
  // turn the second of two concurrent deletes into a NOP
  if (a.pos === b.pos) {
    b.type = NOP;
    a.type = NOP;
    return;
  }
  if (a.pos < b.pos) {
    b.pos -= 1;
  } else {
    a.pos -= 1;
  }
}

function transform_insert_delete(a, b) {
  // reduce to a normalized case
  if (a.type === DEL) {
    var tmp = a;
    a = b;
    b = tmp;
  }
  if (a.pos <= b.pos) {
    b.pos += 1;
  } else {
    a.pos -= 1;
  }
}

var transform = function(a, b, options) {
  options = options || {};
  // enable conflicts when you want to notify the user of potential problems
  // Note that even in these cases, there is a defined result.
  if (options['no-conflict'] && hasConflict(a, b)) {
    throw new Conflict(a, b);
  }
  // this is used internally only as optimization, e.g., when rebasing an operation
  if (!options.inplace) {
    a = a.clone();
    b = b.clone();
  }
  if (a.type === NOP || b.type === NOP)  {
    // nothing to transform
  }
  else if (a.type === INS && b.type === INS)  {
    transform_insert_insert(a, b);
  }
  else if (a.type === DEL && b.type === DEL) {
    transform_delete_delete(a, b);
  }
  else {
    transform_insert_delete(a, b);
  }
  return [a, b];
};

ArrayOperation.transform = transform;
ArrayOperation.hasConflict = hasConflict;

/* Factories */

ArrayOperation.Insert = function(pos, val) {
  return new ArrayOperation({type:INS, pos: pos, val: val});
};

ArrayOperation.Delete = function(pos, val) {
  return new ArrayOperation({ type:DEL, pos: pos, val: val });
};

ArrayOperation.NOP = NOP;
ArrayOperation.DELETE = DEL;
ArrayOperation.INSERT = INS;

// Export
// ========

module.exports = ArrayOperation;

},{"../basics/helpers":168,"../basics/oo":170,"./conflict":232,"./operation":235}],232:[function(require,module,exports){
'use strict';

function Conflict(a, b) {
  Error.call(this, "Conflict: " + JSON.stringify(a) +" vs " + JSON.stringify(b));
  this.a = a;
  this.b = b;
}
Conflict.prototype = Error.prototype;

module.exports = Conflict;

},{}],233:[function(require,module,exports){
'use strict';

module.exports = {
  Operation: require('./operation'),
  TextOperation: require('./text_operation'),
  ArrayOperation: require('./array_operation'),
  ObjectOperation: require('./object_operation')
};

},{"./array_operation":231,"./object_operation":234,"./operation":235,"./text_operation":236}],234:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var Substance = require('../basics');
var PathAdapter = Substance.PathAdapter;

var Operation = require('./operation');
var TextOperation = require('./text_operation');
var ArrayOperation = require('./array_operation');

var Conflict = require('./conflict');

var NOP = "NOP";
var CREATE = "create";
var DELETE = 'delete';
var UPDATE = 'update';
var SET = 'set';

var ObjectOperation = function(data) {
  Operation.call(this);
  if (!data) {
    throw new Error('Data of ObjectOperation is missing.');
  }
  if (!data.type) {
    throw new Error('Invalid data: type is mandatory.');
  }
  this.type = data.type;
  if (data.type === NOP) {
    return;
  }
  this.path = data.path;
  if (!data.path) {
    throw new Error('Invalid data: path is mandatory.');
  }
  if (this.type === CREATE || this.type === DELETE) {
    if (!data.val) {
      throw new Error('Invalid data: value is missing.');
    }
    this.val = data.val;
  }
  else if (this.type === UPDATE) {
    if (data.diff) {
      this.diff = data.diff;
      if (data.diff instanceof TextOperation) {
        this.propertyType = 'string';
      } else if (data.diff instanceof ArrayOperation) {
        this.propertyType = 'array';
      } else {
        throw new Error('Invalid data: diff must be a TextOperation or an ArrayOperation.');
      }
    } else {
      throw new Error("Invalid data: diff is mandatory for update operation.");
    }
  }
  else if (this.type === SET) {
    this.val = data.val;
    this.original = data.original;
  } else {
    throw new Error('Invalid type: '+ data.type);
  }
};

ObjectOperation.fromJSON = function(data) {
  data = _.deepclone(data);
  if (data.type === "update") {
    switch (data.propertyType) {
    case "string":
      data.diff = TextOperation.fromJSON(data.diff);
      break;
    case "array":
      data.diff = ArrayOperation.fromJSON(data.diff);
      break;
    default:
      throw new Error("Unsupported update diff:" + JSON.stringify(data.diff));
    }
  }
  var op = new ObjectOperation(data);
  return op;
};

ObjectOperation.Prototype = function() {

  this.apply = function(obj) {
    if (this.type === NOP) return obj;
    var adapter;
    if (obj instanceof PathAdapter) {
      adapter = obj;
    } else {
      adapter = new PathAdapter(obj);
    }
    if (this.type === CREATE) {
      adapter.set(this.path, _.deepclone(this.val));
      return obj;
    }
    if (this.type === DELETE) {
      adapter.delete(this.path, "strict");
    }
    else if (this.type === UPDATE) {
      var diff = this.diff;
      var oldVal = adapter.get(this.path);
      var newVal;
      if (diff instanceof ArrayOperation) {
        newVal = diff.apply(oldVal);
      } else {
        newVal = diff.apply(oldVal);
      }
      adapter.set(this.path, newVal);
    }
    else /* if (this.type === SET) */ {
      // clone here as the operations value must not be changed
      adapter.set(this.path, _.deepclone(this.val));
    }
    return obj;
  };

  this.clone = function() {
    var data = {
      type: this.type,
      path: this.path,
    };
    if (this.val) {
      data.val = _.deepclone(this.val);
    }
    if (this.diff) {
      data.diff = this.diff.clone();
    }
    return new ObjectOperation(data);
  };

  this.isNOP = function() {
    if (this.type === NOP) return true;
    else if (this.type === UPDATE) return this.diff.isNOP();
  };

  this.isCreate = function() {
    return this.type === CREATE;
  };

  this.isDelete = function() {
    return this.type === DELETE;
  };

  this.isUpdate = function() {
    return this.type === UPDATE;
  };

  this.isSet = function() {
    return this.type === SET;
  };

  this.invert = function() {
    if (this.type === NOP) {
      return new ObjectOperation({ type: NOP });
    }
    var result = new ObjectOperation(this);
    if (this.type === CREATE) {
      result.type = DELETE;
    }
    else if (this.type === DELETE) {
      result.type = CREATE;
    }
    else if (this.type === UPDATE) {
      var invertedDiff;
      if (this.diff instanceof TextOperation) {
        invertedDiff = TextOperation.fromJSON(this.diff.toJSON()).invert();
      } else {
        invertedDiff = ArrayOperation.fromJSON(this.diff.toJSON()).invert();
      }
      result.diff = invertedDiff;
    }
    else /* if (this.type === SET) */ {
      result.val = this.original;
      result.original = this.val;
    }
    return result;
  };

  this.hasConflict = function(other) {
    return ObjectOperation.hasConflict(this, other);
  };

  this.toJSON = function() {
    if (this.type === NOP) {
      return { type: NOP };
    }
    var data = {
      type: this.type,
      path: this.path,
    };
    if (this.type === CREATE || this.type === DELETE) {
      data.val = this.val;
    }
    else if (this.type === UPDATE) {
      if (this.diff instanceof ArrayOperation) {
        data.propertyType = "array";
      } else /* if (this.diff instanceof TextOperation) */ {
        data.propertyType = "string";
      }
      data.diff = this.diff.toJSON();
    }
    else /* if (this.type === SET) */ {
      data.val = this.val;
      data.original = this.original;
    }
    return data;
  };

  this.getType = function() {
    return this.type;
  };

  this.getPath = function() {
    return this.path;
  };

  this.getValue = function() {
    return this.val;
  };

  this.toString = function() {
    switch (this.type) {
      case CREATE:
        return ["(+,", JSON.stringify(this.path), JSON.stringify(this.val), ")"].join('');
      case DELETE:
        return ["(-,", JSON.stringify(this.path), JSON.stringify(this.val), ")"].join('');
      case UPDATE:
        return ["(>>,", JSON.stringify(this.path), this.propertyType, this.diff.toString(), ")"].join('');
      case SET:
        return ["(=,", JSON.stringify(this.path), this.val, this.original, ")"].join('');
    }
  };
};

OO.inherit(ObjectOperation, Operation);

/* Low level implementation */

var hasConflict = function(a, b) {
  if (a.type === NOP || b.type === NOP) return false;
  return _.isEqual(a.path, b.path);
};

var transform_delete_delete = function(a, b) {
  // both operations have the same effect.
  // the transformed operations are turned into NOPs
  a.type = NOP;
  b.type = NOP;
};

var transform_create_create = function() {
  throw new Error("Can not transform two concurring creates of the same property");
};

var transform_delete_create = function() {
  throw new Error('Illegal state: can not create and delete a value at the same time.');
};

var transform_delete_update = function(a, b, flipped) {
  if (a.type !== DELETE) {
    return transform_delete_update(b, a, true);
  }
  var op;
  if (b.propertyType === 'string') {
    op = TextOperation.fromJSON(b.diff);
  } else /* if (b.propertyType === 'array') */ {
    op = ArrayOperation.fromJSON(b.diff);
  }
  // (DELETE, UPDATE) is transformed into (DELETE, CREATE)
  if (!flipped) {
    a.type = NOP;
    b.type = CREATE;
    b.val = op.apply(a.val);
  }
  // (UPDATE, DELETE): the delete is updated to delete the updated value
  else {
    a.val = op.apply(a.val);
    b.type = NOP;
  }
};

var transform_create_update = function() {
  // it is not possible to reasonably transform this.
  throw new Error("Can not transform a concurring create and update of the same property");
};

var transform_update_update = function(a, b) {
  // Note: this is a conflict the user should know about
  var op_a, op_b, t;
  if (b.propertyType === 'string') {
    op_a = TextOperation.fromJSON(a.diff);
    op_b = TextOperation.fromJSON(b.diff);
    t = TextOperation.transform(op_a, op_b, {inplace: true});
  } else /* if (b.propertyType === 'array') */ {
    op_a = ArrayOperation.fromJSON(a.diff);
    op_b = ArrayOperation.fromJSON(b.diff);
    t = ArrayOperation.transform(op_a, op_b, {inplace: true});
  }
  a.diff = t[0];
  b.diff = t[1];
};

var transform_create_set = function() {
  throw new Error('Illegal state: can not create and set a value at the same time.');
};

var transform_delete_set = function(a, b, flipped) {
  if (a.type !== DELETE) return transform_delete_set(b, a, true);
  if (!flipped) {
    a.type = NOP;
    b.type = CREATE;
    b.original = undefined;
  } else {
    a.val = b.val;
    b.type = NOP;
  }
};

var transform_update_set = function() {
  throw new Error("Unresolvable conflict: update + set.");
};

var transform_set_set = function(a, b) {
  a.type = NOP;
  b.original = a.val;
};

var _NOP = 0;
var _CREATE = 1;
var _DELETE = 2;
var _UPDATE = 4;
var _SET = 8;

var CODE = {};
CODE[NOP] =_NOP;
CODE[CREATE] = _CREATE;
CODE[DELETE] = _DELETE;
CODE[UPDATE] = _UPDATE;
CODE[SET] = _SET;

var __transform__ = [];
__transform__[_DELETE | _DELETE] = transform_delete_delete;
__transform__[_DELETE | _CREATE] = transform_delete_create;
__transform__[_DELETE | _UPDATE] = transform_delete_update;
__transform__[_CREATE | _CREATE] = transform_create_create;
__transform__[_CREATE | _UPDATE] = transform_create_update;
__transform__[_UPDATE | _UPDATE] = transform_update_update;
__transform__[_CREATE | _SET   ] = transform_create_set;
__transform__[_DELETE | _SET   ] = transform_delete_set;
__transform__[_UPDATE | _SET   ] = transform_update_set;
__transform__[_SET    | _SET   ] = transform_set_set;

var transform = function(a, b, options) {
  options = options || {};
  if (options['no-conflict'] && hasConflict(a, b)) {
    throw new Conflict(a, b);
  }
  if (!options.inplace) {
    a = a.clone();
    b = b.clone();
  }
  if (a.isNOP() || b.isNOP()) {
    return [a, b];
  }
  var sameProp = _.isEqual(a.path, b.path);
  // without conflict: a' = a, b' = b
  if (sameProp) {
    __transform__[CODE[a.type] | CODE[b.type]](a,b);
  }
  return [a, b];
};

ObjectOperation.transform = transform;
ObjectOperation.hasConflict = hasConflict;

/* Factories */

ObjectOperation.Create = function(idOrPath, val) {
  var path;
  if (_.isString(idOrPath)) {
    path = [idOrPath];
  } else {
    path = idOrPath;
  }
  return new ObjectOperation({type: CREATE, path: path, val: val});
};

ObjectOperation.Delete = function(idOrPath, val) {
  var path;
  if (_.isString(idOrPath)) {
    path = [idOrPath];
  } else {
    path = idOrPath;
  }
  return new ObjectOperation({type: DELETE, path: path, val: val});
};

ObjectOperation.Update = function(path, op) {
  var propertyType;
  if (op instanceof TextOperation) {
    propertyType = "string";
  }
  else if (op instanceof ArrayOperation) {
    propertyType = "array";
  }
  else {
    throw new Error('Unsupported type for operational changes');
  }
  return new ObjectOperation({
    type: UPDATE,
    path: path,
    diff: op
  });
};

ObjectOperation.Set = function(path, oldVal, newVal) {
  return new ObjectOperation({
    type: SET,
    path: path,
    val: _.deepclone(newVal),
    original: _.deepclone(oldVal)
  });
};

ObjectOperation.NOP = NOP;
ObjectOperation.CREATE = CREATE;
ObjectOperation.DELETE = DELETE;
ObjectOperation.UPDATE = UPDATE;
ObjectOperation.SET = SET;

module.exports = ObjectOperation;

},{"../basics":169,"../basics/helpers":168,"../basics/oo":170,"./array_operation":231,"./conflict":232,"./operation":235,"./text_operation":236}],235:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

function Operation() {
}

Operation.Prototype = function() {

  this.isOperation = true;

};

Substance.initClass(Operation);

module.exports = Operation;
},{"../basics":169}],236:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var Operation = require('./operation');
var Conflict = require('./conflict');

var INS = "+";
var DEL = "-";

var hasConflict;

function TextOperation(data) {
  Operation.call(this);
  if (!data || data.type === undefined || data.pos === undefined || data.str === undefined) {
    throw new Error("Illegal argument: insufficient data.");
  }
  // '+' or '-'
  this.type = data.type;
  // the position where to apply the operation
  this.pos = data.pos;
  // the string to delete or insert
  this.str = data.str;
  // sanity checks
  if(!this.isInsert() && !this.isDelete()) {
    throw new Error("Illegal type.");
  }
  if (!_.isString(this.str)) {
    throw new Error("Illegal argument: expecting string.");
  }
  if (!_.isNumber(this.pos) || this.pos < 0) {
    throw new Error("Illegal argument: expecting positive number as pos.");
  }
}

TextOperation.fromJSON = function(data) {
  return new TextOperation(data);
};

TextOperation.Prototype = function() {

  this.apply = function(str) {
    if (this.isEmpty()) return str;
    if (this.type === INS) {
      if (str.length < this.pos) {
        throw new Error("Provided string is too short.");
      }
      if (str.splice) {
        return str.splice(this.pos, 0, this.str);
      } else {
        return str.slice(0, this.pos).concat(this.str).concat(str.slice(this.pos));
      }
    }
    else /* if (this.type === DEL) */ {
      if (str.length < this.pos + this.str.length) {
        throw new Error("Provided string is too short.");
      }
      if (str.splice) {
        return str.splice(this.pos, this.str.length);
      } else {
        return str.slice(0, this.pos).concat(str.slice(this.pos + this.str.length));
      }
    }
  };

  this.clone = function() {
    return new TextOperation(this);
  };

  this.isNOP = function() {
    return this.type === "NOP" || this.str.length === 0;
  };

  this.isInsert = function() {
    return this.type === INS;
  };

  this.isDelete = function() {
    return this.type === DEL;
  };

  this.getLength = function() {
    return this.str.length;
  };

  this.invert = function() {
    var data = {
      type: this.isInsert() ? '-' : '+',
      pos: this.pos,
      str: this.str
    };
    return new TextOperation(data);
  };

  this.hasConflict = function(other) {
    return hasConflict(this, other);
  };

  this.isEmpty = function() {
    return this.str.length === 0;
  };

  this.toJSON = function() {
    return {
      type: this.type,
      pos: this.pos,
      str: this.str
    };
  };

  this.toString = function() {
    return ["(", (this.isInsert() ? '+' : '-'), ",", this.pos, ",'", this.str, "')"].join('');
  };
};

OO.inherit(TextOperation, Operation);

hasConflict = function(a, b) {
  // Insert vs Insert:
  //
  // Insertions are conflicting iff their insert position is the same.
  if (a.type === INS && b.type === INS)  return (a.pos === b.pos);
  // Delete vs Delete:
  //
  // Deletions are conflicting if their ranges overlap.
  if (a.type === DEL && b.type === DEL) {
    // to have no conflict, either `a` should be after `b` or `b` after `a`, otherwise.
    return !(a.pos >= b.pos + b.str.length || b.pos >= a.pos + a.str.length);
  }
  // Delete vs Insert:
  //
  // A deletion and an insertion are conflicting if the insert position is within the deleted range.
  var del, ins;
  if (a.type === DEL) {
    del = a; ins = b;
  } else {
    del = b; ins = a;
  }
  return (ins.pos >= del.pos && ins.pos < del.pos + del.str.length);
};

// Transforms two Insertions
// --------

function transform_insert_insert(a, b) {
  if (a.pos === b.pos) {
    b.pos += a.str.length;
  }
  else if (a.pos < b.pos) {
    b.pos += a.str.length;
  }
  else {
    a.pos += b.str.length;
  }
}

// Transform two Deletions
// --------
//

function transform_delete_delete(a, b, first) {
  // reduce to a normalized case
  if (a.pos > b.pos) {
    return transform_delete_delete(b, a, !first);
  }
  if (a.pos === b.pos && a.str.length > b.str.length) {
    return transform_delete_delete(b, a, !first);
  }
  // take out overlapping parts
  if (b.pos < a.pos + a.str.length) {
    var s = b.pos - a.pos;
    var s1 = a.str.length - s;
    var s2 = s + b.str.length;
    a.str = a.str.slice(0, s) + a.str.slice(s2);
    b.str = b.str.slice(s1);
    b.pos -= s;
  } else {
    b.pos -= a.str.length;
  }
}

// Transform Insert and Deletion
// --------
//

function transform_insert_delete(a, b) {
  if (a.type === DEL) {
    return transform_insert_delete(b, a);
  }
  // we can assume, that a is an insertion and b is a deletion
  // a is before b
  if (a.pos <= b.pos) {
    b.pos += a.str.length;
  }
  // a is after b
  else if (a.pos >= b.pos + b.str.length) {
    a.pos -= b.str.length;
  }
  // Note: this is a conflict case the user should be noticed about
  // If applied still, the deletion takes precedence
  // a.pos > b.pos && <= b.pos + b.length
  else {
    var s = a.pos - b.pos;
    b.str = b.str.slice(0, s) + a.str + b.str.slice(s);
    a.str = "";
  }
}

var transform = function(a, b, options) {
  options = options || {};
  if (options["no-conflict"] && hasConflict(a, b)) {
    throw new Conflict(a, b);
  }
  if (!options.inplace) {
    a = a.clone();
    b = b.clone();
  }
  if (a.type === INS && b.type === INS)  {
    transform_insert_insert(a, b);
  }
  else if (a.type === DEL && b.type === DEL) {
    transform_delete_delete(a, b, true);
  }
  else {
    transform_insert_delete(a,b);
  }
  return [a, b];
};

TextOperation.transform = function() {
  return transform.apply(null, arguments);
};

/* Factories */

TextOperation.Insert = function(pos, str) {
  return new TextOperation({ type: INS, pos: pos, str: str });
};

TextOperation.Delete = function(pos, str) {
  return new TextOperation({ type: DEL, pos: pos, str: str });
};

TextOperation.INSERT = INS;
TextOperation.DELETE = DEL;

module.exports = TextOperation;

},{"../basics/helpers":168,"../basics/oo":170,"./conflict":232,"./operation":235}],237:[function(require,module,exports){
var _ = require("../basics/helpers");
var OO = require("../basics/oo");
var Tool = require('./tool');

function AnnotationTool(context) {
  Tool.call(this, context);
}

AnnotationTool.Prototype = function() {
  // blacklist of modes; one of 'create', 'remove', 'truncate', 'expand', 'fusion'
  this.disabledModes = [];

  this.splitContainerSelections = false;

  // Provides the type of the associated annotation node.
  // The default implementation uses the Tool's static name.
  // Override this method to customize.
  this.getAnnotationType = function() {
    if (this.constructor.static.name) {
      return this.constructor.static.name;
    } else {
      throw new Error('Contract: AnnotationTool.static.name should be associated to a document annotation type.');
    }
  };

  this.afterCreate = function() {};

  this.afterFusion = function() {};

  this.afterRemove = function() {};

  this.afterTruncate = function() {};

  this.afterExpand = function() {};

  // When there's no existing annotation overlapping, we create a new one.
  this.canCreate = function(annos, sel) {
    return (annos.length === 0 && !sel.isCollapsed());
  };

  // When more than one annotation overlaps with the current selection
  this.canFusion = function(annos, sel) {
    return (annos.length >= 2 && !sel.isCollapsed());
  };

  // When the cursor or selection is inside an existing annotation
  this.canRemove = function(annos, sel) {
    if (annos.length !== 1) return false;
    var annoSel = annos[0].getSelection();
    return sel.isInsideOf(annoSel);
  };

  // When there's some overlap with only a single annotation we do an expand
  this.canExpand = function(annos, sel) {
    if (annos.length !== 1) return false;
    var annoSel = annos[0].getSelection();
    return sel.overlaps(annoSel) && !sel.isInsideOf(annoSel);
  };

  this.canTruncate = function(annos, sel) {
    if (annos.length !== 1) return false;
    var annoSel = annos[0].getSelection();
    return (sel.isLeftAlignedWith(annoSel) || sel.isRightAlignedWith(annoSel)) && !sel.equals(annoSel) && !sel.isCollapsed();
  };

  this.update = function(surface, sel) {
    this.surface = surface;
    if ( (this.needsEnabledSurface && !surface.isEnabled()) ||
          sel.isNull() ) {
      return this.setDisabled();
    }
    var doc = this.getDocument();
    var annotationType = this.getAnnotationType();
    var isContainerAnno = this.isContainerAnno();
    // Extract range and matching annos of current selection
    var annos;
    if (isContainerAnno) {
      annos = doc.getContainerAnnotationsForSelection(sel, this.getContainer(), {
        type: annotationType
      });
    } else {
      // Don't react on container selections if the associated annotation type
      // is a property annotation.
      // In future we could introduce a multi-annotation (multiple property selections)
      // and create multiple annotations at once.
      if (!sel.isPropertySelection() && !this.splitContainerSelections) {
        return this.setDisabled();
      }
      annos = doc.getAnnotationsForSelection(sel, { type: annotationType });
    }

    var newState = {
      surface: surface,
      disabled: false,
      active: false,
      mode: null,
      sel: sel,
      annos: annos
    };

    if (this.canCreate(annos, sel)) {
      newState.mode = "create";
    } else if (this.canFusion(annos, sel)) {
      newState.mode = "fusion";
    } else if (this.canTruncate(annos, sel)) {
      newState.active = true;
      newState.mode = "truncate";
    } else if (this.canRemove(annos, sel)) {
      newState.active = true;
      newState.mode = "remove";
    } else if (this.canExpand(annos, sel)) {
      newState.mode = "expand";
    }

    // Verifies if the detected mode has been disabled by the concrete implementation
    if (!newState.mode || _.includes(this.disabledModes, newState.mode)) {
      return this.setDisabled();
    } else {
      this.setToolState(newState);
    }
  };

  this.performAction = function() {
    var state = this.getToolState();
    // TODO: is this really necessary? better just check if the toolstate does not have a proper mode
    if (!state.sel || !state.mode || state.sel.isNull()) return;
    switch (state.mode) {
      case "create":
        return this.handleCreate(state);
      case "fusion":
        return this.handleFusion(state);
      case "remove":
        return this.handleRemove(state);
      case "truncate":
        return this.handleTruncate(state);
      case "expand":
        return this.handleExpand(state);
    }
  };

  this.handleCreate = function(state) {
    var sel = state.sel;
    var anno;

    if (sel.isNull()) return;
    this.surface.transaction({ selection: sel }, function(tx, args) {
      anno = this.createAnnotationForSelection(tx, sel);
      return args;
    }, this);
    this.afterCreate(anno);
  };

  this.getAnnotationData = function() {
    return {};
  };

  this.isContainerAnno = function() {
    var doc = this.getDocument();
    var schema = doc.getSchema();
    return schema.isInstanceOf(this.getAnnotationType(), "container_annotation");
  };

  this._createPropertyAnnotations = function(tx, sel) {
    var sels;
    var annotationType = this.getAnnotationType();
    if (sel.isPropertySelection()) {
      sels = [];
    } else if (sel.isContainerSelection()) {
      sels = sel.splitIntoPropertySelections();
    }
    for (var i = 0; i < sels.length; i++) {
      var anno = {
        id: _.uuid(annotationType),
        type: annotationType
      };
      _.extend(anno, this.getAnnotationData());
      anno.path = sels[i].getPath();
      anno.startOffset = sels[i].getStartOffset();
      anno.endOffset = sels[i].getEndOffset();
      tx.create(anno);
    }
  };

  this.createAnnotationForSelection = function(tx, sel) {
    if (this.splitContainerSelections && sel.isContainerSelection()) {
      return this._createPropertyAnnotations(tx, sel);
    }
    var annotationType = this.getAnnotationType();
    var anno = {
      id: _.uuid(annotationType),
      type: annotationType,
    };
    _.extend(anno, this.getAnnotationData());
    if (this.isContainerAnno()) {
      anno.startPath = sel.start.path;
      anno.endPath = sel.end.path;

      // Assuming that this branch only gets reached when the surface has a container
      // editor attached, we can ask this editor for the containerId
      var containerId = this.surface.getEditor().getContainerId();
      if (!containerId) throw "Container could not be determined";
      anno.container = containerId;
    } else if (sel.isPropertySelection()) {
      anno.path = sel.getPath();
    } else {
      throw new Error('Illegal state: can not apply ContainerSelection');
    }
    anno.startOffset = sel.getStartOffset();
    anno.endOffset = sel.getEndOffset();
    // start the transaction with an initial selection
    return tx.create(anno);
  };

  this.handleFusion = function(state) {
    var sel = state.sel;
    this.surface.transaction({ selection: sel }, function(tx, args) {
      _.each(state.annos, function(anno) {
        sel = sel.expand(anno.getSelection());
      });
      _.each(state.annos, function(anno) {
        tx.delete(anno.id);
      });
      this.createAnnotationForSelection(tx, sel);
      this.afterFusion();
      args.selection = sel;
      return args;
    }, this);
  };

  this.handleRemove = function(state) {
    var sel = state.sel;
    this.surface.transaction({ selection: sel }, function(tx, args) {
      var annoId = state.annos[0].id;
      tx.delete(annoId);
      this.afterRemove();
      return args;
    }, this);
  };

  this.handleTruncate = function(state) {
    var sel = state.sel;
    this.surface.transaction({ selection: sel }, function(tx, args) {
      var anno = state.annos[0];
      var annoSel = anno.getSelection();
      var newAnnoSel = annoSel.truncate(sel);
      anno.updateRange(tx, newAnnoSel);
      this.afterTruncate();
      return args;
    }, this);
  };

  this.handleExpand = function(state) {
    var sel = state.sel;
    this.surface.transaction({ selection: sel }, function(tx, args) {
      var anno = state.annos[0];
      var annoSel = anno.getSelection();
      var newAnnoSel = annoSel.expand(sel);
      anno.updateRange(tx, newAnnoSel);
      this.afterExpand();
      return args;
    }, this);
  };
};

OO.inherit(AnnotationTool, Tool);

module.exports = AnnotationTool;

},{"../basics/helpers":168,"../basics/oo":170,"./tool":250}],238:[function(require,module,exports){
'use strict';

var NodeView = require('./node_view');

var AnnotationView = NodeView.extend({
  name: "annotation",
  tagName: 'span',

  getClassNames: function() {
    var classNames = this.node.getClassNames();
    if (this.props.classNames) {
      classNames += " " + this.props.classNames.join(' ');
    }
    return classNames.replace(/_/g, '-');
  }
});

module.exports = AnnotationView;

},{"./node_view":243}],239:[function(require,module,exports){
"use strict";

var _ = require('../basics/helpers');
var OO = require('../basics/oo');

// context must have a getSurface() method.
var Clipboard = function(surfaceManager, htmlImporter, htmlExporter) {

  this.surfaceManager = surfaceManager;
  this.htmlImporter = htmlImporter;
  this.htmlExporter = htmlExporter;

  this._contentDoc = null;
  this._contentText = "";

  this._onKeyDown = _.bind(this.onKeyDown, this);
  this._onCopy = _.bind(this.onCopy, this);
  this._onCut = _.bind(this.onCut, this);

  this.isIe = (window.navigator.userAgent.toLowerCase().indexOf("msie") != -1 || window.navigator.userAgent.toLowerCase().indexOf("trident") != -1);
  this.isFF = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  if (this.isIe) {
    this._beforePasteShim = _.bind(this.beforePasteShim, this);
    this._pasteShim = _.bind(this.pasteShim, this);
  } else {
    this._onPaste = _.bind(this.onPaste, this);
  }

};

Clipboard.Prototype = function() {

  this.getSurface = function() {
    return this.surfaceManager.getFocussedSurface();
  };

  this.attach = function(rootElement) {
    this.el = window.document.createElement('div');
    this.$el = $(this.el);
    this.$el.prop("contentEditable", "true").addClass('clipboard');
    rootElement.appendChild(this.el);

    rootElement.addEventListener('keydown', this._onKeyDown, false);
    rootElement.addEventListener('copy', this._onCopy, false);
    rootElement.addEventListener('cut', this._onCut, false);

    if (this.isIe) {
      rootElement.addEventListener('beforepaste', this._beforePasteShim, false);
      rootElement.addEventListener('paste', this._pasteShim, false);
    } else {
      rootElement.addEventListener('paste', this._onPaste, false);
    }
  };

  this.detach = function(rootElement) {
    this.$el.remove();

    rootElement.removeEventListener('keydown', this._onKeyDown, false);
    rootElement.removeEventListener('copy', this._onCopy, false);
    rootElement.removeEventListener('cut', this._onCut, false);
    if (this.isIe) {
      rootElement.removeEventListener('beforepaste', this._beforePasteShim, false);
      rootElement.removeEventListener('paste', this._pasteShim, false);
    } else {
      rootElement.removeEventListener('paste', this._onPaste, false);
    }
  };

  this.onCopy = function(event) {
    console.log("Clipboard.onCopy", arguments);
    this._copySelection();
    if (event.clipboardData && this._contentDoc) {
      var html = this.htmlExporter.convert(this._contentDoc);
      console.log('Stored HTML in clipboard', html);
      this._contentDoc.__id__ = _.uuid();
      var data = this._contentDoc.toJSON();
      data.__id__ = this._contentDoc.__id__;
      event.clipboardData.setData('application/substance', JSON.stringify(data));
      event.clipboardData.setData('text/plain', $(html).text());
      event.clipboardData.setData('text/html', html);
      event.preventDefault();
    }
  };

  // nothing special for cut.
  this.onCut = function(e) {
    e.preventDefault();
    console.log("Clipboard.onCut", arguments);
    this.onCopy(e);
    var surface = this.getSurface();
    if (!surface) return;
    var editor = surface.getEditor();
    surface.transaction(function(tx, args) {
      return editor.delete(tx, args);
    });
  };

  this.pasteSubstanceData = function(data) {
    var surface = this.getSurface();
    if (!surface) return;
    var editor = surface.getEditor();
    var doc = surface.getDocument();
    // try {
      var content = doc.newInstance();
      content._setForClipboard(true);
      content.loadSeed(JSON.parse(data));
      var plainText = "";
      var pasteContent = content.get('clipboard_content');
      // TODO: try to get rid of that here.
      // we need a document.toPlainText() for that
      if (pasteContent.nodes.length > 0) {
        var first = pasteContent.getFirstComponent();
        var last = pasteContent.getLastComponent();
        var lastLength = content.get(last.path).length;
        var sel = doc.createSelection({
          type: 'container',
          containerId: 'clipboard_content',
          startPath: first.path,
          startOffset: 0,
          endPath: last.path,
          endOffset: lastLength
        });
        plainText = content.getTextForSelection(sel);
      }
      surface.transaction(function(tx, args) {
        args.text = plainText;
        args.doc = content;
        return editor.paste(tx, args);
      });
    // } catch (error) {
    //   console.error(error);
    //   logger.error(error);
    // }
  };

  this.pasteHtml = function(htmlDoc) {
    var surface = this.getSurface();
    if (!surface) return;
    var editor = surface.getEditor();
    var logger = surface.getLogger();
    var doc = surface.getDocument();
    try {
      var content = doc.newInstance();
      content._setForClipboard(true);
      // TODO: the clipboard importer should make sure
      // that the container exists
      if (!content.get('clipboard_content')) {
        content.create({
          id: 'clipboard_content',
          type: 'container',
          nodes: []
        });
      }
      this.htmlImporter.convert($(htmlDoc), content);
      surface.transaction(function(tx, args) {
        args.text = htmlDoc.body.textContent;
        args.doc = content;
        return editor.paste(tx, args);
      });
    } catch (error) {
      console.error(error);
      logger.error(error);
    }
  };

  // Works on Safari/Chrome/FF
  this.onPaste = function(e) {
    var clipboardData = e.clipboardData;
    var surface = this.getSurface();
    if (!surface) return;
    var editor = surface.getEditor();
    var logger = surface.getLogger();
    var types = {};
    for (var i = 0; i < clipboardData.types.length; i++) {
      types[clipboardData.types[i]] = true;
    }

    // HACK: FF does not provide HTML coming in from other applications
    // so fall back to the paste shim
    if (this.isFF && !types['application/substance'] && !types['text/html']) {
      this.beforePasteShim();
      surface.rerenderSelection();
      this.pasteShim();
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    console.log('Available types', types);

    // use internal data if available
    if (types['application/substance']) {
      return this.pasteSubstanceData(clipboardData.getData('application/substance'));
    }

    // if we have content given as HTML we let the importer assess the quality first
    // and fallback to plain text import if it's bad
    if (types['text/html']) {
      var html = clipboardData.getData('text/html');
      var htmlDoc = new window.DOMParser().parseFromString(html, "text/html");
      if (this.htmlImporter.checkQuality($(htmlDoc))) {
        return this.pasteHtml(htmlDoc);
      }
    }
    // Fallback to plain-text in other cases
    var plainText = clipboardData.getData('text/plain');
    if (surface.getEditor().isContainerEditor()) {
      var doc = surface.getDocument();
      var defaultTextType = doc.getSchema().getDefaultTextType();
      surface.transaction(function(tx, args) {
        // TODO: this implementation should not do this
        // instead the 'paste' transformation should be able to do it.
        var paraText = plainText.split(/\s*\n\s*\n/);
        var pasteDoc = doc.newInstance();
        pasteDoc._setForClipboard(true);
        var container = pasteDoc.create({
          type: 'container',
          id: 'clipboard_content',
          nodes: []
        });
        for (var i = 0; i < paraText.length; i++) {
          var paragraph = pasteDoc.create({
            id: _.uuid(defaultTextType),
            type: defaultTextType,
            content: paraText[i]
          });
          container.show(paragraph.id);
        }
        args.doc = pasteDoc;
        return editor.paste(tx, args);
      });
    } else {
      surface.transaction(function(tx, args) {
        args.text = plainText.split('').join('');
        return editor.insertText(tx, args);
      });
    }
  };

  this.beforePasteShim = function() {
    var surface = this.getSurface();
    if (!surface) return;
    console.log("Paste before...");
    this.$el.focus();
    var range = document.createRange();
    range.selectNodeContents(this.el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  this.pasteShim = function() {
    this.$el.empty();
    var self = this;
    var surface = this.getSurface();
    if (!surface) return;
    var sel = surface.getSelection();
    setTimeout(function() {
      surface.selection = sel;
      var html = self.$el.html();
      html = ['<html><head></head><body>', html, '</body></html>'].join('');
      self.$el.empty();
      var htmlDoc = new window.DOMParser().parseFromString(html, "text/html");
      // if (self.htmlImporter.checkQuality($(htmlDoc))) {
        return self.pasteHtml(htmlDoc);
      // }
    }, 0);
  };

  this.onKeyDown = function(e) {
    if (e.keyCode === 88 && (e.metaKey||e.ctrlKey)) {
      // console.log('Handle cut');
      // this.handleCut();
      // e.preventDefault();
      // e.stopPropagation();
    }
    else if (e.keyCode === 86 && (e.metaKey||e.ctrlKey)) {
      // console.log('Handle paste');
      this.handlePaste();
      // e.preventDefault();
      // e.stopPropagation();
    }
    else if (e.keyCode === 67 && (e.metaKey||e.ctrlKey)) {
      // console.log('Handle copy');
      // this.handleCopy(e);
      // e.preventDefault();
      // e.stopPropagation();
    }
  };

  this.handleCut = function() {
    console.log("Cutting into Clipboard...");
    var wSel = window.getSelection();
    // TODO: deal with multiple ranges
    // first extract the selected content into the hidden element
    var wRange = wSel.getRangeAt(0);
    var frag = wRange.cloneContents();
    this.el.innerHTML = "";
    this.el.appendChild(frag);
    this._copySelection();
    var surface = this.getSurface();
    if (!surface) return;
    try {
      console.log("...selection before deletion", surface.getSelection().toString());
      surface.getEditor().delete();
    } catch (error) {
      console.error(error);
      this.logger.error(error);
      return;
    }
    // select the copied content
    var wRangeNew = window.document.createRange();
    wRangeNew.selectNodeContents(this.el);
    wSel.removeAllRanges();
    wSel.addRange(wRangeNew);

    // hacky way to reset the selection which gets lost otherwise
    window.setTimeout(function() {
      // console.log("...restoring the selection");
      surface.rerenderDomSelection();
    }, 10);
  };

  this.handlePaste = function() {
  };

  this.handleCopy = function() {
    // Nothing here
  };

  this._copySelection = function() {
    var wSel = window.getSelection();
    this._contentText = "";
    this._contentDoc = null;
    var surface = this.getSurface();
    var sel = surface.getSelection();
    var editor = surface.getEditor();
    var doc = surface.getDocument();
    if (wSel.rangeCount > 0 && !sel.isCollapsed()) {
      var wRange = wSel.getRangeAt(0);
      this._contentText = wRange.toString();
      this._contentDoc = editor.copy(doc, sel);
      console.log("Clipboard._copySelection(): created a copy", this._contentDoc);
    } else {
      this._contentDoc = null;
      this._contentText = "";
    }
  };

};

OO.initClass(Clipboard);

module.exports = Clipboard;

},{"../basics/helpers":168,"../basics/oo":170}],240:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var Document = require('../document');
var FormEditor = require('./form_editor');
var Annotations = Document.AnnotationUpdates;
var Transformations = Document.Transformations;

function ContainerEditor(containerId) {
  if (!_.isString(containerId)) throw new Error("Illegal argument: Expecting container id.");
  FormEditor.call(this);
  this.containerId = containerId;
}

ContainerEditor.Prototype = function() {

  this.isContainerEditor = function() {
    return true;
  };

  this.getContainerId = function() {
    return this.containerId;
  };

  /**
   * Performs a `deleteSelection` tr
   */
  this.delete = function(tx, args) {
    args.containerId = this.containerId;
    return Transformations.deleteSelection(tx, args);
  };

  this.break = function(tx, args) {
    args.containerId = this.containerId;
    if (args.selection.isPropertySelection() || args.selection.isContainerSelection()) {
      return Transformations.breakNode(tx, args);
    }
  };

  this.insertNode = function(tx, args) {
    args.containerId = this.containerId;
    if (args.selection.isPropertySelection() || args.selection.isContainerSelection()) {
      return Transformations.insertNode(tx, args);
    }
  };

  this.switchType = function(tx, args) {
    args.containerId = this.containerId;
    if (args.selection.isPropertySelection()) {
      return Transformations.switchTextType(tx, args);
    }
  };

  this.selectAll = function(doc) {
    var container = doc.get(this.containerId);
    var first = container.getFirstComponent();
    var last = container.getLastComponent();
    var lastText = doc.get(last.path);
    return doc.createSelection({
      type: 'container',
      containerId: this.containerId,
      startPath: first.path,
      startOffset: 0,
      endPath: last.path,
      endOffset: lastText.length
    });
  };

  this.paste = function(tx, args) {
    args.containerId = this.containerId;
    if (args.selection.isPropertySelection() || args.selection.isContainerSelection()) {
      return Transformations.paste(tx, args);
    }
  };

};

OO.inherit(ContainerEditor, FormEditor);

module.exports = ContainerEditor;

},{"../basics/helpers":168,"../basics/oo":170,"../document":198,"./form_editor":241}],241:[function(require,module,exports){
'use strict';

var Substance = require('../basics');
var Document = require('../document');
var Selection = Document.Selection;
var Annotations = Document.AnnotationUpdates;
var Transformations = Document.Transformations;

function FormEditor() {}

FormEditor.Prototype = function() {

  this.isContainerEditor = function() {
    return false;
  };

  // Selects the current property.
  this.selectAll = function(doc, selection) {
    var sel = selection;
    if (sel.isNull()) return;
    if (sel.isPropertySelection()) {
      var path = sel.start.path;
      var text = doc.get(path);
      return doc.createSelection({
        type: 'property',
        path: path,
        startOffset: 0,
        endOffset: text.length
      });
    }
  };

  this.insertText = function(tx, args) {
    if (args.selection.isPropertySelection() || args.selection.isContainerSelection()) {
      return Transformations.insertText(tx, args);
    }
  };

  // implements backspace and delete
  this.delete = function(tx, args) {
    return Transformations.deleteSelection(tx, args);
  };

  // no breaking
  this.break = function(tx, args) {
    return this.softBreak(tx, args);
  };

  this.softBreak = function(tx, args) {
    args.text = "\n";
    return this.insertText(tx, args);
  };

  // create a document instance containing only the selected content
  this.copy = function(doc, selection) {
    var result = Transformations.copySelection(doc, { selection: selection });
    return result.doc;
  };

  this.paste = function(tx, args) {
    // TODO: for now only plain text is inserted
    // We could do some stitching however, preserving the annotations
    // received in the document
    if (args.text) {
      return this.insertText(tx, args);
    }
  };

};

Substance.initClass(FormEditor);

module.exports = FormEditor;

},{"../basics":169,"../document":198}],242:[function(require,module,exports){

var Surface = require('./surface');
Surface.SurfaceManager = require('./surface_manager');
Surface.SurfaceSelection = require('./surface_selection');

Surface.FormEditor = require('./form_editor');
Surface.ContainerEditor = require('./container_editor');
Surface.Clipboard = require('./clipboard');

Surface.NodeView = require('./node_view');
Surface.AnnotationView = require('./annotation_view');
Surface.TextProperty = require('./text_property');

Surface.Tool = require('./tool');
Surface.AnnotationTool = require('./annotation_tool');
Surface.SwitchTypeTool = require('./switch_type_tool');
Surface.ToolRegistry = require('./tool_registry');
Surface.Panel = require('./panel');

Surface.Tools = require('./tools');

module.exports = Surface;

},{"./annotation_tool":237,"./annotation_view":238,"./clipboard":239,"./container_editor":240,"./form_editor":241,"./node_view":243,"./panel":244,"./surface":245,"./surface_manager":246,"./surface_selection":247,"./switch_type_tool":248,"./text_property":249,"./tool":250,"./tool_registry":251,"./tools":255}],243:[function(require,module,exports){
'use strict';

var Substance = require('../basics');

function NodeView(props) {
  this.props = props;
  this.doc = props.doc;
  this.node = props.node;
}

NodeView.Prototype = function() {

  this.tagName = 'div';

  this.createElement = function() {
    var element = document.createElement(this.getTagName());
    var classNames = this.getClassNames();
    $(element).addClass(classNames);
    element.dataset.id = this.node.id;
    return element;
  };

  this.getTagName = function() {
    return this.node.constructor.static.tagName || this.tagName;
  };

  this.getClassNames = function() {
    return [];
  };

  this.render = function() {
    var element = this.createElement();
    var children = this.props.children;
    if (children) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (Substance.isString(child)) {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof NodeView) {
          var el = child.render();
          element.appendChild(el);
        } else if (child instanceof window.Node) {
          element.appendChild(child);
        }
      }
    }
    return element;
  };

};

Substance.initClass(NodeView);

module.exports = NodeView;

},{"../basics":169}],244:[function(require,module,exports){
'use strict';

var Substance = require("../basics");

// Mixin with helpers to implement a scrollable panel
function Panel() {

}

Panel.Prototype = function() {

  // Get the current coordinates of the first element in the
  // set of matched elements, relative to the offset parent
  // Please be aware that it looks up until it finds a parent that has
  // position: relative|absolute set. So for now never set
  // position: relative somewhere in your panel
  this.getPanelOffsetForElement = function(el) {
    var offsetTop = $(el).position().top;
    return offsetTop;
  };

  this.scrollToNode = function(nodeId) {
    // var n = this.findNodeView(nodeId);
    // TODO make this generic
    var panelContentEl = this.getScrollableContainer();

    // Node we want to scroll to
    var targetNode = $(panelContentEl).find("*[data-id="+nodeId+"]")[0];

    if (targetNode) {
      $(panelContentEl).scrollTop(this.getPanelOffsetForElement(targetNode));
    } else {
      console.warn(nodeId, 'not found in scrollable container');
    }
  };

};

Substance.initClass(Panel);
module.exports = Panel;



},{"../basics":169}],245:[function(require,module,exports){
'use strict';

var _ = require('../basics/helpers');
var OO = require('../basics/oo');
var Substance = require('../basics');
var SurfaceSelection = require('./surface_selection');
var Document = require('../document');
var Selection = Document.Selection;

var __id__ = 0;

function Surface(surfaceManager, doc, editor, options) {
  Substance.EventEmitter.call(this);

  if (!doc) {
    throw new Error('Illegal argument: document is required. was ' + doc);
  }

  options = options || {};

  this.__id__ = __id__++;
  this.name = options.name || __id__;
  this.doc = doc;
  this.surfaceManager = surfaceManager;

  this.selection = Document.nullSelection;

  // this.element must be set via surface.attach(element)
  this.element = null;
  this.$element = null;
  this.editor = editor;

  this.surfaceSelection = null;

  this.logger = options.logger || window.console;

  // TODO: VE make jquery injectable
  this.$ = $;
  this.$window = this.$( window );
  this.$document = this.$( window.document );

  this.dragging = false;

  this._onMouseUp = _.bind( this.onMouseUp, this );
  this._onMouseDown = _.bind( this.onMouseDown, this );
  this._onMouseMove = _.bind( this.onMouseMove, this );

  this._onKeyDown = _.bind(this.onKeyDown, this);
  this._onTextInput = _.bind(this.onTextInput, this);
  this._onTextInputShim = _.bind( this.onTextInputShim, this );
  this._onCompositionStart = _.bind( this.onCompositionStart, this );

  this._onDomMutations = _.bind(this.onDomMutations, this);
  this.domObserver = new window.MutationObserver(this._onDomMutations);
  this.domObserverConfig = { subtree: true, characterData: true };
  this.skipNextObservation = false;

  // set when editing is enabled
  this.enabled = true;

  // surface usually gets frozen while showing a popup
  this.frozen = false;
  this.$caret = $('<span>').addClass('surface-caret');

  this.isIE = Surface.detectIE();
  this.isFF = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  this.undoEnabled = true;

  /*jshint eqnull:true */
  if (options.undoEnabled != null) {
    this.undoEnabled = options.undoEnabled;
  }
  if (options.contentEditable != null) {
    this.enableContentEditable = options.contentEditable;
  } else {
    this.enableContentEditable = true;
  }

  this.surfaceManager.registerSurface(this);
  /*jshint eqnull:false */
}

Surface.Prototype = function() {

  this.getName = function() {
    return this.name;
  };

  this.getElement = function() {
    return this.element;
  };

  this.getContainerName = function() {
    if (this.editor.isContainerEditor()) {
      return this.editor.getContainerId();
    }
  };

  this.getContainer = function() {
    if (this.editor.isContainerEditor()) {
      return this.doc.get(this.editor.getContainerId());
    }
  };

  this.getEditor = function() {
    return this.editor;
  };

  this.getDocument = function() {
    return this.doc;
  };

  this.dispose = function() {
    this.setSelection(null);
    this.detach();
    this.surfaceManager.unregisterSurface(this);
  };

  this.attach = function(element) {
    if (!element) {
      throw new Error('Illegal argument: Surface element is required. was ' + element);
    }
    var doc = this.getDocument();

    // Initialization
    this.element = element;
    this.$element = $(element);

    // We leave this now to the view implementation, because readers don't have ce on.
    // if (this.enableContentEditable) {
    //   this.$element.prop('contentEditable', 'true');
    // }
    this.surfaceSelection = new SurfaceSelection(element, doc, this.getContainer());

    this.$element.addClass('surface');

    // Keyboard Events
    //
    this.attachKeyboard();

    // Mouse Events
    //
    this.$element.on( 'mousedown', this._onMouseDown );

    // Document Change Events
    //
    this.domObserver.observe(element, this.domObserverConfig);

    this.attached = true;
  };

  this.attachKeyboard = function() {
    this.$element.on('keydown', this._onKeyDown);
    // OSX specific handling of dead-keys
    if (this.element.addEventListener) {
      this.element.addEventListener('compositionstart', this._onCompositionStart, false);
    }
    if (window.TextEvent && !this.isIE) {
      this.element.addEventListener('textInput', this._onTextInput, false);
    } else {
      this.$element.on('keypress', this._onTextInputShim);
    }
  };

  this.detach = function() {
    var doc = this.getDocument();

    this.domObserver.disconnect();

    // Document Change Events
    //
    doc.disconnect(this);

    // Mouse Events
    //
    this.$element.off('mousedown', this._onMouseDown );

    // Keyboard Events
    //
    this.detachKeyboard();

    this.$element.removeClass('surface');

    // Clean-up
    //
    this.element = null;
    this.$element = null;
    this.surfaceSelection = null;

    this.attached = false;
  };

  this.detachKeyboard = function() {
    this.$element.off('keydown', this._onKeyDown);
    if (this.element.addEventListener) {
      this.element.removeEventListener('compositionstart', this._onCompositionStart, false);
    }
    if (window.TextEvent && !this.isIE) {
      this.element.removeEventListener('textInput', this._onTextInput, false);
    } else {
      this.$element.off('keypress', this._onTextInputShim);
    }
  };

  this.isAttached = function() {
    return this.attached;
  };

  this.enable = function() {
    if (this.enableContentEditable) {
      this.$element.prop('contentEditable', 'true');
    }
    this.enabled = true;
  };

  this.isEnabled = function() {
    return this.enabled;
  };

  this.disable = function() {
    if (this.enableContentEditable) {
      this.$element.removeAttr('contentEditable');
    }
    this.enabled = false;
  };

  this.freeze = function() {
    console.log('Freezing surface...');
    if (this.enableContentEditable) {
      this.$element.removeAttr('contentEditable');
    }
    this.$element.addClass('frozen');
    this.domObserver.disconnect();
    this.frozen = true;
  };

  this.unfreeze = function() {
    if (!this.frozen) {
      return;
    }
    console.log('Unfreezing surface...');
    if (this.enableContentEditable) {
      this.$element.prop('contentEditable', 'true');
    }
    this.$element.removeClass('frozen');
    this.domObserver.observe(this.element, this.domObserverConfig);
    this.frozen = false;
  };

  // ###########################################
  // Keyboard Handling
  //

  /**
   * Handle document key down events.
   */
  this.onKeyDown = function( e ) {
    if (this.frozen) {
      return;
    }
    if ( e.which === 229 ) {
      // ignore fake IME events (emitted in IE and Chromium)
      return;
    }
    switch ( e.keyCode ) {
      case Surface.Keys.LEFT:
      case Surface.Keys.RIGHT:
        return this.handleLeftOrRightArrowKey(e);
      case Surface.Keys.UP:
      case Surface.Keys.DOWN:
        return this.handleUpOrDownArrowKey(e);
      case Surface.Keys.ENTER:
        return this.handleEnterKey(e);
      case Surface.Keys.SPACE:
        return this.handleSpaceKey(e);
      case Surface.Keys.BACKSPACE:
      case Surface.Keys.DELETE:
        return this.handleDeleteKey(e);
      default:
        break;
    }

    // Built-in key combos
    // console.log('####', e.keyCode, e.metaKey, e.ctrlKey, e.shiftKey);
    // Ctrl+A: select all
    var handled = false;
    if ( (e.ctrlKey||e.metaKey) && e.keyCode === 65 ) {
      var newSelection = this.editor.selectAll(this.getDocument(), this.getSelection());
      this.setSelection(newSelection);
      this.surfaceSelection.setSelection(newSelection);
      this.emit('selection:changed', newSelection, this);
      handled = true;
    }
    // Undo/Redo: cmd+z, cmd+shift+z
    else if (this.undoEnabled && e.keyCode === 90 && (e.metaKey||e.ctrlKey)) {
      if (e.shiftKey) {
        this.redo();
      } else {
        this.undo();
      }
      handled = true;
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  this.undo = function() {
    console.log('UNDO!');
    var doc = this.getDocument();
    if (doc.done.length>0) {
      doc.undo();
    }
  };

  this.redo = function() {
    var doc = this.getDocument();
    if (doc.undone.length>0) {
      doc.redo();
    }
  };

  /**
   * Run a transformation as a transaction properly configured for this surface.
   * @param beforeState (optional) use this to override the default before-state (e.g. to use a different the initial selection).
   * @param transformation a (surface) transformation function(tx, args) which receives
   *                       the selection the transaction was started with, and should return
   *                       output arguments containing a selection, as well.
   * @param ctx (optional) will be used as `this` object when calling the transformation.
   *
   * @example
   *
   *   ```
   *   surface.transaction(function(tx, args) {
   *     var selection = args.selection;
   *     ...
   *     selection = tx.createSelection(...);
   *     return {
   *       selection: selection
   *     };
   *   });
   *
   *   surface.transaction(function(tx, args) {
   *     ...
   *     this.foo();
   *     ...
   *     return args;
   *   }, this);
   *
   *   surface.transaction(beforeState, function(tx, args) {
   *     ...
   *   });
   *   ```
   */
  this.transaction = function(transformation, ctx) {
    // `beforeState` is saved with the document operation and will be used
    // to recover the selection when using 'undo'.
    var beforeState = {
      surfaceId: this.getName(),
      selection: this.getSelection()
    };
    // Note: this is to provide the optional signature transaction(before)
    if (!_.isFunction(arguments[0]) && arguments.length >= 2) {
      var customBeforeState = arguments[0];
      beforeState = _.extend(beforeState, customBeforeState);
      transformation = arguments[1];
      ctx = arguments[2];
    }
    var afterState;
    this.getDocument().transaction(beforeState, function(tx) {
      // A transformation receives a set of input arguments and should return a set of output arguments.
      var result = transformation.call(ctx, tx, { selection: beforeState.selection });
      // The `afterState` is saved with the document operation and will be used
      // to recover the selection whe using `redo`.
      afterState = result || {};
      // If no selection is returned, the old selection is for `afterState`.
      if (!afterState.selection) {
        afterState.selection = beforeState.selection;
      }
      afterState.surfaceId = beforeState.surfaceId;
      return afterState;
    });

    this.setSelection(afterState.selection);
  };

  this.onTextInput = function(e) {
    if (this.frozen) {
      return;
    }
    if (!e.data) return;
    // console.log("TextInput:", e);
    e.preventDefault();
    e.stopPropagation();
    // necessary for handling dead keys properly
    this.skipNextObservation=true;
    this.transaction(function(tx, args) {
      return this.editor.insertText(tx, { selection: args.selection, text: e.data });
    }, this);
    this.rerenderDomSelection();
  };

  // Handling Dead-keys under OSX
  this.onCompositionStart = function() {
    // just tell DOM observer that we have everything under control
    this.skipNextObservation = true;
  };

  // a shim for textInput events based on keyPress and a horribly dangerous dance with the CE
  this.onTextInputShim = function( e ) {
    if (this.frozen) {
      return;
    }
    // Filter out non-character keys. Doing this prevents:
    // * Unexpected content deletion when selection is not collapsed and the user presses, for
    //   example, the Home key (Firefox fires 'keypress' for it)
    // * Incorrect pawning when selection is collapsed and the user presses a key that is not handled
    //   elsewhere and doesn't produce any text, for example Escape
    if (
      // Catches most keys that don't produce output (charCode === 0, thus no character)
      e.which === 0 || e.charCode === 0 ||
      // Opera 12 doesn't always adhere to that convention
      e.keyCode === Surface.Keys.TAB || e.keyCode === Surface.Keys.ESCAPE ||
      // prevent combinations with meta keys, but not alt-graph which is represented as ctrl+alt
      !!(e.metaKey) || (!!e.ctrlKey^!!e.altKey)
    ) {
      return;
    }
    var character = String.fromCharCode(e.which);
    this.skipNextObservation=true;
    if (!e.shiftKey) {
      character = character.toLowerCase();
    }
    if (character.length>0) {
      this.transaction(function(tx, args) {
        return this.editor.insertText(tx, { selection: args.selection, text: character });
      }, this);
      this.rerenderDomSelection();
      e.preventDefault();
      e.stopPropagation();
      return;
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  this.handleLeftOrRightArrowKey = function ( e ) {
    var self = this;
    // Note: we need this timeout so that CE updates the DOM selection first
    // before we map the DOM selection
    window.setTimeout(function() {
      var options = {
        direction: (e.keyCode === Surface.Keys.LEFT) ? 'left' : 'right'
      };
      self._updateModelSelection(options);
    });
  };

  this.handleUpOrDownArrowKey = function ( e ) {
    var self = this;
    // Note: we need this timeout so that CE updates the DOM selection first
    // before we map the DOM selection
    window.setTimeout(function() {
      var options = {
        direction: (e.keyCode === Surface.Keys.UP) ? 'left' : 'right'
      };
      self._updateModelSelection(options);
    });
  };

  this.handleSpaceKey = function( e ) {
    e.preventDefault();
    e.stopPropagation();
    this.transaction(function(tx, args) {
      return this.editor.insertText(tx, { selection: args.selection, text: " " });
    }, this);
    this.rerenderDomSelection();
  };

  this.handleEnterKey = function( e ) {
    e.preventDefault();
    if (e.shiftKey) {
      this.transaction(function(tx, args) {
        return this.editor.softBreak(tx, args);
      }, this);
    } else {
      this.transaction(function(tx, args) {
        return this.editor.break(tx, args);
      }, this);
    }
    this.rerenderDomSelection();
  };

  this.handleDeleteKey = function ( e ) {
    e.preventDefault();
    var direction = (e.keyCode === Surface.Keys.BACKSPACE) ? 'left' : 'right';
    this.transaction(function(tx, args) {
      return this.editor.delete(tx, { selection: args.selection, direction: direction });
    }, this);
    this.rerenderDomSelection();
  };

  // ###########################################
  // Mouse Handling
  //

  this.onMouseDown = function(e) {
    if (this.frozen) {
      this.unfreeze();
    }
    if ( e.which !== 1 ) {
      return;
    }
    // Bind mouseup to the whole document in case of dragging out of the surface
    this.dragging = true;
    this.$document.one( 'mouseup', this._onMouseUp );
  };

  this.onMouseUp = function(/*e*/) {
    // ... and unbind the temporary handler
    this.dragging = false;
    this.setFocused(true);
    // HACK: somehow the DOM selection is sometimes not there
    var self = this;
    setTimeout(function() {
      if (self.surfaceSelection) {
        var sel = self.surfaceSelection.getSelection();
        self.setSelection(sel);
      }
    });
  };

  this.setFocused = function(val) {
    this.isFocused = val;
    if (this.isFocused) {
      this.surfaceManager.didFocus(this);
    }
  };

  this.onMouseMove = function() {
    if (this.dragging) {
      // TODO: do we want that?
      // update selection during dragging
      // this._setModelSelection(this.surfaceSelection.getSelection());
    }
  };

  this.onDomMutations = function() {
    if (this.skipNextObservation) {
      this.skipNextObservation = false;
      return;
    }
    // Known use-cases:
    //  - Context-menu:
    //      - Delete
    //      - Note: copy, cut, paste work just fine
    console.info("We want to enable a DOM MutationObserver which catches all changes made by native interfaces (such as spell corrections, etc). Lookout for this message and try to set Surface.skipNextObservation=true when you know that you will mutate the DOM.");
  };

  // ###########################################
  // Document and Selection Changes
  //

  this.getSelection = function() {
    return this.selection;
  };

  /**
   * Set the model selection and update the DOM selection accordingly
   */
  this.setSelection = function(sel) {
    if (!sel) {
      sel = Selection.nullSelection;
    } else if (_.isObject(sel) && !(sel instanceof Selection)) {
      sel = this.getDocument().createSelection(sel);
    }
    if (this._setModelSelection(sel)) {
      this.rerenderDomSelection();
    }
  };

  this.rerenderDomSelection = function() {
    // Note: as rerendering the selection is done delayed
    // it can happen that the surface has been detached in the meantime.
    if (this.surfaceSelection) {
      var surfaceSelection = this.surfaceSelection;
      var sel = this.getSelection();
      setTimeout(function() {
        surfaceSelection.setSelection(sel);
      });
    }
  };

  this.getDomNodeForId = function(nodeId) {
    return this.element.querySelector('*[data-id='+nodeId+']');
  };

  this._updateModelSelection = function(options) {
    this._setModelSelection(this.surfaceSelection.getSelection(options));
  };

  /**
   * Set the model selection only (without DOM selection update).
   *
   * Used internally if we derive the model selection from the DOM selcection.
   */
  this._setModelSelection = function(sel) {
    sel = sel || Substance.Document.nullSelection;
    this.selection = sel;
    this.emit('selection:changed', sel, this);
    return true;
  };

  this.getLogger = function() {
    return this.logger;
  };

  this.placeCaretElement = function() {
    var sel = this.getSelection();
    if (sel.isNull()) {
      throw new Error('Selection is null.');
    }
    var $caret = this.$caret;
    $caret.empty().remove();
    var pos = this.surfaceSelection._findDomPosition(sel.start.path, sel.start.offset);
    if (pos.node.nodeType === window.Node.TEXT_NODE) {
      var textNode = pos.node;
      if (textNode.length === pos.offset) {
        $caret.insertAfter(textNode);
      } else {
        // split the text node into two pieces
        var wsel = window.getSelection();
        var wrange = window.document.createRange();
        var text = textNode.textContent;
        var frag = window.document.createDocumentFragment();
        var textFrag = window.document.createTextNode(text.substring(0, pos.offset));
        frag.appendChild(textFrag);
        frag.appendChild($caret[0]);
        frag.appendChild(document.createTextNode(text.substring(pos.offset)));
        $(textNode).replaceWith(frag);
        wrange.setStart(textFrag, pos.offset);
        wsel.removeAllRanges();
        wsel.addRange(wrange);
      }
    } else {
      pos.node.appendChild($caret[0]);
    }
    return $caret;
  };

  this.removeCaretElement = function() {
    this.$caret.remove();
  };

  this.updateCaretElement = function() {
    this.$caret.remove();
    this.placeCaretElement();
  };

};

OO.inherit( Surface, Substance.EventEmitter );

Surface.Keys =  {
  UNDEFINED: 0,
  BACKSPACE: 8,
  DELETE: 46,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  END: 35,
  HOME: 36,
  TAB: 9,
  PAGEUP: 33,
  PAGEDOWN: 34,
  ESCAPE: 27,
  SHIFT: 16,
  SPACE: 32
};

Surface.detectIE = function() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
     // IE 12 => return version number
     return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  // other browser
  return false;
};


module.exports = Surface;

},{"../basics":169,"../basics/helpers":168,"../basics/oo":170,"../document":198,"./surface_selection":247}],246:[function(require,module,exports){
'use strict';

var OO = require('../basics/oo');
var _ = require('../basics/helpers');
var Surface = require('./surface');

var SurfaceManager = function(doc) {
  this.doc = doc;
  this.surfaces = {};
  this.focussedSurface = null;
  this.stack = [];
  doc.connect(this, { 'document:changed': this.onDocumentChange }, {
    //lower priority so that everyting is up2date
    //when we render the selection
    priority: -1
  });
};

SurfaceManager.Prototype = function() {

  this.dispose = function() {
    this.doc.disconnect(this);
    this.surfaces = {};
  };

  this.createSurface = function(editor, options) {
    return new Surface(this, editor, options);
  };

  this.registerSurface = function(surface) {
    this.surfaces[surface.getName()] = surface;
  };

  this.unregisterSurface = function(surface) {
    delete this.surfaces[surface.getName()];
    if (surface && this.focussedSurface === surface) {
      this.focussedSurface = null;
    }
  };

  this.hasSurfaces = function() {
    return Object.keys(this.surfaces).length > 0;
  };

  this.didFocus = function(surface) {
    if (this.focussedSurface && surface !== this.focussedSurface) {
      this.focussedSurface.setFocused(false);
    }
    this.focussedSurface = surface;
  };

  this.getFocussedSurface = function() {
    return this.focussedSurface;
  };

  this.onDocumentChange = function(change, info) {
    if (info.replay) {
      var selection = change.after.selection;
      var surfaceId = change.after.surfaceId;
      var surface = this.surfaces[surfaceId];
      if (surface) {
        if (this.focussedSurface !== surface) {
          this.didFocus(surface);
        }
        surface.setSelection(selection);
      } else {
        console.warn('No surface with name', surfaceId);
      }
    }
  };

  this.pushState = function() {
    var state = {
      surface: this.focussedSurface,
      selection: null
    }
    if (this.focussedSurface) {
      state.selection = this.focussedSurface.getSelection();
    }
    this.focussedSurface = null;
    this.stack.push(state);
  };

  this.popState = function() {
    var state = this.stack.pop();
    if (state && state.surface) {
      state.surface.setFocused(true);
      state.surface.setSelection(state.selection);
    }
  };

};

OO.initClass(SurfaceManager);

module.exports = SurfaceManager;

},{"../basics/helpers":168,"../basics/oo":170,"./surface":245}],247:[function(require,module,exports){
var OO = require('../basics/oo');
var Document = require('../document');
var _ = require('../basics/helpers');
var Range = Document.Range;
var Coordinate = Document.Coordinate;

/**
 * A class that maps DOM selections to model selections.
 *
 * There are some difficulties with mapping model selections:
 * 1. DOM selections can not model discontinuous selections, such as TableSelections or MultiSelections.
 * 2. Not all positions reachable via ContentEditable can be mapped to model selections. For instance,
 *    there are extra positions before and after non-editable child elements.
 * 3. Some native cursor behaviors need to be overidden, such as for navigating tables.
 *
 * @class SurfaceSelection
 * @constructor
 * @param {Element} rootElement
 * @module Surface
 */
function SurfaceSelection(rootElement, doc, container) {
  this.element = rootElement;
  this.doc = doc;
  this.container = container;
  this.state = new SurfaceSelection.State();
}

SurfaceSelection.Prototype = function() {

  function compareNodes(node1, node2) {
    var cmp = node1.compareDocumentPosition(node2);
    if (cmp&window.document.DOCUMENT_POSITION_FOLLOWING) {
      return -1;
    } else if (cmp&window.document.DOCUMENT_POSITION_PRECEDING) {
      return 1;
    } else {
      return 0;
    }
  }

  // input methods:
  // - mouse down (setting cursor with mouse)
  // - keyboard cursor movement
  // - expand:
  //   - mouse dragging
  //   - cursor movement with shift

  // workflow for mapping from DOM to model:
  // 1. extract coordinates
  // 2. fixup coordinates
  // 3. create a model selection
  this._pullState = function(anchorNode, anchorOffset, focusNode, focusOffset, collapsed, options) {
    options = options || {};
    if (!focusNode || !anchorNode) {
      this.state = null;
      return;
    }
    // console.log('###', anchorNode, anchorOffset, focusNode, focusOffset);
    var start, end;
    if (collapsed) {
      start = this.getModelCoordinate(anchorNode, anchorOffset, options);
      end = start;
    } else {
      start = this.getModelCoordinate(anchorNode, anchorOffset, options);
      end = this.getModelCoordinate(focusNode, focusOffset, options);
    }
    // the selection is reversed when the focus propertyEl is before
    // the anchor el or the computed charPos is in reverse order
    var reverse = false;
    if (!collapsed && focusNode && anchorNode) {
      var cmp = compareNodes(end.el, start.el);
      reverse = ( cmp < 0 || (cmp === 0 && end.offset < start.offset) );
    }
    if (reverse) {
      var tmp = end;
      end = start;
      start = tmp;
    }
    // console.log('### extracted selection:', start, end, reverse);
    this.state = new SurfaceSelection.State(collapsed, reverse, start, end);
  };

  this.getModelCoordinate = function(node, offset, options) {
    var current = node;
    var propertyEl = null;
    while(current) {
      // if available extract a path fragment
      if (current.dataset && current.dataset.path) {
        propertyEl = current;
        break;
      }
      // edge case: when a node is empty then then the given DOM node
      // is the node element and with offset=0
      if ($(current).is('.content-node') && offset === 0) {
        var $propertyEl = $(current).find('[data-path]');
        if ($propertyEl.length) {
          return new SurfaceSelection.Coordinate($propertyEl[0], 0);
        }
      }
      current = current.parentNode;
    }
    if (!propertyEl) {
      return this.searchForCoordinate(node, offset, options);
    }
    var charPos = this._computeCharPosition(propertyEl, node, offset);
    return new SurfaceSelection.Coordinate(propertyEl, charPos);
  };

  this._computeCharPosition = function(propertyEl, endNode, offset) {
    var charPos = 0;

    // This works with endNode being a TextNode
    function _getPosition(node) {
      if (endNode === node) {
        charPos += offset;
        return true;
      }
      if (node.nodeType === window.Node.TEXT_NODE) {
        charPos += node.textContent.length;
      } else if (node.nodeType === window.Node.ELEMENT_NODE) {
        // external nodes have a length of 1
        // they are attached to an invisible character
        // but may have a custom rendering
        if ($(node).data('external')) {
          charPos += 1;
          return false;
        }
        for (var childNode = node.firstChild; childNode; childNode = childNode.nextSibling) {
          if (_getPosition(childNode)) {
            return true;
          }
        }
      }
      return false;
    }
    // count characters recursively
    // by sum up the length of all TextNodes
    // and counting external nodes by 1.
    function _countCharacters(el) {
      var type = el.nodeType;
      if (type === window.Node.TEXT_NODE) {
        return el.textContent.length;
      } else if (type === window.Node.ELEMENT_NODE) {
        if ($(el).data('external')) {
          return 1;
        } else {
          var count = 0;
          for (var childNode = el.firstChild; childNode; childNode = childNode.nextSibling) {
            count += _countCharacters(childNode);
          }
          return count;
        }
      }
      return 0;
    }

    var found = false;

    // HACK: edge case which occurs when the last element
    // is not content-editable (i.e., external)
    // then the anchor node is the property element itself
    if (endNode === propertyEl) {
      var child = propertyEl.firstChild;
      for (var i = 0; i < offset; i++) {
        if (!child) {
          break;
        }
        charPos += _countCharacters(child);
        child = child.nextSibling;
      }
      found = true;
    } else {
      found = _getPosition(propertyEl);
    }

    if (!found) {
      console.error('Could not find char position.');
      return 0;
    }
    // console.log('charPos', charPos);
    return charPos;
  };

  /**
   * Look up model coordinate by doing a search
   * on all available property elements.
   */
  this.searchForCoordinate = function(node, offset, options) {
    var elements = this.element.querySelectorAll('*[data-path]');
    var idx, idx1, idx2, cmp1, cmp2;
    idx1 = 0;
    idx2 = elements.length-1;
    cmp1 = compareNodes(elements[idx1], node);
    cmp2 = compareNodes(elements[idx2], node);
    while(true) {
      var l = idx2-idx1+1;
      if (cmp2 < 0) {
        idx = idx2;
        break;
      } else if (cmp1 > 0) {
        idx = idx1;
        break;
      } else if (l<=2) {
        idx = idx2;
        break;
      }
      var pivotIdx = idx1 + Math.floor(l/2);
      var pivotCmp = compareNodes(elements[pivotIdx], node);
      if (pivotCmp < 0) {
        idx1 = pivotIdx;
        cmp1 = pivotCmp;
      } else {
        idx2 = pivotIdx;
        cmp2 = pivotCmp;
      }
    }
    var charPos;
    if (options.direction === "left") {
      idx = Math.max(0, idx-1);
      charPos = elements[idx].textContent.length;
    } else if (cmp2<0) {
      charPos = elements[idx].textContent.length;
    } else {
      charPos = 0;
    }
    return new SurfaceSelection.Coordinate(elements[idx], charPos);
  };

  this._getSelection = function(anchorNode, anchorOffset, focusNode, focusOffset, collapsed) {
    this._pullState(anchorNode, anchorOffset, focusNode, focusOffset, collapsed);
    // console.log('#### selection state', this.state);
    if (!this.state) {
      return Document.nullSelection;
    }
    var doc = this.doc;
    var start = this.state.start;
    var end = this.state.end;
    var node1, node2, parent1, parent2, row1, col1, row2, col2;
    var range = new Range(
      new Coordinate(start.path, start.offset),
      new Coordinate(end.path, end.offset)
    );
    if (_.isEqual(start.path, end.path)) {
      return doc.createSelection({
        type: 'property',
        path: start.path,
        startOffset: start.offset,
        endOffset: end.offset,
        reverse: this.state.reverse
      });
    } else {
      node1 = doc.get(start.path[0]);
      node2 = doc.get(end.path[0]);
      parent1 = node1.getRoot();
      parent2 = node2.getRoot();
      if (parent1.type === "table" && parent1.id === parent2.id) {
        // HACK making sure that the table matrix has been computed
        parent1.getMatrix();
        row1 = node1.rowIdx;
        col1 = node1.colIdx;
        row2 = node2.rowIdx;
        col2 = node2.colIdx;
        return doc.createSelection({
          type: 'table',
          tableId: parent1.id,
          startRow: row1,
          startCol: col1,
          endRow: row2,
          endCol: col2
        });
      } else {
        return doc.createSelection({
          type: 'container',
          containerId: this.container.id,
          startPath: range.start.path,
          startOffset: range.start.offset,
          endPath: range.end.path,
          endOffset: range.end.offset,
          reverse: this.state.reverse
        });
      }
    }
  };

  this.getSelection = function() {
    var wSel = window.getSelection();
    var sel = this._getSelection(wSel.anchorNode, wSel.anchorOffset, wSel.focusNode, wSel.focusOffset, wSel.collapsed);
    // console.log('### selection', sel.toString());
    return sel;
  };

  var _findDomPosition = function(element, offset) {
    if (element.nodeType === document.TEXT_NODE) {
      var l = element.textContent.length;
      if (l < offset) {
        return {
          node: null,
          offset: offset-l
        };
      } else {
        return {
          node: element,
          offset: offset,
          boundary: (l === offset)
        };
      }
    } else if (element.nodeType === document.ELEMENT_NODE) {
      if ($(element).data('external')) {
        return {
          node: null,
          offset: offset-1
        };
      }
      // edge case: if the element itself is empty and offset===0
      if (!element.firstChild && offset === 0) {
        return {
          node: element,
          offset: 0
        };
      }
      for (var child = element.firstChild; child; child = child.nextSibling) {
        var pos = _findDomPosition(child, offset);
        if (pos.node) {
          return pos;
        } else {
          // not found in this child; then pos.offset contains the translated offset
          offset = pos.offset;
        }
      }
    }
    return {
      node: null,
      offset: offset
    };
  };

  this._getDomPosition = function(path, offset) {
    var selector = '*[data-path="'+path.join('.')+'"]';
    var componentElement = this.element.querySelector(selector);
    if (!componentElement) {
      console.warn('Could not find DOM element for path', path);
      return null;
    }
    // console.log('### Found component element', componentElement);
    var pos = _findDomPosition(componentElement, offset);
    if (pos.node) {
      return pos;
    } else {
      return null;
    }
  };

  this.setSelection = function(sel) {
    // console.log('### renderSelection', sel.toString());
    var wSel = window.getSelection();
    if (sel.isNull() || sel.isTableSelection()) {
      return this.clear();
    }
    var range = sel.getRange();
    var startPosition = this._getDomPosition(range.start.path, range.start.offset);
    if (!startPosition) {
      return this.clear();
    }
    var endPosition;
    if (range.isCollapsed()) {
      endPosition = startPosition;
    } else {
      endPosition = this._getDomPosition(range.end.path, range.end.offset);
    }
    if (!endPosition) {
      return this.clear();
    }
    // if there is a range then set replace the window selection accordingly
    wSel.removeAllRanges();
    range = window.document.createRange();
    if (sel.isReverse()) {
      range.setStart(endPosition.node, endPosition.offset);
      wSel.addRange(range);
      wSel.extend(startPosition.node, startPosition.offset);
    } else {
      range.setStart(startPosition.node, startPosition.offset);
      range.setEnd(endPosition.node, endPosition.offset);
      wSel.addRange(range);
    }
    this.state = new SurfaceSelection.State(sel.isCollapsed(), sel.isReverse(), range.start, range.end);
  };

  this.clear = function() {
    var sel = window.getSelection();
    sel.removeAllRanges();
    this.state = null;
  };

};

OO.initClass(SurfaceSelection);

SurfaceSelection.State = function(collapsed, reverse, start, end) {
  this.collapsed = collapsed;
  this.reverse = reverse;
  this.start = start;
  this.end = end;
  Object.freeze(this);
};

SurfaceSelection.Coordinate = function(el, charPos) {
  this.el = el;
  this.offset = charPos;
  this.path = el.dataset.path.split('.');
};

module.exports = SurfaceSelection;

},{"../basics/helpers":168,"../basics/oo":170,"../document":198}],248:[function(require,module,exports){
var Substance = require("../basics");
var Tool = require('./tool');

function SwitchTypeTool() {
  Tool.call(this);
}

SwitchTypeTool.Prototype = function() {

  // Provides the type of the associated annotation node.
  // The default implementation uses the Tool's static name.
  // Override this method to customize.
  this.getNodeType = function() {
    if (this.constructor.static.name) {
      return this.constructor.static.name;
    } else {
      throw new Error('Contract: SwitchTypeTool.static.name should be associated to a document annotation type.');
    }
  };

  this.getData = function() {
    return {};
  };

  this.matchNode = function(node) {
    return (node.type === this.getNodeType());
  };

  this.update = function(surface, sel) {
    this.surface = surface;
    if (!surface.isEnabled() || sel.isNull() || sel.isContainerSelection() ||
        !surface.getEditor().isContainerEditor()) {
      return this.setDisabled();
    }
    var container = surface.getEditor().getContainer();
    var node = container.getNodeForComponentPath(sel.start.path);
    if (this.matchNode(node)) {
      return this.setToolState({
        enabled: true,
        selected: true
      });
    } else if (node.isInstanceOf('text')) {
      return this.setToolState({
        enabled: true,
        selected: true,
        sel: sel,
        node: node,
        mode: "switch"
      });
    }
  };

  this.performAction = function() {
    var state = this.getToolState();
    if (state.mode === "switch") {
      this.surface.getEditor().switchType(state.sel, this.getNodeType(), this.getData());
    }
  };
};

Substance.inherit(SwitchTypeTool, Tool);

module.exports = SwitchTypeTool;

},{"../basics":169,"./tool":250}],249:[function(require,module,exports){
var Substance = require('../basics');
var Document = require('../document');
var NodeView = require('./node_view');
var AnnotationView = require('./annotation_view');
var Annotator = Document.Annotator;

// Basic implementation of a text property.
//

function TextProperty() {}

TextProperty.Prototype = function() {

  this.getSurface = function() {
    throw new Error('This is abstract');
  };

  this.getDocument = function() {
    var surface = this.getSurface();
    if (!surface) {
      return null;
    } else {
      return surface.getDocument();
    }
  };

  this.getPath = function() {
    throw new Error('This is abstract');
  };

  /*
    Add these when creating the element
      class: 'text-property'
      style: "whiteSpace: pre-wrap;"
      'data-path': path.join('.')
   */
  this.getElement = function() {
    throw new Error('This is abstract');
  };

  // Override this if you want to add app-specific annotations, such as highlights
  this.getAnnotations = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    return doc.getIndex('annotations').get(path);
  };

  this.attach = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    doc.getEventProxy('path').add(path, this, this.propertyDidChange);
  };

  this.detach = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    doc.getEventProxy('path').remove(path, this);
  };

  this.renderContent = function() {
    var doc = this.getDocument();
    var domNode = this.getElement();
    if (!domNode) { return; }
    var contentView = new TextProperty.ContentView({
      doc: doc,
      children: this.renderChildren()
    });
    var fragment = contentView.render();
    // Add a <br> so that the node gets rendered when empty and Contenteditable will stop when moving the cursor.
    // TODO: probably this is not good when using the property inline.
    fragment.appendChild(document.createElement('br'));
    domNode.innerHTML = "";
    domNode.appendChild(fragment);
  };

  this.renderChildren = function() {
    var doc = this.getDocument();
    var path = this.getPath();
    var text = doc.get(path) || "";

    var annotations = this.getAnnotations();

    var annotator = new Annotator();
    annotator.onText = function(context, text) {
      context.children.push(text);
    };
    annotator.onEnter = function(entry) {
      var node = entry.node;
      // TODO: we need a component factory, so that we can create the appropriate component
      var ViewClass = AnnotationView;
      var classNames = [];
      return {
        ViewClass: ViewClass,
        props: {
          doc: doc,
          node: node,
          classNames: classNames,
        },
        children: []
      };
    };
    annotator.onExit = function(entry, context, parentContext) {
      var props = context.props;
      props.children = context.children;
      var view = new context.ViewClass(props);
      parentContext.children.push(view);
    };
    var root = { children: [] };
    annotator.start(root, text, annotations);
    return root.children;
  };

  this.propertyDidChange = function(change, info) {
    // Note: Surface provides the source element as element
    // whenever editing is done by Contenteditable (as opposed to programmatically)
    // In that case we trust in CE and do not rerender.
    if (info.source === this.getElement()) {
      console.log('Skipping update...');
      // NOTE: this hack triggers a rerender of the text-property
      // after a burst of changes. Atm, we let CE do incremental rendering,
      // which is important for a good UX. However CE sometimes does undesired
      // things which can lead to a slight diversion of model and view.
      // Using this hack we can stick to the trivial rerender based implementation
      // of TextProperty as opposed to an incremental version.
      if (info.surface && info.typing) {
        if (!this._debouncedRerender) {
          var INTERVAL = 200; //ms
          var self = this;
          this._debouncedRerender = Substance.debounce(function() {
            var doc = this.getDocument();
            // as this get called delayed it can happen
            // that this element has been deleted in the mean time
            if (doc) {
              self.renderContent();
              info.surface.rerenderDomSelection();
            }
          }, INTERVAL);
        }
        this._debouncedRerender();
        return;
      }
    }
    // For now, we stick to rerendering as opposed to incremental rendering.
    // As long the user is not editing this property this strategy is sufficient.
    // For the editing the above strategy is applied.
    this.renderContent();

    if (info.source === this.getElement() && info.surface) {
      setTimeout(function() {
        info.surface.rerenderDomSelection();
      });
    }
  };
};

Substance.initClass(TextProperty);

TextProperty.ContentView = NodeView.extend({
  createElement: function() {
    return document.createDocumentFragment();
  }
});

module.exports = TextProperty;

},{"../basics":169,"../document":198,"./annotation_view":238,"./node_view":243}],250:[function(require,module,exports){
var Substance = require("../basics");

function Tool(context) {
  Substance.EventEmitter.call(this);

  this.context = context;

  this.state = {
    // we disable tools by default
    disabled: true,
    // if the tool is turned on / toggled on
    active: false
  };
}

Tool.Prototype = function() {

  this.needsEnabledSurface = true;

  this.getName = function() {
    return this.constructor.static.name;
  };

  this.getSurface = function() {
    return this.surface;
  };

  this.getDocument = function() {
    var surface = this.getSurface();
    if (surface) {
      return surface.getDocument();
    }
  };

  this.getContainer = function() {
    var surface = this.getSurface();
    if (surface) {
      return surface.getContainer();
    }
  };

  this.setToolState = function(newState) {
    var oldState = this.state;
    this.state = newState;
    this.emit('toolstate:changed', newState, this, oldState);
  };

  this.getToolState = function() {
    return this.state;
  };

  this.isEnabled = function() {
    return !this.state.disabled;
  };

  this.isDisabled = function() {
    return this.state.disabled;
  };

  this.setEnabled = function() {
    this.setToolState({
      disabled: false,
      active: false
    });
  };

  this.setDisabled = function() {
    this.setToolState({
      disabled: true,
      active: false
    });
  };

  this.disableTool = function() {
    console.error('DEPRECATED: use tool.setDisabled()');
    this.setDisabled();
  };

  this.setSelected = function() {
    this.setToolState({
      disabled: false,
      active: true
    });
  };

  /* jshint unused:false */
  this.update = function(surface, sel) {
    this.surface = surface;
    if (this.needsEnabledSurface && !surface.isEnabled()) {
      return this.setDisabled();
    }
  };

  //legacy TODO fixme
  this.updateToolState = function(sel, surface) {
    return this.update(surface, sel);
  };
};

Substance.inherit(Tool, Substance.EventEmitter);

module.exports = Tool;

},{"../basics":169}],251:[function(require,module,exports){
"use strict";

var Substance = require('../basics');
var _ = Substance._;

var ToolRegistry = function() {
  Substance.Registry.call(this);
};

ToolRegistry.Prototype = function() {

  this.dispose = function() {
    this.each(function(tool) {
      if (tool.dispose) {
        tool.dispose();
      }
    });
    this.clear();
  };

};

Substance.inherit(ToolRegistry, Substance.Registry);

module.exports = ToolRegistry;

},{"../basics":169}],252:[function(require,module,exports){
'use strict';

var Tool = require('../tool');

var DeleteColumnsTool = Tool.extend({

  name: "delete_columns",

  update: function(surface, sel) {
    this.surface = surface; // IMPORTANT!
    // Set disabled when not a property selection
    if (!surface.isEnabled() || sel.isNull() || !sel.isTableSelection()) {
      return this.setDisabled();
    }
    this.setToolState({
      surface: surface,
      sel: sel,
      disabled: false
    });
  },

  performAction: function(options) {
    this.surface.transaction(function(tx, args) {
      console.log('TODO: delete columns', options);
      return args;
    });
  },

});

module.exports = DeleteColumnsTool;

},{"../tool":250}],253:[function(require,module,exports){
'use strict';

var Tool = require('../tool');

var DeleteRowsTool = Tool.extend({

  name: "delete_rows",

  update: function(surface, sel) {
    this.surface = surface; // IMPORTANT!
    // Set disabled when not a property selection
    if (!surface.isEnabled() || sel.isNull() || !sel.isTableSelection()) {
      return this.setDisabled();
    }
    this.setToolState({
      surface: surface,
      sel: sel,
      disabled: false
    });
  },

  performAction: function(options) {
    this.surface.transaction(function(tx, args) {
      console.log('TODO: delete rows', options);
      return args;
    });
  },

});

module.exports = DeleteRowsTool;

},{"../tool":250}],254:[function(require,module,exports){
'use strict';

var AnnotationTool = require('../annotation_tool');

var EmphasisTool = AnnotationTool.extend({
  name: "emphasis"
});

module.exports = EmphasisTool;

},{"../annotation_tool":237}],255:[function(require,module,exports){
module.exports = {
  Undo: require('./undo_tool'),
  Redo: require('./redo_tool'),
  Emphasis: require('./emphasis_tool'),
  Strong: require('./strong_tool'),
  Link: require('./link_tool'),
  SwitchTextType: require('./switch_text_type_tool'),
  InsertRows: require('./insert_rows'),
  DeleteRows: require('./delete_rows'),
  InsertColumns: require('./insert_columns'),
  DeleteColumns: require('./delete_columns'),
};
},{"./delete_columns":252,"./delete_rows":253,"./emphasis_tool":254,"./insert_columns":256,"./insert_rows":257,"./link_tool":258,"./redo_tool":259,"./strong_tool":260,"./switch_text_type_tool":261,"./undo_tool":262}],256:[function(require,module,exports){
'use strict';

var Tool = require('../tool');

var InsertColumnsTool = Tool.extend({

  name: "insert_columns",

  update: function(surface, sel) {
    this.surface = surface; // IMPORTANT!
    // Set disabled when not a property selection
    if (!surface.isEnabled() || sel.isNull() || !sel.isTableSelection()) {
      return this.setDisabled();
    }
    this.setToolState({
      surface: surface,
      sel: sel,
      disabled: false
    });
  },

  performAction: function(options) {
    this.surface.transaction(function(tx, args) {
      console.log('TODO: insert columns', options);
      return args;
    });
  },

});

module.exports = InsertColumnsTool;

},{"../tool":250}],257:[function(require,module,exports){
'use strict';

var Tool = require('../tool');

var InsertRowsTool = Tool.extend({

  name: "insert_rows",

  update: function(surface, sel) {
    this.surface = surface; // IMPORTANT!
    // Set disabled when not a property selection
    if (!surface.isEnabled() || sel.isNull() || !sel.isTableSelection()) {
      return this.setDisabled();
    }
    this.setToolState({
      surface: surface,
      sel: sel,
      disabled: false
    });
  },

  performAction: function(options) {
    this.surface.transaction(function(tx, args) {
      console.log('TODO: insert rows', options);
      return args;
    });
  },

});

module.exports = InsertRowsTool;

},{"../tool":250}],258:[function(require,module,exports){
'use strict';

var AnnotationTool = require('../annotation_tool');

var LinkTool = AnnotationTool.extend({

  name: "link",

  getAnnotationData: function() {
    return {
      url: "http://"
    };
  },

  update: function(surface, sel) {
    this.surface = surface;
    if ( !surface.isEnabled() || sel.isNull() || sel.isContainerSelection() ) {
      return this.setDisabled();
    }
    var doc = this.getDocument();
    var annos = doc.getAnnotationsForSelection(sel, { type: 'link' });
    var oldState = this.getToolState();
    var newState = {
      surface: surface,
      disabled: false,
      active: false,
      mode: null,
      sel: sel,
      annos: annos
    };
    if (this.canCreate(annos, sel)) {
      newState.mode = "create";
    } else if (this.canTruncate(annos, sel)) {
      newState.mode = "truncate";
      newState.active = true;
    } else if (this.canExpand(annos, sel)) {
      newState.mode = "expand";
    } else if (annos.length === 1) {
      newState.mode = "edit";
      newState.active = true;
      newState.showPopup = true;
    } else {
      return this.setDisabled();
    }
    this.setToolState(newState);
  },

  performAction: function() {
    var state = this.getToolState();
    if (state.mode === "edit") {
      this.emit('edit', this);
    } else {
      AnnotationTool.prototype.performAction.call(this);
    }
  },

});

module.exports = LinkTool;

},{"../annotation_tool":237}],259:[function(require,module,exports){
var Tool = require('../tool');

var RedoTool = Tool.extend({

  name: "redo",

  update: function(surface) {
    this.surface = surface;
    var doc = surface.getDocument();
    if (!surface.isEnabled() || doc.undone.length===0) {
      this.setDisabled();
    } else {
      this.setEnabled();
    }
  },

  performAction: function() {
    var doc = this.getDocument();
    if (this.isEnabled() && doc.undone.length>0) {
      doc.redo();
    }
  }

});

module.exports = RedoTool;

},{"../tool":250}],260:[function(require,module,exports){
'use strict';

var AnnotationTool = require('../annotation_tool');

var StrongTool = AnnotationTool.extend({
  name: "strong"
});

module.exports = StrongTool;

},{"../annotation_tool":237}],261:[function(require,module,exports){
'use strict';

var Tool = require('../tool');

var TEXT_NODE_TYPES = ["paragraph", "heading"];

var TEXT_TYPES = {
  "paragraph": {label: 'Paragraph', data: {type: "paragraph"}},
  "heading1": {label: 'Heading 1', data: {type: "heading", level: 1}},
  "heading2": {label: 'Heading 2', data: {type: "heading", level: 2}},
  "heading3": {label: 'Heading 3', data: {type: "heading", level: 3}}
};

var TextTool = Tool.extend({

  name: "text",

  update: function(surface, sel) {
    this.surface = surface; // IMPORTANT!
    // Set disabled when not a property selection
    if (!surface.isEnabled() || sel.isNull()) {
      return this.setDisabled();
    }
    if (sel.isTableSelection()) {
      return this.setToolState({
        disabled: true,
        currentContext: 'table'
      });
    } else if (sel.isContainerSelection()) {
      return this.setToolState({
        disabled: true,
        currentContext: 'container'
      });
    }

    var doc = this.getDocument();
    var path = sel.getPath();
    var node = doc.get(path[0]);
    var textType = this.getTextType(node);
    var parentNode = node.getRoot();
    var currentContext = this.getContext(parentNode, path);

    var newState = {
      surface: surface,
      sel: sel,
      disabled: !textType,
      currentTextType: textType,
      currentContext: currentContext,
    };

    this.setToolState(newState);
  },

  getAvailableTextTypes: function() {
    return TEXT_TYPES;
  },

  isTextType: function(type) {
    return TEXT_NODE_TYPES.indexOf(type) >= 0;
  },

  // Get text type for a given node
  getTextType: function(node) {
    if (this.isTextType(node.type)) {
      var textType = node.type;
      if (textType === "heading") {
        textType += node.level;
      }
      return textType;
    }
  },

  switchTextType: function(textTypeName) {
    var state = this.getToolState();
    if (this.isDisabled()) return;

    var textType = TEXT_TYPES[textTypeName];
    var surface = state.surface;
    var editor = surface.getEditor();

    surface.transaction(function(tx, args) {
      args.data = textType.data;
      return editor.switchType(tx, args);
    });
  },

  getContext: function(parentNode, path) {
    if (parentNode.id === path[0]) {
      return path[1];
    } else {
      return parentNode.type;
    }
  },

});

module.exports = TextTool;

},{"../tool":250}],262:[function(require,module,exports){
var Tool = require('../tool');

var UndoTool = Tool.extend({

  name: "undo",

  update: function(surface) {
    this.surface = surface;
    var doc = surface.getDocument();
    if (!surface.isEnabled() || doc.done.length===0) {
      this.setDisabled();
    } else {
      this.setEnabled();
    }
  },

  performAction: function() {
    var doc = this.getDocument();
    if (this.isEnabled() && doc.done.length>0) {
      doc.undo();
    }
  }

});

module.exports = UndoTool;
},{"../tool":250}],263:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var $$ = React.createElement;
var Surface = Substance.Surface;
var _ = require("substance/helpers");
var TitleEditor = require("./title_editor");
var UnsupportedNode = require("./nodes/unsupported_node");
var ContainerEditor = Surface.ContainerEditor;

var ENABLED_TOOLS = ["strong", "emphasis", "timecode", "remark", "entity_reference", "subject_reference"];

// Container Node
// ----------------
//
// Represents a flat collection of nodes

var ContentEditor = React.createClass({
  displayName: "ContentEditor",

  contextTypes: {
    app: React.PropTypes.object.isRequired,
    componentRegistry: React.PropTypes.object.isRequired,
    notifications: React.PropTypes.object.isRequired,
    surfaceManager: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    // provided to editor components so that they know in which context they are
    surface: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      surface: this.surface
    };
  },

  getInitialState: function getInitialState() {
    var editor = new ContainerEditor(this.props.node.id);
    // HACK: this is also Archivist specific
    // editor.defaultTextType = 'text';

    var options = {
      logger: this.context.notifications
    };

    this.surface = new Surface(this.context.surfaceManager, this.props.doc, editor, options);

    // Debounced version of updateBrackets
    this.updateBracketsDebounced = _.debounce(this.updateBrackets, 600);
    return {};
  },

  handleToggleSubjectReference: function handleToggleSubjectReference(e) {
    e.preventDefault();
    var subjectReferenceId = e.currentTarget.dataset.id;
    var app = this.context.app;
    var state = app.state;

    if (state.contextId === "editSubjectReference" && state.subjectReferenceId === subjectReferenceId) {
      app.replaceState({
        contextId: "subjects"
      });
    } else {
      app.replaceState({
        contextId: "editSubjectReference",
        subjectReferenceId: subjectReferenceId,
        noScroll: true
      });
    }
  },

  render: function render() {
    var containerNode = this.props.node;
    var doc = this.props.doc;
    var app = this.context.app;

    // Prepare subject reference components
    // ---------

    var subjectReferences = doc.getIndex("type").get("subject_reference");
    var subjectRefComponents = [];
    var highlightedNodes = app.getHighlightedNodes();

    _.each(subjectReferences, function (sref) {
      subjectRefComponents.push($$("a", {
        className: "subject-reference" + (_.includes(highlightedNodes, sref.id) ? " selected" : ""),
        href: "#",
        "data-id": sref.id,
        onClick: this.handleToggleSubjectReference
      }));
    }, this);

    // Prepare container components (aka nodes)
    // ---------

    var componentRegistry = this.context.componentRegistry;

    var components = [];
    components = components.concat(containerNode.nodes.map(function (nodeId) {
      var node = doc.get(nodeId);
      var ComponentClass = componentRegistry.get(node.type);

      if (!ComponentClass) {
        console.error("Could not resolve a component for type: " + node.type);
        ComponentClass = UnsupportedNode;
      }

      return $$(ComponentClass, {
        key: node.id,
        doc: doc,
        node: node
      });
    }));

    // Top level structure
    // ---------

    return $$("div", { className: "content-editor-component panel-content-inner" }, $$(TitleEditor, { doc: doc }),
    // The full fledged interview (ContainerEditor)
    $$("div", { ref: "interviewContent", className: "interview-content", contentEditable: true, "data-id": "content" }, $$("div", {
      className: "container-node " + this.props.node.id,
      spellCheck: false,
      "data-id": this.props.node.id
    }, $$("div", { className: "nodes" }, components), $$("div", { className: "subject-references", contentEditable: false }, subjectRefComponents))));
  },

  updateBrackets: function updateBrackets() {
    var doc = this.props.doc;
    var subjectReferences = doc.getIndex("type").get("subject_reference");

    var brackets = {};

    // 3 available slots (0 means not used)
    var bracketSlots = [0, 0, 0];

    // Collects all events for the sweep algorithm
    var events = [];

    _.each(subjectReferences, function (subjRef) {
      var anchors = $(this.getDOMNode()).find(".nodes .anchor[data-id=" + subjRef.id + "]");

      var startAnchorEl, endAnchorEl;
      if ($(anchors[0]).hasClass("start-anchor")) {
        startAnchorEl = anchors[0];
        endAnchorEl = anchors[1];
      } else {
        startAnchorEl = anchors[1];
        endAnchorEl = anchors[0];
      }

      if (!startAnchorEl || !endAnchorEl) {
        console.warn("FIXME: Could not find anchors for subject reference ", subjRef.id);
        return;
      }

      var startTop = $(startAnchorEl).position().top;
      var endTop = $(endAnchorEl).position().top + $(endAnchorEl).height();
      var height = endTop - startTop;

      // Add start and end events
      events.push({
        subjRefId: subjRef.id,
        pos: startTop,
        type: "start"
      });

      events.push({
        subjRefId: subjRef.id,
        pos: endTop,
        type: "end"
      });

      brackets[subjRef.id] = {
        top: startTop,
        height: height,
        slot: null
      };
    }, this);

    function bookSlot(subjRefId) {
      // debugger;
      // Use slot 0 by default
      var minVal = Math.min.apply(this, bracketSlots);
      var slot;

      for (var i = 0; i < bracketSlots.length && slot === undefined; i++) {
        var slotVal = bracketSlots[i];
        // Found first suitable slot
        if (slotVal === minVal) {
          slot = i;
          bracketSlots[i] = slotVal + 1;
        }
      }
      // Assign slot to associated bracket
      brackets[subjRefId].slot = slot;
    }

    function releaseSlot(subjRefId) {
      var bracket = brackets[subjRefId];
      bracketSlots[bracket.slot] = bracketSlots[bracket.slot] - 1;
    }

    // Sort brackets and events
    events = _.sortBy(events, "pos");

    // Start the sweep (go through all events)
    _.each(events, function (evt) {
      if (evt.type === "start") {
        bookSlot(evt.subjRefId);
      } else {
        releaseSlot(evt.subjRefId);
      }
    });

    // Render brackets
    // --------------

    _.each(brackets, function (bracket, bracketId) {
      var subjectRefEl = $(this.getDOMNode()).find(".subject-references .subject-reference[data-id=" + bracketId + "]");
      subjectRefEl.css({
        top: bracket.top,
        height: bracket.height
      });

      subjectRefEl.removeClass("level-0 level-1 level-2");
      subjectRefEl.addClass("level-" + bracket.slot);
    }, this);
  },

  componentDidMount: function componentDidMount() {
    var surface = this.surface;
    var app = this.context.app;
    var doc = this.props.doc;

    doc.connect(this, {
      "document:changed": this.onDocumentChange
    });

    app.registerSurface(surface, {
      enabledTools: ENABLED_TOOLS
    });
    surface.attach(this.refs.interviewContent.getDOMNode());

    doc.connect(this, {
      "container-annotation-update": this.handleContainerAnnotationUpdate
    });

    var self = this;

    // TODO: we need a way so that the brackets get updated properly
    this.forceUpdate(function () {
      // self.updateBrackets();
      _.delay(function () {
        self.updateBrackets();
      }, 100);

      self.surface.rerenderDomSelection();
    });

    $(window).resize(this.updateBracketsDebounced);
  },

  handleContainerAnnotationUpdate: function handleContainerAnnotationUpdate() {
    var self = this;
    this.forceUpdate(function () {
      self.updateBrackets();
    });
  },

  componentDidUpdate: function componentDidUpdate() {
    // HACK: when the state is changed this and particularly TextProperties
    // get rerendered (e.g., as the highlights might have changed)
    // Unfortunately we loose the DOM selection then.
    // Thus, we are resetting it here, but(!) delayed as otherwise the surface itself
    // might not have finished setting the selection to the desired and a proper state.
    if (!this.surface.__prerendering__) {
      var self = this;
      setTimeout(function () {
        self.surface.rerenderDomSelection();
      });
    }
    this.updateBrackets();
  },

  componentWillUnmount: function componentWillUnmount() {
    var app = this.context.app;
    var surface = this.surface;
    var doc = this.props.doc;
    doc.disconnect(this);

    app.unregisterSurface(surface);
    surface.detach();
  },

  onDocumentChange: function onDocumentChange(change) {
    var app = this.context.app;

    // console.log('##### ContainerComponent.onDocumentChange', change);

    var deletedSubjectRefs = _.filter(change.deleted, function (node) {
      return node.type === "subject_reference";
    });

    var createdSubjectRefs = _.filter(change.created, function (node) {
      return node.type === "subject_reference";
    });

    // HACK: implicitly switch the state when a subject reference is deleted and currently open
    // This implicitly also updates the brackets accordingly
    var subjectRef = deletedSubjectRefs[0];
    if (subjectRef && app.state.subjectReferenceId === subjectRef.id) {
      app.replaceState({
        contextId: "subjects"
      });
      return;
    }

    if (change.isAffected([this.props.node.id, "nodes"]) || createdSubjectRefs.length > 0) {
      var self = this;
      // console.log('##### calling forceUpdate after document change, to update brackets');
      this.forceUpdate(function () {
        self.updateBracketsDebounced();
      });
    }
    // eagerly update brackets on every change
    else {
      this.updateBracketsDebounced();
    }
  }

});

module.exports = ContentEditor;

},{"./nodes/unsupported_node":269,"./title_editor":289,"substance":46,"substance/helpers":45}],264:[function(require,module,exports){
"use strict";

var ToolComponent = require("substance-ui/tool_component");
var DropdownComponent = require("substance-ui/dropdown_component");

// A simple tool for navigating app states
var NavigateTool = require("./tools/navigate_tool_component");
var Icon = require("substance-ui/font_awesome_icon");

var _ = require("substance/helpers");
var $$ = React.createElement;

var ContentToolbarComponent = React.createClass({
  displayName: "ContentToolbarComponent",

  handleToggleDialog: function handleToggleDialog(e) {
    e.preventDefault();
    $(".modal").toggleClass("active");
  },

  handleDropdownToggle: function handleDropdownToggle(e) {
    e.preventDefault();
    var $el = $(e.currentTarget).parents(".dropdown");
    if ($el.is(".active")) {
      $el.toggleClass("open");
    }
  },

  render: function render() {
    return $$("div", { className: "content-tools-component toolbar small fill-white" }, $$("div", { className: "tool-group document clearfix" }, $$(ToolComponent, { tool: "undo", title: i18n.t("menu.undo"), classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-undo" })), $$(ToolComponent, { tool: "redo", title: i18n.t("menu.redo"), classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-repeat" })), $$(ToolComponent, { tool: "save", title: i18n.t("menu.save"), classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-save" })), $$(ToolComponent, { tool: "export", title: i18n.t("menu.export"), classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-download" }))), $$("div", { className: "tool-group actions clearfix" }), $$("div", { className: "tool-group formatting clearfix float-right" }, $$(ToolComponent, { tool: "timecode", title: i18n.t("menu.timecode"), classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-clock-o" })), $$(ToolComponent, { tool: "emphasis", title: i18n.t("menu.emphasis"), classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-italic" })), $$(ToolComponent, { tool: "strong", title: i18n.t("menu.strong"), classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-bold" }))), $$("div", { className: "tool-group formatting clearfix float-right" }, $$(ToolComponent, { tool: "indentation", title: i18n.t("menu.indentation"), classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-dedent" })), $$(ToolComponent, { tool: "whitespace", title: i18n.t("menu.whitespace"), classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-eraser" }))), $$("div", { className: "tool-group formatting clearfix float-right" }, $$(ToolComponent, { tool: "comment", title: "Comment", classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-comment" })), $$(ToolComponent, { tool: "entity_reference", title: "Tag Entity", classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-bullseye" })), $$(ToolComponent, { tool: "subject_reference", title: "Tag Subject", classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-tag" }))));
  }
});

module.exports = ContentToolbarComponent;

},{"./tools/navigate_tool_component":290,"substance-ui/dropdown_component":21,"substance-ui/font_awesome_icon":23,"substance-ui/tool_component":36,"substance/helpers":45}],265:[function(require,module,exports){
'use strict';

var _ = require('substance/helpers');
var nodes = require('./nodes');
var panels = require('./panels');

module.exports = _.extend({
  'content_toolbar': require('./content_toolbar'),
  'content_editor': require('./content_editor')
}, nodes, panels);

},{"./content_editor":263,"./content_toolbar":264,"./nodes":267,"./panels":281,"substance/helpers":45}],266:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var TextProperty = require('substance-ui/text_property');
var $$ = React.createElement;
var UnsupportedNode = require('./unsupported_node');

var IncludeComponent = (function (_React$Component) {
  _inherits(IncludeComponent, _React$Component);

  function IncludeComponent() {
    _classCallCheck(this, IncludeComponent);

    _get(Object.getPrototypeOf(IncludeComponent.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(IncludeComponent, [{
    key: 'render',
    value: function render() {
      var doc = this.props.doc;
      var node = doc.get(this.props.node.nodeId);
      var componentRegistry = this.context.componentRegistry;

      var ComponentClass = componentRegistry.get(node.type);

      if (!ComponentClass) {
        console.error('Could not resolve a component for type: ' + node.type);
        ComponentClass = UnsupporedNode;
      }

      return $$(ComponentClass, {
        key: node.id,
        doc: doc,
        node: node
      });
    }
  }]);

  return IncludeComponent;
})(React.Component);

IncludeComponent.displayName = 'IncludeComponent';

IncludeComponent.contextTypes = {
  app: React.PropTypes.object.isRequired,
  componentRegistry: React.PropTypes.object.isRequired
};

module.exports = IncludeComponent;

},{"./unsupported_node":269,"substance-ui/text_property":34}],267:[function(require,module,exports){
"use strict";

module.exports = {
  "text": require("./text_component"),
  "include": require("./include_component"),
  "unsupported_node": require("./unsupported_node")
};

},{"./include_component":266,"./text_component":268,"./unsupported_node":269}],268:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var TextProperty = require('substance-ui/text_property');
var $$ = React.createElement;

var TextComponent = (function (_React$Component) {
  _inherits(TextComponent, _React$Component);

  function TextComponent() {
    _classCallCheck(this, TextComponent);

    _get(Object.getPrototypeOf(TextComponent.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TextComponent, [{
    key: 'render',
    value: function render() {
      return $$('div', { className: 'content-node text', 'data-id': this.props.node.id }, $$(TextProperty, {
        ref: 'textProp',
        doc: this.props.doc,
        path: [this.props.node.id, 'content']
      }));
    }
  }]);

  return TextComponent;
})(React.Component);

TextComponent.displayName = 'TextComponent';

module.exports = TextComponent;

},{"substance-ui/text_property":34}],269:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var $$ = React.createElement;

var UnsupportedNodeComponent = (function (_React$Component) {
  _inherits(UnsupportedNodeComponent, _React$Component);

  function UnsupportedNodeComponent() {
    _classCallCheck(this, UnsupportedNodeComponent);

    _get(Object.getPrototypeOf(UnsupportedNodeComponent.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(UnsupportedNodeComponent, [{
    key: "render",
    value: function render() {
      var rawJson = JSON.stringify(this.props.node.properties, null, 2);
      return $$("pre", { className: "content-node unsupported", "data-id": this.props.node.id, contentEditable: false }, rawJson);
    }
  }]);

  return UnsupportedNodeComponent;
})(React.Component);

UnsupportedNodeComponent.displayName = "UnsupportedNodeComponent";

module.exports = UnsupportedNodeComponent;

},{}],270:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var $$ = React.createElement;
var _ = require("substance/helpers");
var Panel = require("substance-ui/panel");

// Used for HtmlEditor
//

var CommentsPanel = (function (_Panel) {
  _inherits(CommentsPanel, _Panel);

  // Initialization
  // -----------------

  function CommentsPanel(props) {
    _classCallCheck(this, CommentsPanel);

    _get(Object.getPrototypeOf(CommentsPanel.prototype), "constructor", this).call(this, props);
  }

  _createClass(CommentsPanel, [{
    key: "computeState",
    value: function computeState() {
      var app = this.context.app;
      var doc = app.doc;
      // var comment = doc.get(app.state.commentId);

      // TODO: Sort by occurence in document
      var comments = _.map(doc.commentsIndex.get(), function (comment) {
        return comment;
      });

      return {
        comments: comments
      };
    }
  }, {
    key: "componentWillMount",

    // Initialization
    value: function componentWillMount() {
      this.state = this.computeState();
    }
  }, {
    key: "componentWillReceiveProps",

    // Updating
    value: function componentWillReceiveProps() {
      this.setState(this.computeState());
    }
  }, {
    key: "handleClick",

    // Event handlers
    // -----------------

    value: function handleClick(e) {
      e.preventDefault();
      var commentId = e.currentTarget.dataset.id;

      this.context.app.replaceState({
        contextId: "show-comment",
        commentId: commentId
      });
    }
  }, {
    key: "render",

    // Rendering
    // -----------------

    value: function render() {
      var commentEls = [];
      var comments = this.state.comments;

      _.each(comments, (function (comment) {

        var sourceText = comment.getText();
        // Shorten sourceText
        if (sourceText.length > 130) {
          sourceText = sourceText.slice(0, 130) + " ...";
        }

        commentEls.push($$("div", {
          "data-id": comment.id,
          className: "comment",
          onClick: this.handleClick.bind(this)
        }, $$("div", { className: "meta" }, $$("span", { className: "creator" }, comment.creator), $$("span", { className: "created-at" }, comment.created_at)), $$("div", null, $$("span", { className: "title" }, sourceText)), $$("div", {
          className: "comment-body",
          dangerouslySetInnerHTML: { __html: comment.content }
        })));
      }).bind(this));

      return $$("div", { className: "panel comments-panel-component" }, $$("div", { className: "panel-content" }, $$("div", { className: "comments" }, commentEls)));
    }
  }]);

  return CommentsPanel;
})(Panel);

CommentsPanel.displayName = "Comments";

CommentsPanel.contextTypes = {
  app: React.PropTypes.object.isRequired
};

// Panel Configuration
// -----------------

CommentsPanel.contextId = "comments";

CommentsPanel.icon = "fa-comment";

module.exports = CommentsPanel;

},{"substance-ui/panel":30,"substance/helpers":45}],271:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var $$ = React.createElement;
var _ = require("substance/helpers");
var Panel = require("substance-ui/panel");
var HtmlEditor = require("substance-ui/html-editor");
var Icon = require("substance-ui/font_awesome_icon");
var ToolComponent = HtmlEditor.ToolComponent;

// Used for HtmlEditor
//

var Toolbar = (function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    _get(Object.getPrototypeOf(Toolbar.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Toolbar, [{
    key: "render",
    value: function render() {
      return $$("div", { className: "toolbar" }, $$(ToolComponent, { tool: "emphasis", classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-italic" })), $$(ToolComponent, { tool: "strong", classNames: ["button", "tool"] }, $$(Icon, { icon: "fa-bold" })));
    }
  }]);

  return Toolbar;
})(React.Component);

var EditCommentPanel = (function (_Panel) {
  _inherits(EditCommentPanel, _Panel);

  // Initialization
  // -----------------

  function EditCommentPanel(props) {
    _classCallCheck(this, EditCommentPanel);

    _get(Object.getPrototypeOf(EditCommentPanel.prototype), "constructor", this).call(this, props);
  }

  _createClass(EditCommentPanel, [{
    key: "computeState",
    value: function computeState() {
      var app = this.context.app;
      var doc = app.doc;
      var comment = doc.get(app.state.commentId);

      return {
        comment: comment
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.state = this.computeState();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.setState(this.computeState());
    }
  }, {
    key: "handleCancel",

    // Event handlers
    // -----------------

    value: function handleCancel(e) {
      e.preventDefault();
      // Go to regular entities panel
      this.context.app.replaceState({
        contextId: "show-comment",
        commentId: this.state.comment.id
      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(e) {
      e.preventDefault();
      var doc = this.getDocument();
      doc.transaction((function (tx) {
        tx["delete"](this.state.comment.id);
      }).bind(this));

      this.context.app.replaceState({
        contextId: "comments"
      });
    }
  }, {
    key: "handleSave",
    value: function handleSave(e) {
      e.preventDefault();

      var htmlEditor = this.refs.htmlEditor;
      var doc = this.getDocument();
      doc.transaction((function (tx) {
        tx.set([this.state.comment.id, "content"], htmlEditor.getContent());
      }).bind(this));

      // Go back to show dialog
      this.handleCancel(e);
    }
  }, {
    key: "render",
    value: function render() {
      var comment = this.state.comment;

      return $$("div", { className: "panel dialog edit-comment-panel-component" }, $$("div", { className: "dialog-header" }, $$("a", {
        href: "#",
        className: "back",
        onClick: this.handleCancel.bind(this),
        dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-chevron-left\"></i>" }
      }), $$("div", { className: "label" }, "Edit Comment"), $$("div", { className: "actions" }, $$("a", {
        href: "#",
        className: "delete-comment",
        onClick: this.handleDelete.bind(this),
        dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-trash\"></i> Remove" }
      }))), $$("div", { className: "panel-content" }, $$("div", { className: "comment" }, $$("div", { className: "comment-editor" }, $$(HtmlEditor, {
        ref: "htmlEditor",
        content: comment.content,
        toolbar: Toolbar,
        enabledTools: ["strong", "emphasis"]
      }), $$("button", {
        className: "button action save-comment",
        onClick: this.handleSave.bind(this)
      }, "Save Comment"), $$("button", {
        className: "button action cancel save-comment",
        onClick: this.handleCancel.bind(this)
      }, "Cancel")), $$("div", { className: "meta" }, $$("span", { className: "creator" }, comment.creator), $$("span", { className: "created-at" }, comment.created_at))),
      // TODO: Display replies
      $$("div", { className: "replies" })));
    }
  }]);

  return EditCommentPanel;
})(Panel);

EditCommentPanel.displayName = "EditCommentPanel";
EditCommentPanel.contextTypes = {
  app: React.PropTypes.object.isRequired
};

// Panel Configuration
// -----------------

EditCommentPanel.icon = "fa-comment";
EditCommentPanel.isDialog = true;

module.exports = EditCommentPanel;
// onContentChanged: function(doc, change) {
//   // console.log('document changed', change);
//   // console.log('new content', doc.toHtml());
// }

},{"substance-ui/font_awesome_icon":23,"substance-ui/html-editor":28,"substance-ui/panel":30,"substance/helpers":45}],272:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var $$ = React.createElement;
var _ = require("substance/helpers");
var Panel = require("substance-ui/panel");

var ShowCommentPanel = (function (_Panel) {
  _inherits(ShowCommentPanel, _Panel);

  function ShowCommentPanel(props) {
    _classCallCheck(this, ShowCommentPanel);

    _get(Object.getPrototypeOf(ShowCommentPanel.prototype), "constructor", this).call(this, props);
  }

  _createClass(ShowCommentPanel, [{
    key: "computeState",
    value: function computeState() {
      var app = this.context.app;
      var doc = app.doc;
      var comment = doc.get(app.state.commentId);

      return {
        comment: comment
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.state = this.computeState();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.setState(this.computeState());
    }
  }, {
    key: "handleCancel",

    // Event handlers
    // -----------------

    value: function handleCancel(e) {
      e.preventDefault();
      // Go to regular entities panel
      this.context.app.replaceState({
        contextId: "comments"
      });
    }
  }, {
    key: "handleEdit",
    value: function handleEdit(e) {
      e.preventDefault();

      // Go to regular entities panel
      this.context.app.replaceState({
        contextId: "edit-comment",
        commentId: this.state.comment.id
      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(e) {
      e.preventDefault();
      var doc = this.getDocument();
      doc.transaction((function (tx) {
        tx["delete"](this.state.comment.id);
      }).bind(this));

      this.context.app.replaceState({
        contextId: "comments"
      });
    }
  }, {
    key: "render",
    value: function render() {
      var comment = this.state.comment;

      return $$("div", { className: "panel dialog show-comment-panel-component" }, $$("div", { className: "dialog-header" }, $$("a", {
        href: "#",
        className: "back",
        onClick: this.handleCancel.bind(this),
        dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-chevron-left\"></i>" }
      }), $$("div", { className: "label" }, "Comment"), $$("div", { className: "actions" }, $$("a", {
        href: "#",
        className: "delete-comment",
        onClick: this.handleDelete.bind(this),
        dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-trash\"></i> Remove" }
      }), $$("a", {
        href: "#",
        className: "edit-comment",
        onClick: this.handleEdit.bind(this),
        dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-pencil\"></i> Edit" }
      }))), $$("div", { className: "panel-content" }, $$("div", { className: "comment" }, $$("div", { className: "meta" }, $$("span", { className: "creator" }, comment.creator), $$("span", { className: "created-at" }, comment.created_at)), $$("div", {
        className: "comment-content",
        dangerouslySetInnerHTML: { __html: comment.content }
      })),
      // TODO: Display replies
      $$("div", { className: "replies" })));
    }
  }]);

  return ShowCommentPanel;
})(Panel);

ShowCommentPanel.displayName = "ShowCommentPanel";

ShowCommentPanel.contextTypes = {
  app: React.PropTypes.object.isRequired
};

// Panel Configuration
// -----------------

ShowCommentPanel.icon = "fa-comment";
ShowCommentPanel.isDialog = true;

module.exports = ShowCommentPanel;

},{"substance-ui/panel":30,"substance/helpers":45}],273:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var $$ = React.createElement;

// Entity types
var Prison = require("./entity_types/prison");
var Toponym = require("./entity_types/toponym");
var Person = require("./entity_types/person");
var Definition = require("./entity_types/definition");
var _ = require("substance/helpers");

var EntitiesPanel = React.createClass({
  displayName: "Entities",

  contextTypes: {
    app: React.PropTypes.object.isRequired,
    backend: React.PropTypes.object.isRequired
  },

  getReferencedEntityIds: function getReferencedEntityIds() {
    var app = this.context.app;
    var doc = app.doc;
    var entityReferences = doc.entityReferencesIndex.get();
    return _.map(entityReferences, function (entityRef, key) {
      return entityRef.target;
    });
  },

  // Data loading methods
  // ------------

  loadEntities: function loadEntities() {
    var self = this;
    var backend = this.context.backend;
    var entityIds = self.getReferencedEntityIds();

    backend.getEntities(entityIds, function (err, entities) {
      // Finished simulated loading of entities
      self.setState({
        entities: entities
      });
    });
  },

  // State relevant things
  // ------------

  getInitialState: function getInitialState() {
    return {
      entities: []
    };
  },

  // Events
  // ------------

  componentDidMount: function componentDidMount() {
    this.loadEntities();
  },

  componentWillReceiveProps: function componentWillReceiveProps() {
    this.loadEntities();
  },

  handleToggle: function handleToggle(entityId) {
    var app = this.context.app;

    if (app.state.entityId === entityId) {
      app.replaceState({
        contextId: "entities"
      });
    } else {
      app.replaceState({
        contextId: "entities",
        entityId: entityId
      });
    }
  },

  // Rendering
  // -------------------

  getEntityElement: function getEntityElement(entity) {
    entity.handleToggle = this.handleToggle;

    if (entity.type === "prison") {
      return $$(Prison, entity);
    } else if (entity.type === "toponym") {
      return $$(Toponym, entity);
    } else if (entity.type === "person") {
      return $$(Person, entity);
    } else if (entity.type === "definition") {
      return $$(Definition, entity);
    }
    throw new Error("No view component for " + entity.type);
  },

  render: function render() {
    var state = this.state;
    var props = this.props;

    var getElem = this.getEntityElement;
    var entityNodes = state.entities.map(function (entity, index) {
      // Dynamically assign active state
      entity.active = entity.id === props.entityId;
      entity.key = entity.id;
      return getElem(entity);
    });

    return $$("div", { className: "panel entities-panel-component" }, $$("div", { className: "panel-content" }, $$("div", { className: "entities" }, entityNodes)));
  }
});

EntitiesPanel.contextId = "entities";
EntitiesPanel.icon = "fa-bullseye";

module.exports = EntitiesPanel;

},{"./entity_types/definition":274,"./entity_types/person":276,"./entity_types/prison":277,"./entity_types/toponym":278,"substance":46,"substance/helpers":45}],274:[function(require,module,exports){
"use strict";

var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Definition view
// ----------------

var Definition = React.createClass({
  displayName: "Definition",
  mixins: [EntityMixin],

  handleEdit: function handleEdit(e) {
    e.stopPropagation();
  },

  render: function render() {
    var className = ["entity definition"];
    if (this.props.active) className.push("active");

    return $$("div", { className: className.join(" "), onClick: this.handleToggle }, $$("div", { className: "type" }, "Definition"), $$("div", { className: "title" }, this.props.title), $$("div", { className: "description" }, this.props.description), $$("a", { className: "edit", target: "_blank", href: "./definitions/" + this.props.id, onClick: this.handleEdit }, $$("i", { className: "fa fa-pencil-square-o" })));
  }
});

module.exports = Definition;

},{"./entity_mixin":275}],275:[function(require,module,exports){
'use strict';

var EntityMixin = {
  // Handles click to activate an entity
  handleToggle: function handleToggle(e) {
    console.log('handle toggle');
    this.props.handleToggle(this.props.id);
    e.preventDefault();
  }
};

module.exports = EntityMixin;

},{}],276:[function(require,module,exports){
"use strict";

var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Prison view
// ----------------

var Person = React.createClass({
  displayName: "Person",
  mixins: [EntityMixin],
  handleEdit: function handleEdit(e) {
    e.stopPropagation();
  },
  render: function render() {
    var className = ["entity person"];
    if (this.props.active) className.push("active");

    return $$("div", { className: className.join(" "), onClick: this.handleToggle }, $$("div", { className: "type" }, "Person"), $$("div", { className: "name" }, this.props.name), $$("div", { className: "description" }, this.props.description), $$("a", { className: "edit", target: "_blank", href: "./persons/" + this.props.id, onClick: this.handleEdit }, $$("i", { className: "fa fa-pencil-square-o" })));
  }
});

module.exports = Person;

},{"./entity_mixin":275}],277:[function(require,module,exports){
"use strict";

var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Prison view
// ----------------

var Prison = React.createClass({
  displayName: "Prison",
  mixins: [EntityMixin],
  handleEdit: function handleEdit(e) {
    e.stopPropagation();
  },
  render: function render() {
    var className = ["entity prison"];
    var prisonType = this.props.prison_type instanceof Array ? this.props.prison_type.join(", ") : "unknown";
    var name = this.props.name.toLowerCase().indexOf("неизвестно") >= 0 ? this.props.nearest_locality : this.props.name;
    if (this.props.active) className.push("active");
    return $$("div", { className: className.join(" "), onClick: this.handleToggle }, $$("div", { className: "type" }, "Prison"), $$("div", { className: "name" }, name), $$("div", { className: "prison-type" }, "Prison type: " + prisonType), $$("div", { className: "synonyms" }, "Known as: " + this.props.synonyms.join(", ")), $$("div", { className: "country" }, "Country: " + this.props.country), $$("div", { className: "description" }, this.props.description), $$("a", { className: "edit", target: "_blank", href: "./prisons/" + this.props.id, onClick: this.handleEdit }, $$("i", { className: "fa fa-pencil-square-o" })));
  }
});

module.exports = Prison;

},{"./entity_mixin":275}],278:[function(require,module,exports){
"use strict";

var $$ = React.createElement;
var EntityMixin = require("./entity_mixin");

// Toponym view
// ----------------

var Toponym = React.createClass({
  displayName: "Toponym",
  mixins: [EntityMixin],
  handleEdit: function handleEdit(e) {
    e.stopPropagation();
  },
  render: function render() {
    var className = ["entity toponym"];
    if (this.props.active) className.push("active");

    return $$("div", { className: className.join(" "), onClick: this.handleToggle }, $$("div", { className: "type" }, "Toponym"), $$("div", { className: "name" }, this.props.name), $$("div", { className: "synonyms" }, "Known as: " + this.props.synonyms.join(", ")), $$("div", { className: "country" }, "Country: " + this.props.country), $$("div", { className: "description" }, this.props.description), $$("a", { className: "edit", target: "_blank", href: "./toponyms/" + this.props.id, onClick: this.handleEdit }, $$("i", { className: "fa fa-pencil-square-o" })));
  }
});

module.exports = Toponym;

},{"./entity_mixin":275}],279:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var $$ = React.createElement;

// Entity types
var Prison = require("./entity_types/prison");
var Toponym = require("./entity_types/toponym");
var Person = require("./entity_types/person");
var Definition = require("./entity_types/definition");
var _ = require("substance/helpers");

var ShowEntityReferencePanel = React.createClass({
  displayName: "Entity",

  contextTypes: {
    app: React.PropTypes.object.isRequired,
    backend: React.PropTypes.object.isRequired
  },

  // Data loading methods
  // ------------

  loadEntity: function loadEntity(props) {
    props = props || this.props;
    var app = this.context.app;
    var doc = app.doc;
    var self = this;
    var entityRef = doc.get(props.entityReferenceId);

    var backend = this.context.backend;

    backend.getEntities([entityRef.target], (function (err, entities) {
      // Finished simulated loading of entities
      self.setState({
        entity: entities[0]
      });
    }).bind(this));
  },

  // State relevant things
  // ------------

  getInitialState: function getInitialState() {
    return {
      entity: null
    };
  },

  // Events
  // ------------

  componentDidMount: function componentDidMount() {
    this.loadEntity();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.loadEntity(nextProps);
  },

  handleToggle: function handleToggle(entityId) {},

  // Rendering
  // -------------------

  getEntityElement: function getEntityElement(entity) {
    entity.handleToggle = this.handleToggle;
    // HACK: we should not pollute entity objects at all
    // fix this in the entities panel and see remarks panel
    // for a better implementation

    entity.active = false;
    if (entity.type === "prison") {
      return $$(Prison, entity);
    } else if (entity.type === "toponym") {
      return $$(Toponym, entity);
    } else if (entity.type === "person") {
      return $$(Person, entity);
    } else if (entity.type === "definition") {
      return $$(Definition, entity);
    }
    throw new Error("No view component for " + entity.type);
  },

  handleCancel: function handleCancel(e) {
    var app = this.context.app;
    e.preventDefault();
    app.replaceState({
      contextId: "entities"
    });
  },

  handleEdit: function handleEdit(e) {
    var app = this.context.app;
    e.preventDefault();
    app.replaceState({
      contextId: "tagentity",
      entityReferenceId: this.props.entityReferenceId
    });
  },

  handleDeleteReference: function handleDeleteReference(e) {
    e.preventDefault();
    var app = this.context.app;
    var doc = app.doc;
    var tx = doc.startTransaction();

    try {
      tx["delete"](this.props.entityReferenceId);
      tx.save();
      app.replaceState({
        contextId: "entities"
      });
    } finally {
      tx.cleanup();
    }
  },

  render: function render() {
    var state = this.state;
    var props = this.props;

    var entityItem;

    if (this.state.entity) {
      entityItem = this.getEntityElement(this.state.entity);
    } else {
      entityItem = $$("div", null, "loading...");
    }

    return $$("div", { className: "panel dialog show-entity-reference-panel-component" },
    // Dialog Header
    $$("div", { className: "dialog-header" }, $$("a", {
      href: "#",
      className: "back",
      onClick: this.handleCancel,
      dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-chevron-left\"></i>" }
    }), $$("div", { className: "label" }, "Related entity"), $$("div", { className: "actions" }, $$("a", {
      href: "#",
      className: "edit-reference",
      onClick: this.handleEdit,
      dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-pencil\"></i> Edit" }
    }), $$("a", {
      href: "#",
      className: "delete-reference",
      onClick: this.handleDeleteReference,
      dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-trash\"></i> Remove" }
    }))),
    // Panel Content
    $$("div", { className: "panel-content" }, $$("div", { className: "entities" }, entityItem)));
  }
});

ShowEntityReferencePanel.contextId = "showEntityReference";
ShowEntityReferencePanel.icon = "fa-bullseye";

// No toggle is shown
ShowEntityReferencePanel.isDialog = true;

module.exports = ShowEntityReferencePanel;

// do nothing..

},{"./entity_types/definition":274,"./entity_types/person":276,"./entity_types/prison":277,"./entity_types/toponym":278,"substance":46,"substance/helpers":45}],280:[function(require,module,exports){
"use strict";

var SelectEntityMixin = require("../select_entity_mixin");
var _ = require("substance/helpers");

var TagEntityPanelMixin = _.extend({}, SelectEntityMixin, {

  // Called with entityId when an entity has been clicked
  handleSelection: function handleSelection(entityId) {
    var app = this.context.app;
    var doc = app.doc;
    var entityReferenceId = this.props.entityReferenceId;

    if (entityReferenceId) {
      doc.transaction(function (tx) {
        tx.set([entityReferenceId, "target"], entityId);
      });

      app.replaceState({
        contextId: "showEntityReference",
        entityReferenceId: entityReferenceId
      });
    } else {
      var path = this.props.path;
      var startOffset = this.props.startOffset;
      var endOffset = this.props.endOffset;

      var annotation = app.annotate({
        type: "entity_reference",
        target: entityId,
        path: path,
        startOffset: startOffset,
        endOffset: endOffset
      });

      // Switch state to highlight newly created reference
      app.replaceState({
        contextId: "showEntityReference",
        entityReferenceId: annotation.id
      });
    }
  }
});

var TagEntityPanel = React.createClass({
  mixins: [TagEntityPanelMixin],
  displayName: "Tag Entity"
});

// Panel configuration
// ----------------

TagEntityPanel.contextId = "tagentity";
TagEntityPanel.icon = "fa-bullseye";

// No context switch toggle is shown
TagEntityPanel.isDialog = true;

module.exports = TagEntityPanel;

},{"../select_entity_mixin":284,"substance/helpers":45}],281:[function(require,module,exports){
"use strict";

var EntitiesPanel = require("./entities/entities_panel");
var ShowEntityReferencePanel = require("./entities/show_entity_reference_panel");
var TagEntityPanel = require("./entities/tag_entity_panel");

var SubjectsPanel = require("./subjects/subjects_panel");
var EditSubjectReferencePanel = require("./subjects/edit_subject_reference_panel");

var MetadataPanel = require("./metadata/metadata_panel");
var SelectLocationPanel = require("./metadata/select_location_panel");

// Comments
var CommentsPanel = require("./comments/comments_panel");
var ShowCommentPanel = require("./comments/show_comment_panel");
var EditCommentPanel = require("./comments/edit_comment_panel");

module.exports = {
  "entities": EntitiesPanel,
  "subjects": SubjectsPanel,
  "tagentity": TagEntityPanel,
  "selectWaypoint": SelectLocationPanel,
  "selectPrison": SelectLocationPanel,
  "selectProjectLocation": SelectLocationPanel,
  "showEntityReference": ShowEntityReferencePanel,
  "editSubjectReference": EditSubjectReferencePanel,
  "show-comment": ShowCommentPanel,
  "edit-comment": EditCommentPanel,
  "comments": CommentsPanel,
  "metadata": MetadataPanel
};

},{"./comments/comments_panel":270,"./comments/edit_comment_panel":271,"./comments/show_comment_panel":272,"./entities/entities_panel":273,"./entities/show_entity_reference_panel":279,"./entities/tag_entity_panel":280,"./metadata/metadata_panel":282,"./metadata/select_location_panel":283,"./subjects/edit_subject_reference_panel":285,"./subjects/subjects_panel":286}],282:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var $$ = React.createElement;
var Surface = Substance.Surface;
var _ = require("substance/helpers");
var TextProperty = require("substance-ui/text_property");

// Helpers
// ------------------

function label(name) {
  return $$("div", { className: "label", contentEditable: false }, name);
}

// Metadata Panel
// ------------------

var MetadataPanel = React.createClass({
  displayName: "Info",

  // State relevant things
  // ------------

  contextTypes: {
    backend: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired,
    surfaceManager: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    surface: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      surface: this.surface
    };
  },

  getInitialState: function getInitialState() {
    var app = this.context.app;

    this.surface = new Surface(this.context.surfaceManager, doc, new Surface.FormEditor());
    return null;
  },

  componentDidMount: function componentDidMount() {
    var app = this.context.app;
    app.registerSurface(this.surface, {
      enabledTools: ["strong", "emphasis"]
    });

    this.surface.attach(this.getDOMNode());

    var doc = app.doc;
    doc.connect(this, {
      "document:changed": this.handleDocumentChange
    });
    this.loadMetadata();
  },

  handleDocumentChange: function handleDocumentChange(change, info) {
    var refId = this.props.subjectReferenceId;

    if (change.isAffected(["document", "interviewee_waypoints"]) || change.isAffected(["document", "project_location"]) || change.isAffected(["document", "record_type"]) || change.isAffected(["document", "transcripted"]) || change.isAffected(["document", "verified"]) || change.isAffected(["document", "finished"]) || change.isAffected(["document", "published"])) {
      this.loadMetadata();
    }
  },

  handleWaypointDensityChange: function handleWaypointDensityChange(e) {
    var app = this.context.app;
    var doc = app.doc;
    var waypointId = e.currentTarget.dataset.waypointId;
    var newDensityValue = e.currentTarget.value;

    doc.transaction(function (tx) {
      tx.set([waypointId, "density"], newDensityValue);
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    var app = this.context.app;
    app.doc.disconnect(this);
    app.unregisterSurface(this.surface);
    this.surface.detach();
  },

  loadPrisons: function loadPrisons(cb) {
    var app = this.context.app;
    var backend = this.context.backend;
    var doc = app.doc;
    var prisonIds = doc.get("document").interviewee_prisons;
    backend.getEntities(prisonIds, cb);
  },

  loadProjectLocation: function loadProjectLocation(cb) {
    var backend = this.context.backend;
    var app = this.context.app;
    var doc = app.doc;

    var projectLocationId = doc.get("document").project_location;
    if (projectLocationId) {
      backend.getEntities([projectLocationId], function (err, locations) {
        if (err) return cb(err);
        cb(null, locations[0]);
      });
    } else {
      cb(null, null);
    }
  },

  loadWaypointLocations: function loadWaypointLocations(cb) {
    var backend = this.context.backend;
    var app = this.context.app;
    var doc = app.doc;
    var waypoints = doc.get("document").getWaypoints();
    var waypointLocationIds = _.pluck(waypoints, "entityId");

    backend.getEntities(waypointLocationIds, function (err, waypointLocations) {
      if (err) return cb(err);
      var res = {};
      _.each(waypointLocations, function (location) {
        res[location.id] = location;
      });
      cb(null, res);
    });
  },

  loadMetadata: function loadMetadata() {
    var self = this;
    // console.log('loading/reloading external metadata and rerender');

    this.loadPrisons(function (err, prisons) {
      self.loadWaypointLocations(function (err, waypointLocations) {
        self.loadProjectLocation(function (err, projectLocation) {
          self.setState({
            prisons: prisons,
            waypointLocations: waypointLocations,
            projectLocation: projectLocation
          });
        });
      });
    });
  },

  renderTextProperty: function renderTextProperty(property) {
    var app = this.context.app;
    return $$(TextProperty, {
      doc: app.doc,
      path: ["document", property]
    });
  },

  renderCheckboxProperty: function renderCheckboxProperty(property) {
    var app = this.context.app;
    var checked = app.doc.get("document")[property];

    return $$("input", {
      contentEditable: false,
      name: property,
      onChange: this.handleCheckboxChange,
      checked: checked,
      type: "checkbox"
    });
  },

  renderInterviewType: function renderInterviewType() {
    var app = this.context.app;
    var selected = app.doc.get("document").record_type;

    return $$("select", { contentEditable: false, onChange: this.handleInterviewTypeState, defaultValue: selected }, $$("option", "video", "Video"), $$("option", "audio", "Audio"));
  },

  handleCheckboxChange: function handleCheckboxChange(e) {
    var app = this.context.app;
    var doc = app.doc;
    var property = e.currentTarget.name;
    var checked = e.currentTarget.checked;

    doc.transaction(function (tx) {
      tx.set(["document", property], checked);
    });
  },

  handleInterviewTypeState: function handleInterviewTypeState(e) {
    var app = this.context.app;
    var doc = app.doc;
    var value = e.currentTarget.value;

    doc.transaction(function (tx) {
      tx.set(["document", "record_type"], value);
    });
  },

  handleAddWaypoint: function handleAddWaypoint(e) {
    var app = this.context.app;
    e.preventDefault();
    app.replaceState({
      contextId: "selectWaypoint"
    });
  },

  handleSetProjectLocation: function handleSetProjectLocation(e) {
    var app = this.context.app;
    e.preventDefault();
    app.replaceState({
      contextId: "selectProjectLocation"
    });
  },

  handleRemoveProjectLocation: function handleRemoveProjectLocation(e) {
    e.preventDefault();
    var app = this.context.app;
    var doc = app.doc;

    doc.transaction(function (tx) {
      tx.set(["document", "project_location"], null);
    });
  },

  handleRemoveWaypoint: function handleRemoveWaypoint(e) {
    var app = this.context.app;
    var doc = app.doc;
    var waypointId = e.currentTarget.dataset.id;
    e.preventDefault();

    var waypointIds = doc.get("document").interviewee_waypoints;
    waypointIds = _.without(waypointIds, waypointId);

    doc.transaction(function (tx) {
      tx["delete"](waypointId);
      tx.set(["document", "interviewee_waypoints"], waypointIds);
    });
  },

  handleRemovePrison: function handleRemovePrison(e) {
    var app = this.context.app;
    var doc = app.doc;
    var prisonId = e.currentTarget.dataset.id;
    var prisonIds = doc.get("document").interviewee_prisons;
    prisonIds = _.without(prisonIds, prisonId);
    e.preventDefault();

    doc.transaction(function (tx) {
      tx.set(["document", "interviewee_prisons"], prisonIds);
    });
  },

  renderProjectLocation: function renderProjectLocation() {
    var elems = [label("Project Location")];

    if (this.state.projectLocation) {
      var projectLocation = $$("span", { className: "entity-tag", contentEditable: false }, $$("span", { className: "project-location name" }, this.state.projectLocation.name), $$("a", {
        href: "#",
        "data-id": this.state.projectLocation.id,
        className: "remove-tag remove-project-location",
        onClick: this.handleRemoveProjectLocation,
        dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-remove\"></i>" }
      }));
      elems.push(projectLocation);
    } else {
      elems.push($$("a", {
        href: "#",
        className: "add-entity set-project-location",
        onClick: this.handleSetProjectLocation
      }, "Set project Location"));
    }

    return $$("div", { contentEditable: false, className: "project-location-wrapper" }, elems);
  },

  renderWaypoints: function renderWaypoints() {
    var app = this.context.app;
    var doc = app.doc;
    var waypoints = doc.get("document").getWaypoints();

    var waypointEls = waypoints.map((function (waypoint) {
      var waypointLocation = this.state.waypointLocations[waypoint.entityId];

      return $$("span", { className: "entity-tag waypoint" }, $$("span", { className: "name" }, waypointLocation.name), $$("input", { "data-waypoint-id": waypoint.id, className: "density", min: 1, max: 5, type: "number", defaultValue: waypoint.density, onChange: this.handleWaypointDensityChange }), $$("a", {
        href: "#",
        "data-id": waypoint.id,
        className: "remove-tag remove-waypoint",
        onClick: this.handleRemoveWaypoint,
        dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-remove\"></i>" }
      }));
    }).bind(this));

    return $$("div", { className: "waypoints-wrapper", contentEditable: false }, label("Waypoints"), $$("div", { className: "entity-tags waypoints" }, waypointEls), $$("a", { href: "#", className: "add-entity add-waypoint", onClick: this.handleAddWaypoint }, "Add waypoint"));
  },

  render: function render() {
    var props = this.props;

    if (!this.state) {
      return $$("div", { contentEditable: true, "data-id": "metadata" }, "Loading");
    }

    return $$("div", { className: "panel metadata-panel-component", contentEditable: true, "data-id": "metadata" }, $$("div", { className: "panel-content" }, $$("div", { className: "summary section" }, $$("h3", { contentEditable: false }, "Short summary"),
    // Short summary in russian
    label("Russian"), this.renderTextProperty("short_summary"),

    // Short summary in english
    label("English"), this.renderTextProperty("short_summary_en")), $$("div", { className: "abstracts section" }, $$("h3", { contentEditable: false }, "Summary"),
    // Russian abstract
    label("Russian"), this.renderTextProperty("abstract"),

    // English abstract
    label("English"), this.renderTextProperty("abstract_en"),

    // German abstract
    label("German"), this.renderTextProperty("abstract_de")), $$("div", { className: "biography section" }, $$("h3", { contentEditable: false }, "Biography"), label("Name"), this.renderTextProperty("title"),

    // Russian biography
    label("Russian"), this.renderTextProperty("interviewee_bio"),

    // English biography
    label("English"), this.renderTextProperty("interviewee_bio_en"),

    // German biography
    label("German"), this.renderTextProperty("interviewee_bio_de"), this.renderWaypoints()), $$("div", { className: "project section" }, $$("h3", { contentEditable: false }, "Project Details"),
    // Project name
    label("Project Name"), this.renderTextProperty("project_name"),

    // Project location
    this.renderProjectLocation(),

    // Where the interview took place
    label("Place"), this.renderTextProperty("interview_location"),

    // Where the interview took place
    label("Persons present"), this.renderTextProperty("persons_present"),

    // Video or audio
    label("Interview Type"), this.renderInterviewType(),

    // Source of media
    label("Media identifier"), this.renderTextProperty("media_id"),

    // Interview duration
    label("Duration (in minutes)"), this.renderTextProperty("interview_duration"),

    // When the interview was recorded
    label("Interview date"), this.renderTextProperty("interview_date"),

    // The interviewer
    label("Interviewer"), this.renderTextProperty("conductor"),

    // Interview operator
    label("Operator"), this.renderTextProperty("operator"),

    // Sound
    label("Sound Operator"), this.renderTextProperty("sound_operator"), label("Date of publication"), this.renderTextProperty("published_on")

    // $$('div', {className: "This interview was created on XX and published on YY. Last update was made"})
    ), $$("div", { className: "status section", contentEditable: false }, $$("h3", { contentEditable: false }, "Workflow"), this.renderCheckboxProperty("transcripted"), label("Transcription ready"), this.renderCheckboxProperty("verified"), label("Interview verified"), this.renderCheckboxProperty("finished"), label("Ready for publish"), this.renderCheckboxProperty("published"), label("Published"))));
  }
});

MetadataPanel.contextId = "metadata";
MetadataPanel.icon = "fa-info";

module.exports = MetadataPanel;

},{"substance":46,"substance-ui/text_property":34,"substance/helpers":45}],283:[function(require,module,exports){
"use strict";

var SelectEntityMixin = require("../select_entity_mixin");
var _ = require("substance/helpers");
var Substance = require("substance");

var SelectPrisonPanelMixin = _.extend({}, SelectEntityMixin, {

  // Called with entityId when an entity has been clicked
  handleSelection: function handleSelection(entityId) {
    var app = this.context.app;
    var doc = app.doc;

    if (app.state.contextId === "selectPrison") {
      var prisonIds = doc.get("document").interviewee_prisons;
      prisonIds.push(entityId);

      doc.transaction(function (tx) {
        tx.set(["document", "interviewee_prisons"], prisonIds);
      });
    } else if (app.state.contextId === "selectWaypoint") {
      var waypointIds = doc.get("document").interviewee_waypoints;

      var newWaypoint = tx.create({
        id: Substance.uuid("waypoint"),
        type: "waypoint",
        density: 1,
        entityId: entityId
      });

      waypointIds.push(newWaypoint.id);

      doc.transaction(function (tx) {
        tx.set(["document", "interviewee_waypoints"], waypointIds);
      });
    } else if (app.state.contextId === "selectProjectLocation") {
      doc.transaction(function (tx) {
        tx.set(["document", "project_location"], entityId);
      });
    }

    app.replaceState({
      contextId: "metadata"
    });
  }
});

var SelectPrisonPanel = React.createClass({
  mixins: [SelectPrisonPanelMixin],
  displayName: "Tag Entity"
});

// Panel configuration
// ----------------

SelectPrisonPanel.contextId = "selectPrison";
SelectPrisonPanel.icon = "fa-bullseye";

// No context switch toggle is shown
SelectPrisonPanel.isDialog = true;

module.exports = SelectPrisonPanel;

},{"../select_entity_mixin":284,"substance":46,"substance/helpers":45}],284:[function(require,module,exports){
"use strict";

var $$ = React.createElement;

var TYPE_LABELS = {
  "prison": "Prison",
  "toponym": "Toponym",
  "person": "Person",
  "definition": "Definition"
};

// Example of a sub view
// ----------------

var EntityView = React.createClass({
  displayName: "Entity",

  handleClick: function handleClick(e) {
    e.preventDefault();
    this.props.handleSelection(this.props.id);
  },

  render: function render() {
    var className = ["entity", this.props.type];
    if (this.props.active) className.push("active");

    if (this.props.type == "prison" && this.props.prison_type instanceof Array) {
      this.props.name = this.props.name.toLowerCase().indexOf("неизвестно") >= 0 ? this.props.nearest_locality + " (" + this.props.prison_type.join(", ") + ")" : this.props.name;
    }

    var props = [$$("div", { className: "type" }, TYPE_LABELS[this.props.type]), $$("div", { className: "name" }, this.props.name || this.props.title)];

    if (this.props.synonyms && this.props.synonyms instanceof Array) {
      props.push($$("div", { className: "synonyms" }, "Also known as: " + this.props.synonyms.join(", ")));
    }

    if (this.props.country) {
      props.push($$("div", { className: "country" }, "Country: " + this.props.country));
    }

    if (this.props.type == "person") {
      var description = this.props.description || "";
      // Trim person description if it's too long
      if (description.length > 100) description = description.substring(0, 100) + "...";
      props.push($$("div", { className: "description" }, description));
    }

    return $$("div", {
      className: className.join(" "),
      onClick: this.handleClick
    }, props);
  }
});

// Entities Panel extension
// ----------------

var SelectEntityMixin = {

  contextTypes: {
    app: React.PropTypes.object.isRequired,
    backend: React.PropTypes.object.isRequired
  },

  handleCancel: function handleCancel(e) {
    var app = this.context.app;
    e.preventDefault();
    console.log("props", this.props);
    if (this.props.entityReferenceId) {
      // Go back to show entities panel
      app.replaceState({
        contextId: "showEntityReference",
        entityReferenceId: this.props.entityReferenceId
      });
    } else {
      // Go to regular entities panel
      app.replaceState({
        contextId: "entities"
      });
    }
  },

  // Data loading methods
  // ------------

  loadEntities: function loadEntities(searchString, type) {
    var self = this;
    var type = type || false;
    var backend = this.context.backend;

    backend.searchEntities(searchString, type, function (err, entities) {
      self.setState({
        state: entities.state,
        entities: entities.results
      });
    });
  },

  // State relevant things
  // ------------

  getInitialState: function getInitialState() {
    return {
      searchString: this.props.searchString,
      entities: []
    };
  },

  // Events
  // ------------

  componentDidMount: function componentDidMount() {
    this.loadEntities(this.state.searchString);
  },

  handleSearchStringChange: function handleSearchStringChange(e) {
    var searchString = e.target.value;
    var searchType = this.state.type || false;
    this.setState({ searchString: searchString });
    this.loadEntities(searchString, searchType);
  },

  handleEntityFilterChange: function handleEntityFilterChange(e) {
    var searchType = e.currentTarget.value;
    this.setState({ type: searchType });
    this.loadEntities(this.state.searchString, searchType);
  },

  handleRefreshClick: function handleRefreshClick() {
    var type = this.state.type || false;
    var searchString = this.state.searchString || "";
    this.loadEntities(searchString, type);
  },

  // Rendering
  // -------------------

  render: function render() {
    var self = this;
    var entities = this.state.entities;
    var entityNodes;
    var stateMessage = this.state.state;

    if (entities.length > 0) {
      entityNodes = entities.map(function (entity) {
        entity.handleSelection = self.handleSelection;
        return $$(EntityView, entity);
      });
    } else {
      entityNodes = [$$("div", { className: "no-results", text: "Loading suggestions" })];
    }

    return $$("div", { className: "panel dialog tag-entity-panel-component" }, $$("div", { className: "dialog-header" }, $$("a", {
      href: "#",
      className: "back",
      onClick: this.handleCancel,
      dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-chevron-left\"></i>" }
    }), $$("div", { className: "label" }, "Select entity")), $$("div", { className: "panel-content" }, $$("div", { className: "search", html: "" }, $$("input", {
      className: "search-str",
      type: "text",
      placeholder: "Type to search for entities", //,
      value: this.state.searchString,
      onChange: this.handleSearchStringChange
    }), $$("select", {
      className: "entity-type",
      onChange: this.handleEntityFilterChange
    }, $$("option", { value: "" }, "All"),
    //$$('option', {value: "prison"}, "Prison"),
    //$$('option', {value: "toponym"}, "Toponym"),
    $$("option", { value: "location" }, "Location"), $$("option", { value: "person" }, "Person"), $$("option", { value: "definition" }, "Definition")), $$("span", {
      className: "refresh",
      onClick: this.handleRefreshClick
    }, $$("i", { className: "fa fa-refresh" }, ""))), $$("div", { className: "search-result-state" }, $$("span", { className: "state" }, stateMessage), $$("span", { className: "add-entity" }, $$("span", { className: "label" }, "Add new: "), $$("a", { href: "/prisons/add", target: "_blank" }, $$("i", { className: "fa fa-th" }, "")), $$("a", { href: "/toponyms/add", target: "_blank" }, $$("i", { className: "fa fa-globe" }, "")), $$("a", { href: "/definitions/add", target: "_blank" }, $$("i", { className: "fa fa-bookmark" }, "")), $$("a", { href: "/persons/add", target: "_blank" }, $$("i", { className: "fa fa-users" }, "")))), $$("div", { className: "entities" }, entityNodes)));
  }
};

module.exports = SelectEntityMixin;

},{}],285:[function(require,module,exports){
"use strict";

var $$ = React.createElement;

var _ = require("substance/helpers");
var Tree = require("./tree_component");

// Edit Subject Reference Panel
// ----------------

var EditSubjectReferencePanel = React.createClass({
  displayName: "Tag subjects",

  contextTypes: {
    backend: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired
  },

  handleCancel: function handleCancel(e) {
    e.preventDefault();
    // Go to regular entities panel
    this.context.app.replaceState({
      contextId: "subjects"
    });
  },

  // Events
  // ------------

  componentDidMount: function componentDidMount() {
    var app = this.context.app;
    var doc = app.doc;
    doc.connect(this, {
      "document:changed": this.handleDocumentChange
    });
  },

  handleDocumentChange: function handleDocumentChange(change, info) {
    var refId = this.props.subjectReferenceId;
    if (info.updateSubjectReference) return;
    if (change.isAffected([refId, "target"])) {
      this.forceUpdate();
    }
  },

  handleDeleteReference: function handleDeleteReference(e) {
    var app = this.context.app;
    var subjectReferenceId = this.props.subjectReferenceId;
    var doc = app.doc;

    doc.transaction(function (tx) {
      tx["delete"](subjectReferenceId);
    });

    app.replaceState({
      contextId: "subjects"
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    var doc = this.context.app.doc;
    doc.disconnect(this);
  },

  // Write changes in selection to document model
  // ------------

  updateSubjectReference: function updateSubjectReference(selectedNodes) {
    var app = this.context.app;
    var doc = app.doc;
    var subjectReferenceId = this.props.subjectReferenceId;
    var subjectIds = Object.keys(selectedNodes);

    doc.transaction({}, { updateSubjectReference: true }, function (tx) {
      tx.set([subjectReferenceId, "target"], subjectIds);
    });
  },

  // Rendering
  // -------------------

  render: function render() {
    var treeEl;
    var app = this.context.app;
    var doc = app.doc;

    treeEl = $$(Tree, {
      ref: "treeWidget",
      selectedNodes: doc.get(app.state.subjectReferenceId).target,
      tree: doc.subjects.getTree(),
      onSelectionChanged: this.updateSubjectReference
    });

    return $$("div", { className: "panel dialog edit-subject-reference-panel-component" }, $$("div", { className: "dialog-header" }, $$("a", {
      href: "#",
      className: "back",
      onClick: this.handleCancel,
      dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-chevron-left\"></i>" }
    }), $$("div", { className: "label" }, "Related subjects"), $$("div", { className: "actions" }, $$("a", {
      href: "#",
      className: "delete-reference",
      onClick: this.handleDeleteReference,
      dangerouslySetInnerHTML: { __html: "<i class=\"fa fa-trash\"></i> Remove" }
    }))), $$("div", { className: "panel-content" }, treeEl));
  }
});

// Panel configuration
// ----------------

EditSubjectReferencePanel.contextId = "editSubjectReference";
EditSubjectReferencePanel.icon = "fa-tag";

// No toggle is shown
EditSubjectReferencePanel.isDialog = true;

module.exports = EditSubjectReferencePanel;

},{"./tree_component":288,"substance/helpers":45}],286:[function(require,module,exports){
"use strict";

var $$ = React.createElement;
var Substance = require("substance");
var PanelMixin = require("substance-ui/panel_mixin");
var _ = require("substance/helpers");
var Tree = require("./toc_tree");

// Subjects Panel extension
// ----------------
//

var SubjectsPanelMixin = _.extend({}, PanelMixin, {
  contextTypes: {
    app: React.PropTypes.object.isRequired,
    backend: React.PropTypes.object.isRequired
  },

  handleToggle: function handleToggle(subjectId) {
    var app = this.context.app;

    if (app.state.subjectId === subjectId) {
      app.replaceState({
        contextId: "subjects"
      });
    } else {
      app.replaceState({
        contextId: "subjects",
        subjectId: subjectId
      });
    }
  },

  // Rendering
  // -------------------

  render: function render() {
    var props = this.props;
    var self = this;
    var app = this.context.app;
    var doc = app.doc;
    var tree = props.doc.subjects.getReferencedSubjectsTree();

    Substance.map(tree.nodes, function (subject) {
      subject.active = subject.id === app.state.subjectId;
      subject.key = subject.id;
      subject.handleToggle = self.handleToggle;
    });

    return $$("div", { className: "panel subjects-panel-component" }, $$("div", { className: "panel-content" }, $$("div", { className: "subjects" }, $$(Tree, {
      ref: "treeWidget",
      tree: tree
    }))));
  }
});

// Panel Configuration
// -----------------

var SubjectsPanel = React.createClass({
  mixins: [SubjectsPanelMixin],
  displayName: "Subjects"
});

SubjectsPanel.contextId = "subjects";
SubjectsPanel.icon = "fa-tag";

module.exports = SubjectsPanel;

},{"./toc_tree":287,"substance":46,"substance-ui/panel_mixin":31,"substance/helpers":45}],287:[function(require,module,exports){
"use strict";

var $$ = React.createElement;

var _ = require("substance/helpers");

// Tree Node Component
// ---------------

var TreeNode = React.createClass({
  displayName: "TreeNode",

  handleToggle: function handleToggle(e) {
    var node = this.props.node;
    node.handleToggle(node.id);
    e.preventDefault();
  },

  render: function render() {
    var node = this.props.node;
    var treeComp = this.props.treeComp;
    var tree = treeComp.props.tree;
    var childNodes = tree.getChildren(node.id);

    var childrenEls = [];

    childrenEls = childNodes.map((function (node) {
      return $$(TreeNode, {
        treeComp: treeComp,
        key: node.id,
        node: node
      });
    }).bind(this));

    _.each(this.props.children, function (childNode) {
      childrenEls($$(TreeNode, {
        node: childNode
      }));
    });

    return $$("div", { className: "tree-node" + (node.active ? " selected" : "") }, $$("a", {
      href: "#",
      className: "name",
      "data-id": node.id,
      onClick: this.handleToggle
    }, node.name), $$("div", { className: "children" }, childrenEls));
  }
});

// Tree Component
// ---------------

var Tree = React.createClass({
  displayName: "Tree",

  componentWillMount: function componentWillMount() {
    this._prepare();
  },

  _prepare: function _prepare() {
    var tree = this.props.tree;

    this.state = {
      tree: tree
    };
  },

  getInitialState: function getInitialState() {
    return {
      tree: null
    };
  },

  render: function render() {
    var tree = this.state.tree;
    var childNodes = tree.getChildren("root");

    var childEls = childNodes.map((function (node) {
      return $$(TreeNode, {
        treeComp: this,
        key: node.id,
        node: node
      });
    }).bind(this));
    return $$("div", { className: "tree-list-component" }, childEls);
  }
});

module.exports = Tree;

},{"substance/helpers":45}],288:[function(require,module,exports){
"use strict";

var $$ = React.createElement;

var _ = require("substance/helpers");

// Tree Node Component
// ---------------

var TreeNode = React.createClass({
  displayName: "TreeNode",

  render: function render() {
    var node = this.props.node;
    var treeComp = this.props.treeComp;
    var tree = treeComp.props.tree;
    var childNodes = tree.getChildren(node.id);

    var childrenEls = [];
    if (this.props.node._expanded) {
      childrenEls = childNodes.map((function (node) {
        return $$(TreeNode, {
          treeComp: treeComp,
          key: node.id,
          node: node,
          handleSelection: this.props.handleSelection,
          handleExpansion: this.props.handleExpansion
        });
      }).bind(this));

      _.each(this.props.children, function (childNode) {
        childrenEls($$(TreeNode, {
          node: childNode
        }));
      });
    }

    var expandedIcon = node._expanded ? "fa-caret-down" : "fa-caret-right";
    var selectedIcon = node._selected ? "fa-check-square-o" : "fa-square-o";
    var hideExpand = childNodes.length === 0;

    return $$("div", { className: "tree-node" + (node._selected ? " selected" : "") + (node._expanded ? " expanded" : "") }, $$("a", {
      "data-id": node.id,
      className: "expand-toggle" + (hideExpand ? " hidden" : ""),
      onClick: this.props.handleExpansion,
      href: "#",
      dangerouslySetInnerHTML: { __html: "<i class=\"fa " + expandedIcon + "\"></i>" }
    }), $$("a", {
      href: "#",
      "data-id": node.id,
      className: "select-toggle",
      onClick: this.props.handleSelection,
      dangerouslySetInnerHTML: { __html: "<i class=\"fa " + selectedIcon + "\"></i>" }
    }), $$("a", {
      href: "#",
      className: "name",
      "data-id": node.id,
      onClick: this.props.handleSelection
    }, node.name), $$("div", { className: "children" }, childrenEls));
  }
});

// Tree Component
// ---------------

var Tree = React.createClass({
  displayName: "Tree",

  componentWillMount: function componentWillMount() {
    this._prepare(this.props.selectedNodes);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this._prepare(nextProps.selectedNodes);
  },

  // Preprocess tree to flag nodes accordingly
  // This prepares the state element, before a render happens
  _prepare: function _prepare(newSelectedNodes) {
    var tree = this.props.tree;

    // Reset everything
    tree.walkTree(function (node) {
      delete node._selected;
      delete node._expanded;
    });

    // Preprocess tree to flag nodes accordingly
    var selectedNodes = {};

    _.each(newSelectedNodes, function (nodeId) {
      selectedNodes[nodeId] = true;
    });

    function __expand(node) {
      if (!node) return;
      node._expanded = true;
      __expand(tree.get(node.parent));
    }

    tree.walkTree(function (node) {
      node._selected = selectedNodes[node.id];
      if (node._selected) {
        __expand(tree.get(node.parent));
      }
    });

    this.state = {
      tree: tree,
      selectedNodes: selectedNodes
    };
  },

  getInitialState: function getInitialState() {
    return {
      selectedNodes: null,
      tree: null
    };
  },

  handleExpansion: function handleExpansion(e) {
    e.preventDefault();
    var nodeId = e.currentTarget.dataset.id;
    var tree = this.state.tree;
    var node = tree.get(nodeId);
    var selectedNodes = this.state.selectedNodes;

    if (node._expanded) {
      // Collapse
      node._expanded = false;
    } else {
      // Expand
      node._expanded = true;
    }

    this.setState({
      selectedNodes: selectedNodes,
      tree: tree
    });
  },

  handleSelection: function handleSelection(e) {
    e.preventDefault();
    var nodeId = e.currentTarget.dataset.id;
    var tree = this.state.tree;
    var node = tree.get(nodeId);
    var selectedNodes = this.state.selectedNodes;

    if (selectedNodes[nodeId]) {
      // Deselect
      node._selected = false;
      delete selectedNodes[nodeId];
    } else {
      // Select
      node._selected = true;
      selectedNodes[nodeId] = true;
    }

    this.setState({
      selectedNodes: selectedNodes,
      tree: tree
    });

    this.props.onSelectionChanged(selectedNodes);
  },

  render: function render() {
    var tree = this.state.tree;
    var childNodes = tree.getChildren("root");

    var childEls = childNodes.map((function (node) {
      return $$(TreeNode, {
        treeComp: this,
        key: node.id,
        node: node,
        handleSelection: this.handleSelection,
        handleExpansion: this.handleExpansion
      });
    }).bind(this));
    return $$("div", { className: "tree-component" }, childEls);
  }
});

module.exports = Tree;

},{"substance/helpers":45}],289:[function(require,module,exports){
"use strict";

var $$ = React.createElement;
var Substance = require("substance");
var TextProperty = require("substance-ui/text_property");

var Surface = Substance.Surface;
var FormEditor = Surface.FormEditor;

var TitleEditor = React.createClass({
  displayName: "TitleEditor",

  // State relevant things
  // ------------

  contextTypes: {
    app: React.PropTypes.object.isRequired,
    surfaceManager: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    surface: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      surface: this.surface
    };
  },

  componentWillMount: function componentWillMount() {
    var doc = this.props.doc;
    var editor = new FormEditor();
    this.surface = new Surface(this.context.surfaceManager, doc, editor, { name: "title" });
    return {};
  },

  componentDidMount: function componentDidMount() {
    var app = this.context.app;
    app.registerSurface(this.surface);
    this.surface.attach(React.findDOMNode(this));
  },

  componentWillUnmount: function componentWillUnmount() {
    var app = this.context.app;
    app.unregisterSurface(this.surface);
    this.surface.detach();
  },

  // Rendering
  // -------------------

  render: function render() {
    var app = this.context.app;
    var doc = app.doc;
    var metaNode = doc.getDocumentMeta();

    return $$("div", { className: "document-title", contentEditable: true, "data-id": "title-editor" }, $$(TextProperty, {
      doc: app.doc,
      tagName: "div",
      className: "title",
      path: [metaNode.id, "title"]
    }));
  }
});

module.exports = TitleEditor;

},{"substance":46,"substance-ui/text_property":34}],290:[function(require,module,exports){
"use strict";

var $$ = React.createElement;
var _ = require("substance/helpers");

// Navigate Tool Component
// ----------------
//
// Just used to trigger app state changes

var NavigateTool = React.createClass({
  displayName: "NavigateTool",

  contextTypes: {
    app: React.PropTypes.object.isRequired
  },

  handleClick: function handleClick(e) {
    e.preventDefault();
  },
  getInitialState: function getInitialState() {
    return { disabled: true };
  },

  handleMouseDown: function handleMouseDown(e) {
    e.preventDefault();

    if (this.props.replace) {
      this.context.app.replaceState(this.props.newState);
    } else {
      this.context.app.setState(this.props.newState);
    }
  },

  render: function render() {
    var classNames = ["option"];

    return $$("button", {
      className: classNames.join(" "),
      title: this.props.title,
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClick
    }, this.props.title);
  }
});

module.exports = NavigateTool;

},{"substance/helpers":45}],291:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

// Science Writer
// ---------------
//
// Configures a simple writer for the substance journal, using the generic SubstanceWriter implementation

var $$ = React.createElement;

// Core Writer from Substance UI
// ---------------
//

var SubstanceWriter = require('substance-ui/writer');

// Configuration
// ---------------
//

var tools = require('./tools');
var components = require('./components');
var stateHandlers = require('./state_handlers');
var panelOrder = ['subjects', 'entities', 'comments', 'metadata'];

// Specify a Notification service
// ---------------
//

// Top Level Application
// ---------------
//
// Adjust for your own needs

var ArchivistWriter = (function (_React$Component) {
  _inherits(ArchivistWriter, _React$Component);

  function ArchivistWriter(props) {
    _classCallCheck(this, ArchivistWriter);

    _get(Object.getPrototypeOf(ArchivistWriter.prototype), 'constructor', this).call(this, props);
    this.state = {
      doc: null
    };
  }

  _createClass(ArchivistWriter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var backend = this.context.backend;
      backend.getDocument(this.props.documentId || 'example_document', (function (err, doc) {
        // After here we won't allow non-transactional changes
        doc.FORCE_TRANSACTIONS = true;
        this.setState({
          doc: doc
        });
      }).bind(this));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      var backend = this.context.backend;
      this.setState({
        doc: null
      });
      backend.getDocument(this.props.documentId || 'example_document', (function (err, doc) {
        this.setState({
          doc: doc
        });
      }).bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.doc) {
        return $$(SubstanceWriter, {
          config: {
            components: components,
            tools: tools,
            stateHandlers: stateHandlers,
            panelOrder: panelOrder
          },
          doc: this.state.doc,
          id: 'writer',
          contentContainer: 'content',
          contextId: 'subjects'
        });
      } else {
        return $$('div', null, '');
      }
    }
  }]);

  return ArchivistWriter;
})(React.Component);

ArchivistWriter.displayName = 'ArchivistWriter';

ArchivistWriter.contextTypes = {
  backend: React.PropTypes.object.isRequired
};

module.exports = ArchivistWriter;

},{"./components":265,"./state_handlers":292,"./tools":297,"substance-ui/writer":37}],292:[function(require,module,exports){
"use strict";

var _ = require("substance/helpers");

// HACK: remember previous selection so we can check if a selection has changed
var prevSelection;

var stateHandlers = {

  handleSelectionChange: function handleSelectionChange(app, sel, annotations) {
    var surface = app.getSurface();
    var contentContainer = surface.getContainer();
    var doc = app.doc;

    if (sel.isNull() || !sel.isPropertySelection() || !sel.isCollapsed()) return false;
    if (surface.getContainerName() !== "content") return false;

    if (sel.equals(prevSelection)) {
      return;
    }
    prevSelection = sel;

    // From entities panel
    // ---------------
    //

    var annotations = app.doc.annotationIndex.get(sel.getPath(), sel.getStartOffset(), sel.getEndOffset(), "entity_reference");

    if (annotations.length > 0) {
      var ref = annotations[0];
      app.replaceState({
        contextId: "showEntityReference",
        entityReferenceId: ref.id,
        noScroll: true
      });
      return true;
    }

    // Comments module
    // ---------------
    //

    var annos = doc.getContainerAnnotationsForSelection(sel, contentContainer, {
      type: "comment"
    });

    var activeComment = annos[0];
    if (activeComment) {
      app.replaceState({
        contextId: "show-comment",
        commentId: activeComment.id,
        noScroll: true
      });
      return true;
    }

    if (sel.isCollapsed() && app.state.contextId !== "editSubjectReference") {
      app.replaceState({
        contextId: "metadata"
      });
      return true;
    }
  },

  // Determine highlighted nodes
  // -----------------
  //
  // => inspects state
  //
  // TODO: this is potentially called too often
  //
  // Based on app state, determine which nodes should be highlighted in the content panel
  // @returns a list of nodes to be highlighted

  getHighlightedNodes: function getHighlightedNodes(app) {
    var doc = app.doc;
    var state = app.state;

    // Subjects-specific
    // --------------------
    //
    // When a subject has been clicked in the subjects panel

    if (state.contextId === "editSubjectReference" && state.subjectReferenceId) {
      return [state.subjectReferenceId];
    }

    if (state.contextId === "subjects" && state.subjectId) {
      return doc.subjects.getReferencesForSubject(state.subjectId);
    }

    // Entities-specific
    // --------------------
    //
    // When a subject has been clicked in the subjects panel

    // Let the extension handle which nodes should be highlighted
    if (state.contextId === "entities" && state.entityId) {
      // Use reference handler
      var references = Object.keys(doc.entityReferencesIndex.get(state.entityId));
      return references;
    } else if (state.entityReferenceId) {
      return [state.entityReferenceId];
    }

    // Comment-specific
    // --------------------
    //

    if (_.includes(["show-comment", "edit-comment"], state.contextId) && state.commentId) {
      return [state.commentId];
    }
  }
};

module.exports = stateHandlers;

},{"substance/helpers":45}],293:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var AnnotationTool = Substance.Surface.AnnotationTool;

var CommentTool = AnnotationTool.extend({
  name: "comment",

  getAnnotationData: function getAnnotationData() {
    return {
      container: "content",
      content: "<p>Enter comment</p>",
      created_at: new Date().toJSON(),
      creator: window.currentUser.name
    };
  },

  disabledModes: ["remove", "fusion"],
  afterCreate: function afterCreate(anno) {
    var app = this.context.app;
    app.replaceState({
      contextId: "edit-comment",
      commentId: anno.id,
      noScroll: true
    });
  }
});

module.exports = CommentTool;

},{"substance":46}],294:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var Tool = Substance.Surface.Tool;

var TagEntityTool = Tool.extend({
  name: "tag_entity",

  update: function update(surface, sel) {
    this.surface = surface; // important!

    // Set disabled when not a property selection
    if (!surface.isEnabled() || sel.isNull() || !sel.isPropertySelection() || sel.isCollapsed()) {
      return this.setDisabled();
    }

    var newState = {
      surface: surface,
      sel: sel,
      disabled: false
    };

    this.setToolState(newState);
  },

  // Needs app context in order to request a state switch
  // TODO: tools should not depend on this.context.app
  performAction: function performAction(app) {
    var app = this.context.app;
    var sel = app.getSelection();

    // TODO: implement sel.getText() so we can get this from the document directly;
    var searchString = window.getSelection().toString();

    app.replaceState({
      contextId: "tagentity",
      path: sel.getPath(),
      startOffset: sel.getStartOffset(),
      endOffset: sel.getEndOffset(),
      searchString: searchString
    });
  },

  createEntityReference: function createEntityReference(target) {},

  deleteEntityReference: function deleteEntityReference(entityReferenceId) {},

  updateEntityReference: function updateEntityReference(newTarget) {}
});

module.exports = TagEntityTool;

},{"substance":46}],295:[function(require,module,exports){
'use strict';

var Substance = require('substance');
var Tool = Substance.Surface.Tool;

function slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaeeeeiiiioooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
  .replace(/\s+/g, '-') // collapse whitespace and replace by -
  .replace(/-+/g, '-'); // collapse dashes

  return str;
}

var ExportTool = Tool.extend({

  name: 'export',

  init: function init() {
    this.state.disabled = false;
  },

  // Needs app context in order to request a state switch
  performAction: function performAction(app) {
    var doc = this.context.doc;

    // Starts a download of the current HTML
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([doc.toXml()], { type: 'text/xml' }));
    a.download = slug(doc.getTitle()) + '.xml';

    // Append anchor to body.
    document.body.appendChild(a);
    a.click();

    // Remove anchor from body
    document.body.removeChild(a);
  }
});

module.exports = ExportTool;

},{"substance":46}],296:[function(require,module,exports){
'use strict';

var Substance = require('substance');
var Tool = Substance.Surface.Tool;
var indentationCleaner = require('../transformations/indentation');

var indentationCleanerTool = Tool.extend({
  name: 'indentation',

  update: function update(surface, sel) {
    this.surface = surface;

    var newState = {
      surface: surface,
      sel: sel,
      disabled: false
    };

    this.setToolState(newState);
  },

  performAction: function performAction(app) {
    var doc = this.context.doc;
    containerId = 'content';
    doc.transaction(function (tx) {
      indentationCleaner(tx, containerId);
    });
  }

});

module.exports = indentationCleanerTool;

},{"../transformations/indentation":301,"substance":46}],297:[function(require,module,exports){
'use strict';

var _ = require('substance/helpers');
var BuiltInTools = require('substance-ui/writer/tools');
var SubstanceTools = require('substance').Surface.Tools;
var EntityReferenceTool = require('./entity_reference_tool');
var SubjectReferenceTool = require('./subject_reference_tool');
var CommentTool = require('./comment_tool');
var TimecodeTool = require('./timecode_tool');
var IndentationTool = require('./indentation_tool');

module.exports = _.extend({}, BuiltInTools, {
  'export': require('./export_tool'),
  'whitespace': require('./whitespace'),
  'timecode': TimecodeTool,
  'emphasis': SubstanceTools.Emphasis,
  'strong': SubstanceTools.Strong,
  'link': SubstanceTools.Link,
  'entity_reference': EntityReferenceTool,
  'subject_reference': SubjectReferenceTool,
  'comment': CommentTool,
  'indentation': IndentationTool
});

},{"./comment_tool":293,"./entity_reference_tool":294,"./export_tool":295,"./indentation_tool":296,"./subject_reference_tool":298,"./timecode_tool":299,"./whitespace":300,"substance":46,"substance-ui/writer/tools":39,"substance/helpers":45}],298:[function(require,module,exports){
'use strict';

var Substance = require('substance');
var AnnotationTool = Substance.Surface.AnnotationTool;
var _ = require('substance/helpers');

var TagSubjectTool = AnnotationTool.extend({

  name: 'subject_reference',

  getAnnotationData: function getAnnotationData() {
    return {
      container: 'content',
      target: []
    };
  },

  // When there's no existing annotation overlapping, we create a new one.
  canCreate: function canCreate(annos, sel) {
    var app = this.context.app;
    var canCreate = app.state.contextId !== 'editSubjectReference' && !sel.isCollapsed();
    return canCreate;
  },

  getActiveAnno: function getActiveAnno(annos) {
    var app = this.context.app;
    return _.filter(annos, function (a) {
      return a.id === app.state.subjectReferenceId;
    })[0];
  },

  // When there's some overlap with only a single annotation we do an expand
  canExpand: function canExpand(annos, sel) {
    var app = this.context.app;
    if (annos.length === 0) return false;
    if (app.state.contextId !== 'editSubjectReference') return false;

    var activeAnno = this.getActiveAnno(annos);
    if (!activeAnno) return false;

    var annoSel = activeAnno.getSelection();
    var canExpand = sel.overlaps(annoSel) && !sel.isCollapsed() && !sel.isInsideOf(annoSel);
    return canExpand;
  },

  canFusion: function canFusion() {
    return false; // never ever
  },

  canRemove: function canRemove(annos, sel) {
    return false; // never through toggling
  },

  canTruncate: function canTruncate(annos, sel) {
    var app = this.context.app;
    if (annos.length === 0) return false;
    if (app.state.contextId !== 'editSubjectReference') return false;

    var activeAnno = this.getActiveAnno(annos);
    if (!activeAnno) return false;
    var annoSel = activeAnno.getSelection();
    var canTruncate = (sel.isLeftAlignedWith(annoSel) || sel.isRightAlignedWith(annoSel)) && !sel.equals(annoSel);
    return canTruncate;
  },

  // Same implementation as on AnnotationTool, except we get the active
  // subjectReference id
  handleTruncate: function handleTruncate(state) {
    var doc = this.getDocument();
    var sel = state.sel;
    this.surface.transaction((function (tx) {
      var anno = this.getActiveAnno(state.annos);
      if (!anno) return false;

      var annoSel = anno.getSelection();
      var newAnnoSel = annoSel.truncate(sel);
      anno.updateRange(tx, newAnnoSel);
      tx.save({ selection: sel });
      this.afterTruncate();
    }).bind(this));
  },

  // Same implementation as on AnnotationTool, except we get the active
  // subjectReference id
  handleExpand: function handleExpand(state) {
    var doc = this.getDocument();
    var sel = state.sel;

    this.surface.transaction((function (tx) {
      var anno = this.getActiveAnno(state.annos);
      if (!anno) return false;
      var annoSel = anno.getSelection(); // state.annoSels[0];
      var newAnnoSel = annoSel.expand(sel);
      anno.updateRange(tx, newAnnoSel);
      tx.save({ selection: sel });
      this.afterExpand();
    }).bind(this));
  },

  disabledModes: ['remove', 'fusion'],
  afterCreate: function afterCreate(anno) {
    var app = this.context.app;
    app.replaceState({
      contextId: 'editSubjectReference',
      subjectReferenceId: anno.id
    });
  }
});

module.exports = TagSubjectTool;

},{"substance":46,"substance/helpers":45}],299:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var AnnotationTool = Substance.Surface.AnnotationTool;

var TimecodeTool = AnnotationTool.extend({
	name: "timecode"
});

module.exports = TimecodeTool;

},{"substance":46}],300:[function(require,module,exports){
'use strict';

var Substance = require('substance');
var Tool = Substance.Surface.Tool;
var whitespaceCleaner = require('../transformations/whitespace');

var whitespaceCleanerTool = Tool.extend({
  name: 'whitespace',

  update: function update(surface, sel) {
    this.surface = surface;

    var newState = {
      surface: surface,
      sel: sel,
      disabled: false
    };

    this.setToolState(newState);
  },

  performAction: function performAction(app) {
    var doc = this.context.doc;
    containerId = 'content';
    doc.transaction(function (tx) {
      whitespaceCleaner(tx, containerId);
    });
  }

});

module.exports = whitespaceCleanerTool;

},{"../transformations/whitespace":302,"substance":46}],301:[function(require,module,exports){
'use strict';

var _ = require('substance/helpers');
var Substance = require('substance');
var Document = Substance.Document;

var detectWhitespace = function detectWhitespace(text) {
  return text.indexOf(' ');
};

function cleanIndentationInTextProperty(tx, args) {
  var text = tx.get(args.path);

  while (detectWhitespace(text) == 0) {
    var sel = tx.createSelection({
      type: 'property',
      path: args.path,
      startOffset: 0,
      endOffset: 1
    });
    Document.Transformations.deleteSelection(tx, { selection: sel });
    text = tx.get(args.path);
  }
}

function indentationCleaner(tx, containerId) {
  if (!containerId) {
    throw new Error('Argument \'containerId\' is mandatory.');
  }

  console.log('running indentation cleaner...');
  var container = tx.get(containerId);
  var components = container.getComponents();

  _.each(components, function (comp) {
    cleanIndentationInTextProperty(tx, {
      path: comp.path
    });
  });
}

module.exports = indentationCleaner;

},{"substance":46,"substance/helpers":45}],302:[function(require,module,exports){
'use strict';

var _ = require('substance/helpers');
var Substance = require('substance');
var Document = Substance.Document;

function detectWhitespaceInTextProperty(tx, path) {
  var text = tx.get(path);

  var matcher = new RegExp('  ', 'g');
  var matches = [];
  var match;

  while (match = matcher.exec(text)) {
    var sel = tx.createSelection({
      type: 'property',
      path: path,
      startOffset: match.index,
      endOffset: matcher.lastIndex
    });

    matches.unshift(sel);
  }
  return matches;
}

function cleanWhitespacesInTextProperty(tx, path) {
  var matches = detectWhitespaceInTextProperty(tx, path);

  while (matches.length > 0) {
    _.each(matches, function (match) {
      Document.Transformations.insertText(tx, { selection: match, text: ' ' });
    });
    matches = detectWhitespaceInTextProperty(tx, path);
  }
}

function cleanWhitespaces(tx, containerId) {
  if (!containerId) {
    throw new Error('Argument \'containerId\' is mandatory.');
  }

  console.log('running whitespace cleaner...');

  var container = tx.get(containerId);
  var components = container.getComponents();

  _.each(components, function (comp) {
    cleanWhitespacesInTextProperty(tx, comp.path);
  });
}

module.exports = cleanWhitespaces;

},{"substance":46,"substance/helpers":45}],303:[function(require,module,exports){
// Added for convenience in the Node environment.
// The meat and potatoes exist in ./lib/polyglot.js.
module.exports = require('./lib/polyglot');

},{"./lib/polyglot":304}],304:[function(require,module,exports){
//     (c) 2012 Airbnb, Inc.
//
//     polyglot.js may be freely distributed under the terms of the BSD
//     license. For all licensing information, details, and documention:
//     http://airbnb.github.com/polyglot.js
//
//
// Polyglot.js is an I18n helper library written in JavaScript, made to
// work both in the browser and in Node. It provides a simple solution for
// interpolation and pluralization, based off of Airbnb's
// experience adding I18n functionality to its Backbone.js and Node apps.
//
// Polylglot is agnostic to your translation backend. It doesn't perform any
// translation; it simply gives you a way to manage translated phrases from
// your client- or server-side JavaScript application.
//


(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.Polyglot = factory(root);
  }
}(this, function(root) {
  'use strict';

  // ### Polyglot class constructor
  function Polyglot(options) {
    options = options || {};
    this.phrases = {};
    this.extend(options.phrases || {});
    this.currentLocale = options.locale || 'en';
    this.allowMissing = !!options.allowMissing;
    this.warn = options.warn || warn;
  }

  // ### Version
  Polyglot.VERSION = '0.4.3';

  // ### polyglot.locale([locale])
  //
  // Get or set locale. Internally, Polyglot only uses locale for pluralization.
  Polyglot.prototype.locale = function(newLocale) {
    if (newLocale) this.currentLocale = newLocale;
    return this.currentLocale;
  };

  // ### polyglot.extend(phrases)
  //
  // Use `extend` to tell Polyglot how to translate a given key.
  //
  //     polyglot.extend({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     });
  //
  // The key can be any string.  Feel free to call `extend` multiple times;
  // it will override any phrases with the same key, but leave existing phrases
  // untouched.
  //
  // It is also possible to pass nested phrase objects, which get flattened
  // into an object with the nested keys concatenated using dot notation.
  //
  //     polyglot.extend({
  //       "nav": {
  //         "hello": "Hello",
  //         "hello_name": "Hello, %{name}",
  //         "sidebar": {
  //           "welcome": "Welcome"
  //         }
  //       }
  //     });
  //
  //     console.log(polyglot.phrases);
  //     // {
  //     //   'nav.hello': 'Hello',
  //     //   'nav.hello_name': 'Hello, %{name}',
  //     //   'nav.sidebar.welcome': 'Welcome'
  //     // }
  //
  // `extend` accepts an optional second argument, `prefix`, which can be used
  // to prefix every key in the phrases object with some string, using dot
  // notation.
  //
  //     polyglot.extend({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     }, "nav");
  //
  //     console.log(polyglot.phrases);
  //     // {
  //     //   'nav.hello': 'Hello',
  //     //   'nav.hello_name': 'Hello, %{name}'
  //     // }
  //
  // This feature is used internally to support nested phrase objects.
  Polyglot.prototype.extend = function(morePhrases, prefix) {
    var phrase;

    for (var key in morePhrases) {
      if (morePhrases.hasOwnProperty(key)) {
        phrase = morePhrases[key];
        if (prefix) key = prefix + '.' + key;
        if (typeof phrase === 'object') {
          this.extend(phrase, key);
        } else {
          this.phrases[key] = phrase;
        }
      }
    }
  };

  // ### polyglot.clear()
  //
  // Clears all phrases. Useful for special cases, such as freeing
  // up memory if you have lots of phrases but no longer need to
  // perform any translation. Also used internally by `replace`.
  Polyglot.prototype.clear = function() {
    this.phrases = {};
  };

  // ### polyglot.replace(phrases)
  //
  // Completely replace the existing phrases with a new set of phrases.
  // Normally, just use `extend` to add more phrases, but under certain
  // circumstances, you may want to make sure no old phrases are lying around.
  Polyglot.prototype.replace = function(newPhrases) {
    this.clear();
    this.extend(newPhrases);
  };


  // ### polyglot.t(key, options)
  //
  // The most-used method. Provide a key, and `t` will return the
  // phrase.
  //
  //     polyglot.t("hello");
  //     => "Hello"
  //
  // The phrase value is provided first by a call to `polyglot.extend()` or
  // `polyglot.replace()`.
  //
  // Pass in an object as the second argument to perform interpolation.
  //
  //     polyglot.t("hello_name", {name: "Spike"});
  //     => "Hello, Spike"
  //
  // If you like, you can provide a default value in case the phrase is missing.
  // Use the special option key "_" to specify a default.
  //
  //     polyglot.t("i_like_to_write_in_language", {
  //       _: "I like to write in %{language}.",
  //       language: "JavaScript"
  //     });
  //     => "I like to write in JavaScript."
  //
  Polyglot.prototype.t = function(key, options) {
    var phrase, result;
    options = options == null ? {} : options;
    // allow number as a pluralization shortcut
    if (typeof options === 'number') {
      options = {smart_count: options};
    }
    if (typeof this.phrases[key] === 'string') {
      phrase = this.phrases[key];
    } else if (typeof options._ === 'string') {
      phrase = options._;
    } else if (this.allowMissing) {
      phrase = key;
    } else {
      this.warn('Missing translation for key: "'+key+'"');
      result = key;
    }
    if (typeof phrase === 'string') {
      options = clone(options);
      result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
      result = interpolate(result, options);
    }
    return result;
  };


  // ### polyglot.has(key)
  //
  // Check if polyglot has a translation for given key
  Polyglot.prototype.has = function(key) {
    return key in this.phrases;
  };


  // #### Pluralization methods
  // The string that separates the different phrase possibilities.
  var delimeter = '||||';

  // Mapping from pluralization group plural logic.
  var pluralTypes = {
    chinese:   function(n) { return 0; },
    german:    function(n) { return n !== 1 ? 1 : 0; },
    french:    function(n) { return n > 1 ? 1 : 0; },
    russian:   function(n) { return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2; },
    czech:     function(n) { return (n === 1) ? 0 : (n >= 2 && n <= 4) ? 1 : 2; },
    polish:    function(n) { return (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2); },
    icelandic: function(n) { return (n % 10 !== 1 || n % 100 === 11) ? 1 : 0; }
  };

  // Mapping from pluralization group to individual locales.
  var pluralTypeToLanguages = {
    chinese:   ['fa', 'id', 'ja', 'ko', 'lo', 'ms', 'th', 'tr', 'zh'],
    german:    ['da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hu', 'it', 'nl', 'no', 'pt', 'sv'],
    french:    ['fr', 'tl', 'pt-br'],
    russian:   ['hr', 'ru'],
    czech:     ['cs'],
    polish:    ['pl'],
    icelandic: ['is']
  };

  function langToTypeMap(mapping) {
    var type, langs, l, ret = {};
    for (type in mapping) {
      if (mapping.hasOwnProperty(type)) {
        langs = mapping[type];
        for (l in langs) {
          ret[langs[l]] = type;
        }
      }
    }
    return ret;
  }

  // Trim a string.
  function trim(str){
    var trimRe = /^\s+|\s+$/g;
    return str.replace(trimRe, '');
  }

  // Based on a phrase text that contains `n` plural forms separated
  // by `delimeter`, a `locale`, and a `count`, choose the correct
  // plural form, or none if `count` is `null`.
  function choosePluralForm(text, locale, count){
    var ret, texts, chosenText;
    if (count != null && text) {
      texts = text.split(delimeter);
      chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
      ret = trim(chosenText);
    } else {
      ret = text;
    }
    return ret;
  }

  function pluralTypeName(locale) {
    var langToPluralType = langToTypeMap(pluralTypeToLanguages);
    return langToPluralType[locale] || langToPluralType.en;
  }

  function pluralTypeIndex(locale, count) {
    return pluralTypes[pluralTypeName(locale)](count);
  }

  // ### interpolate
  //
  // Does the dirty work. Creates a `RegExp` object for each
  // interpolation placeholder.
  function interpolate(phrase, options) {
    for (var arg in options) {
      if (arg !== '_' && options.hasOwnProperty(arg)) {
        // We create a new `RegExp` each time instead of using a more-efficient
        // string replace so that the same argument can be replaced multiple times
        // in the same phrase.
        phrase = phrase.replace(new RegExp('%\\{'+arg+'\\}', 'g'), options[arg]);
      }
    }
    return phrase;
  }

  // ### warn
  //
  // Provides a warning in the console if a phrase key is missing.
  function warn(message) {
    root.console && root.console.warn && root.console.warn('WARNING: ' + message);
  }

  // ### clone
  //
  // Clone an object.
  function clone(source) {
    var ret = {};
    for (var prop in source) {
      ret[prop] = source[prop];
    }
    return ret;
  }

  return Polyglot;
}));

},{}],305:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"./src/basics/helpers":428,"dup":45}],306:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"./src/basics":429,"./src/basics/helpers":428,"./src/data":435,"./src/document":458,"./src/operator":493,"./src/surface":502,"dup":46}],307:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],308:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"../internal/baseCallback":333,"dup":48}],309:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],310:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"../internal/baseIndexOf":347,"../internal/cacheIndexOf":364,"../internal/createCache":372,"../lang/isArguments":403,"../lang/isArray":404,"dup":50}],311:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],312:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"../internal/baseFlatten":343,"../internal/baseUniq":360,"dup":52}],313:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"../internal/baseCallback":333,"../internal/baseUniq":360,"../internal/isIterateeCall":387,"../internal/sortedUniq":399,"dup":53}],314:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"../internal/baseDifference":339,"../internal/baseSlice":357,"dup":54}],315:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"../internal/arrayFilter":330,"../internal/baseCallback":333,"../internal/baseFilter":341,"../lang/isArray":404,"dup":55}],316:[function(require,module,exports){
arguments[4][56][0].apply(exports,arguments)
},{"../array/findIndex":308,"../internal/baseCallback":333,"../internal/baseEach":340,"../internal/baseFind":342,"../lang/isArray":404,"dup":56}],317:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"../internal/arrayEach":329,"../internal/baseEach":340,"../internal/bindCallback":362,"../lang/isArray":404,"dup":57}],318:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"../internal/baseIndexOf":347,"../internal/isLength":388,"../lang/isArray":404,"../lang/isString":412,"../object/values":419,"dup":58}],319:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"../internal/createAggregator":369,"dup":59}],320:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"../internal/arrayMap":331,"../internal/baseCallback":333,"../internal/baseMap":352,"../lang/isArray":404,"dup":60}],321:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"../internal/baseProperty":355,"./map":320,"dup":61}],322:[function(require,module,exports){
arguments[4][62][0].apply(exports,arguments)
},{"../internal/baseCallback":333,"../internal/baseEach":340,"../internal/baseSortBy":358,"../internal/compareAscending":366,"../internal/isIterateeCall":387,"../internal/isLength":388,"dup":62}],323:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"../lang/isNative":409,"dup":63}],324:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"../internal/baseSlice":357,"../internal/createWrapper":376,"../internal/replaceHolders":396,"dup":64}],325:[function(require,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"../date/now":323,"../lang/isObject":411,"dup":65}],326:[function(require,module,exports){
arguments[4][66][0].apply(exports,arguments)
},{"../internal/baseDelay":338,"dup":66}],327:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"../lang/isNative":409,"./cachePush":365,"dup":67}],328:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"dup":68}],329:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"dup":69}],330:[function(require,module,exports){
arguments[4][70][0].apply(exports,arguments)
},{"dup":70}],331:[function(require,module,exports){
arguments[4][71][0].apply(exports,arguments)
},{"dup":71}],332:[function(require,module,exports){
arguments[4][72][0].apply(exports,arguments)
},{"../object/keys":416,"./baseCopy":336,"dup":72}],333:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"../utility/identity":423,"./baseMatches":353,"./baseMatchesProperty":354,"./baseProperty":355,"./bindCallback":362,"./isBindable":385,"dup":73}],334:[function(require,module,exports){
arguments[4][74][0].apply(exports,arguments)
},{"../lang/isArray":404,"../lang/isObject":411,"../object/keys":416,"./arrayCopy":328,"./arrayEach":329,"./baseCopy":336,"./baseForOwn":346,"./initCloneArray":382,"./initCloneByTag":383,"./initCloneObject":384,"dup":74}],335:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"dup":75}],336:[function(require,module,exports){
arguments[4][76][0].apply(exports,arguments)
},{"dup":76}],337:[function(require,module,exports){
arguments[4][77][0].apply(exports,arguments)
},{"../lang/isObject":411,"dup":77}],338:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"./baseSlice":357,"dup":78}],339:[function(require,module,exports){
arguments[4][79][0].apply(exports,arguments)
},{"./baseIndexOf":347,"./cacheIndexOf":364,"./createCache":372,"dup":79}],340:[function(require,module,exports){
arguments[4][80][0].apply(exports,arguments)
},{"./baseForOwn":346,"./isLength":388,"./toObject":400,"dup":80}],341:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"./baseEach":340,"dup":81}],342:[function(require,module,exports){
arguments[4][82][0].apply(exports,arguments)
},{"dup":82}],343:[function(require,module,exports){
arguments[4][83][0].apply(exports,arguments)
},{"../lang/isArguments":403,"../lang/isArray":404,"./isLength":388,"./isObjectLike":389,"dup":83}],344:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"./toObject":400,"dup":84}],345:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"../object/keysIn":417,"./baseFor":344,"dup":85}],346:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"../object/keys":416,"./baseFor":344,"dup":86}],347:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"./indexOfNaN":381,"dup":87}],348:[function(require,module,exports){
arguments[4][88][0].apply(exports,arguments)
},{"./baseIsEqualDeep":349,"dup":88}],349:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"../lang/isArray":404,"../lang/isTypedArray":413,"./equalArrays":377,"./equalByTag":378,"./equalObjects":379,"dup":89}],350:[function(require,module,exports){
arguments[4][90][0].apply(exports,arguments)
},{"dup":90}],351:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"./baseIsEqual":348,"dup":91}],352:[function(require,module,exports){
arguments[4][92][0].apply(exports,arguments)
},{"./baseEach":340,"dup":92}],353:[function(require,module,exports){
arguments[4][93][0].apply(exports,arguments)
},{"../object/keys":416,"./baseIsMatch":351,"./isStrictComparable":390,"dup":93}],354:[function(require,module,exports){
arguments[4][94][0].apply(exports,arguments)
},{"./baseIsEqual":348,"./isStrictComparable":390,"dup":94}],355:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"dup":95}],356:[function(require,module,exports){
arguments[4][96][0].apply(exports,arguments)
},{"../utility/identity":423,"./metaMap":392,"dup":96}],357:[function(require,module,exports){
arguments[4][97][0].apply(exports,arguments)
},{"dup":97}],358:[function(require,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"dup":98}],359:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"dup":99}],360:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"./baseIndexOf":347,"./cacheIndexOf":364,"./createCache":372,"dup":100}],361:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"dup":101}],362:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"../utility/identity":423,"dup":102}],363:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"../lang/isNative":409,"../utility/constant":422,"dup":103}],364:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"../lang/isObject":411,"dup":104}],365:[function(require,module,exports){
arguments[4][105][0].apply(exports,arguments)
},{"../lang/isObject":411,"dup":105}],366:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"./baseCompareAscending":335,"dup":106}],367:[function(require,module,exports){
arguments[4][107][0].apply(exports,arguments)
},{"dup":107}],368:[function(require,module,exports){
arguments[4][108][0].apply(exports,arguments)
},{"dup":108}],369:[function(require,module,exports){
arguments[4][109][0].apply(exports,arguments)
},{"../lang/isArray":404,"./baseCallback":333,"./baseEach":340,"dup":109}],370:[function(require,module,exports){
arguments[4][110][0].apply(exports,arguments)
},{"./bindCallback":362,"./isIterateeCall":387,"dup":110}],371:[function(require,module,exports){
arguments[4][111][0].apply(exports,arguments)
},{"./createCtorWrapper":373,"dup":111}],372:[function(require,module,exports){
arguments[4][112][0].apply(exports,arguments)
},{"../lang/isNative":409,"../utility/constant":422,"./SetCache":327,"dup":112}],373:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"../lang/isObject":411,"./baseCreate":337,"dup":113}],374:[function(require,module,exports){
arguments[4][114][0].apply(exports,arguments)
},{"./arrayCopy":328,"./composeArgs":367,"./composeArgsRight":368,"./createCtorWrapper":373,"./reorder":395,"./replaceHolders":396,"dup":114}],375:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"./createCtorWrapper":373,"dup":115}],376:[function(require,module,exports){
arguments[4][116][0].apply(exports,arguments)
},{"./baseSetData":356,"./createBindWrapper":371,"./createHybridWrapper":374,"./createPartialWrapper":375,"./getData":380,"./mergeData":391,"./setData":397,"dup":116}],377:[function(require,module,exports){
arguments[4][117][0].apply(exports,arguments)
},{"dup":117}],378:[function(require,module,exports){
arguments[4][118][0].apply(exports,arguments)
},{"dup":118}],379:[function(require,module,exports){
arguments[4][119][0].apply(exports,arguments)
},{"../object/keys":416,"dup":119}],380:[function(require,module,exports){
arguments[4][120][0].apply(exports,arguments)
},{"../utility/noop":424,"./metaMap":392,"dup":120}],381:[function(require,module,exports){
arguments[4][121][0].apply(exports,arguments)
},{"dup":121}],382:[function(require,module,exports){
arguments[4][122][0].apply(exports,arguments)
},{"dup":122}],383:[function(require,module,exports){
arguments[4][123][0].apply(exports,arguments)
},{"./bufferClone":363,"dup":123}],384:[function(require,module,exports){
arguments[4][124][0].apply(exports,arguments)
},{"dup":124}],385:[function(require,module,exports){
arguments[4][125][0].apply(exports,arguments)
},{"../lang/isNative":409,"../support":421,"./baseSetData":356,"dup":125}],386:[function(require,module,exports){
arguments[4][126][0].apply(exports,arguments)
},{"dup":126}],387:[function(require,module,exports){
arguments[4][127][0].apply(exports,arguments)
},{"../lang/isObject":411,"./isIndex":386,"./isLength":388,"dup":127}],388:[function(require,module,exports){
arguments[4][128][0].apply(exports,arguments)
},{"dup":128}],389:[function(require,module,exports){
arguments[4][129][0].apply(exports,arguments)
},{"dup":129}],390:[function(require,module,exports){
arguments[4][130][0].apply(exports,arguments)
},{"../lang/isObject":411,"dup":130}],391:[function(require,module,exports){
arguments[4][131][0].apply(exports,arguments)
},{"./arrayCopy":328,"./composeArgs":367,"./composeArgsRight":368,"./replaceHolders":396,"dup":131}],392:[function(require,module,exports){
arguments[4][132][0].apply(exports,arguments)
},{"../lang/isNative":409,"dup":132}],393:[function(require,module,exports){
arguments[4][133][0].apply(exports,arguments)
},{"./toObject":400,"dup":133}],394:[function(require,module,exports){
arguments[4][134][0].apply(exports,arguments)
},{"./baseForIn":345,"dup":134}],395:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"./arrayCopy":328,"./isIndex":386,"dup":135}],396:[function(require,module,exports){
arguments[4][136][0].apply(exports,arguments)
},{"dup":136}],397:[function(require,module,exports){
arguments[4][137][0].apply(exports,arguments)
},{"../date/now":323,"./baseSetData":356,"dup":137}],398:[function(require,module,exports){
arguments[4][138][0].apply(exports,arguments)
},{"../lang/isArguments":403,"../lang/isArray":404,"../object/keysIn":417,"../support":421,"./isIndex":386,"./isLength":388,"dup":138}],399:[function(require,module,exports){
arguments[4][139][0].apply(exports,arguments)
},{"dup":139}],400:[function(require,module,exports){
arguments[4][140][0].apply(exports,arguments)
},{"../lang/isObject":411,"dup":140}],401:[function(require,module,exports){
arguments[4][141][0].apply(exports,arguments)
},{"../internal/baseClone":334,"../internal/bindCallback":362,"../internal/isIterateeCall":387,"dup":141}],402:[function(require,module,exports){
arguments[4][142][0].apply(exports,arguments)
},{"../internal/baseClone":334,"../internal/bindCallback":362,"dup":142}],403:[function(require,module,exports){
arguments[4][143][0].apply(exports,arguments)
},{"../internal/isLength":388,"../internal/isObjectLike":389,"dup":143}],404:[function(require,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"../internal/isLength":388,"../internal/isObjectLike":389,"./isNative":409,"dup":144}],405:[function(require,module,exports){
arguments[4][145][0].apply(exports,arguments)
},{"../internal/isObjectLike":389,"dup":145}],406:[function(require,module,exports){
arguments[4][146][0].apply(exports,arguments)
},{"../internal/isLength":388,"../internal/isObjectLike":389,"../object/keys":416,"./isArguments":403,"./isArray":404,"./isFunction":408,"./isString":412,"dup":146}],407:[function(require,module,exports){
arguments[4][147][0].apply(exports,arguments)
},{"../internal/baseIsEqual":348,"../internal/bindCallback":362,"../internal/isStrictComparable":390,"dup":147}],408:[function(require,module,exports){
arguments[4][148][0].apply(exports,arguments)
},{"../internal/baseIsFunction":350,"./isNative":409,"dup":148}],409:[function(require,module,exports){
arguments[4][149][0].apply(exports,arguments)
},{"../internal/isObjectLike":389,"../string/escapeRegExp":420,"dup":149}],410:[function(require,module,exports){
arguments[4][150][0].apply(exports,arguments)
},{"../internal/isObjectLike":389,"dup":150}],411:[function(require,module,exports){
arguments[4][151][0].apply(exports,arguments)
},{"dup":151}],412:[function(require,module,exports){
arguments[4][152][0].apply(exports,arguments)
},{"../internal/isObjectLike":389,"dup":152}],413:[function(require,module,exports){
arguments[4][153][0].apply(exports,arguments)
},{"../internal/isLength":388,"../internal/isObjectLike":389,"dup":153}],414:[function(require,module,exports){
arguments[4][154][0].apply(exports,arguments)
},{"../internal/baseAssign":332,"../internal/createAssigner":370,"dup":154}],415:[function(require,module,exports){
arguments[4][155][0].apply(exports,arguments)
},{"./assign":414,"dup":155}],416:[function(require,module,exports){
arguments[4][156][0].apply(exports,arguments)
},{"../internal/isLength":388,"../internal/shimKeys":398,"../lang/isNative":409,"../lang/isObject":411,"dup":156}],417:[function(require,module,exports){
arguments[4][157][0].apply(exports,arguments)
},{"../internal/isIndex":386,"../internal/isLength":388,"../lang/isArguments":403,"../lang/isArray":404,"../lang/isObject":411,"../support":421,"dup":157}],418:[function(require,module,exports){
arguments[4][158][0].apply(exports,arguments)
},{"../internal/arrayMap":331,"../internal/baseDifference":339,"../internal/baseFlatten":343,"../internal/bindCallback":362,"../internal/pickByArray":393,"../internal/pickByCallback":394,"./keysIn":417,"dup":158}],419:[function(require,module,exports){
arguments[4][159][0].apply(exports,arguments)
},{"../internal/baseValues":361,"./keys":416,"dup":159}],420:[function(require,module,exports){
arguments[4][160][0].apply(exports,arguments)
},{"../internal/baseToString":359,"dup":160}],421:[function(require,module,exports){
arguments[4][161][0].apply(exports,arguments)
},{"./lang/isNative":409,"dup":161}],422:[function(require,module,exports){
arguments[4][162][0].apply(exports,arguments)
},{"dup":162}],423:[function(require,module,exports){
arguments[4][163][0].apply(exports,arguments)
},{"dup":163}],424:[function(require,module,exports){
arguments[4][164][0].apply(exports,arguments)
},{"dup":164}],425:[function(require,module,exports){
arguments[4][165][0].apply(exports,arguments)
},{"./oo":430,"dup":165}],426:[function(require,module,exports){
arguments[4][166][0].apply(exports,arguments)
},{"./oo":430,"dup":166}],427:[function(require,module,exports){
arguments[4][167][0].apply(exports,arguments)
},{"./oo":430,"./registry":432,"dup":167}],428:[function(require,module,exports){
arguments[4][168][0].apply(exports,arguments)
},{"dup":168,"lodash/array/compact":307,"lodash/array/first":309,"lodash/array/intersection":310,"lodash/array/last":311,"lodash/array/union":312,"lodash/array/uniq":313,"lodash/array/without":314,"lodash/collection/filter":315,"lodash/collection/find":316,"lodash/collection/forEach":317,"lodash/collection/includes":318,"lodash/collection/indexBy":319,"lodash/collection/map":320,"lodash/collection/pluck":321,"lodash/collection/sortBy":322,"lodash/function/bind":324,"lodash/function/debounce":325,"lodash/function/delay":326,"lodash/lang/clone":401,"lodash/lang/cloneDeep":402,"lodash/lang/isArray":404,"lodash/lang/isBoolean":405,"lodash/lang/isEmpty":406,"lodash/lang/isEqual":407,"lodash/lang/isFunction":408,"lodash/lang/isNumber":410,"lodash/lang/isObject":411,"lodash/lang/isString":412,"lodash/object/extend":415,"lodash/object/omit":418}],429:[function(require,module,exports){
arguments[4][169][0].apply(exports,arguments)
},{"./error":425,"./event_emitter":426,"./factory":427,"./helpers":428,"./oo":430,"./path_adapter":431,"./registry":432,"dup":169}],430:[function(require,module,exports){
arguments[4][170][0].apply(exports,arguments)
},{"./helpers":428,"dup":170}],431:[function(require,module,exports){
arguments[4][171][0].apply(exports,arguments)
},{"./helpers":428,"./oo":430,"dup":171}],432:[function(require,module,exports){
arguments[4][172][0].apply(exports,arguments)
},{"./oo":430,"dup":172}],433:[function(require,module,exports){
arguments[4][173][0].apply(exports,arguments)
},{"../basics":429,"../basics/helpers":428,"dup":173}],434:[function(require,module,exports){
arguments[4][174][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"../operator":493,"./data":433,"dup":174}],435:[function(require,module,exports){
arguments[4][175][0].apply(exports,arguments)
},{"./data":433,"./incremental_data":434,"./node":436,"./node_index":438,"./schema":439,"dup":175}],436:[function(require,module,exports){
arguments[4][176][0].apply(exports,arguments)
},{"../basics":429,"dup":176}],437:[function(require,module,exports){
arguments[4][177][0].apply(exports,arguments)
},{"../basics":429,"./node":436,"dup":177}],438:[function(require,module,exports){
arguments[4][178][0].apply(exports,arguments)
},{"../basics":429,"dup":178}],439:[function(require,module,exports){
arguments[4][179][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"./node":436,"./node_factory":437,"dup":179}],440:[function(require,module,exports){
arguments[4][180][0].apply(exports,arguments)
},{"../basics":429,"../basics/helpers":428,"../data":435,"./container_selection":451,"./property_selection":474,"./selection":476,"./table_selection":477,"dup":180}],441:[function(require,module,exports){
arguments[4][181][0].apply(exports,arguments)
},{"../basics":429,"../data":435,"./container_annotation":449,"dup":181}],442:[function(require,module,exports){
arguments[4][182][0].apply(exports,arguments)
},{"../basics":429,"./node":459,"./selection":476,"dup":182}],443:[function(require,module,exports){
arguments[4][183][0].apply(exports,arguments)
},{"../basics":429,"../data":435,"./annotation":442,"dup":183}],444:[function(require,module,exports){
arguments[4][184][0].apply(exports,arguments)
},{"../basics/helpers":428,"dup":184}],445:[function(require,module,exports){
arguments[4][185][0].apply(exports,arguments)
},{"../basics":429,"dup":185}],446:[function(require,module,exports){
arguments[4][186][0].apply(exports,arguments)
},{"../basics/oo":430,"./clipboard_importer":447,"./html_exporter":456,"dup":186}],447:[function(require,module,exports){
arguments[4][187][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"./html_importer":457,"./transformations/copy_selection":481,"dup":187}],448:[function(require,module,exports){
arguments[4][188][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"../basics/path_adapter":431,"./container_annotation":449,"./node":459,"dup":188}],449:[function(require,module,exports){
arguments[4][189][0].apply(exports,arguments)
},{"../basics":429,"./node":459,"./selection":476,"dup":189}],450:[function(require,module,exports){
arguments[4][190][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"../basics/path_adapter":431,"../data":435,"./container_annotation":449,"dup":190}],451:[function(require,module,exports){
arguments[4][191][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"./coordinate":452,"./property_selection":474,"./range":475,"./selection":476,"dup":191}],452:[function(require,module,exports){
arguments[4][192][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"dup":192}],453:[function(require,module,exports){
arguments[4][193][0].apply(exports,arguments)
},{"../basics":429,"../basics/helpers":428,"../data":435,"./abstract_document":440,"./anchor_index":441,"./annotation_index":443,"./clipboard_exporter":446,"./clipboard_importer":447,"./container_annotation_index":450,"./document_change":454,"./path_event_proxy":473,"./transaction_document":479,"dup":193}],454:[function(require,module,exports){
arguments[4][194][0].apply(exports,arguments)
},{"../basics":429,"dup":194}],455:[function(require,module,exports){
arguments[4][195][0].apply(exports,arguments)
},{"../basics":429,"../data":435,"./annotation":442,"./container":448,"./container_annotation":449,"./node":459,"./text_node":478,"dup":195}],456:[function(require,module,exports){
arguments[4][196][0].apply(exports,arguments)
},{"../basics":429,"./annotator":445,"dup":196}],457:[function(require,module,exports){
arguments[4][197][0].apply(exports,arguments)
},{"../basics":429,"dup":197}],458:[function(require,module,exports){
arguments[4][198][0].apply(exports,arguments)
},{"./annotation":442,"./annotation_updates":444,"./annotator":445,"./clipboard_exporter":446,"./clipboard_importer":447,"./container":448,"./container_annotation":449,"./container_selection":451,"./coordinate":452,"./document":453,"./document_schema":455,"./html_exporter":456,"./html_importer":457,"./node":459,"./nodes/emphasis":460,"./nodes/heading":461,"./nodes/include":462,"./nodes/link":463,"./nodes/list":464,"./nodes/list_item":465,"./nodes/paragraph":466,"./nodes/strong":467,"./nodes/table":468,"./nodes/table_cell":469,"./nodes/table_row":471,"./nodes/table_section":472,"./property_selection":474,"./range":475,"./selection":476,"./table_selection":477,"./text_node":478,"./transformations":485,"dup":198}],459:[function(require,module,exports){
arguments[4][199][0].apply(exports,arguments)
},{"../basics":429,"../data":435,"dup":199}],460:[function(require,module,exports){
arguments[4][200][0].apply(exports,arguments)
},{"../annotation":442,"dup":200}],461:[function(require,module,exports){
arguments[4][201][0].apply(exports,arguments)
},{"../text_node":478,"dup":201}],462:[function(require,module,exports){
arguments[4][202][0].apply(exports,arguments)
},{"../node":459,"dup":202}],463:[function(require,module,exports){
arguments[4][203][0].apply(exports,arguments)
},{"../annotation":442,"dup":203}],464:[function(require,module,exports){
arguments[4][204][0].apply(exports,arguments)
},{"../../basics/helpers":428,"../node":459,"dup":204}],465:[function(require,module,exports){
arguments[4][205][0].apply(exports,arguments)
},{"../node":459,"dup":205}],466:[function(require,module,exports){
arguments[4][206][0].apply(exports,arguments)
},{"../text_node":478,"dup":206}],467:[function(require,module,exports){
arguments[4][207][0].apply(exports,arguments)
},{"../annotation":442,"dup":207}],468:[function(require,module,exports){
arguments[4][208][0].apply(exports,arguments)
},{"../../basics/helpers":428,"../../basics/oo":430,"../node":459,"./table_matrix":470,"dup":208}],469:[function(require,module,exports){
arguments[4][209][0].apply(exports,arguments)
},{"../node":459,"dup":209}],470:[function(require,module,exports){
arguments[4][210][0].apply(exports,arguments)
},{"../../basics/oo":430,"dup":210}],471:[function(require,module,exports){
arguments[4][211][0].apply(exports,arguments)
},{"../../basics/helpers":428,"../node":459,"dup":211}],472:[function(require,module,exports){
arguments[4][212][0].apply(exports,arguments)
},{"../../basics/helpers":428,"../node":459,"dup":212}],473:[function(require,module,exports){
arguments[4][213][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"../basics/path_adapter":431,"dup":213}],474:[function(require,module,exports){
arguments[4][214][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"./coordinate":452,"./range":475,"./selection":476,"dup":214}],475:[function(require,module,exports){
arguments[4][215][0].apply(exports,arguments)
},{"../basics":429,"dup":215}],476:[function(require,module,exports){
arguments[4][216][0].apply(exports,arguments)
},{"../basics":429,"dup":216}],477:[function(require,module,exports){
arguments[4][217][0].apply(exports,arguments)
},{"../basics":429,"../basics/helpers":428,"./selection":476,"dup":217}],478:[function(require,module,exports){
arguments[4][218][0].apply(exports,arguments)
},{"./node":459,"dup":218}],479:[function(require,module,exports){
arguments[4][219][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"./abstract_document":440,"dup":219}],480:[function(require,module,exports){
arguments[4][220][0].apply(exports,arguments)
},{"../../basics":429,"../annotation_updates":444,"./delete_selection":484,"dup":220}],481:[function(require,module,exports){
arguments[4][221][0].apply(exports,arguments)
},{"../../basics/helpers":428,"../annotation_updates":444,"dup":221}],482:[function(require,module,exports){
arguments[4][222][0].apply(exports,arguments)
},{"../annotation_updates":444,"./merge":488,"dup":222}],483:[function(require,module,exports){
arguments[4][223][0].apply(exports,arguments)
},{"../../basics/helpers":428,"dup":223}],484:[function(require,module,exports){
arguments[4][224][0].apply(exports,arguments)
},{"../../basics/helpers":428,"../annotation_updates":444,"./delete_character":482,"./delete_node":483,"./merge":488,"dup":224}],485:[function(require,module,exports){
arguments[4][225][0].apply(exports,arguments)
},{"./break_node":480,"./copy_selection":481,"./delete_character":482,"./delete_node":483,"./delete_selection":484,"./insert_node":486,"./insert_text":487,"./merge":488,"./paste":489,"./switch_text_type":490,"dup":225}],486:[function(require,module,exports){
arguments[4][226][0].apply(exports,arguments)
},{"./break_node":480,"./delete_selection":484,"dup":226}],487:[function(require,module,exports){
arguments[4][227][0].apply(exports,arguments)
},{"../annotation_updates":444,"./delete_selection":484,"dup":227}],488:[function(require,module,exports){
arguments[4][228][0].apply(exports,arguments)
},{"../annotation_updates":444,"dup":228}],489:[function(require,module,exports){
arguments[4][229][0].apply(exports,arguments)
},{"../../basics/helpers":428,"../annotation_updates":444,"./break_node":480,"./copy_selection":481,"./delete_selection":484,"./insert_text":487,"dup":229}],490:[function(require,module,exports){
arguments[4][230][0].apply(exports,arguments)
},{"../../basics/helpers":428,"../annotation_updates":444,"./delete_node":483,"dup":230}],491:[function(require,module,exports){
arguments[4][231][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"./conflict":492,"./operation":495,"dup":231}],492:[function(require,module,exports){
arguments[4][232][0].apply(exports,arguments)
},{"dup":232}],493:[function(require,module,exports){
arguments[4][233][0].apply(exports,arguments)
},{"./array_operation":491,"./object_operation":494,"./operation":495,"./text_operation":496,"dup":233}],494:[function(require,module,exports){
arguments[4][234][0].apply(exports,arguments)
},{"../basics":429,"../basics/helpers":428,"../basics/oo":430,"./array_operation":491,"./conflict":492,"./operation":495,"./text_operation":496,"dup":234}],495:[function(require,module,exports){
arguments[4][235][0].apply(exports,arguments)
},{"../basics":429,"dup":235}],496:[function(require,module,exports){
arguments[4][236][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"./conflict":492,"./operation":495,"dup":236}],497:[function(require,module,exports){
arguments[4][237][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"./tool":510,"dup":237}],498:[function(require,module,exports){
arguments[4][238][0].apply(exports,arguments)
},{"./node_view":503,"dup":238}],499:[function(require,module,exports){
arguments[4][239][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"dup":239}],500:[function(require,module,exports){
arguments[4][240][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"../document":458,"./form_editor":501,"dup":240}],501:[function(require,module,exports){
arguments[4][241][0].apply(exports,arguments)
},{"../basics":429,"../document":458,"dup":241}],502:[function(require,module,exports){
arguments[4][242][0].apply(exports,arguments)
},{"./annotation_tool":497,"./annotation_view":498,"./clipboard":499,"./container_editor":500,"./form_editor":501,"./node_view":503,"./panel":504,"./surface":505,"./surface_manager":506,"./surface_selection":507,"./switch_type_tool":508,"./text_property":509,"./tool":510,"./tool_registry":511,"./tools":515,"dup":242}],503:[function(require,module,exports){
arguments[4][243][0].apply(exports,arguments)
},{"../basics":429,"dup":243}],504:[function(require,module,exports){
arguments[4][244][0].apply(exports,arguments)
},{"../basics":429,"dup":244}],505:[function(require,module,exports){
arguments[4][245][0].apply(exports,arguments)
},{"../basics":429,"../basics/helpers":428,"../basics/oo":430,"../document":458,"./surface_selection":507,"dup":245}],506:[function(require,module,exports){
arguments[4][246][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"./surface":505,"dup":246}],507:[function(require,module,exports){
arguments[4][247][0].apply(exports,arguments)
},{"../basics/helpers":428,"../basics/oo":430,"../document":458,"dup":247}],508:[function(require,module,exports){
arguments[4][248][0].apply(exports,arguments)
},{"../basics":429,"./tool":510,"dup":248}],509:[function(require,module,exports){
arguments[4][249][0].apply(exports,arguments)
},{"../basics":429,"../document":458,"./annotation_view":498,"./node_view":503,"dup":249}],510:[function(require,module,exports){
arguments[4][250][0].apply(exports,arguments)
},{"../basics":429,"dup":250}],511:[function(require,module,exports){
arguments[4][251][0].apply(exports,arguments)
},{"../basics":429,"dup":251}],512:[function(require,module,exports){
arguments[4][252][0].apply(exports,arguments)
},{"../tool":510,"dup":252}],513:[function(require,module,exports){
arguments[4][253][0].apply(exports,arguments)
},{"../tool":510,"dup":253}],514:[function(require,module,exports){
arguments[4][254][0].apply(exports,arguments)
},{"../annotation_tool":497,"dup":254}],515:[function(require,module,exports){
arguments[4][255][0].apply(exports,arguments)
},{"./delete_columns":512,"./delete_rows":513,"./emphasis_tool":514,"./insert_columns":516,"./insert_rows":517,"./link_tool":518,"./redo_tool":519,"./strong_tool":520,"./switch_text_type_tool":521,"./undo_tool":522,"dup":255}],516:[function(require,module,exports){
arguments[4][256][0].apply(exports,arguments)
},{"../tool":510,"dup":256}],517:[function(require,module,exports){
arguments[4][257][0].apply(exports,arguments)
},{"../tool":510,"dup":257}],518:[function(require,module,exports){
arguments[4][258][0].apply(exports,arguments)
},{"../annotation_tool":497,"dup":258}],519:[function(require,module,exports){
arguments[4][259][0].apply(exports,arguments)
},{"../tool":510,"dup":259}],520:[function(require,module,exports){
arguments[4][260][0].apply(exports,arguments)
},{"../annotation_tool":497,"dup":260}],521:[function(require,module,exports){
arguments[4][261][0].apply(exports,arguments)
},{"../tool":510,"dup":261}],522:[function(require,module,exports){
arguments[4][262][0].apply(exports,arguments)
},{"../tool":510,"dup":262}],523:[function(require,module,exports){
'use strict';

// i18n
require('./i18n/load');

// Substance Journal
// ---------------
//
// Main entry point of the Substance Journal web client

var _ = require('substance/helpers');
var $$ = React.createElement;

// Specify a backend
// ---------------
//

var Backend = require('./backend');
var backend = new Backend();

// Specify a notification service
// ---------------
//
// This is used for user notifications, displayed in the status bar

var NotificationService = require('./notification_service');
var notifications = new NotificationService();

// React Components
// ---------------
//

// Available contexts
var ArchivistWriter = require('archivist-writer');

// Top Level Application
// ---------------
//

var App = React.createClass({
  displayName: 'App',

  childContextTypes: {
    backend: React.PropTypes.object,
    notifications: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      backend: backend,
      notifications: notifications
    };
  },

  render: function render() {
    return $$(ArchivistWriter, {
      documentId: this.props.route
    });
  }
});

// Start the app

$(function () {
  React.render($$(App, {
    route: window.location.hash.slice(1)
  }), document.getElementById('container'));
});

},{"./backend":524,"./i18n/load":526,"./notification_service":527,"archivist-writer":16,"substance/helpers":305}],524:[function(require,module,exports){
"use strict";

var Substance = require("substance");
var Interview = require("archivist-interview");
var _ = require("substance/helpers");

var Backend = function Backend(opts) {
  this.cache = {
    "entities": {}
  };
};

Backend.Prototype = function () {

  // A generic request method
  // -------------------
  //
  // Deals with sending the authentication header, encoding etc.

  this._request = function (method, url, data, cb) {
    var ajaxOpts = {
      type: method,
      url: url,
      contentType: "application/json; charset=UTF-8",
      dataType: "json",
      success: function success(data) {
        cb(null, data);
      },
      error: function error(err) {
        console.error(err);
        cb(err.responseText);
      }
    };

    if (data) {
      ajaxOpts.data = JSON.stringify(data);
    }

    // Add Authorization header if there's an active session
    var session = localStorage.getItem("session");
    if (session) {
      var token = JSON.parse(session).token;
      ajaxOpts.beforeSend = function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      };
    }

    $.ajax(ajaxOpts);
  };

  // Initialize
  // ------------------

  this.initialize = function (cb) {
    // Restore last session
    var lastSession = localStorage.getItem("session");
    var lastToken;
    if (lastSession) {
      lastToken = lastSession.token;
    }

    this.verifyToken(lastSession, (function (err) {
      this.initialized = true;
      if (err) {
        this.destroySession();
        cb(null);
      } else {
        this.session = JSON.parse(lastSession);
        cb(null);
      }
    }).bind(this));
  };

  // Document
  // ------------------

  this.getDocument = function (documentId, cb) {
    var self = this;
    this._request("GET", "/api/documents/" + documentId, null, function (err, rawDoc) {
      if (err) return cb(err);
      var doc = new Interview.fromJson(rawDoc);
      self.fetchSubjects(function (err, subjectsData) {
        if (err) return cb(err);
        var subjects = new Interview.SubjectsModel(doc, subjectsData);
        doc.subjects = subjects;
        doc.version = rawDoc.__v;
        // We should not forget to remove this
        window.doc = doc;
        cb(null, doc);
      });
    });
  };

  this.saveDocument = function (doc, cb) {
    var self = this;

    var json = doc.toJSON();
    json.__v = doc.version;

    console.log("saving doc, current version is", doc.version);

    this._request("PUT", "/api/documents/" + doc.id, json, function (err, data) {
      if (err) return cb(err);

      // Remember new document version
      doc.version = data.documentVersion;
      console.log("new doc version", doc.version);

      // Check if subjectsDB changed
      var currentSubjectDBVersion = this.getSubjectDBVersion();
      var newSubjectDBVersion = data.subjectDBVersion;

      // Update the subjects cache if outdated
      if (self.cache.subjects && self.cache.subjectDBVersion !== newSubjectDBVersion) {
        self.fetchSubjects();
        cb(null);
      } else {
        cb(null);
      }
    });
  };

  // Entities
  // ------------------

  this.getEntity = function (entityId) {
    return this.cache.entities[entityId];
  };

  this.getEntities = function (entityIds, cb) {
    var self = this;

    var entitiesToFetch = [];
    var entities = [];

    entityIds = _.uniq(entityIds);

    // Try to use cached items
    _.each(entityIds, (function (entityId) {
      var entity = this.cache.entities[entityId];
      if (entity) {
        entities.push(entity);
      } else {
        entitiesToFetch.push(entityId);
      }
    }).bind(this));

    this.fetchEntities(entitiesToFetch, (function (err, fetchedEntities) {
      // Store in cache
      _.each(fetchedEntities, function (entity) {
        self.cache.entities[entity.id] = entity;
        entities.push(entity);
      }, self);
      cb(null, entities);
    }).bind(this));
  };

  this.fetchEntities = function (entityIds, cb) {
    if (entityIds.length === 0) return cb(null, []);
    console.log("Fetching entities", entityIds);

    var entities = {
      entityIds: entityIds
    };

    this._request("POST", "/api/entities", entities, function (err, res) {
      if (err) return cb(err);
      cb(null, res.results);
    });
  };

  // Outdated
  this.getSuggestedEntities = function (cb) {
    this._request("GET", "/api/search", null, function (err, entities) {
      if (err) return cb(err);
      cb(null, entities);
    });
  };

  this.searchEntities = function (searchStr, type, cb) {
    var queryUrl;

    if (type) {
      queryUrl = "/api/search?query=" + encodeURIComponent(searchStr) + "&type=" + encodeURIComponent(type);
    } else {
      queryUrl = "/api/search?query=" + encodeURIComponent(searchStr);
    }

    this._request("GET", queryUrl, null, function (err, entities) {
      if (err) return cb(err);
      cb(null, entities);
    });
  };

  // Subjects
  // ------------------

  this.fetchSubjects = function (cb) {
    var self = this;

    this._request("GET", "/api/subjects?page=1&sort_by=position&order=asc", null, function (err, subjectDB) {
      if (err) return cb(err);
      // Store in cache
      self.cache.subjectDB = subjectDB;
      cb(null, subjectDB.subjects);
    });
  };

  this.getSubjects = function (cb) {
    if (this.cache.subjectDB) {
      return cb(null, this.cache.subjectDB.subjects);
    } else {
      this.fetchSubjects(cb);
    }
  };

  this.getSubjectDBVersion = function () {
    return this.cache.subjectDB ? this.cache.subjectDB.subjectDBVersion : null;
  };
};

Substance.initClass(Backend);

module.exports = Backend;

},{"archivist-interview":1,"substance":306,"substance/helpers":305}],525:[function(require,module,exports){
module.exports={
  "menu.text_tool": "Update text",
  "menu.undo": "Undo",
  "menu.redo": "Redo",
  "menu.save": "Save",
  "menu.emphasis": "Emphasis",
  "menu.strong": "Strong",
  "menu.timecode": "Timecode",
  "menu.whitespace": "Whitespace cleaner",
  "menu.indentation": "Indentation cleaner",
  "menu.manage": "Manage",
  "menu.cite": "Cite",
  "menu.insert": "Insert",
  "insert_column_before": "Insert column before",
  "insert_column_after": "Insert column after",
  "insert_k_columns_before": "Insert %{smart_count} column before |||| Insert %{smart_count} columns before",
  "insert_k_columns_after": "Insert %{smart_count} column after |||| Insert %{smart_count} columns after",
  "delete_column": "Remove column",
  "delete_k_columns": "Remove %{smart_count} column |||| Remove %{smart_count} columns",
  "insert_row_above": "Insert row above",
  "insert_row_below": "Insert row below",
  "insert_k_rows_above": "Insert %{smart_count} row above |||| Insert %{smart_count} rows above",
  "insert_k_rows_below": "Insert %{smart_count} row below |||| Insert %{smart_count} rows below",
  "delete_row": "Remove row",
  "delete_k_rows": "Remove %{smart_count} row |||| Remove %{smart_count} rows",
  "bibitem": "Reference",
  "bibitems": "References",
  "figure": "Figure",
  "figures": "Figures",
  "heading": "Heading",
  "heading1": "Heading 1",
  "heading2": "Heading 2",
  "heading3": "Heading 3",
  "heading4": "Heading 4",
  "heading5": "Heading 5",
  "caption": "Caption",
  "export": "Export XML",
  "title": "Title",
  "no_selection": "No Selection",
  "paragraph": "Paragraph",
  "table": "Table",
  "tables": "Tables"
}

},{}],526:[function(require,module,exports){
(function (global){
'use strict';

var Polyglot = require('node-polyglot');
var defaultPhrases = require('./en.json');
// Note: we use the HTML5 LocalStorage to store phrases which are defined in
// the according locale files in this directory
// To switch the language use `i18n.switchLocale('de')` and reload the page.
var storage = window.storage || window.localStorage;
var locale = storage.getItem('locale') || 'en';
var phrases = JSON.parse(storage.getItem('phrases'));
if (locale === 'en' || !phrases) {
  phrases = defaultPhrases;
}
var i18n = new Polyglot({ locale: locale, phrases: phrases });
// Switch the loc
// i18n.switchLocale = function(locale) {
//   $.ajax("/i18n/"+locale+".json", {
//   }).done(function(phrases) {
//     storage.setItem('phrases', JSON.stringify(phrases));
//     storage.setItem('locale', locale);
//     i18n.extend(phrases);
//   }).error(function(xhr, status, error) {
//     console.error(error);
//   });
// };
global.i18n = i18n;
// always load this so that we have the latest locale in storage next time.
// i18n.switchLocale(locale);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./en.json":525,"node-polyglot":303}],527:[function(require,module,exports){
"use strict";

var Substance = require("substance");

// Notification service
// ----------------
//

var NotificationService = function NotificationService() {
  NotificationService["super"].call(this);
  this.messages = [];
};

NotificationService.Prototype = function () {

  this.addMessage = function (msg) {
    this.messages.push(msg);
    this.emit("messages:updated", this.messages);
  };

  this.log = function (msg) {
    this.addMessage({
      type: "info",
      message: msg
    });
  };

  this.error = function (msg) {
    this.addMessage({
      type: "error",
      message: msg
    });
  };

  this.warn = this.log;
  this.info = this.log;

  this.clearMessages = function () {
    this.messages = [];
    this.emit("messages:updated", this.messages);
  };
};

Substance.inherit(NotificationService, Substance.EventEmitter);

module.exports = NotificationService;

},{"substance":306}]},{},[523]);
