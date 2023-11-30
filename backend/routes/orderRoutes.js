const express = require('express');
const orderController = require('../controllers/orderController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/orders', jwtMiddleware, orderController.createOrder);
router.get('/orders', jwtMiddleware, orderController.getOrders);
router.get('/orders/:orderId', jwtMiddleware, orderController.getOrderById);
router.delete('/orders/:id', jwtMiddleware, orderController.deleteOrder);

module.exports = router;