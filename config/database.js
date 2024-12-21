const { Pool } = require("pg");
require("dotenv").config();

console.log("Current environment:", process.env.NODE_ENV);
console.log("Railway environment:", process.env.RAILWAY_ENVIRONMENT);
console.log("Database URL exists:", !!process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
  // Only log the start of the URL to avoid exposing credentials
  console.log(
    "Database URL starts with:",
    process.env.DATABASE_URL.split("@")[0].split(":")[0]
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.RAILWAY_ENVIRONMENT === "production"
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
});

module.exports = { pool };
