// backend/server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');  // Import from correct path
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET all students
app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST new student
app.post('/students', async (req, res) => {
  const { name, email, course } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO students (name, email, course) VALUES ($1, $2, $3) RETURNING *',
      [name, email, course]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
