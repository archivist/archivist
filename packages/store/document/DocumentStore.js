"use strict";

var oo = require('substance/util/oo');
var uuid = require('substance/util/uuid');
var Err = require('substance/util/SubstanceError');
var isUndefined = require('lodash/isUndefined');
var map = require('lodash/map');
var Promise = require('bluebird');

/*
  Archivist Document Store API

  Implements low level CRUD operations API for storing 
  information about documents in PostgreSQL DB.
  Note that content of documents itself got stored via changes and snapshots.
  
  With this API you can:
  - create new document
  - read document
  - update document
  - delete document
  - list documents
  - count documents
  - check if document exists
  - seed database with data

  All methods expects callback functions, 
  except seed which is using promise based document creation clone
*/
function DocumentStore(config) {
  this.config = config;
  this.db = config.db;
}

DocumentStore.Prototype = function() {

  /*
    Internal method to create a document record
  */
  this.createDocument = function(props, cb) {
    if (!props.documentId) {
      // We generate a documentId ourselves
      props.documentId = uuid();
    } 

    if(props.info) {
      if(props.info.title) props.title = props.info.title;
      if(props.info.userId) {
        props.updatedBy = props.info.userId;
        props.userId = props.info.userId;
      }
    }
    
    this.documentExists(props.documentId, function(err, exists) {
      if (err) {
        return cb(new Err('DocumentStore.CreateError', {
          cause: err
        }));
      }

      if (exists) {
        return cb(new Err('DocumentStore.CreateError', {
          message: 'Document ' + props.documentId + ' already exists.'
        }));
      }

      this.db.documents.insert(props, function(err, doc) {
        if (err) {
          return cb(new Err('DocumentStore.CreateError', {
            cause: err
          }));
        }

        cb(null, doc);
      });
    }.bind(this));
  };

  /*
    Promise version
  */
  this._createDocument = function(props) {
    return new Promise(function(resolve, reject) {
      this.createDocument(props, function(err, doc) {
        if(err) {
          return reject(err);
        }

        resolve(doc);
      });
    }.bind(this));
  };

  /*
    Check if document exists
    @param {String} documentId document id
    @param {Callback} cb callback
    @returns {Callback}
  */
  this.documentExists = function(documentId, cb) {
    this.db.documents.findOne({documentId: documentId}, function(err, doc) {
      if (err) {
        return cb(new Err('DocumentStore.ReadError', {
          cause: err,
          info: 'Happened within documentExists.'
        }));
      }

      cb(null, !isUndefined(doc));
    });
  };

  /*
    Get document record for a given documentId
    
    @param {String} documentId document id
    @param {Callback} cb callback
    @returns {Callback}
  */
  this.getDocument = function(documentId, cb) {
    this.db.documents.findOne({documentId: documentId}, function(err, doc) {
      if (err) {
        return cb(new Err('DocumentStore.ReadError', {
          cause: err
        }));
      }

      if (!doc) {
        return cb(new Err('DocumentStore.ReadError', {
          message: 'No document found for documentId ' + documentId
        }));
      }

      cb(null, doc);
    });
  };

  /*
    Update a document record with given props
    
    @param {String} documentId document id
    @param {Object} props properties to update
    @param {Callback} cb callback
    @returns {Callback}
  */
  this.updateDocument = function(documentId, props, cb) {
    if(props.info) {
      if(props.info.title) props.title = props.info.title;
    }
    
    this.documentExists(documentId, function(err, exists) {
      if (err) {
        return cb(new Err('DocumentStore.UpdateError', {
          cause: err
        }));
      }

      if (!exists) {
        return cb(new Err('DocumentStore.UpdateError', {
          message: 'Document with documentId ' + documentId + ' does not exists'
        }));
      }

      var documentData = props;
      documentData.documentId = documentId;

      this.db.documents.save(documentData, function(err, doc) {
        if (err) {
          return cb(new Err('DocumentStore.UpdateError', {
            cause: err
          }));
        }

        cb(null, doc);
      });
    }.bind(this));
  };

  /*
    Remove a document record from the db

    @param {String} documentId document id
    @param {Callback} cb callback
    @returns {Callback}
  */
  this.deleteDocument = function(documentId, cb) {
    this.documentExists(documentId, function(err, exists) {
      if (err) {
        return cb(new Err('DocumentStore.DeleteError', {
          cause: err
        }));
      }

      if (!exists) {
        return cb(new Err('DocumentStore.DeleteError', {
          message: 'Document with documentId ' + documentId + ' does not exists'
        }));
      }

      this.db.documents.destroy({documentId: documentId}, function(err, doc) {
        if (err) {
          return cb(new Err('DocumentStore.DeleteError', {
            cause: err
          }));
        }
        doc = doc[0];

        cb(null, doc);
      });
    }.bind(this));
  };

  /*
    List available documents

    @param {Object} filters filters
    @param {Object} options options (limit, offset, columns)
    @param {Callback} cb callback
    @returns {Callback}
  */
  this.listDocuments = function(filters, options, cb) {
    // set default to avoid unlimited listing
    options.limit = options.limit || 1000;
    options.offset = options.offset || 0;

    this.db.documents.find(filters, options, function(err, docs) {
      if (err) {
        return cb(new Err('DocumentStore.ListError', {
          cause: err
        }));
      }

      cb(null, docs);
    });
  };

  /*
    Count available documents

    @param {Object} filters filters
    @param {Function} cb callback
    @returns {Callback}
  */
  this.countDocuments = function(filters, cb) {
    this.db.documents.count(filters, function(err, count) {
      if (err) {
        return cb(new Err('UserStore.CountError', {
          cause: err
        }));
      }

      cb(null, count);
    });
  };

  /*
    Loads a given seed object to database

    Be careful with running this in production

    @param {Object} seed JSON object
    @param {Function} cb callback
  */

  this.seed = function(seed) {
    var self = this;
    var actions = map(seed, self._createDocument.bind(self));

    return Promise.all(actions);
  };
};

oo.initClass(DocumentStore);

module.exports = DocumentStore;