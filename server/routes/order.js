// server/routes/order.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order'); // Model Order (sudah dibuat di Model sebelumnya)

// @route   POST api/orders
// @desc    Membuat pesanan baru (Private: Hanya Kasir/Admin)
// @access  Private (membutuhkan token)
router.post('/', auth, async (req, res) => {
    // items: [{ menuItem, quantity }], totalAmount
    const { items, totalAmount } = req.body; 
    
    try {
        const newOrder = new Order({
            items,
            totalAmount,
            // Anda bisa menyimpan ID user yang membuat pesanan jika diperlukan:
            // createdBy: req.user.id 
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/orders
// @desc    Mendapatkan semua daftar pesanan (Private: Hanya Kasir/Admin)
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // Mendapatkan semua pesanan, dan populate data menu
        const orders = await Order.find().sort({ createdAt: -1 }); 
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/orders/:id
// @desc    Mengubah status pesanan (misal: pending -> completed)
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { orderStatus } = req.body;
    try {
        let order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order.orderStatus = orderStatus;
        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;