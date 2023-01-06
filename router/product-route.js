const router = require('express').Router();
const { createProduct, updateProduct, deleteProduct, findByProductId, findAllProducts } = require('../controllers/product');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/auth');
const { checkProduct } = require('../middleware/product');

router.post('/', verifyTokenAndAdmin, checkProduct, createProduct);

router.put('/:id',verifyTokenAndAdmin,checkProduct,updateProduct);

router.delete('/:id',verifyTokenAndAdmin,deleteProduct);

router.get('/all',verifyTokenAndAdmin,findAllProducts);

router.get('/:id',findByProductId);

router.get('/',findAllProducts);


module.exports = router;