const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getVendorOrders, updateOrderStatus, getOrderById, getVendorStats } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('customer'), createOrder);
router.get('/my-orders', protect, authorize('customer'), getMyOrders);
router.get('/vendor-orders', protect, authorize('vendor'), getVendorOrders);
router.get('/vendor-stats', protect, authorize('vendor'), getVendorStats);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, authorize('vendor'), updateOrderStatus);

module.exports = router;
