var LocationTool = function() {
  this.name = "location";
  this.title = "Location";
  this.icon = "icon-location-arrow";
  this.action = "select-location";
};

LocationTool.Prototype = function() {

  this.isActive = function(ctrl) {
    return !!ctrl.getActiveAnnotationByType("location_reference");
  };

  this.isEnabled = function(ctrl) {
    var editor = ctrl.getCurrentEditor();
    if (!editor) return false;
    if (editor.view !== "content") return false;
    
    var sel = editor.selection;
    return !sel.isCollapsed();
  };

  this.handleToggle = function(ctrl) {
    var activeAnnotation = ctrl.getActiveAnnotationByType("location_reference");
    if (activeAnnotation) {
      ctrl.deleteAnnotation(activeAnnotation);
    } else {
      console.log('TODO Begin tag location workflow');
      ctrl.workflows["tag_entity"].beginWorkflow("location");
    }
  };
};

LocationTool.Prototype.prototype = LocationTool.prototype;
LocationTool.prototype = new LocationTool.Prototype();
LocationTool.prototype.constructor = LocationTool;

module.exports = LocationTool;
