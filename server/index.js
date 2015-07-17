var mongoose = require('mongoose')
	, express = require('express')
	, bodyParser = require('body-parser')
	, methodOverride = require('method-override')
	, morgan = require('morgan')
  , session = require('express-session')
  , MongoStore = require('connect-mongostore')(session)
  , flash = require('connect-flash')
  , favicon = require('serve-favicon')
  , passport = require('passport')
	, port = process.env.PORT || 5000
	, app = express()
	, path = require('path')
	, fs = require('fs')
	, _ = require('underscore')
	, api = require('./controllers/api')
	, oauth = require('./controllers/auth/oauth.js')
	, auth = require('./controllers/auth/utils.js')
	//, importer = require('./controllers/import')
	, Document = require('./models/document.js');


var browserify = require('browserify-middleware');


// Substance stuff
// --------------------
// if (process.env.NODE_ENV === "development") {
//   var CJSServer = require('substance-cjs');
//   var config = require("./.screwdriver/project.json");
//   var cjsServer = new CJSServer(app, __dirname, 'archivist_composer')
//     // ATTENTION: the second argument is the script which is resembled by injecting a list
//     // of script tags instead. It must be exactly the same string which is used in the script src.
//     .scripts('./boot_archivist_composer.js', './archivist_composer.js')
//     // the same applies to the css file
//     .styles(config.styles, './archivist_composer.css')
//     // page: route and file
//     .page('/archivist.html', './public/archivist.html');

//   // Serve assets with alias as configured in project.json (~dist like setup)
//   _.each(config.assets, function(srcPath, distPath) {
//     var absPath = path.join(__dirname, srcPath);
//     var route = "/" + distPath;
//     console.log("Adding route for asset", route, "->", absPath);
//     if (fs.lstatSync(absPath).isDirectory()) {
//       app.use( route, express.static(absPath) );
//     } else {
//       app.use(route, function(req, res) {
//         res.sendFile(absPath);
//       });
//     }
//   });
// }

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


// Deal with CORS to make API work with reader

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

// APP CONFIGURATION

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb', parameterLimit: 5000 }));
app.use(methodOverride());
app.use(allowCrossDomain);
app.use(flash());
app.use(favicon(path.join(__dirname, '../assets/favicon.png')));
app.use(passport.initialize());
app.use(morgan('tiny'));


// MONGOOSE CONNECTION

mongoose.connection.on("fullsetup", function(ref) {
	app.listen(port, function() {
    console.log("Application server listening on port %d", port);
  });
  return console.log("Connected to mongo server!");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err.message);
});

app.use('/', oauth);
app.use('/api', api);
//app.use('/import', importer);

app.route('/')
	.get(function(req, res, next) {
		var user = req.user || {super:false};
		console.log(req.token_payload)
    res.render('archivist', {user:user});
  })


// On the fly browserify-ication of composer
// if (process.env.NODE_ENV === "development") {
//   app.get('/composer/composer.js', browserify('./boot_archivist_composer.js', {cache: false}));

//   app.get('/composer/composer.css', function(req, res) {
//   	var cssFile = fs.readFileSync('./node_modules/archivist-composer/styles/composer.css', 'utf8');

//   	res.set('Content-Type', 'text/css');

//   	res.send(cssFile);
//   });
// }

app.route('/editor')
	.get(auth.ensureAuthenticated, function(req, res, next) {
		var menu = [
			{name: 'Dashboard',id: 'dashboard',icon: 'tasks',url: '/'},
	  	{name: 'Subjects',id: 'subjects',icon: 'tags',url: '/subjects'},
	  	{name: 'Prisons',id: 'prisons',icon: 'th',url: '/prisons'},
		  {name: 'Toponyms',id: 'topo',icon: 'globe',url: '/toponyms'},
	  	{name: 'Definitions',id: 'definition',icon: 'bookmark',url: '/definitions'},
	  	{name: 'Persons',id: 'person',icon: 'users',url: '/persons'},
	  	{name: 'Merge',id: 'merge',icon: 'code-fork',url: '/merge'},
	  	{name: 'Users',id: 'users',super: true,icon: 'user-plus',url: '/users'}
		];
		res.render('archivist', {user: req.user, menu: menu});
  });

app.route('/editor/new')
	.get(auth.ensureAuthenticated, function(req, res, next) {
		Document.createEmpty(req.user, function(err, doc) {
			if (err) return next(err);
			res.redirect('/editor#' + doc._id);
		})
  });

app.route('/:var(definitions|persons|prisons|subjects|merge|toponyms|users)*?')
  .get(auth.ensureAuthenticated, function(req, res, next) {
    res.render('archivist', {user: req.user});
  })

app.use(express.static(path.join(__dirname, '../public')));

// ERROR ROUTES

app.use(function(req, res){
  res.render('error.jade', {title: 'Looks like you are lost...', msg: 'Try to go back to <a href="/">main page</a>.'});
});