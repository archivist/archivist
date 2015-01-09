var util = require("substance-util");
var path = require("path");
var fs = require("fs");
var _ = require("underscore");

// TODO: fetch data from REST API instead of using these fixtures.

var MetadataService = function() {
  this.locations = require("../data/locations");
  this.persons = require("../data/persons");
  this.definitions = require("../data/definitions");
  this.importSubjects();
};

MetadataService.Prototype = function() {

  this.importSubjects = function() {
    var subjects = require("../data/subjects");
    this.subjects = {};
    _.each(subjects, function(subject) {
      this.subjects[subject.id] = subject;
    }, this);
  };

  this.getLocations = function() {
    return this.locations;
  };

  this.getPersons = function() {
    return this.persons;
  };

  this.getDefinitions = function() {
    return this.definitions;
  };

  this.getSubjects = function() {
    return this.subjects;
  };

};

MetadataService.prototype = new MetadataService.Prototype();

var __instance__ = null;
MetadataService.instance = function() {
  if (!__instance__) __instance__ = new MetadataService();
  return __instance__;
};

module.exports = MetadataService;
