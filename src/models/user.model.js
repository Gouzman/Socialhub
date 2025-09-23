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
};

module.exports = User;