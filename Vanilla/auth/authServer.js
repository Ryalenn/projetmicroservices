const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.get('/authorize', (req, res) => {
  const { clientid, scope, redirect_uri } = req.query || {};
  // Vous pouvez utiliser les valeurs de clientid, scope et redirect_uri ici
});

const validateCredentials = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user || user.password !== password) {
    return res.send('Login failed. Please try again.');
  }

  req.session.user = username;
  return res.redirect(req.query.redirect_uri + '?code=XXXXX');
};

app.post('/login', validateCredentials);

app.listen(5000, () => {
  console.log('Auth server running on port 5000');
});
