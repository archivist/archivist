var DefinitionTool = function() {
  this.name = "definition";
  this.title = "Definition";
  this.icon = "icon-book";
  this.action = "select-definition";
};

DefinitionTool.Prototype = function() {

  this.isActive = function(ctrl) {
    return !!ctrl.getActiveAnnotationByType("definition_reference");
  };

  this.isEnabled = function(ctrl) {
    var editor = ctrl.getCurrentEditor();
    if (!editor) return false;
    if (editor.view !== "content") return false;
    
    var sel = editor.selection;
    return !sel.isCollapsed();
  };

  this.handleToggle = function(ctrl) {
    var activeAnnotation = ctrl.getActiveAnnotationByType("definition_reference");
    if (activeAnnotation) {
      ctrl.deleteAnnotation(activeAnnotation);
    } else {
      ctrl.workflows["tag_entity"].beginWorkflow("definition");
    }
  };
};

DefinitionTool.Prototype.prototype = DefinitionTool.prototype;
DefinitionTool.prototype = new DefinitionTool.Prototype();
DefinitionTool.prototype.constructor = DefinitionTool;

module.exports = DefinitionTool;
