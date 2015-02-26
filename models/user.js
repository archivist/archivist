// The User model
 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , util = require('../controllers/util.js');
 
var userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    picture: String,
    access: {type: Boolean, default: false},
    super: {type: Boolean, default: false}
});


/** 
 * Creates User record from Google profile
 *
 * @param {string} profile - Google OAuth profile
 * @param {callback} cb - The callback that handles the results 
 */

userSchema.statics.create = function(profile, cb) {
  new this({
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

userSchema.statics.get = function(id, done) {
  this.findOne({id: id}, function(err, user) {
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

userSchema.statics.update = function(id, data, cb) {
  delete data._id;
  delete data._v;

  this.findByIdAndUpdate(id, { $set: data }, function (err, user) {
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

userSchema.statics.delete = function(id, cb) {
  this.findByIdAndRemove(id, function (err) {
    cb(err);
  });
}


/** 
 * List Users
 *
 * @param {string} opt - The query options from request
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
 * @param {string} profile - The unique profile of target user record
 * @param {callback} done - Defered done method which handles the results 
 */

userSchema.statics.findOrCreate = function(profile, done) {
  var self = this;
  self.findOne({id: profile._json.id}, function(err, user) {
    if (err) return next(err);
    if (user) {
      if (user.access) {
        return done(null, profile);
      } else {
        return done(null, false, { message: 'You have no access. Sorry. See you.' });    
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
 

module.exports = mongoose.model('User', userSchema);