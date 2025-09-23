const express = require('express');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

// Définition des endpoints pour l'authentification
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

module.exports = router;

