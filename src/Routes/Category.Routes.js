const express = require('express');
const router = express.Router();
const { authenticated, authRoles, } = require('../Middleware/auth'); //checkUser
const { roles } = require('../Utils/constants');
const CategoryController = require('../Controllers/Category.Controller');

// router.use('*', checkUser)

router.get('/', authenticated, authRoles(roles.admin), CategoryController.get_allCategory);

router.get('/add', authenticated, authRoles(roles.admin), CategoryController.get_addCategory);

router.post('/add', authenticated, authRoles(roles.admin), CategoryController.post_addCategory);

router.get('/edit/:id', authenticated, authRoles(roles.admin), CategoryController.get_updateCategory);

router.post('/edit/:id', authenticated, authRoles(roles.admin), CategoryController.post_updateCategory);


module.exports = router;