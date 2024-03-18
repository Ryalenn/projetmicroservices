const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


app.use(session({
  secret: 'votre_secret',
  resave: false,
  saveUninitialized: true
}));



// Read the word list and store it in an array variable
const wordList = fs.readFileSync(path.join(__dirname, 'data', 'liste_francais_utf8.txt'), 'utf-8').split('\n');

// Function to generate a random number based on the current date
function generateRandomNumber() {
  const today = new Date();
  const seed = today.getDate(); // Using the day of the month as the seed
  return Math.abs(Math.floor(Math.sin(seed) * 10000)) % wordList.length;
}

app.use(express.static('www'));

// Create an API endpoint /word which returns the word corresponding to the generated random number
app.get('/word', (req, res) => {
  const randomNumber = generateRandomNumber();
  const word = wordList[randomNumber];
  console.log(word)
  res.send(word);
});

const os = require('os');

// API endpoint to return information about the running instance
app.get('/port', (req, res) => {
  res.send(`MOTUS APP running on ${os.hostname()} port ${port}`);
});



app.get('/health', (req, res) => {
  res.status(200).send('OK'); // Répond avec un statut 200 OK
});


const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) { // Vérifie si la session ou req.session.user est définie
    return res.redirect('http://localhost:5000/authorize?clientid=YOUR_CLIENT_ID&scope=openid&redirect_uri=http://localhost:3000/callback');
  }
  next();
};

app.get('/game', requireAuth, (req, res) => {
  // Code de la route /game
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
