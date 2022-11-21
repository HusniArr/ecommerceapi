const router = require('express').Router();
const { register, login } = require('../controllers/user');
const { checkEmailUser, verifyRegisterUser, verifyLoginUser } = require('../middleware/auth');

// endpoint register user
router.post('/register',verifyRegisterUser,register);

// endpoint user login
router.post('/login',verifyLoginUser,checkEmailUser,login);

module.exports = router;