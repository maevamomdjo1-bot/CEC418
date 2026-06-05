const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, notes } = req.body;

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ success: false, message: `Product ${item.product} not found` });
      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }
      subtotal += product.price * item.quantity;
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0] || '',
        price: product.price,
        quantity: item.quantity,
        vendor: product.vendor
      });
      await Product.findByIdAndUpdate(product._id, { $inc: { stock: -item.quantity } });
    }

    const shippingCost = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shippingCost + tax;

    const order = await Order.create({
      customer: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      subtotal,
      shippingCost,
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      notes
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).populate('items.product', 'name images').sort('-createdAt');
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'items.vendor': req.user._id })
      .populate('customer', 'fullName email')
      .populate('items.product', 'name images')
      .sort('-createdAt');
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'fullName email')
      .populate('items.product', 'name images');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getVendorStats = async (req, res) => {
  try {
    const orders = await Order.find({ 'items.vendor': req.user._id });
    const totalRevenue = orders.reduce((sum, o) => {
      const vendorItems = o.items.filter(i => i.vendor?.toString() === req.user._id.toString());
      return sum + vendorItems.reduce((s, i) => s + i.price * i.quantity, 0);
    }, 0);
    const totalOrders = orders.length;
    const Product = require('../models/Product');
    const totalProducts = await Product.countDocuments({ vendor: req.user._id });
    const lowStock = await Product.countDocuments({ vendor: req.user._id, stock: { $lte: 5 } });

    res.json({ success: true, stats: { totalRevenue, totalOrders, totalProducts, lowStock } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
