const router = require('express').Router();
const { verifyTokenAndAuthorization} = require('../middleware/auth');
const { findAllUser,updatedUser, deleteUser } = require('../controllers/user');

router.get('/',verifyTokenAndAuthorization,findAllUser);

router.put('/:userId',verifyTokenAndAuthorization,updatedUser);

router.delete('/:userId',verifyTokenAndAuthorization,deleteUser);

module.exports = router;