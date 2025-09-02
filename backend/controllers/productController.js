import Product from '../models/product.js';

// GET /api/products
export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json({
    success: true,
    data: products
  });
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json({
      success: true,
      data: product
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
};
