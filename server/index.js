var mongoose = require('mongoose')
	, express = require('express')
	, bodyParser = require('body-parser')
	, methodOverride = require('method-override')
	, morgan = require('morgan')
  , favicon = require('serve-favicon')
  , passport = require('passport')
	, port = process.env.PORT || 5000
	, app = express()
	, path = require('path')
	, _ = require('underscore')
	, api = require('./controllers/api')
	, oauth = require('./controllers/auth/oauth.js')
	, auth = require('./controllers/auth/utils.js')
	//, importer = require('./controllers/import')
	, Document = require('./models/document.js');


var browserify = require('browserify');



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
app.use(bodyParser.json({limit: '3mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '3mb', parameterLimit: 3000 }));
app.use(methodOverride());
app.use(favicon(path.join(__dirname, '../public/assets/img/favicon.png')));
app.use(passport.initialize());
app.use(morgan('tiny'));


// MONGOOSE CONNECTION

mongoose.connection.on("fullsetup", function(ref) {
	app.listen(port, function() {
    console.log("Archivist server listening on port %d", port);
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
    res.render('manager');
  })

app.route('/editor')
	.get(function(req, res, next) {
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
		res.render('writer', {user: req.user, menu: menu});
  });

app.route('/editor/new')
	.get(auth.checkAuth, function(req, res, next) {
		Document.createEmpty(req.user, function(err, doc) {
			if (err) return next(err);
			res.redirect('/editor#' + doc._id);
		})
  });

app.route('/:var(definitions|persons|prisons|subjects|merge|toponyms|users)*?')
  .get(function(req, res, next) {
    res.render('manager');
  })

app.use(express.static(path.join(__dirname, '../public')));

// ERROR ROUTES

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.redirect('/login');
  }
  next();
});

app.use(function(req, res){
  res.render('error.jade', {title: 'Looks like you are lost...', msg: 'Try to go back to <a href="/">main page</a>.'});
});