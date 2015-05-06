var Substance = require('substance');

function initialize(doc) {
  // Index only timecode annotations
  doc.timecodesIndex = doc.addIndex('timecodesIndex', Substance.Data.Index.create({
    type: "timecode"
  }));
}

module.exports = initialize;
