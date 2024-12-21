const { Pool } = require("pg");

// Helper function to determine if we're in production
const isProduction = process.env.RAILWAY_ENVIRONMENT === "production";

// Configure the database pool with conditional SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : undefined,
});

module.exports = { pool };
