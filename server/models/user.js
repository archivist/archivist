// The User model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , jwt = require('jsonwebtoken')
  , _ = require('underscore')
  , util = require('../controllers/api/utils.js');
 
var userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    picture: String,
    access: {type: Boolean, default: false},
    super: {type: Boolean, default: false},
    issuedTokens: [String]
});

userSchema.statics.secret = process.env.AUTH_SECRET || 'archivistSecret';

/** 
 * Creates User record from Google profile
 *
 * @param {object} profile - Google OAuth profile
 * @param {callback} cb - The callback that handles the results 
 */

userSchema.statics.create = function(profile, cb) {
  new this({
    id: profile._json.id,
    name: profile._json.displayName,
    email: profile._json.emails[0].value,
    picture: profile._json.image.url
  }).save(function(err){
    cb(err);
  });
}


/** 
 * Gets User record by unique id 
 *
 * @param {string} id - The unique id of target user record
 * @param {callback} cb - The callback that handles the results
 */

userSchema.statics.get = function(id, cb) {
  this.findById(id, function(err, user) {
    cb(err, user);
  })
}


/** 
 * Updates User record unique JSON
 *
 * @param {string} id - The unique id of target user record
 * @param {object} data - JSON with updated properties
 * @param {callback} cb - The callback that handles the results 
 */

userSchema.statics.change = function(id, data, cb) {
  delete data._id;
  delete data.__v;
  this.findByIdAndUpdate(id, { $set: data }, {new: true}, function (err, user) {
    if (err) return next(err);
    if (data.access != user.access && data.super != user.super) {
      self.revokeTokens(user._id, function(err, user) {
        cb(err, user);
      });
    } else {
      cb(err, user);
    }
  });
} 


/** 
 * Removes User record by unique id 
 *
 * @param {string} id - The unique id of target user record
 * @param {callback} cb - The callback that handles the results 
 */

userSchema.statics.delete = function(id, cb) {
  this.findByIdAndRemove(id, function (err) {
    cb(err);
  });
}


/** 
 * List Users
 *
 * @param {object} opt - The query options from request
 * @param {callback} cb - The callback that handles the results 
 */

userSchema.statics.list = function(opt, cb) {
  var self = this,
      query = util.getQuery(opt.query),
      options = util.getOptions(opt);

  self.count(query, function(err, counter) {
    if (err) return cb(err);
    self.find(query, null, options, function(err, records) {
      cb(err, [{total_entries: counter}, records]);
    });
  });
}


/** 
 * Find User profile or create new one
 *
 * @param {object} profile - The unique profile of target user record
 * @param {callback} done - Defered done method which handles the results 
 */

userSchema.statics.findOrCreate = function(profile, done) {
  var self = this;
  self.findOne({id: profile._json.id}, function(err, user) {
    if (err) return next(err);
    if (user) {
      if (user.access) {
        return done(null, user);
      } else {
        return done(null, false);    
      } 
    } else {
      self.create(profile, function(err) {
        if (err) return next(err);
        return done(null, false, { message: 'Thank you! We will check your information and give you access. Maybe.' }); 
      });
    }
  });
}


/** 
 * Check access for User profile and continue or redirect to main page
 */

userSchema.statics.checkSuper = function(req, res, next) {
  var self = this;
  self.findOne({email: req.user.email}, function(err, user) {
    if(user.access && user.super) {
      return next();
    } else {
      res.redirect('/');
    }
  });
}


/** 
 * Issue auth token with user access scopes
 *
 * @param {object} profile - User record from database
 * @param {callback} cb - The callback that handles the results
 */

userSchema.statics.issueToken = function(profile, cb) {
  var self = this;

  var payload = {
    scopes: []
  };

  if(profile.access) payload.scopes.push('access');
  if(profile.super) payload.scopes.push('super');
          
  var token = jwt.sign(payload, self.secret, {
    issuer: profile._id,
    expiresInMinutes: 60*24*7 // expires in 7 days
  });
  self.removeInvalidTokens(profile, function(err, cleandProfile) {
    if(err) return cb(err);
    self.findOneAndUpdate(
      {_id: cleandProfile._id},
      {$push: {issuedTokens: token}},
      {safe: true, upsert: true},
      function(err, user) {
        return cb(err, {
          token: token,
          user: {
            username: user.name,
            picture: user.picture
          }
        });  
      }
    );
  })
}

 
/** 
 * Revoke given auth token
 *
 * @param {string} user - User unique id
 * @param {string} token - Token to revoke
 * @param {callback} cb - The callback that handles the results
 */

userSchema.statics.revokeToken = function(user, token, cb) {
  var self = this;
  self.findOneAndUpdate(
    {_id: user},
    {$pull: {issuedTokens: token}},
    {new: true},
    function(err, user) {
      cb(err, user)
    }
  );
}


/** 
 * Revoke all tokens
 *
 * @param {string} user - User unique id
 * @param {callback} cb - The callback that handles the results
 */

userSchema.statics.revokeTokens = function(user, cb) {
  var self = this;
  self.findOneAndUpdate(
    {_id: user},
    {issuedTokens: []},
    {new: true},
    function(err, user) {
      cb(err, user)
    }
  );
}


/** 
 * Removes invalid tokens (outdated etc) from user database record
 *
 * @param {object} profile - User record from database
 * @param {callback} cb - The callback that handles the results
 */

userSchema.statics.removeInvalidTokens = function(profile, cb) {
  var self = this;
  var tokens = profile.issuedTokens;
  var invalid = [];

  _.each(tokens, function(token){
    jwt.verify(token, self.secret, function(err, decoded) {
      if (err) {
        invalid.push(token);
      }
    });
  });

  self.findOneAndUpdate(
    {_id: profile._id},
    {$pull: {issuedTokens: invalid}},
    {new: true},
    function(err, user) {
      cb(err, user)
    }
  );
}


/** 
 * Checks if given token exists and related to given user
 *
 * @param {string} user - User unique id
 * @param {string} token - Provided token
 * @param {callback} cb - The callback that handles the results
 */

userSchema.statics.checkTokenExistance = function(user, token, cb) {
  var self = this;
  self.findById(user, 'issuedTokens', function(err, profile) {
    if(err) return cb(err);
    var check = _.contains(profile.issuedTokens, token);
    cb(null, check);
  });
}


/** 
 * Renew given token for given user
 *
 * @param {string} user - User unique id
 * @param {string} token - Provided token
 * @param {callback} cb - The callback that handles the results
 */

userSchema.statics.renewToken = function(user, token, cb) {
  var self = this;
  self.get(user, function(err, profile) {
    if(err) return cb(err);
    self.issueToken(profile, function(err, tokenData) {
      if(err) return cb(err);
      self.revokeToken(user, token, function(err){
        cb(err, tokenData);
      });
    });
  });
}

module.exports = mongoose.model('User', userSchema);