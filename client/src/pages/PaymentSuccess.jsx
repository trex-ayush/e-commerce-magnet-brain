import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const { cart, setCart } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');
    const confirm = async () => {
      try {
        if (sessionId) {
          await axios.post(
            'http://localhost:5000/api/payment/confirm',
            { sessionId, items: cart },
            { withCredentials: true }
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCart([]);
      }
    };
    confirm();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "#EFEBE9" }}
    >
      <div
        className="p-8 rounded-xl shadow-md text-center"
        style={{ backgroundColor: "#D7CCC8", border: "1px solid #A1887F" }}
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Payment Successful
        </h2>
        <p className="mb-6 text-gray-700">
          Thank you for your purchase!
        </p>
        <Link
          to="/orders"
          className="px-6 py-3 rounded-lg font-semibold text-white transition-colors"
          style={{ backgroundColor: "#A1887F", border: "1px solid #8D6E63" }}
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
