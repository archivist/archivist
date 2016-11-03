'use strict';

import { request, DocumentClient } from 'substance';

/*
  HTTP client for talking with DocumentServer
*/

class ArchivistDocumentClient extends DocumentClient {

  listDocuments(cb) {
    request('GET', '/api/documents', null, cb);
  }

  searchDocuments(query, language, filters, options, cb) {
    // TODO: send filters and options to server
    let filtersRequest = encodeURIComponent(JSON.stringify(filters));
    let optionsRequest = encodeURIComponent(JSON.stringify(options));
    request('GET', '/api/documents/search?query=' + query + '&language=' + language + '&filters=' + filtersRequest + '&options=' + optionsRequest, null, cb)
  }

  searchFragments(documentId, query, language, filters, options, cb) {
    // TODO: send filters and options to server
    let filtersRequest = encodeURIComponent(JSON.stringify(filters));
    let optionsRequest = encodeURIComponent(JSON.stringify(options));
    request('GET', '/api/documents/' + documentId + '/search?query=' + query + '&language=' + language + '&filters=' + filtersRequest + '&options=' + optionsRequest, null, cb)
  }

}

export default ArchivistDocumentClient