// Importation des modules nécessaires
require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env
const express = require('express');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes'); // <-- Importer


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
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes); // <-- Utiliser les nouvelles routes



// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port ${PORT}`);
});



