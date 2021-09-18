const express = require('express');
const router = express.Router();
const { authenticated, authRoles } = require('../Middleware/auth'); //checkUser
const { roles } = require('../Utils/constants');
const ProductController = require('../Controllers/Product.Controller');

// router.use('*', checkUser)

router.get('/', authenticated, authRoles(roles.admin), ProductController.get_allProduct);

router.get('/add', authenticated, authRoles(roles.admin), ProductController.get_addProduct);

router.post('/add', authenticated, authRoles(roles.admin), ProductController.post_addProduct);

router.get('/view/:id', authenticated, authRoles(roles.admin), ProductController.get_productId);

router.get('/edit/:id', authenticated, authRoles(roles.admin), ProductController.get_updateProduct);

router.post('/edit/:id', authenticated, authRoles(roles.admin), ProductController.post_updateProduct);


module.exports = router;