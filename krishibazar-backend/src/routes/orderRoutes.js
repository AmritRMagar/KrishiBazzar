const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const { placeOrder, getCustomerOrders } = require('../controllers/orderController');

router.post('/', authenticateUser, placeOrder);         // Place new order
router.get('/', authenticateUser, getCustomerOrders);   // View own orders

module.exports = router;
