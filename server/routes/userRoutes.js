const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Protected routes
router.use(authController.protect);
router.get('/me', (req, res) => {
  res.status(200).json({ status: 'success', data: { user: req.user } });
});

module.exports = router;
