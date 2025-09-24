const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const UserController = require('../controllers/user.controller');

// Cette route est protégée par le middleware d'authentification.
// Le middleware 'auth' sera exécuté AVANT le contrôleur 'getMe'.
router.get('/me', authMiddleware, UserController.getMe);

module.exports = router;
