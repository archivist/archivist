var Substance = require("archivist-core").Substance;
var Interview = require('archivist-core/interview');

var API_URL = "/api/index";

var Backend = function(opts) {

};

Backend.Prototype = function() {

  this.getSubjects = function(cb) {
    $.ajax({
      url: "/api/subjects?page=1&sort_by=position&order=asc",
      dataType: 'json',
      success: function(subjects) {
        cb(null, subjects);
      },
      error: function(err) {
        console.error(err.responseText);
        cb(err.responseText);
      }
    });
  };

  this.getSubjectsModel = function(cb) {
    this.getSubjects(function(err, subjects) {
      cb(null, new Interview.SubjectsModel(null, subjects));
    });
  };

  this.findDocuments = function(searchQuery, cb) {
    $.ajax({
      url: API_URL+"/search?searchQuery="+encodeURIComponent(JSON.stringify(searchQuery)),
      dataType: 'json',
      success: function(result) {
        cb(null, result);
      },
      error: function(err) {
        console.error(err.responseText);
        cb(err.responseText);
      }
    });
  };

};

Substance.initClass(Backend);

module.exports = Backend;