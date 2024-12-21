const { Pool } = require("pg");

// Helper function to determine if we're in production
const isProduction = process.env.RAILWAY_ENVIRONMENT === "production";

// Configure the database pool with conditional SSL
const pool = new Pool({
  connectionString:
    "postgresql://postgres:fhryxfrovPXGPYqrfGFcDlUdpcOfQwhC@postgres-_nwi.railway.internal:5432/railway",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = { pool };
