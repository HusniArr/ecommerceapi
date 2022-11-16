const router = require('express').Router();
const { verifyTokenAndAuthorization} = require('../middleware/auth');
const { findAllUser,updatedUser } = require('../controllers/user');

router.get('/users',verifyTokenAndAuthorization,findAllUser);

router.put('/users/:id',verifyTokenAndAuthorization,updatedUser);

module.exports = router;