const express = require('express');
const router = express.Router();
const { addToCart, updateCart, getCart, clearCart } = require('../controller/cart');
const { protect } = require('../middleware/auth');

router.post('/add', protect, addToCart);
router.put('/update', protect, updateCart);
router.get('/', protect, getCart);
router.delete('/clear', protect, clearCart);

module.exports = router;
