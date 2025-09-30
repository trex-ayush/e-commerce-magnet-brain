import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Orders = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get("http://localhost:5000/api/order/myOrders", {
          withCredentials: true
        });
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) 
    return (
      <p className="p-6 text-center text-gray-700" style={{ backgroundColor: "#EFEBE9" }}>
        Please login to view orders.
      </p>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto" style={{ backgroundColor: "#EFEBE9", minHeight: "100vh" }}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-700">No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="p-4 mb-4 rounded-lg shadow-md"
            style={{ backgroundColor: "#D7CCC8", border: "1px solid #A1887F" }}
          >
            <div className="flex justify-between items-center mb-2 text-gray-800">
              <p className="text-sm">
                Order ID: <span className="font-mono">{order._id}</span>
              </p>
              <p className="text-sm">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start mb-3 text-gray-800">
               <p><b>Status:</b> {order.status}</p>
               <p><b>Payment Method:</b> {order.paymentMethod}</p>
               <p><b>Payment Status:</b> {order.paymentStatus || 'Pending'}</p>
               {order.transactionId && (
                 <p className="md:col-span-2"><b>Transaction ID:</b> {order.transactionId}</p>
               )}
               {order.customerEmail && (
                 <p><b>Customer Email:</b> {order.customerEmail}</p>
               )}
             </div>

            <div className="divide-y">
              {order.products.map((p) => (
                <div
                  key={p.productId}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    {/* Uncomment if you have product thumbnails */}
                    {/* {p.thumbnail ? (
                      <img src={p.thumbnail} alt={p.name} className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded" />
                    )} */}
                    <div>
                      <p className="font-medium text-gray-800">{p.name}</p>
                      <p className="text-sm text-gray-700">Qty: {p.quantity} • ${p.price}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ${(p.price * p.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-3 text-gray-800 font-bold text-lg">
              Total: $ {order.total}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
