var ContainerAnnotation = require("substance").Document.ContainerAnnotation;

var SubjectReference = ContainerAnnotation.extend({
  name: "subject_reference",
  properties: {
    "target": ["array", "string"]
  }
});

module.exports = SubjectReference;
