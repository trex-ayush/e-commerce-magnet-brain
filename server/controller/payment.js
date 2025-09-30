const Stripe = require('stripe');
require('dotenv').config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

exports.createCheckoutSession = async (req, res) => {
  try {
    if (!stripe) {
      console.error('Stripe key missing: set STRIPE_SECRET_KEY in environment');
      return res.status(500).json({ message: 'Payment is not configured. Contact support.' });
    }
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items to checkout' });
    }

    const lineItems = items.map((item) => {
      const unitAmount = Math.round(Number(item.price) * 100);
      const quantity = Number(item.quantity || 1);
      if (!isFinite(unitAmount) || unitAmount <= 0 || !isFinite(quantity) || quantity <= 0) {
        throw new Error('Invalid item price or quantity');
      }
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title || item.name || 'Item',
          },
          unit_amount: unitAmount,
        },
        quantity,
      };
    });

    const successUrl = (process.env.FRONTEND_URL || 'http://localhost:5173') + '/payment-success?session_id={CHECKOUT_SESSION_ID}';
    const cancelUrl = (process.env.FRONTEND_URL || 'http://localhost:5173') + '/cart?payment=cancelled';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: String(req.user.id),
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe session error:', err?.message || err);
    res.status(500).json({ message: err?.message || 'Failed to create checkout session' });
  }
};

// Confirm payment by retrieving session and create order
exports.confirmPayment = async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ message: 'Payment not configured' });
    const { sessionId, items } = req.body;
    if (!sessionId) return res.status(400).json({ message: 'Missing sessionId' });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: 'Payment not completed' });
    }
    const products = (Array.isArray(items) ? items : []).map((p) => ({
      productId: String(p.productId || p.id),
      name: p.name || p.title,
      price: Number(p.price),
      quantity: Number(p.quantity || 1),
      thumbnail: p.thumbnail || '',
    }));
    const total = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

    const Order = require('../models/order');
    const Cart = require('../models/cart');

    const order = await Order.create({
      user: req.user.id,
      products,
      total,
      paymentMethod: 'Stripe',
      paymentStatus: 'Paid',
      transactionId: session.payment_intent || session.id,
      customerEmail: session.customer_details?.email,
      status: 'Completed',
    });
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json(order);
  } catch (err) {
    console.error('Confirm payment error:', err?.message || err);
    res.status(500).json({ message: 'Failed to confirm payment' });
  }
};


