// server/server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB(); // Hubungkan ke DB

app.use(express.json()); // Middleware untuk parsing JSON
app.use(cors()); // Izinkan akses dari Frontend

// Routes (Akan kita buat berikutnya)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/order'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));