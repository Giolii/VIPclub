const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use process.env to access environment variables
  ssl: {
    rejectUnauthorized: false, // Needed for some hosted databases like Heroku
  },
});

module.exports = { pool };
