'use strict';

import { request, DocumentClient } from 'substance';

/*
  HTTP client for talking with DocumentServer
*/

class ArchivistDocumentClient extends DocumentClient {

  listDocuments(cb) {
    request('GET', '/api/documents', null, cb);
  }

}

export default ArchivistDocumentClient