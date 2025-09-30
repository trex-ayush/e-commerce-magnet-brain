import { useAppContext } from "../context/AppContext";
import axios from "axios";

const PlaceOrder = () => {
  const { cart, setCart, orders, setOrders } = useAppContext();

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/order/placeCod",
        { items: cart },
        { withCredentials: true }
      );
      setOrders([...orders, res.data]);
      setCart([]);
      alert("Order placed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Place Order</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item, i) => (
              <li key={i}>
                {item.title} x {item.quantity} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="font-bold mb-4">Total: ${total}</p>
          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 text-white p-2 rounded"
          >
            Place Order (COD)
          </button>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
