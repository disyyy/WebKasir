const mongoose = require('mongoose');
require('dotenv').config(); // Untuk membaca MONGO_URI dari .env

const connectDB = async () => {
    try {
            await mongoose.connect(process.env.MONGO_URI);
        
        console.log('✅ MongoDB Connected...');
    } catch (err) {
        console.error(`❌ DB Connection Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;