const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

// !Register
router.post('/api/v1/users/register',usersController.register)

// !Login
router.post('/api/v1/users/login',usersController.login)


module.exports = router;