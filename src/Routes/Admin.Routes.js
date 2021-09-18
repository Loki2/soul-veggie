const express = require('express');
const router = express.Router();
const { authenticated, authRoles } = require('../Middleware/auth'); //checkUser
const { roles } = require('../Utils/constants');
const AdminController = require('../Controllers/Admin.Controller');
const UserController = require('../Controllers/User.Controller');

// router.use('*', checkUser)

router.get('/', authenticated, authRoles(roles.admin), AdminController.get_admin);


router.get('/employee', authenticated, authRoles(roles.admin), AdminController.get_allEmployee);

router.get('/get-user', authenticated, authRoles(roles.admin),  UserController.get_allUser)

router.get('/user/seller-vegetable/:id', authenticated, authRoles(roles.admin), AdminController.get_userVegetable); 

router.get('/sales', authenticated, authRoles(roles.admin), AdminController.get_allSale);


router.get('/sale-items', authenticated, authRoles(roles.admin), AdminController.get_allSaleItems);

router.get('/sales/invoice/:id', authenticated, authRoles(roles.admin), AdminController.get_allSaleInvoice);

router.get('/sales/invoice-mobile/:id', authenticated, authRoles(roles.admin), AdminController.get_allSaleMobile);

router.get('/category/products/:id', authenticated, authRoles(roles.admin), AdminController.get_allCategoryProduct)


module.exports = router;