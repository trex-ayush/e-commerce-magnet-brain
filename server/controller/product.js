const axios = require("axios");

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const { data } = await axios.get("https://dummyjson.com/products");
    res.json(data.products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// GET product by ID
exports.getProductById = async (req, res) => {
  try {
    const { data } = await axios.get(`https://dummyjson.com/products/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
};
