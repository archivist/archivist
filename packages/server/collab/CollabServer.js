'use strict';

var CollabServer = require('substance/collab/CollabServer');
var DocumentChange = require('substance/model/DocumentChange');

/*
  DocumentServer module. Can be bound to an express instance
*/
function ArchivistCollabServer(config) {
  ArchivistCollabServer.super.apply(this, arguments);
  this.authEngine = config.authEngine;
  this.documentStore = config.documentStore;
}

ArchivistCollabServer.Prototype = function() {

  /*
    Checks for authentication based on message.sessionToken
  */
  this.authenticate = function(req, cb) {
    var sessionToken = req.message.sessionToken;
    this.authEngine.getSession(sessionToken).then(function(session) {
      cb(null, session);
    }).catch(function(err) {
      cb(err);
    });
  };

  /*
    Will store the userId along with each change. We also want to build
    a documentInfo object to update the document record with some data
  */
  this.enhanceRequest = function(req, cb) {
    var message = req.message;
    if (message.type === 'sync') {
      // We fetch the document record to get the old title
      this.documentStore.getDocument(message.documentId, function(err, docRecord) {
        var updatedAt = new Date();
        var title = docRecord.title;

        if (message.change) {
          // Update the title if necessary
          var change = DocumentChange.fromJSON(message.change);
          change.ops.forEach(function(op) {
            if(op.path[0] === 'meta' && op.path[1] === 'title') {
              title = op.diff.apply(title);
            }
          });

          message.change.info = {
            userId: req.session.userId,
            updatedAt: updatedAt
          };
        }

        message.collaboratorInfo = {
          name: req.session.user.name
        };

        // commit and connect method take optional documentInfo argument
        message.documentInfo = {
          updatedAt: updatedAt,
          updatedBy: req.session.userId,
          title: title
        };
        cb(null);
      });
    } else {
      // Just continue for everything that is not handled
      cb(null);
    }
  }

};

CollabServer.extend(ArchivistCollabServer);

module.exports = ArchivistCollabServer;