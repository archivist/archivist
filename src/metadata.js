var util = require("substance-util");
var path = require("path");
var _ = require("underscore");

var Metadata = function() {
  // this.locations = require("../data/locations");
  // this.persons = require("../data/persons");
  // this.definitions = require("../data/definitions");
  // this.importSubjects();
};

Metadata.Prototype = function() {

  this.load = function(cb) {
    var self = this;
    $.getJSON("/api/metadata", function(metadata) {
      console.log('subjectDBVersion', metadata.subjectDBVersion);
      self.subjectDBVersion = metadata.subjectDBVersion,
      self.importSubjects(metadata.subjects);
      cb(null);
    });
  };

  this.importSubjects = function(subjectsData) {
    this.subjects = {};
    _.each(subjectsData, function(subject) {
      this.subjects[subject.id] = subject;
    }, this);
  };

  // this.getLocations = function() {
  //   return this.locations;
  // };

  // this.getPersons = function() {
  //   return this.persons;
  // };

  // this.getDefinitions = function() {
  //   return this.definitions;
  // };

  this.getSubjects = function() {
    return this.subjects;
  };
};

Metadata.prototype = new Metadata.Prototype();

var __instance__ = null;
Metadata.instance = function() {
  if (!__instance__) __instance__ = new Metadata();
  return __instance__;
};

module.exports = Metadata;
