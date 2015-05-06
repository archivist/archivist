var ContainerAnnotation = require("substance").Document.ContainerAnnotation;

var Remark = ContainerAnnotation.extend({
  name: "remark",
  properties: {
    "content": "string"
  }
});

module.exports = Remark;
