const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

pool.connect()
  .then(client => {
    console.log("Database connected successfully!");
    client.release();
  })
  .catch(err => {
    console.error("Database connection failed:", err.message);
  });

module.exports = { db, pool };
