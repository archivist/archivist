import { Router } from 'substance'

class ArchivistRouter extends Router{
  constructor(app) {
    super()
    this.app = app
  }

  // URL helpers
  openDocument(documentId) {
    return '#' + Router.objectToRouteString({
      page: 'document',
      documentId: documentId
    })
  }

  openEntity(entityId) {
    return '#' + Router.objectToRouteString({
      page: 'entity',
      entityId: entityId
    })
  }

  getRoute() {
    let routerString = this.getRouteString()
    return Router.routeStringToObject(routerString)
  }
}

export default ArchivistRouter
