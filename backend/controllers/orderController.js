import Order from '../models/Order.js';

// POST /api/orders
export const createOrder = async (req, res) => {
  const { user, items, total } = req.body;
  const order = await Order.create({ user, items, total });
  res.status(201).json(order);
};

// GET /api/orders
export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email');
  res.json(orders);
};
