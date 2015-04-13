var mongoose = require('mongoose')
	, express = require('express')
	, bodyParser = require('body-parser')
	, methodOverride = require('method-override')
	, morgan = require('morgan')
  , session = require('express-session')
  , MongoStore = require('connect-mongostore')(session)
  , flash = require('connect-flash')
  , passport = require('passport')
	, rest = require('./controllers/rest.js')
	, port = process.env.PORT || 5000
	, app = express()
	, path = require('path')
	, fs = require('fs')
	, _ = require('underscore')
	, api = require('./controllers/api.js')
	, oauth = require('./controllers/oauth.js')
	, maintenance = require('./controllers/maintenance.js')
	, importer = require('./controllers/import.js')
	, Document = require('./models/document.js');

// Substance stuff
// --------------------
if (process.env.NODE_ENV === "development") {
  var CJSServer = require('substance-cjs');
  var config = require("./.screwdriver/project.json");
  var cjsServer = new CJSServer(app, __dirname, 'archivist_composer')
    // ATTENTION: the second argument is the script which is resembled by injecting a list
    // of script tags instead. It must be exactly the same string which is used in the script src.
    .scripts('./boot_archivist_composer.js', './archivist_composer.js')
    // the same applies to the css file
    .styles(config.styles, './archivist_composer.css')
    // page: route and file
    .page('/archivist.html', './public/archivist.html');

  // Serve assets with alias as configured in project.json (~dist like setup)
  _.each(config.assets, function(srcPath, distPath) {
    var absPath = path.join(__dirname, srcPath);
    var route = "/" + distPath;
    console.log("Adding route for asset", route, "->", absPath);
    if (fs.lstatSync(absPath).isDirectory()) {
      app.use( route, express.static(absPath) );
    } else {
      app.use(route, function(req, res) {
        res.sendFile(absPath);
      });
    }
  });
}

// MONGOOSE CONNECT

var replica_name = process.env.RS_NAME
	,	replica_url = process.env.MONGO_URL;

try {
	var options = {
		server: {
			auto_reconnect: true,
			socketOptions: {
				keepAlive: 1,
				connectTimeoutMS: 30000
			}
		},
		replset: {
			rs_name: replica_name,
			socketOptions : {
				keepAlive : 1,
				connectTimeoutMS: 30000
			}
		}
	};
	mongoose.connect(replica_url, options);
	console.log("Started connection, waiting for it to open...");
} catch (err) {
	console.log(("Setting up failed to connect"), err.message);
}

// APP CONFIGURATION

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(flash());
app.use(session({
	resave: true,
  saveUninitialized: true,
  secret: 'archivistSecretWeapon',
  store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

// MONGOOSE CONNECTION

var sessionStore = new MongoStore({
    mongooseConnection: mongoose.connections[0],
    ttl: 2 * 3600
  }, function(e){
  	app.listen(port, function() {
		console.log("Archivist server listening on port %d", port);
	});
})

mongoose.connection.on("fullsetup", function(ref) {
	return console.log("Connected to mongo server!");
});

mongoose.connection.on("error", function(err) {
	console.log("Could not connect to mongo server!");
	return console.log(err.message);
});

app.use('/', oauth);

app.use('/api', maintenance);
app.use('/api', api);

app.use('/import', importer);

app.route('/')
	.get(oauth.ensureAuthenticated, function(req, res, next) {
    res.render('platform', {user: req.user});
  })

app.route('/editor/new')
	.get(oauth.ensureAuthenticated, function(req, res, next) {
		Document.createEmpty(function(err, doc) {
			if (err) return next(err);
			res.redirect('/archivist.html#' + doc._id);
		})
  });

app.route('/:var(definitions|persons|prisons|subjects|toponyms|users)*?')
  .get(oauth.ensureAuthenticated, function(req, res, next) {
    res.render('platform', {user: req.user});
  })

// ERROR ROUTES

app.use(function(req, res){
  res.render('error.jade', {title: 'Looks like you are lost...', msg: 'Try to go back to <a href="/">main page</a>.'});
});