'use strict';

const { createOrder, updateOrder, deleteOrder, findOrderByUserId, findAllOrders } = require('../controllers/order');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../middleware/auth');

const router = require('express').Router();

//CREATE ORDER
router.post('/',verifyToken,createOrder);

// UPDATE ORDER
router.put('/:id',verifyTokenAndAuthorization,updateOrder);

// DELETE ORDER
router.delete('/:id',verifyTokenAndAuthorization,deleteOrder)

// FIND ORDER BY USER ID
router.get('/:id',verifyToken,findOrderByUserId);

// FIND ALL ORDER
router.get('/',verifyTokenAndAdmin,findAllOrders);

module.exports = router;