const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path'); // Module pour la gestion des chemins de fichiers
const jwt = require('jsonwebtoken');

const app = express();

// Configuration de la session
app.use(session({
  secret: 'secretKey', // Clé secrète pour signer les cookies de session
  resave: false,
  saveUninitialized: true
}));

const users = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gestion des fichiers statiques (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour vérifier si l'utilisateur est connecté
app.use((req, res, next) => {
    const authRoutes = ['/login.html', '/login', '/register.html', '/register', '/authorize'];
    
    if (req.session.user || authRoutes.includes(req.path)) {
      next();
    } else {
      res.redirect("http://localhost:5000/authorize?clientid=YOUR_CLIENT_ID&scope=openid&redirect_uri=http://localhost:3000/callback");
    }
  });

// Route pour afficher le contenu de la session
app.get('/session', (req, res) => {
  res.send(JSON.stringify(req.session));
});

// Route pour le formulaire de connexion (GET)
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route pour le traitement du formulaire de connexion (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.send('Login failed. Please try again.');
  }

  req.session.user = username;
  res.redirect('/game');
});

// Route pour le formulaire d'enregistrement (GET)
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Route pour le traitement du formulaire d'enregistrement (POST)
app.post('/register', (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (users.some(u => u.username === username)) {
    return res.send('Username already exists. Please choose another one.');
  }

  if (password !== confirmPassword) {
    return res.send('Passwords do not match. Please try again.');
  }

  try {
    // Hashage sécurisé du mot de passe avant de le stocker
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    users.push({ username, password: hashedPassword });
    res.send('User registered successfully.');
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).send('Internal server error.');
  }
});

// Route pour la page principale du jeu
app.get('/game', (req, res) => {
  res.send('Welcome to the game!');
});

// Route pour la redirection depuis le serveur d'authentification
app.get('/callback', (req, res) => {
  const { code } = req.query;

  // Ici, vous devriez valider le code reçu avec ce que vous avez stocké précédemment

  // Exemple de génération d'un token JWT
  const token = jwt.sign({ username: req.session.user }, 'secretKey');
  
  // Redirection vers votre application avec le token dans l'URL
  res.redirect(`http://localhost:3000/game?token=${token}`);
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
