var mongoose = require('mongoose')
	, express = require('express')
	, bodyParser = require('body-parser')
	, methodOverride = require('method-override')
	, morgan = require('morgan')
	, rest = require('./controllers/rest.js')
	, port = process.env.PORT || 5000
	, app = express();


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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

// MONGOOSE CONNECTION

mongoose.connection.on("open", function(ref) { 
	app.listen(port, function() {
		console.log("Archivist server listening on port %d", port);
	});
	return console.log("Connected to mongo server!");
});

mongoose.connection.on("error", function(err) {
	console.log("Could not connect to mongo server!");
	return console.log(err.message);
});

app.use('/api', rest);

app.route('/')
	.get( function(req, res, next) {
    res.render('admin');
  })

app.route('/:var(subjects)*?')
  .get(function(req, res, next) {
    res.render('admin');
  })