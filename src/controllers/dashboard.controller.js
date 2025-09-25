const User = require('../models/user.model');

// Ce contrôleur gère la récupération des données pour le dashboard

const DashboardController = {
  getDashboardData: async (req, res) => {
    try {
      const userId = req.auth.userId;
      
      // 1. Récupérer les informations de l'utilisateur connecté
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }

      // 2. Simuler la récupération des nouvelles conversations (données factices)
      // NOTE: Plus tard, ces données viendront de notre base de données.
      const newConversations = [
        { id: 'conv1', from: 'Jean Dupont', platform: 'messenger', last_message: 'Bonjour, est-ce toujours disponible ?', unread: true },
        { id: 'conv2', from: 'Marie Curie', platform: 'instagram', last_message: 'Merci pour votre réponse rapide !', unread: false },
        { id: 'conv3', from: 'Albert Einstein', platform: 'messenger', last_message: 'Quel est le meilleur prix ?', unread: true },
      ];

      // 3. Simuler la récupération du top 5 des clients (données factices)
      // NOTE: Ces données viendront de notre mini-CRM.
      const topClients = [
        { id: 'client1', name: 'Alice Martin', total_spent: 450, last_interaction: '2025-09-23' },
        { id: 'client2', name: 'Bob Leblanc', total_spent: 320, last_interaction: '2025-09-22' },
        { id: 'client3', name: 'Carole Garcia', total_spent: 280, last_interaction: '2025-09-24' },
        { id: 'client4', name: 'David Petit', total_spent: 150, last_interaction: '2025-09-20' },
        { id: 'client5', name: 'Eve Simon', total_spent: 120, last_interaction: '2025-09-19' },
      ];
      
      // 4. Construire la réponse finale
      const dashboardData = {
        user,
        newConversations,
        topClients,
      };

      res.status(200).json(dashboardData);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur lors de la récupération des données du dashboard." });
    }
  },
};

module.exports = DashboardController;
