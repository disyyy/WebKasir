// server/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: [{
        menuItem: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Menu', // Referensi ke model Menu
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true 
        }
    }],
    totalAmount: { 
        type: Number, 
        required: true 
    },
    orderStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending' 
    },
    // Jika Anda ingin tahu siapa yang membuat pesanan (opsional, jika Anda implementasi relasi user)
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Order', OrderSchema);