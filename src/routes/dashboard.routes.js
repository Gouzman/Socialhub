const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const DashboardController = require('../controllers/dashboard.controller');

// La route racine ('/') de ce routeur correspondra à '/api/dashboard'
// car nous l'enregistrerons avec ce préfixe dans server.js.
// Elle est protégée par le middleware d'authentification.
router.get('/', authMiddleware, DashboardController.getDashboardData);

module.exports = router;
