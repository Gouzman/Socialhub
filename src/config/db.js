// Importation du module 'pg'
const { Pool } = require('pg');

// Création d'un nouveau pool de connexions à la base de données
// Les informations de connexion sont automatiquement lues depuis les variables d'environnement
// PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Exportation de l'objet pool pour pouvoir l'utiliser dans d'autres parties de l'application
// notamment pour exécuter des requêtes SQL.
module.exports = {
  query: (text, params) => pool.query(text, params),
};
