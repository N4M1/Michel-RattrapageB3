const express = require('express');
const productController = require('../controllers/productController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/products', jwtMiddleware, productController.createProduct);
router.get('/products', jwtMiddleware, productController.getProducts);
router.get('/products/:id', jwtMiddleware, productController.getProductById);
router.delete('/products/:id', jwtMiddleware, productController.deleteProduct);

module.exports = router;