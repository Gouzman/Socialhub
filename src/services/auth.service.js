const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // Importer axios
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

  // Service pour la connexion/inscription via Meta
  metaLogin: async (accessToken) => {
    try {
      // 1. Vérifier l'accessToken auprès de Facebook et récupérer les infos utilisateur
      const { data } = await axios.get(
        `https://graph.facebook.com/v15.0/me?fields=id,name,email,picture&access_token=${accessToken}`
      );

      const { id: metaId, name: fullName, email, picture } = data;
      const profilePictureUrl = picture?.data?.url;

      if (!metaId) {
        throw new Error("Token Meta invalide.");
      }

      // 2. Vérifier si un utilisateur avec cet ID Meta existe déjà
      let user = await User.findByMetaId(metaId);

      // 3. Si l'utilisateur n'existe pas, le créer
      if (!user) {
        user = await User.createFromMeta(metaId, email, fullName, profilePictureUrl);
      }
      
      // 4. Générer notre propre token JWT pour cet utilisateur
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return { token, userId: user.id };

    } catch (error) {
      // Gérer les erreurs d'API de Facebook
      console.error("Erreur d'API Meta:", error.response?.data?.error);
      throw new Error("L'authentification Meta a échoué.");
    }
  },
};

module.exports = AuthService;

