const router = require('express').Router();
const { createProduct, updateProduct, deleteProduct, findByProductId, findByAllProducts } = require('../controllers/product');
const { verifyTokenAndAuthorization } = require('../middleware/auth');
const { checkProduct } = require('../middleware/product');

router.post('/products', verifyTokenAndAuthorization, checkProduct, createProduct);

router.put('/products/:id',verifyTokenAndAuthorization,checkProduct,updateProduct);

router.delete('/products/:id',verifyTokenAndAuthorization,deleteProduct);

router.get('/products/:id',verifyTokenAndAuthorization,findByProductId);

router.get('/products',verifyTokenAndAuthorization,findByAllProducts);

module.exports = router;