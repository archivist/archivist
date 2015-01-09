var PersonTool = function() {
  this.name = "person";
  this.title = "Person";
  this.icon = "icon-user";
  this.action = "select-person";
};

PersonTool.Prototype = function() {

  this.isActive = function(ctrl) {
    return !!ctrl.getActiveAnnotationByType("person_reference");
  };

  this.isEnabled = function(ctrl) {
    var editor = ctrl.getCurrentEditor();
    if (!editor) return false;
    if (editor.view !== "content") return false;
    
    var sel = editor.selection;
    return !sel.isCollapsed();
  };

  this.handleToggle = function(ctrl) {
    var activeAnnotation = ctrl.getActiveAnnotationByType("person_reference");
    if (activeAnnotation) {
      ctrl.deleteAnnotation(activeAnnotation);
    } else {
      ctrl.workflows["tag_entity"].beginWorkflow("person");
    }
  };
};

PersonTool.Prototype.prototype = PersonTool.prototype;
PersonTool.prototype = new PersonTool.Prototype();
PersonTool.prototype.constructor = PersonTool;

module.exports = PersonTool;
