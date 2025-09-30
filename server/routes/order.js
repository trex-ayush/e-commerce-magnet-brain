const express = require("express");
const router = express.Router();
const {
  placeOrderCOD,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
} = require("../controller/order");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/placeCod", protect, placeOrderCOD);
router.get("/myOrders", protect, getUserOrders);
router.get("/all", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.get("/:id", protect, getOrderById);

module.exports = router;
