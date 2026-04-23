const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(restrictTo('admin'), orderController.getAllOrders)
  .post(orderController.createOrder);

router.get('/myorders', orderController.getMyOrders);

router.route('/:id')
  .get(orderController.getOrderById)
  .patch(restrictTo('admin'), orderController.updateOrderStatus);

module.exports = router;
