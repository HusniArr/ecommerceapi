const router = require('express').Router();
const { createProduct } = require('../controllers/product');
const { verifyTokenAndAuthorization } = require('../middleware/auth');

router.post('/products', verifyTokenAndAuthorization, createProduct);

module.exports = router;