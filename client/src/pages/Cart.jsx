import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Cart = () => {
  const { cart, setCart } = useAppContext();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/order/placeCod", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart })
      });

      const data = await res.json();
      if (res.status === 200) {
        setCart([]);
        setOrderPlaced(true); // Show thank you message
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Error placing order");
    }
  };

  const handleStripeCheckout = async () => {
    if (cart.length === 0) return alert("Cart is empty");
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || "Failed to start checkout");
      }
    } catch (err) {
      console.log(err);
      alert("Error starting checkout");
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (orderPlaced) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
        style={{ backgroundColor: "#EFEBE9" }}
      >
        <div
          className="p-8 rounded-xl shadow-md"
          style={{ backgroundColor: "#D7CCC8", border: "1px solid #A1887F" }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Thank You!</h2>
          <p className="mb-6 text-gray-700">Your order has been placed successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#EFEBE9" }}>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Cart</h1>
      <div className="flex flex-col gap-4">
        {cart.length === 0 && (
          <p className="text-gray-700 text-center">Your cart is empty</p>
        )}
        {cart.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-lg shadow"
            style={{ backgroundColor: "#D7CCC8" }}
          >
            <div className="flex items-center gap-4">
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt={item.title || item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="text-gray-800">
                <p className="font-medium">{item.title || item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => {
                      const updated = [...cart];
                      const nextQty = Math.max(1, updated[i].quantity - 1);
                      updated[i] = { ...updated[i], quantity: nextQty };
                      setCart(updated);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      const val = Math.max(1, Number(e.target.value) || 1);
                      const updated = [...cart];
                      updated[i] = { ...updated[i], quantity: val };
                      setCart(updated);
                    }}
                    className="w-16 p-1 border rounded text-center"
                  />
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => {
                      const updated = [...cart];
                      updated[i] = { ...updated[i], quantity: updated[i].quantity + 1 };
                      setCart(updated);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="ml-3 px-2 py-1 border rounded text-red-700 border-red-400"
                    onClick={() => setCart(cart.filter((_, idx) => idx !== i))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="text-gray-800 font-semibold">
              $ {(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-gray-800 font-bold text-lg">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-lg font-semibold text-white transition-colors"
              style={{ backgroundColor: "#A1887F", border: "1px solid #8D6E63" }}
              onClick={handlePlaceOrder}
            >
              Place Order COD
            </button>
            <button
              className="px-4 py-2 rounded-lg font-semibold text-white transition-colors"
              style={{ backgroundColor: "#8D6E63", border: "1px solid #A1887F" }}
              onClick={handleStripeCheckout}
            >
              Pay with Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
