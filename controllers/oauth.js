var db = require('./db.js')
  , express = require('express')
  , passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , googleClient = {clientID: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET, callbackURL: process.env.GOOGLE_CALLBACK}
  , oauth = express.Router();

// OAUTH 2

if(process.env.NODE_ENV == 'development') {
  var googleClient = {
    clientID: '118330780636-1cv5qsmnplhehli10eurk8ti2bq2orh0.apps.googleusercontent.com',
    clientSecret: 'wxMAnE2M4jAczrY0TLAFCUuI',
    callbackURL: "http://localhost:5000/auth/google/callback"
  }
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  db.getUser(id, done);
});

passport.use(new GoogleStrategy(googleClient, function(accessToken, refreshToken, profile, done) {
  db.findOrCreateUser(profile, done);
}));

oauth.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

oauth.ensureSuperAuth = function(req, res, next) {
  if (req.isAuthenticated()) { 
    db.checkSuperUser(req, res, next);
  } else {
    res.redirect('/login');
  }
}

oauth.route('/auth/google')
  .get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'] }),
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