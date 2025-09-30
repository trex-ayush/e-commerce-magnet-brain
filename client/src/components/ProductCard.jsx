import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { cart, setCart } = useAppContext();
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    const quantity = Math.max(1, Number(qty) || 1);
    const exists = cart.find((p) => p.id === product.id);
    if (exists) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  return (
    <div
      className="p-4 rounded-lg shadow-md transition-transform hover:scale-105"
      style={{ backgroundColor: "#D7CCC8", border: "1px solid #A1887F" }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-40 w-full object-cover rounded-lg mb-2"
        style={{ borderBottom: "2px solid #A1887F" }}
      />
      <h3 className="font-bold text-gray-800 text-lg">{product.title}</h3>
      <p className="mt-1 text-gray-700 font-medium">$ {product.price}</p>
      <div className="flex items-center gap-2 mt-2">
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="w-16 p-1 border rounded"
        />
        <button
        onClick={addToCart}
        className="mt-3 px-3 py-2 rounded-lg font-semibold text-white transition-colors"
        style={{ backgroundColor: "#A1887F", border: "1px solid #8D6E63" }}
      >
        Add to Cart
      </button>
      </div>
    </div>
  );
};

export default ProductCard;
