var Substance = require('substance');

// TODO: do we really need it?
function initialize(doc) {
  doc.remarksIndex = doc.addIndex('remarksIndex', Substance.Data.Index.create({
    type: "remark",
    property: "id"
  }));
};

module.exports = initialize;
