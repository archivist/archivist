/* The DB controller */
 
var Document = require('../models/document.js')
  , Subject = require('../models/subject.js')
  , System = require('../models/system.js')
  , User = require('../models/user.js')
  , util = require('./util.js')
  , sUtil = require('substance-util')
  , _ = require('underscore');

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

  Document.findById(id, "__v", function(err, currentDoc) {
    console.log('currentDoc.__v', currentDoc.__v, 'data', data.__v);
    // Perform version check
    if (currentDoc.__v !== data.__v) {
      return cb('Document can not be saved becuase your local version is outdated. Please open document in a new tab and re-apply your changes.');
    }

    delete data.__v; // clear __v property, so $inc can do its job

    Document.findByIdAndUpdate(id, { $set: data, $inc: { __v: 1 } }, function (err, document) {
      db.getSubjectDBVersion(function(err, subjectDBVersion) {
        cb(err, {
          documentVersion: document.__v,
          subjectDBVersion: subjectDBVersion
        });
      });
    });
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
  new Subject(subject).save(function(err, subject) {
    if (err) return cb(err);
    db.incrementSubjectsDBVersion(function(err){
      cb(err, subject)
    });
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
    if (err) return err;
    db.incrementSubjectsDBVersion(function(err) {
      cb(err, subject);
    });
  });
}


/** 
 * Updates subject references in a document, either removing them or replacing them with a new subjectId
 *
 * @param {string} doc - Substance document as JSON
 * @param {string} data - subject to be updated
 * @param {object} options - mode = delete|replace, replace mode has newSubjectId
 */
 
db.updateSubjectForDoc = function(docId, subjectId, opt, cb) {
  db.getDocument(docId, function(err, doc) {
    if (err) return cb(err);

    var subjectReferences = [];
    var hasChanged = false;
    _.each(doc.nodes, function(node) {
      if (node.type === "subject_reference") {
        console.log('node.target#before', node.id, node.target);
        // Skip nodes subject refs that don't have targets
        if (!node.target) return;
        var pos = node.target.indexOf(subjectId);
        if (pos > -1) {
          if (opt.mode === "delete") {
            node.target.splice(pos, 1);
          } else {
            node.target[pos] = opt.newSubjectId;
            node.target = _.uniq(node.target);
          }
          hasChanged = true;
        }
        console.log('node.target#after', node.id, node.target);
      }
    });

    if (hasChanged) {
      db.updateDocument(docId, doc, function(err) {
        cb(err);
      });
    } else {
      console.log(docId, 'did not change... move along');
      cb(null);
    }
  });
}
 
 
/** 
 * Updates subject references in a document, either removing them or replacing them with a new subjectId
 *
 * @param {string} data - subject to be updated
 * @param {object} options - mode = delete|replace, replace mode has newSubjectId
 */
 
db.propagateSubjectChange = function(subjectId, opt, cb) {
   Document.find({}, 'id', {}, function(err, documents) {
    sUtil.async.each({
      items: documents,
      iterator: function(doc, cb) {
        db.updateSubjectForDoc(doc._id, subjectId, opt, cb);
      }
    }, function(err) {
      console.log('done with everything yay!');
      cb(err);
    });
  });
};


/** 
 * Start a new transaction for batch document operations
 *
 * @param {callback} cb - The callback that handles the results 
 */

db.beginTransaction = function(cb) {
  console.log('beginning transaction ...');
  // turn on maintenance mode
  db.setMaintenanceMode(true, function(err) {
    if (err) return cb(err);

    db.backupDocuments(cb);
  });
}

/** 
 * Cancel transaction to roll back document updates
 *
 * @param {callback} cb - The callback that handles the results 
 */

db.cancelTransaction = function(cb) {
  // Switch off maintenance mode after successful completion
  console.log('canceling transaction... rolling back document updates');
  db.restoreDocuments(function(err) {
    if (err) return err;
    db.setMaintenanceMode(false, cb);
  });
}


/** 
 * Commit transaction by turning off maintenance mode
 *
 * @param {callback} cb - The callback that handles the results 
 */ 

db.commitTransaction = function(cb) {
  console.log('commiting transaction...');
  db.setMaintenanceMode(false, cb);
}

/** 
 * Removes Subject record by unique id 
 *
 * @param {string} id - The unique id of target subject record
 * @param {callback} cb - The callback that handles the results 
 */


db.removeSubject = function(subjectId, cb) {

  // Unsave op (needs to be wrapped in a transaction)
  function updateDocsAndRemoveSubject(cb) {
    db.propagateSubjectChange(subjectId, {mode: "delete"}, function(err) {
      if (err) return cb(err);
      Subject.findByIdAndRemove(subjectId, function (err) {
        if (err) return cb(err);

        db.incrementSubjectsDBVersion(cb);
      });
    });
  }

  // Check if subject has children, if yes reject deletion
  Subject.find({parent: subjectId}, 'id', {}, function(err, subjects) {

    if (subjects.length > 0) {
      return cb('can not delete subject that has child subjects');
    }

    db.beginTransaction(function(err) {
      if (err) return cb(err);

      updateDocsAndRemoveSubject(function(err) {
        if (err) {
          db.cancelTransaction(function(terr) {
            if (terr) return cb(terr);
            cb(err);
          });          
        } else {
          db.commitTransaction(cb);
        }
      });
    });
  });
};



/** 
 * Merge Subjects
 *
 * @param {string} subjectId - Id of subject to merge
 * @param {string} newSubjectId - Id of subject to merge into
 * @param {callback} cb - The callback that handles the results 
 */

db.mergeSubjects = function(subjectId, newSubjectId, cb) {
  console.log("Let's merge " + subjectId + " into " + newSubjectId + "!");

  function updateDocsAndMergeSubjects(cb) {
    db.propagateSubjectChange(subjectId, {mode: "replace", newSubjectId: newSubjectId}, function(err) {
      if (err) return cb(err);
      Subject.findByIdAndRemove(subjectId, cb);
    });
  }

  // Check if subject has children, if yes reject deletion
  Subject.find({parent: subjectId}, 'id', {}, function(err, subjects) {
    if (subjects.length > 0) {
      return cb('can not merge subject that has child subjects');
    }

    db.beginTransaction(function(err) {
      if (err) return cb(err);

      updateDocsAndMergeSubjects(function(err) {
        if (err) {
          db.cancelTransaction(function(terr) {
            if (terr) return cb(terr);
            cb(err);
          });          
        } else {
          db.commitTransaction(cb);
        }
      });
    });
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
 * Make subjects backup
 *
 * @param {callback} cb - The callback that handles the results 
 */

db.makeSubjectsBackup = function(cb) {
  Subject.backup(cb);
}

/** 
 * Restore subjects backup
 *
 * @param {callback} cb - The callback that handles the results 
 */

db.restoreSubjectsBackup = function(cb) {
  Subject.restore(cb);
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
  delete data._id;
  delete data._v;

  User.findByIdAndUpdate(id, { $set: data }, function (err, user) {
    if (err) return next(err);
    cb(err, user);
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

/**
 * Increment subjects_db_version variable
 *
 * @param {callback} cb - The callback that handles the results 
 */

db.incrementSubjectsDBVersion = function(cb) {
  System.findOneAndUpdate({name: 'subjects_db_version'}, { $inc: {'version': 1 }}, {new: true, upsert: true}, function(err, variable) {
    cb(err, variable);
  });
}

/**
 * Get subjects_db_version variable
 *
 * @param {callback} cb - The callback that handles the results 
 */

db.getSubjectDBVersion = function(cb) {
  System.findOne({name: 'subjects_db_version'}, function(err, variable) {
    if (err) return err;
    cb(err, variable.get('version'));
  });
}

/**
 * Create a backup copy of all documents
 *
 * @param {callback} cb - The callback when backup job is done
 */

db.backupDocuments = function(cb) {
  Document.backup(cb);
}


/**
 * Restore from a previous backup snapshot
 *
 * @param {callback} cb - The callback when backup job is done
 */

db.restoreDocuments = function(cb) {
  Document.restore(cb);
}


/**
 * Turn maintenance mode on or off
 *
 * @param {boolean} on - true if maintenance mode should be turned on
 * @param {callback} cb - The callback when backup job is done
 * 
 * Note: we don't need a userId anymore for implicit maintenance mode
 */

db.setMaintenanceMode = function(on, cb) {
  try {
    var data = {
      on: on
    };
    
    db.setSystemVariable('maintenance', data, cb);
  } catch (e) {
    cb(err);
  }
}