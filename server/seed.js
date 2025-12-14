// server/seed.js
const mongoose = require('mongoose');
const Menu = require('./models/Menu');
require('dotenv').config();

// Daftar Menu Awal
const menuItems = [
    { name: 'Espresso', price: 25000, category: 'Minuman Kopi' },
    { name: 'Latte', price: 35000, category: 'Minuman Kopi' },
    { name: 'Croissant', price: 20000, category: 'Snack' },
    { name: 'Nasi Goreng Kampung', price: 45000, category: 'Makanan Berat' },
    { name: 'Ice Lemon Tea', price: 18000, category: 'Minuman Non-Kopi' },
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB Connected for Seeding...');
    } catch (err) {
        console.error(`DB Connection Error: ${err.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    await connectDB();
    try {
        // Hapus data menu yang sudah ada (opsional)
        await Menu.deleteMany(); 
        
        // Masukkan data baru
        await Menu.insertMany(menuItems);
        
        console.log('✨ Data Menu berhasil di-import!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error importing data: ${error}`);
        process.exit(1);
    }
};

importData();