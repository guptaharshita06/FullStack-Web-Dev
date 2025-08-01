// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const pool = require('../db');

const registerStudent = async (req, res) => {
    const { name, email, password, branch, year } = req.body;
    try {
        // Check if email exists
        const existing = await pool.query('SELECT id FROM students WHERE email = $1', [email]);
        if (existing.rows.length) {
            return res.status(400).json({ message: 'Email already registered.' });
        }
        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Insert student
        await pool.query(
            'INSERT INTO students (name, email, password, branch, year) VALUES ($1, $2, $3, $4, $5)',
            [name, email, hashed, branch, year]
        );
        console.log('Student registered:', email);
        res.status(201).json({ message: 'Registration successful!' });
    } catch (err) {
        console.error('Register Error:', err.message);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

const loginStudent = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
        if (!result.rows.length) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }
        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }
        // Usually, session/token is set here, keeping it simple per your requirement
        console.log('Login success:', email);
        res.json({ message: 'Login successful!' });
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

module.exports = { registerStudent, loginStudent };
