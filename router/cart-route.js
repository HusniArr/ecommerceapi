'use strict';
const router = require('express').Router();

const { createCart, updateCart, deleteCart, findCartByUserId, findAllCarts } = require('../controllers/cart');
const { verifyToken,verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middleware/auth');

// create
router.post('/',verifyToken,createCart);

// update
router.put('/:id',verifyTokenAndAuthorization,updateCart);

//delete
router.delete('/:id',verifyTokenAndAuthorization,deleteCart);

// find cart by id user
router.get('/:id',verifyTokenAndAuthorization,findCartByUserId);

// find all cart
router.get('/',verifyTokenAndAdmin,findAllCarts);

module.exports = router;
