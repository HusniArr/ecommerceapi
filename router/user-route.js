const router = require('express').Router();
const { verifyTokenAndAuthorization} = require('../middleware/auth');
const { findAllUser,updatedUser, deleteUser } = require('../controllers/user');

router.get('/users',verifyTokenAndAuthorization,findAllUser);

router.put('/users/:id',verifyTokenAndAuthorization,updatedUser);

router.delete('/users/:id',verifyTokenAndAuthorization,deleteUser);

module.exports = router;