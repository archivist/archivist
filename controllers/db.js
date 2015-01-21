/* The DB controller */
 
var Document = require('../models/document.js')
	,	Subject = require('../models/subject.js')
  , System = require('../models/system.js')
	, User = require('../models/user.js')
	,	util = require('./util.js');

var db = exports;


/* The Document REST api */

/** 
 * Creates Document record from JSON
 *
 * @param {string} document - JSON represenation of new document
 * @param {callback} cb - The callback that handles the results 
 */

db.createDocument = function(document, cb) {
	if (document.hasOwnProperty('schema')) {
		document._schema = document.schema;
		delete document.schema;
		document._id = document.id;
		delete document.id;
	}

	var newDoc = new Document(document);
	newDoc.save(function(err) {
		cb(err, newDoc);
	});
}


/** 
 * Gets Document record by unique id 
 *
 * @param {string} id - The unique id of target document record
 * @param {callback} cb - The callback that handles the results 
 */

db.getDocument = function(id, cb) {
	Document.findById(id, function(err, document) {
		doc = document.toJSON();
		if (doc.hasOwnProperty('_schema')) {
			delete doc._schema;
			doc.schema = document._schema;
		}

		cb(err, doc);
	});
}


/** 
 * Updates Document record unique JSON
 *
 * @param {string} id - The unique id of target document record
 * @param {string} data - JSON with updated properties
 * @param {callback} cb - The callback that handles the results 
 */

db.updateDocument = function(id, data, cb) {
	if (data.hasOwnProperty('schema')) {
		data._schema = data.schema;
		delete data.schema;
	}

	Document.findByIdAndUpdate(id, { $set: data }, function (err, document) {
		cb(err, document);
	});
}


/** 
 * Removes Document record by unique id 
 *
 * @param {string} id - The unique id of target document record
 * @param {callback} cb - The callback that handles the results 
 */

db.removeDocument = function(id, cb) {
  Document.findByIdAndRemove(id, function (err) {
    cb(err);
  });
}


/** 
 * List Documents
 *
 * @param {string} opt - The query options from request
 * @param {callback} cb - The callback that handles the results 
 */

db.listDocuments = function(opt, cb) {
	  var query = util.getQuery(opt.query),
	      options = util.getOptions(opt);

  Document.find(query, 'nodes.document.title nodes.document.created_at nodes.document.authors id', options, function(err, documents) {
    cb(err, documents);
  });
}



/* The Subject REST api */

/** 
 * Creates Subject record from JSON
 *
 * @param {string} subject - JSON represenation of new subject
 * @param {callback} cb - The callback that handles the results 
 */

db.createSubject = function(subject, cb) {
	new Subject(subject).save(function(err) {
		cb(err);
	});
}


/** 
 * Gets Subject record by unique id 
 *
 * @param {string} id - The unique id of target subject record
 * @param {callback} cb - The callback that handles the results 
 */

db.getSubject = function(id, cb) {
	Subject.findById(id, function(err, subject) {
		cb(err, subject);
	});
}


/** 
 * Updates Subject record unique JSON
 *
 * @param {string} id - The unique id of target subject record
 * @param {string} data - JSON with updated properties
 * @param {callback} cb - The callback that handles the results 
 */

db.updateSubject = function(id, data, cb) {
	delete data.__v;
	Subject.findByIdAndUpdate(id, { $set: data }, { upsert: true }, function (err, subject) {
		cb(err, subject);
	});
}	


/** 
 * Removes Subject record by unique id 
 *
 * @param {string} id - The unique id of target subject record
 * @param {callback} cb - The callback that handles the results 
 */

db.removeSubject = function(id, cb) {
  Subject.findByIdAndRemove(id, function (err) {
    cb(err);
  });
}


/** 
 * List Subjects
 *
 * @param {string} opt - The query options from request
 * @param {callback} cb - The callback that handles the results 
 */

db.listSubjects = function(opt, cb) {
	  var query = util.getQuery(opt.query),
	      options = util.getOptions(opt);

  Subject.find(query, null, options, function(err, subjects) {
    cb(err, subjects);
  });
}


