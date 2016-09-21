'use strict';

var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var WebSocketServer = require('ws').Server;

/*
  Config
*/
var ServerConfigurator = require('./packages/common/ServerConfigurator');
var ServerPackage = require('./packages/server/package');
var configurator = new ServerConfigurator().import(ServerPackage);
var config = configurator.getAppConfig();

// Development server 
// Serves HTML, bundled JS and CSS in non-production mode
var serverUtils = require('substance/util/server');

/*
  Stores
*/
var DocumentStore = require('./server/DocumentStore');
var SnapshotStore = require('./server/SnapshotStore');
var ChangeStore = require('./server/ChangeStore');
var SessionStore = require('./server/SessionStore');
var UserStore = require('./server/UserStore');
var FileStore = require('./server/FileStore');

/*
  Engines
*/
var DocumentEngine = require('./server/NotesDocumentEngine');
var AuthenticationEngine = require('./server/AuthenticationEngine');
var SnapshotEngine = require('substance/collab/SnapshotEngine');
var NotesEngine = require('./server/NotesEngine');

/*
  Servers
*/
var CollabServer = require('substance/collab/CollabServer');
var AuthenticationServer = require('./server/AuthenticationServer');
var DocumentServer = require('./server/NotesDocumentServer');
var FileServer = require('./server/FileServer');
var NotesServer = require('./server/NotesServer');

/*
  Models
*/
var DocumentChange = require('substance/model/DocumentChange');
var Database = require('./server/Database');

/*
  Stores setup
*/
var db = new Database();

var userStore = new UserStore({ db: db });
var sessionStore = new SessionStore({ db: db });

// We use the in-memory versions for now, thus we need to seed
// each time.
var changeStore = new ChangeStore({db: db});
var documentStore = new DocumentStore({db: db});
var snapshotStore = new SnapshotStore({db: db});
var fileStore = new FileStore({destination: './uploads'});

/*
  Engines setup
*/
var schema = configurator.getSchema();
var seed = configurator.getSeed();
schema.documentFactory = {
  createDocument: configurator.createArticle.bind(configurator, seed)
};

var snapshotEngine = new SnapshotEngine({
  configurator: configurator,
  documentStore: documentStore,
  changeStore: changeStore,
  snapshotStore: snapshotStore,
  frequency: 50
});

var documentEngine = new DocumentEngine({
  db: db,
  configurator: configurator,
  documentStore: documentStore,
  changeStore: changeStore,
  snapshotEngine: snapshotEngine
});

var authenticationEngine = new AuthenticationEngine({
  userStore: userStore,
  sessionStore: sessionStore,
  emailService: null // TODO
});

var notesEngine = new NotesEngine({db: db});

/*
  Express body-parser configureation 
*/
app.use(bodyParser.json({limit: '3mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '3mb', parameterLimit: 3000 }));

/*
  Serve app
*/
if(config.env !== 'production') {
  var browserifyConfig = {
    debug: true
  };
  
  // Serve HTML, bundled JS and CSS in non-production mode
  serverUtils.serveStyles(app, '/app.css', {
    rootDir: __dirname,
    configuratorPath: require.resolve('./packages/notes/NotesConfigurator'),
    configPath: require.resolve('./client/package')
  });
  serverUtils.serveJS(app, '/app.js', {
    sourcePath: path.join(__dirname, 'client', 'app.js'),
    browserify: browserifyConfig
  });
  serverUtils.serveHTML(app, '/', path.join(__dirname, 'client', 'index.html'), config);
  // Serve static files in non-production mode
  app.use('/assets', express.static(path.join(__dirname, 'styles/assets')));
  app.use('/fonts', express.static(path.join(__dirname, 'node_modules/font-awesome/fonts')));
} else {
  app.use('/', express.static(path.join(__dirname, '/dist')));
}

/*
  Serve uploads directory
*/
app.use('/media', express.static(path.join(__dirname, 'uploads')));

/*
  Servers setup
*/
var httpServer = http.createServer();
var wss = new WebSocketServer({ server: httpServer });

// DocumentServer
var documentServer = new DocumentServer({
  documentEngine: documentEngine,
  path: '/api/documents'
});
documentServer.bind(app);


// CollabServer
var collabServer = new CollabServer({
  // every 30s a heart beat message is sent to keep
  // websocket connects alive when they are inactive
  heartbeat: 30*1000,
  documentEngine: documentEngine,

  /*
    Checks for authentication based on message.sessionToken
  */
  authenticate: function(req, cb) {
    var sessionToken = req.message.sessionToken;
    authenticationEngine.getSession(sessionToken).then(function(session) {
      cb(null, session);
    }).catch(function(err) {
      cb(err);
    });
  },

  /*
    Will store the userId along with each change. We also want to build
    a documentInfo object to update the document record with some data
  */
  enhanceRequest: function(req, cb) {
    var message = req.message;
    if (message.type === 'sync') {
      // We fetch the document record to get the old title
      documentStore.getDocument(message.documentId, function(err, docRecord) {
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
});

collabServer.bind(wss);

// AuthenticationServer
var authenticationServer = new AuthenticationServer({
  authenticationEngine: authenticationEngine,
  path: '/api/auth'
});
authenticationServer.bind(app);

// File Server
var fileServer = new FileServer({
  store: fileStore,
  path: '/api/files'
});
fileServer.bind(app);

// NotesServer
var notesServer = new NotesServer({
  notesEngine: notesEngine,
  path: '/api/notes'
});
notesServer.bind(app);

// Error handling
// We send JSON to the client so they can display messages in the UI.

/* jshint unused: false */
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  
  if (err.inspect) {
    // This is a SubstanceError where we have detailed info
    console.error(err.inspect());
  } else {
    // For all other errors, let's just print the stack trace
    console.error(err.stack);
  }
  
  res.status(500).json({
    errorName: err.name,
    errorMessage: err.message || err.name
  });
});

// Delegate http requests to express app
httpServer.on('request', app);

// NOTE: binding to localhost means that the app is not exposed
// to the www directly.
// E.g. we'll need to establish a reverse proxy
// forwarding http+ws from domain name to localhost:5001 for instance
httpServer.listen(config.port, config.host, function() {
  console.log('Listening on ' + httpServer.address().port); // eslint-disable-line
});

// Export app for requiring in test files
module.exports = app;