var Substance = require("substance");
var nprogress = require("nprogress");

// progress bar configuration
nprogress.configure({minimum: 0.1, showSpinner: false, speed: 1000});

var Backend = function(opts) {
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

  this.getEntity = function(id, cb) {
    var self = this;
    nprogress.start();
    this._request('GET', '/api/public/resources/' + id, null, function(err, result) {
      if (err) {
        nprogress.done();
        window.location = "/";
        return cb(err);
      }
      nprogress.done();
      cb(null, result);
    });
  };
};

Substance.initClass(Backend);

module.exports = Backend;