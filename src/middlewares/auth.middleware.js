const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // 1. Récupérer le token de l'en-tête 'Authorization'
    // Le format attendu est "Bearer VOTRE_TOKEN"
    const token = req.headers.authorization.split(' ')[1];
    
    // 2. Décoder le token en utilisant le secret JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Extraire l'ID de l'utilisateur du token décodé
    const userId = decodedToken.userId;

    // 4. Attacher l'ID de l'utilisateur à l'objet 'req' pour qu'il soit accessible
    // dans les routes suivantes.
    req.auth = {
      userId: userId
    };

	// 5. Passer au prochain middleware ou à la logique de la route
	next();
  } catch(error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Requête non authentifiée !' });
  }
};
