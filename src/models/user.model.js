const db = require('../config/db');

// Le modèle interagit directement avec la base de données.

const User = {
  // Crée un nouvel utilisateur dans la BDD
  create: async (email, password) => {
    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email, created_at;
    `;
    const values = [email, password];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  // Trouve un utilisateur par son email
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1;';
    const { rows } = await db.query(query, [email]);
    return rows[0];
  },

  // Trouve un utilisateur par son ID Meta (Facebook)
  findByMetaId: async (metaId) => {
    const query = 'SELECT * FROM users WHERE meta_id = $1;';
    const { rows } = await db.query(query, [metaId]);
    return rows[0];
  },

  // Crée un nouvel utilisateur à partir des données Meta
  createFromMeta: async (metaId, email, fullName, profilePictureUrl) => {
    const query = `
      INSERT INTO users (meta_id, email, full_name, profile_picture_url)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, full_name, meta_id;
    `;
    const values = [metaId, email, fullName, profilePictureUrl];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  // Trouve un utilisateur par son ID
  findById: async (id) => {
    // On exclut le mot de passe du résultat pour la sécurité
    const query = 'SELECT id, email, full_name, profile_picture_url, created_at FROM users WHERE id = $1;';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },
};

module.exports = User;

