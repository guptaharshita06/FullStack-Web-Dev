const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
