var Substance = require('substance');

function initialize(doc) {
  doc.subjectReferencesIndex = doc.addIndex('subjectReferencesIndex', Substance.Data.Index.create({
    type: "subject_reference",
    property: "target"
  }));
};

module.exports = initialize;
