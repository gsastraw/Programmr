const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_KEY = '1053310788215-dotkr3r02rmma7cdhvmutjf62ttpaj0n.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'xdO3ZMl-QHHmqSmOr1gIWXZs';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
      done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_KEY,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));