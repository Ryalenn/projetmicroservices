const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Endpoint pour enregistrer le score d'un joueur
app.post('/setscore', (req, res) => {
    const { player, score } = req.body;

    // Code pour enregistrer le score dans un fichier plat

    res.status(200).send('Score enregistré avec succès');
});

// Endpoint pour récupérer le score d'un joueur
app.get('/getscore', (req, res) => {
    // Code pour récupérer le score depuis le fichier plat

    res.status(200).send(score);
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
