import { request, DocumentClient } from 'substance'

/*
  HTTP client for talking with DocumentServer
*/

class ScholarDocumentClient extends DocumentClient {

  listDocuments(filters, options, cb) {
    let filtersRequest = encodeURIComponent(JSON.stringify(filters))
    let optionsRequest = encodeURIComponent(JSON.stringify(options))
    request('GET', '/api/documents?filters=' + filtersRequest + '&options=' + optionsRequest, null, cb)
  }

  getReferences(resourceId, filters, options, cb) {
    filters['annotations @>'] = [resourceId]
    return this.listDocuments(filters, options, cb)
  }

  searchDocuments(query, language, filters, options, cb) {
    let filtersRequest = encodeURIComponent(JSON.stringify(filters))
    let optionsRequest = encodeURIComponent(JSON.stringify(options))
    request('GET', '/api/documents/search?query=' + query + '&language=' + language + '&filters=' + filtersRequest + '&options=' + optionsRequest, null, cb)
  }

  searchFragments(documentId, query, language, filters, options, cb) {
    let filtersRequest = encodeURIComponent(JSON.stringify(filters))
    let optionsRequest = encodeURIComponent(JSON.stringify(options))
    request('GET', '/api/documents/' + documentId + '/search?query=' + query + '&language=' + language + '&filters=' + filtersRequest + '&options=' + optionsRequest, null, cb)
  }
}

export default ScholarDocumentClient