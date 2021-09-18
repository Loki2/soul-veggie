const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/User.Controller');
const ProfileController = require('../Controllers/Profile.Controller');
const { authenticated, authRoles } = require('../Middleware/auth');//checkUser
const { roles } = require('../Utils/constants');


// router.use('*', checkUser)

router.get('/', authenticated, authRoles(roles.admin),  UserController.get_allUser)

router.get('/add', authenticated, authRoles(roles.admin), UserController.get_addUser);

router.post('/add', authenticated, authRoles(roles.admin), UserController.post_addUser);

router.get('/edit/:id', authenticated, authRoles(roles.admin), UserController.get_editUser);

router.post('/edit/:id', authenticated, authRoles(roles.admin), UserController.post_editUser);

router.get('/profile/:id', authenticated, authRoles(roles.admin), ProfileController.get_userProfile);

router.post('/profile/:id', authenticated, authRoles(roles.admin), ProfileController.post_userProfile);




module.exports = router;