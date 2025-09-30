const express = require('express');
const router = express.Router();
const { createCheckoutSession, confirmPayment } = require('../controller/payment');
const { protect } = require('../middleware/auth');

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/confirm', protect, confirmPayment);

module.exports = router;


