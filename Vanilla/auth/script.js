
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'Lesgolems',
  resave: false,
  saveUninitialized: true
}));

app.get('/session', (req, res) => {
  res.send(JSON.stringify(req.session));
});

app.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login.html");
  }
});

const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    console.log('User not authenticated. Redirecting...');
    return res.redirect('http://localhost:5000/authorize?clientid=YOUR_CLIENT_ID&scope=openid&redirect_uri=http://localhost:3000/callback');
  }
  next();
};


app.get('/game', requireAuth, (req, res) => {
});
