const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/Auth.Controller');
const { body } = require('express-validator');

router.get('/signin', [
  body('username').trim().isEmail().withMessage('Username must not be empty...!')
], AuthController.get_Signin);


router.post('/signin', AuthController.post_Signin);

router.get('/logout', AuthController.get_Signout)



module.exports = router;