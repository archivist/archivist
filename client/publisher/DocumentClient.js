'use strict';

import { request, DocumentClient } from 'substance';

/*
  HTTP client for talking with DocumentServer
*/

function ArchivistDocumentClient() {
  ArchivistDocumentClient.super.apply(this, arguments);
}

ArchivistDocumentClient.Prototype = function() {

  this.listDocuments = function(cb) {
    request('GET', '/api/documents', null, cb);
  };

};

DocumentClient.extend(ArchivistDocumentClient);

export default ArchivistDocumentClient;