var Substance = require("archivist-core").Substance;
var Interview = require('archivist-core/interview');
var _ = Substance._;
var nprogress = require("nprogress");

// progress bar configuration
nprogress.configure({minimum: 0.1, showSpinner: false, speed: 1000});

var Backend = function(opts) {
  this.cache = {
    "entities": {}
  };
  this.initialized = false;
};

Backend.Prototype = function() {

  // A generic request method
  // -------------------
  // 
  // Deals with sending the authentication header, encoding etc.

  this._request = function(method, url, data, cb) {

    var ajaxOpts = {
      type: method,
      url: url,
      contentType: "application/json; charset=UTF-8",
      dataType: "json",
      success: function(data) {
        cb(null, data);
      },
      error: function(err) {
        cb(err.responseText);
      }
    };

    if (data) {
      ajaxOpts.data = JSON.stringify(data);
    }

    $.ajax(ajaxOpts);
  };

  // Document
  // ------------------

  this.getDocument = function(documentId, cb) {
    var self = this;
    nprogress.start();
    this._request('GET', '/api/public/documents/' + documentId, null, function(err, result) {
      if (err) {
        nprogress.done();
        window.location = "/";
        return cb(err);
      }
      var doc = Interview.fromJson(result.document);
      doc.subjects = new Interview.SubjectsModel(doc, result.subjects);
      doc.entities = new Interview.EntitiesModel(result.entities);
      doc.connect(this, {'document:rendered': function(){nprogress.done();}});
      cb(null, doc);
    });
  };
};

Substance.initClass(Backend);

module.exports = Backend;