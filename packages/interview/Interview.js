'use strict';

var Document = require('substance/model/Document');

/*
  Archivist Interview model.
*/

function Interview(schema) {
  Document.call(this, schema);
  this._initialize();
}

Interview.Prototype = function() {

  this._initialize = function() {
    this.create({
      type: 'container',
      id: 'body',
      nodes: []
    });
  };

  this.getDocumentMeta = function() {
    return this.get('meta');
  };

};

Document.extend(Interview);

module.exports = Interview;