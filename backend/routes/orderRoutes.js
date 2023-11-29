const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/orders/:orderId', orderController.getOrderById);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;