const router = require('express').Router();
const { createProduct } = require('../controllers/product');
const { verifyTokenAndAuthorization } = require('../middleware/auth');
const { checkProduct } = require('../middleware/product');

router.post('/products', verifyTokenAndAuthorization, checkProduct, createProduct);

module.exports = router;