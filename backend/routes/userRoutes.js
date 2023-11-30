const express = require('express');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', jwtMiddleware, userController.getUsers);
router.get('/users/:id', jwtMiddleware, userController.getUserById);
router.delete('/users/:id', jwtMiddleware, userController.deleteUser);
router.post('/login', userController.loginUser);

module.exports = router;