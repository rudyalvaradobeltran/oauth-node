const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: 'ola k ase',
    clientSecret: 'ola k ase',
    callbackURL: 'http://localhost:4000/google/callback',
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
