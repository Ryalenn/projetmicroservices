const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


const wordList = fs.readFileSync(path.join(__dirname, 'data', 'liste_francais_utf8.txt'), 'utf-8').split('\n');


function generateRandomNumber() {
  const today = new Date();
  const seed = today.getDate();
  return Math.abs(Math.floor(Math.sin(seed) * 10000)) % wordList.length;
}

app.use(express.static('www'));


app.get('/word', (req, res) => {
  const randomNumber = generateRandomNumber();
  const word = wordList[randomNumber];
  res.send(word);
});

const os = require('os');


app.get('/port', (req, res) => {
  res.send(`MOTUS APP running on ${os.hostname()} port ${port}`);
});



app.get('/health', (req, res) => {
  res.status(200).send('OK'); 
});




app.get('/port', (req, res) => {
  const hostname = os.hostname(); 
  const portNumber = port; 
  res.send(`MOTUS APP working on ${hostname} port ${portNumber}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('http://localhost:5000/authorize?clientid=YOUR_CLIENT_ID&scope=openid&redirect_uri=http://localhost:3000/callback');
  }
  next();
};

app.get('/game', requireAuth, (req, res) => {
});