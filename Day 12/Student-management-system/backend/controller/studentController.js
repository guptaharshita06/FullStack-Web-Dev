// backend/controllers/studentController.js
const pool = require('../db');

const getAllStudents = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, name, email, branch, year FROM students ORDER BY id DESC'
        );
        res.json(result.rows);
        console.log('Fetched all students.');
    } catch (err) {
        console.error('Fetch Students Error:', err.message);
        res.status(500).json({ message: 'Failed to fetch students.' });
    }
};

module.exports = { getAllStudents };
