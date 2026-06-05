const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, page = 1, limit = 12, vendor } = req.query;
    const query = { isActive: true };

    if (search) query.$text = { $search: search };
    if (category) query.category = category;
    if (vendor) query.vendor = vendor;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(query).populate('category', 'name').populate('vendor', 'fullName').skip(skip).limit(Number(limit)).sort('-createdAt'),
      Product.countDocuments(query)
    ]);

    res.json({ success: true, products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name').populate('vendor', 'fullName email');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    const product = await Product.create({ ...req.body, vendor: req.user._id, images });
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, vendor: req.user._id });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const images = req.files && req.files.length > 0
      ? req.files.map(f => `/uploads/${f.filename}`)
      : product.images;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images },
      { new: true, runValidators: true }
    );
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, vendor: req.user._id });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id }).populate('category', 'name').sort('-createdAt');
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
