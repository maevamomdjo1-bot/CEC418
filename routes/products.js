const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getVendorProducts } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getProducts);
router.get('/my-products', protect, authorize('vendor'), getVendorProducts);
router.get('/:id', getProduct);
router.post('/', protect, authorize('vendor'), upload.array('images', 5), createProduct);
router.put('/:id', protect, authorize('vendor'), upload.array('images', 5), updateProduct);
router.delete('/:id', protect, authorize('vendor'), deleteProduct);

module.exports = router;
