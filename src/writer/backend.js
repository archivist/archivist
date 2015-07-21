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
    var self = this;

    var session = localStorage.getItem('session');
    this.session = JSON.parse(session);

    this.verifyToken(function(err, data) {
      self.initialized = true;
      if (err) {
        self.destroySession();
        cb(null);
      } else {
        // renew token
        if (data.token) {
          console.log('renewing session...')
          localStorage.setItem('session', JSON.stringify(data));
          var session = localStorage.getItem('session');
          self.session = JSON.parse(session);
          cb(null);
        } else {
          cb(null);
        }
      }
    }.bind(this));
  };

  // Document
  // ------------------

  this.getDocument = function(documentId, cb) {
    var self = this;
    nprogress.start();
    this._request('GET', '/api/documents/' + documentId, null, function(err, rawDoc) {
      if (err) {
        nprogress.done();
        return cb(err);
      }
      var doc = new Interview.fromJson(rawDoc);
      self.fetchSubjects(function(err, subjectsData) {
        nprogress.done();
        if (err) return cb(err);
        var subjects = new Interview.SubjectsModel(doc, subjectsData);
        doc.subjects = subjects;
        doc.version = rawDoc.__v;
        // TODO: We should not forget to remove this
        window.doc = doc;
        cb(null, doc);
      })
    });
  };

  this.saveDocument = function(doc, cb) {
    var self = this;
    nprogress.start();
    var json = doc.toJSON();
    json.__v = doc.version;

    console.log('saving doc, current version is', doc.version);

    this._request('PUT', '/api/documents/'+doc.id, json, function(err, data){
      nprogress.done();
      if (err) return cb(err);

      // Remember new document version
      doc.version = data.documentVersion;
      console.log('new doc version', doc.version);
      
      // Check if subjectsDB changed
      var currentSubjectDBVersion = self.getSubjectDBVersion();
      var newSubjectDBVersion = data.subjectDBVersion;

      // Update the subjects model if outdated
      if (doc.subjects && self.cache.subjectDBVersion  !== newSubjectDBVersion) {
        self.fetchSubjects(function(err, subjectsData) {
          if (err) return cb(err);
          var subjects = new Interview.SubjectsModel(doc, subjectsData);
          doc.subjects = subjects;
          cb(null);
        });
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
      // Store subjectDBVersion in cache
      self.cache.subjectDBVersion = subjectDB.subjectDBVersion;
      cb(null, subjectDB.subjects);
    }); 
  };

  this.getSubjectDBVersion = function() {
    return this.cache.subjectDBVersion ? this.cache.subjectDBVersion : null;
  };

  // Users
  // -------

  this.verifyToken = function(cb) {
    this._request("GET", "/api/users/status", null, function(err, result) {
      cb(err, result);
    });
  };

  this.getUser = function() {
    return this.session.user;
  };

  this.isSuperUser = function() {
    var claims = this.session.token.split('.')[1];
    claims = JSON.parse(atob(claims));
    return claims.scopes[1] == "super";
  };

  this.destroySession = function() {
    this.session = null;
    localStorage.removeItem('session');
    window.location.href = '/login';
  };
};

Substance.initClass(Backend);

module.exports = Backend;