import { Router } from 'substance'
import forEach from 'lodash/forEach'


class ScholarRouter extends Router {
  constructor(app, propsMap) {
    super()
    this.app = app
    this.propsMap = propsMap
  }

  // URL helpers
  openDocument(documentId) {
    return '/documents/' + documentId
  }

  openEntity(entityId) {
    return '/resources/' + entityId
  }

  getRoute() {
    let routerString = this.getRouteString()
    return this.routeStringToObject(routerString)
  }

  parseRoute(routeString) {
    return this.routeStringToObject(routeString)
  }

  stringifyRoute(route) {
    return this.objectToRouteString(route)
  }

  _writeRoute(route, opts) {
    this.__isSaving__ = true
    try {
      if (opts.replace) {
        window.history.replaceState({} , '', route)
      } else {
        window.history.pushState({} , '', route)
      }
    } finally {
      this.__isSaving__ = false
    }
  }

  objectToRouteString(obj) {
    let hash = []
    let path = []

    if(obj.page) {
      let paramName = this.propsMap[obj.page]

      path.push(obj.page)
      delete obj.page

      if(obj[paramName]) {
        path.push(obj[paramName])
        delete obj[paramName]
      }

      path.unshift('')
    }

    forEach(obj, function(val, key) {
      hash.push(key+'='+val)
    })

    let route = [path.join('/'), hash.join(',')]
    return route.join('#')
  }

  routeStringToObject(routeStr) {
    // get pathname with trimmed slashes
    let path = window.location.pathname.replace(/^\/|\/$/g, '')
    let pathParams = path.split('/')

    let obj = {};
    // Empty route maps to empty route object

    if (!routeStr && path === "") return obj
    let params = []
    if (routeStr) params = params.concat(routeStr.split(','))

    if(pathParams.length > 0 && path !== "") {
      let pageName = pathParams[0]
      params.unshift('page=' + pageName)
      if(pathParams.length > 1) {
        params.unshift(this.propsMap[pageName] + '=' + pathParams[1])
      }
    }

    params.forEach(function(param) {
      let tuple = param.split('=')
      if (tuple.length !== 2) {
        throw new Error('Illegal route.')
      }
      obj[tuple[0].trim()] = tuple[1].trim()
    })
    return obj
  }
}

export default ScholarRouter
