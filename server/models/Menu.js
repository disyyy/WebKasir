const mongoose = require('mongoose');
const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // Makanan, Minuman, Snack
    isAvailable: { type: Boolean, default: true }
});
module.exports = mongoose.model('Menu', MenuSchema);