var Substance = require("substance");
var Interview = require('archivist-interview');
var _ = require("substance/helpers");


var Backend = function(opts) {
  this.cache = {
    "entities": {}
  };
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
        console.error(err);
        cb(err.responseText);
      }
    };

    if (data) {
      ajaxOpts.data = JSON.stringify(data);
    }

    // Add Authorization header if there's an active session
    var session = localStorage.getItem('session');
    if (session) {
      var token = JSON.parse(session).token;
      ajaxOpts.beforeSend = function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      };
    }

    $.ajax(ajaxOpts);
  };


  // Initialize
  // ------------------

  this.initialize = function(cb) {
    // Restore last session
    var lastSession = localStorage.getItem('session');
    var lastToken;
    if (lastSession) {
      lastToken = lastSession.token;
    }

    this.verifyToken(lastSession, function(err) {
      this.initialized = true;
      if (err) {
        this.destroySession();
        cb(null);
      } else {
        this.session = JSON.parse(lastSession);
        cb(null);
      }
    }.bind(this));
  };

  // Document
  // ------------------

  this.getDocument = function(documentId, cb) {
    var self = this;
    this._request('GET', '/api/documents/' + documentId, null, function(err, rawDoc) {
      if (err) return cb(err);
      var doc = new Interview.fromJson(rawDoc);
      self.fetchSubjects(function(err, subjectsData) {
        if (err) return cb(err);
        var subjects = new Interview.SubjectsModel(doc, subjectsData);
        doc.subjects = subjects;
        doc.version = rawDoc.__v;
        // We should not forget to remove this
        window.doc = doc;
        cb(null, doc);
      })
    });
  };

  this.saveDocument = function(doc, cb) {
    var self = this;

    var json = doc.toJSON();
    json.__v = doc.version;

    console.log('saving doc, current version is', doc.version);

    this._request('PUT', '/api/documents/'+doc.id, json, function(err, data){
      if (err) return cb(err);

      // Remember new document version
      doc.version = data.documentVersion;
      console.log('new doc version', doc.version);
      
      // Check if subjectsDB changed
      var currentSubjectDBVersion = this.getSubjectDBVersion();
      var newSubjectDBVersion = data.subjectDBVersion;

      // Update the subjects cache if outdated
      if (self.cache.subjects && self.cache.subjectDBVersion  !== newSubjectDBVersion) {
        self.fetchSubjects();
        cb(null);
      } else {
        cb(null);
      }
    });
  };


  // Entities
  // ------------------

  this.getEntity = function(entityId) {
    return this.cache.entities[entityId];
  };

  this.getEntities = function(entityIds, cb) {
    var self = this;

    var entitiesToFetch = [];
    var entities = [];

    entityIds = _.uniq(entityIds);

    // Try to use cached items
    _.each(entityIds, function(entityId) {
      var entity = this.cache.entities[entityId];
      if (entity) {
        entities.push(entity);
      } else {
        entitiesToFetch.push(entityId);
      }
    }.bind(this));

    this.fetchEntities(entitiesToFetch, function(err, fetchedEntities) {
      // Store in cache
      _.each(fetchedEntities, function(entity) {
        self.cache.entities[entity.id] = entity;
        entities.push(entity);
      }, self);
      cb(null, entities);
    }.bind(this));
  };

  this.fetchEntities = function(entityIds, cb) {
    if (entityIds.length === 0) return cb(null, []);
    console.log('Fetching entities', entityIds);
    
    var entities = {
      entityIds: entityIds
    }

    this._request('POST', '/api/entities', entities, function(err, res) {
      if (err) return cb(err);
      cb(null, res.results);
    });
  };

  // Outdated
  this.getSuggestedEntities = function(cb) {
    this._request('GET', '/api/search', null, function(err, entities) {
      if (err) return cb(err);
      cb(null, entities);
    });
  };

  this.searchEntities = function(searchStr, type, cb) {
    var queryUrl;

    if(type) {
      queryUrl = "/api/search?query="+encodeURIComponent(searchStr)+"&type="+encodeURIComponent(type);
    } else {
      queryUrl = "/api/search?query="+encodeURIComponent(searchStr);
    }

    this._request('GET', queryUrl, null, function(err, entities) {
      if (err) return cb(err);
      cb(null, entities);
    });
  };


  // Subjects
  // ------------------

  this.fetchSubjects = function(cb) {
    var self = this;
    
    this._request('GET', "/api/subjects?page=1&sort_by=position&order=asc", null, function(err, subjectDB) {
      if (err) return cb(err);
      // Store in cache
      self.cache.subjectDB = subjectDB;
      cb(null, subjectDB.subjects);
    }); 
  };

  this.getSubjects = function(cb) {
    if (this.cache.subjectDB) {
      return cb(null, this.cache.subjectDB.subjects);
    } else {
      this.fetchSubjects(cb);
    }
  };

  this.getSubjectDBVersion = function() {
    return this.cache.subjectDB ? this.cache.subjectDB.subjectDBVersion : null;
  };

};

Substance.initClass(Backend);

module.exports = Backend;