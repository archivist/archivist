var User = require('../models/user.js')
  , express = require('express')
  , passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , googleClient = {clientID: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET, callbackURL: process.env.GOOGLE_CALLBACK}
  , oauth = express.Router();

// OAUTH 2

var googleClient;

if(process.env.NODE_ENV == 'development') {
  googleClient = {
    clientID: '311588520740-f2dgfnpr2modtbjg8i06ec69e72lk89q.apps.googleusercontent.com',
    clientSecret: '1uvqMWT3BmbgQuKIBb4lr4IF',
    callbackURL: "http://localhost:5000/auth/google/callback"
  }
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.get(id, done);
});

passport.use(new GoogleStrategy(googleClient, function(accessToken, refreshToken, profile, done) {
  User.findOrCreate(profile, done);
}));

oauth.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log(req.url)
  console.log(req.url.indexOf('/documents'))
  if (req.url.indexOf('/documents') === 0 && req.method == 'PUT') {
    res.status(401);
    return res.send('Please login to continue');
  } else {
    res.redirect('/login');
  }
}

oauth.ensureSuperAuth = function(req, res, next) {
  if (req.isAuthenticated()) { 
    User.checkSuper(req, res, next);
  } else {
    res.redirect('/login');
  }
}

oauth.route('/auth/google')
  .get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] }),
    function(req, res){
    }
  );

oauth.route('/auth/google/callback')
  .get(passport.authenticate('google', { failureRedirect: '/access-error', failureFlash: true }),
    function(req, res) {
      res.redirect('/');
    }
  );

oauth.route('/access-error')
  .get(function(req, res){
    var title = req.flash('error')[0];
    res.render('error', { title: title, msg: 'Try to <a href="/login">login</a> later.' });
  });

oauth.route('/login')
  .get(function(req, res){
    res.render('login', { user: req.user });
  });

oauth.route('/logout')
  .get(function(req, res){
    req.logout();
    res.redirect('/login');
  });

module.exports = oauth;