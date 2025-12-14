// server/routes/menu.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware Auth
const Menu = require('../models/Menu'); // Model Menu

// @route   GET api/menu
// @desc    Mendapatkan semua item menu (Public: Boleh diakses Frontend tanpa login)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/menu
// @desc    Menambahkan item menu baru (Private: Hanya Kasir/Admin)
// @access  Private (membutuhkan token)
router.post('/', auth, async (req, res) => {
    const { name, price, category } = req.body;
    try {
        const newItem = new Menu({
            name,
            price,
            category
        });
        const menu = await newItem.save();
        res.json(menu);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/menu/:id
// @desc    Update item menu (Private: Hanya Kasir/Admin)
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, price, category, isAvailable } = req.body;
    const menuFields = { name, price, category, isAvailable };

    try {
        let menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ msg: 'Menu not found' });

        menu = await Menu.findByIdAndUpdate(
            req.params.id,
            { $set: menuFields },
            { new: true }
        );
        res.json(menu);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/menu/:id
// @desc    Hapus item menu (Private: Hanya Kasir/Admin)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const result = await Menu.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ msg: 'Menu not found' });
        
        res.json({ msg: 'Menu removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;