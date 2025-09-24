const AuthService = require('../services/auth.service');

// Le contrôleur fait le lien entre la requête HTTP et le service approprié.

const AuthController = {
  // Gère la requête d'inscription
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
      }

      const user = await AuthService.signup(email, password);
      res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Gère la requête de connexion
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  // Gère la requête de connexion/inscription via Meta
  metaLogin: async (req, res) => {
    try {
      const { accessToken } = req.body;
      if (!accessToken) {
        return res.status(400).json({ message: 'accessToken est requis.' });
      }
      const result = await AuthService.metaLogin(accessToken);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};

module.exports = AuthController;

