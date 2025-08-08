// backend/db/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(client => {
    return client.query('SELECT current_database();')
      .then(res => {
        console.log(`🛢️  Connected to PostgreSQL Database: ${res.rows[0].current_database}`);
        client.release();
      })
      .catch(err => {
        client.release();
        console.error('❌ Error fetching DB name', err.stack);
      });
  })
  .catch(err => {
    console.error('❌ Failed to connect to the database', err.stack);
  });

module.exports = pool;
