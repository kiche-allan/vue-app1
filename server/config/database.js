const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "todo_app",
  password: process.env.DB_PASSWORD || "yourpassword",
  port: process.env.DB_PORT || 5432,
});

// Test connection (non-blocking)
pool.connect((err, client, release) => {
  if (err) {
    console.error(
      "Warning: Database connection error (will retry on request):",
      err.message
    );
    release && release();
  } else {
    console.log("✓ Connected to PostgreSQL database");
    release();
  }
});

// Handle connection errors gracefully
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

module.exports = pool;
