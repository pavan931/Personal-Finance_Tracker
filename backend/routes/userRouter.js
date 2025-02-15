const express = require('express');
const usersController = require('../controller/usersController');
const isAuthenticated = require('../middlewares/isAuth');

const router = express.Router();

// !Register
router.post('/api/v1/users/register',usersController.register)

// !Login
router.post('/api/v1/users/login',usersController.login)

// !Profile
router.get('/api/v1/users/profile',isAuthenticated,usersController.profile)


module.exports = router;