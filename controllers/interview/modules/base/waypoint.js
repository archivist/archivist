var Substance = require('substance');

var Waypoint = Substance.Document.Node.extend({
  name: "waypoint",
  properties: {
    "entityId": "string",
    "density": "string"
  }
});

module.exports = Waypoint;