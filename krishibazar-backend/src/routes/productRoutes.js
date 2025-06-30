const express = require('express');
const { createProduct, getAllProducts } = require('../controllers/productController');
const { authenticateUser } = require('../middleware/authMiddleware');
const upload = require('../config/multer');

const router = express.Router();

router.post('/', authenticateUser, upload.single('image'), createProduct);
router.get('/', getAllProducts);

module.exports = router;
