const AuthService = require('../services/auth.service');

const AuthController = {
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
      }
      const user = await AuthService.signup(email, password);
      res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
      // AJOUT : Affiche l'erreur complète dans la console du serveur pour le débogage
      console.error("ERREUR LORS DE L'INSCRIPTION :", error); 
      res.status(400).json({ message: error.message || "Une erreur est survenue lors de la création de l'utilisateur." });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      // AJOUT : Affiche l'erreur complète dans la console du serveur pour le débogage
      console.error("ERREUR LORS DE LA CONNEXION :", error);
      res.status(401).json({ message: error.message || "Email ou mot de passe incorrect." });
    }
  },
  
  metaLogin: async (req, res) => {
    try {
      const { accessToken } = req.body;
      if (!accessToken) {
        return res.status(400).json({ message: "Le jeton d'accès Meta est requis." });
      }
      const result = await AuthService.metaLogin(accessToken);
      res.status(200).json(result);
    } catch (error) {
      // AJOUT : Affiche l'erreur complète dans la console du serveur pour le débogage
      console.error("ERREUR LORS DE LA CONNEXION META :", error);
      res.status(401).json({ message: error.message || "Une erreur est survenue lors de la connexion via Meta." });
    }
  }
};

module.exports = AuthController;

