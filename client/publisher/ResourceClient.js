import { request } from 'substance'

/*
  HTTP client for talking with ResourceServer
*/

class ResourceClient {
  constructor(config) {
    this.config = config
  }

  listEntities(filters, options, cb) {
    let filtersRequest = encodeURIComponent(JSON.stringify(filters))
    let optionsRequest = encodeURIComponent(JSON.stringify(options))
    request('GET', '/api/entities?filters=' + filtersRequest + '&options=' + optionsRequest, null, cb)
  }

  searchEntities(query, language, filters, options, cb) {
    let filtersRequest = encodeURIComponent(JSON.stringify(filters))
    let optionsRequest = encodeURIComponent(JSON.stringify(options))
    request('GET', '/api/entities/search?query=' + query + '&language=' + language + '&filters=' + filtersRequest + '&options=' + optionsRequest, null, cb)
  }

}

export default ResourceClient
