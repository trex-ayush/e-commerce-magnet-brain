const Order = require("../models/order");
const Cart = require("../models/cart");

exports.placeOrderCOD = async (req, res) => {
  try {
    const { items } = req.body;
    let products = items;
    if (!Array.isArray(products) || products.length === 0) {
      const cart = await Cart.findOne({ user: req.user.id });
      if (!cart || cart.products.length === 0)
        return res.status(400).json({ message: "Cart is empty" });
      products = cart.products;
    }

    const normalized = products.map((p) => ({
      productId: String(p.productId || p.id),
      name: p.name || p.title,
      price: Number(p.price),
      quantity: Number(p.quantity || 1),
      thumbnail: p.thumbnail || '',
    }));

    const total = normalized.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const order = new Order({
      user: req.user.id,
      products: normalized,
      total,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      status: "Pending",
      customerEmail: req.user.email,
    });

    await order.save();
    await Cart.findOneAndDelete({ user: req.user.id });

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error placing order" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all orders" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error updating order" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order" });
  }
};
