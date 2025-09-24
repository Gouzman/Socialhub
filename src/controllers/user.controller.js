const User = require('../models/user.model');

// Ce contrôleur gère les actions liées aux utilisateurs

const UserController = {
  // Récupère le profil de l'utilisateur actuellement connecté
  getMe: async (req, res) => {
    try {
      // L'ID de l'utilisateur a été ajouté à req.auth par le middleware
      const userId = req.auth.userId;
      
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error); // Affiche l'erreur réelle dans la console du serveur
      res.status(500).json({ message: "Erreur serveur lors de la récupération de l'utilisateur." });
    }
  },
};

module.exports = UserController;

