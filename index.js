const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get('/', (req, res) => res.send('Home'));

app.get('/failed', (req, res) => res.send('You failed to log in'));

app.get('/success', isLoggedIn, (req, res) => {
  res.send('Hello '+req.user.displayName)
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }), (req, res) => {
    res.redirect('/success');
  });

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

app.listen(4000, () => console.log('App running on port 4000 hehe'));