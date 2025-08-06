// backend/routes/students.js
const express = require('express');
const { getAllStudents } = require('../controllers/studentController');
const router = express.Router();

router.get('/students', getAllStudents);

module.exports = router;
