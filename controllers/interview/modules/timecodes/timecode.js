var Substance = require('substance');

var Timecode = Substance.Document.Annotation.extend({
  name: "timecode"
});

module.exports = Timecode;