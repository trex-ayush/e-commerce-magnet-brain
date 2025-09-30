const express = require('express');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

// API Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/order', require('./routes/order'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/product', require('./routes/product'));
app.use('/api/payment', require('./routes/payment'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
