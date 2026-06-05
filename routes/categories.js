const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getCategories);
router.post('/', protect, authorize('vendor'), createCategory);
router.put('/:id', protect, authorize('vendor'), updateCategory);
router.delete('/:id', protect, authorize('vendor'), deleteCategory);

module.exports = router;