/** 
 * Merge Subjects
 *
 * @param {string} one - Id of subject to merge
 * @param {string} into - Id of subject to merge into
 * @param {callback} cb - The callback that handles the results 
 */

db.mergeSubjects = function(one, into, cb) {
  console.log("Let's merge " + one + " into " + into + "!");
  cb();

  // Do something and then remove first subject:

  // Subject.findByIdAndRemove(one, function (err) {
  //   cb(err);
  // });
}



/* The User api */

/** 
 * Creates User record from Google profile
 *
 * @param {string} profile - Google OAuth profile
 * @param {callback} cb - The callback that handles the results 
 */

db.createUser = function(profile, cb) {
	new User({
    id: profile._json.id,
    name: profile._json.name,
    email: profile._json.email,
    picture: profile._json.picture
  }).save(function(err){
    cb(err);
  });
}


/** 
 * Gets User record by unique id 
 *
 * @param {string} id - The unique id of target user record
 * @param {callback} done - Defered done method which handles the results 
 */

db.getUser = function(id, done) {
  User.findOne({id: id}, function(err, user) {
    done(err, user);
  })
}


/** 
 * Updates User record unique JSON
 *
 * @param {string} id - The unique id of target user record
 * @param {string} data - JSON with updated properties
 * @param {callback} cb - The callback that handles the results 
 */

db.updateUser = function(id, data, cb) {
	var data = req.body
    , id = req.params.id;

  delete data._id;
  delete data._v;

  User.findByIdAndUpdate(id, { $set: data }, function (err, user) {
    if (err) return next(err);
    cb(user);
  });
}	


/** 
 * Removes User record by unique id 
 *
 * @param {string} id - The unique id of target user record
 * @param {callback} cb - The callback that handles the results 
 */

db.removeUser = function(id, cb) {
  User.findByIdAndRemove(id, function (err) {
    cb(err);
  });
}


/** 
 * List Users
 *
 * @param {string} opt - The query options from request
 * @param {callback} cb - The callback that handles the results 
 */

db.listUsers = function(opt, cb) {
	  var query = util.getQuery(opt.query),
	      options = util.getOptions(opt);

	User.find(query, null, options, function(err, users) {
    cb(err, users);
  });
}

/** 
 * Find User profile or create new one
 *
 * @param {string} profile - The unique profile of target user record
 * @param {callback} done - Defered done method which handles the results 
 */

db.findOrCreateUser = function(profile, done) {
  var self = this;
  User.findOne({id: profile._json.id}, function(err, user) {
    if (err) return next(err);
    if (user) {
      if (user.access) {
        return done(null, profile);
      } else {
        return done(null, false, { message: 'You have no access. Sorry. See you.' });    
      } 
    } else {
      self.createUser(profile, function(err) {
      	if (err) return next(err);
      	return done(null, false, { message: 'Thank you! We will check your information and give you access. Maybe.' }); 
      });
    }
  });
}

/** 
 * Check access for User profile and continue or redirect to main page
 */

db.checkSuperUser = function(req, res, next) {
  User.findOne({email: req.user.email}, function(err, user) {
    if(user.access && user.super) {
      return next();
    } else {
      res.redirect('/');
    }
  });
}


/* System variables API */

/**
 * Set system variable
 *
 * @param {string} name - The unique name of variable
 * @param {string} value - JSON with updated properties
 * @param {callback} cb - The callback that handles the results 
 */

db.setSystemVariable = function(name, value, cb) {
  System.findOneAndUpdate({name: name}, { $set: value }, {new: true, upsert: true}, function(err, variable) {
    cb(err, variable);
  });
}

/**
 * Get system variable
 *
 * @param {string} name - The unique name of variable
 * @param {callback} cb - The callback that handles the results 
 */

db.getSystemVariable = function(name, cb) {
  System.findOne({name: name}, function(err, variable) {
    cb(err, variable);
  });
}


//maintenance