const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const { getFarmerOrders, updateOrderStatus } = require('../controllers/farmerOrderController');

router.get('/', authenticateUser, getFarmerOrders);
router.patch('/:orderId/status', authenticateUser, updateOrderStatus);

module.exports = router;
