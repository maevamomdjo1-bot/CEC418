const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, registerValidation, loginValidation } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
