// server/routes/auth.js (Kerangka Logic)
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import model User

// @route   POST api/auth/register
// @desc    Register user (Hanya untuk inisiasi awal admin/kasir)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // 1. Cek User exist
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: 'User already exists' });
        
        // 2. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Save User
        user = new User({ username, password: hashedPassword });
        await user.save();
        
        res.status(201).json({ msg: 'User Registered' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
        
        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
        
        // Beri Token (JWT)
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;