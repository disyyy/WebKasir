// server/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware untuk memverifikasi token dari header
module.exports = function (req, res, next) {
    // Ambil token dari header
    const token = req.header('x-auth-token'); 

    // Cek jika tidak ada token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verifikasi token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        req.user = decoded.user; // Menambahkan user payload ke request
        next(); // Lanjutkan ke route selanjutnya
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};