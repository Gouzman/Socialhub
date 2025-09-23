// Importation des modules nécessaires
require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env
const express = require('express');
const authRoutes = require('./src/routes/auth.routes');

// Initialisation de l'application Express
const app = express();

// Middleware pour parser le JSON dans les corps de requête
app.use(express.json());

// Définition du port
const PORT = process.env.PORT || 3000;

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de Social Seller Hub !');
});

// Utilisation des routes d'authentification
app.use('/api/auth', authRoutes);


// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT}`);
});

