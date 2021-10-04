const express = require('express');
const router = express.Router();
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model').User;

const GOOGLE_CLIENT_KEY = process.env.GOOGLE_CLIENT_KEY || 'DEFAULT_GOOGLE_CLIENT_KEY';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'DEFAULT_GOOGLE_CLIENT_SECRET';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'DEFAULT_GOOGLE_CALLBACK_URL';

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
        done(null, user);
    })
});

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_KEY,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
    },
    function(token, tokenSecret, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
      res.append('Access-Control-Allow-Origin', 'true');
  });

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.logout();
});

module.exports = {
    base: "/auth",
    handler: router
};