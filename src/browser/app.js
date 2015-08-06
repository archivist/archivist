var ArchivistBrowser = require("archivist-core/browser");
var Backend = require("./backend");
var backend = new Backend();

$(function() {

  // Create a new Browser app instance
  // --------
  //
  // Injects itself into body

  var app = new ArchivistBrowser({
    backend: backend
  });
  app.start();

  // TODO: probably we need to remove it later
  window.app = app;
});