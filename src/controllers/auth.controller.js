const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

// Le service contient la logique métier complexe.

const AuthService = {
  // Service pour l'inscription d'un utilisateur
  signup: async (email, password) => {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('Cet email est déjà utilisé.');
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const newUser = await User.create(email, hashedPassword);
    return newUser;
  },

  // Service pour la connexion d'un utilisateur
  login: async (email, password) => {
    // Trouver l'utilisateur
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Email ou mot de passe incorrect.');
    }

    // Vérifier le mot de passe
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Email ou mot de passe incorrect.');
    }

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { token, userId: user.id };
  },
};

module.exports = AuthService;

