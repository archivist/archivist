import { Router } from 'substance'

function ArchivistRouter(app) {
  Router.call(this);
  this.app = app;
}

ArchivistRouter.Prototype = function() {

  // URL helpers
  this.openDocument = function(documentId) {
    return '#' + Router.objectToRouteString({
      page: 'document',
      documentId: documentId
    });
  };

  this.getRoute = function() {
    var routerString = this.getRouteString();
    return Router.routeStringToObject(routerString);
  };
};

Router.extend(ArchivistRouter);

export default ArchivistRouter;