import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "#EFEBE9" }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded-lg shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: "#D7CCB8", border: "1px solid #A1887F" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
