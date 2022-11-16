const router = require('express').Router();
const { register, login } = require('../controllers/user');
const { checkEmailUser } = require('../middleware/auth');

// endpoint register user
router.post('/register',register);

// endpoint user login
router.post('/login',checkEmailUser,login);

module.exports = router;