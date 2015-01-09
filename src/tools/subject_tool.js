var SubjectTool = function() {
  this.name = "subject";
  this.title = "Subject";
  this.icon = "icon-tag";
  this.action = "select-subject";
};

SubjectTool.Prototype = function() {

  this.isActive = function(ctrl) {
    return !!ctrl.getActiveAnnotationByType("subject_reference");
  };

  this.isEnabled = function(ctrl) {
    var editor = ctrl.getCurrentEditor();
    if (!editor) return false;
    if (editor.view !== "content") return false;
    
    var sel = editor.selection;
    return !sel.isCollapsed();
  };

  this.handleToggle = function(ctrl) {
    var activeAnnotation = ctrl.getActiveAnnotationByType("subject_reference");
    if (activeAnnotation) {
      ctrl.deleteAnnotation(activeAnnotation);
    } else {
      ctrl.workflows["tag_subject"].beginWorkflow();
    }
  };
};

SubjectTool.Prototype.prototype = SubjectTool.prototype;
SubjectTool.prototype = new SubjectTool.Prototype();
SubjectTool.prototype.constructor = SubjectTool;

module.exports = SubjectTool;
