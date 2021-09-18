const express = require('express');
const router = express.Router();
const { authenticated, authRoles } = require('../Middleware/auth'); //checkUser
const { roles } = require('../Utils/constants');
const SupplierController = require('../Controllers/Supplier.Controller');


// router.use('*', checkUser);

router.get('/', authenticated, authRoles(roles.admin), SupplierController.get_allSupplier);

router.get('/add', authenticated, authRoles(roles.admin), SupplierController.get_addSupplier);

router.post('/add', authenticated, authRoles(roles.admin), SupplierController.post_addSupplier);

router.get('/view/:id', authenticated, authRoles(roles.admin), SupplierController.get_supplierById);

router.get('/edit/:id', authenticated, authRoles(roles.admin), SupplierController.get_updateSupplier);

router.post('/edit/:id', authenticated, authRoles(roles.admin), SupplierController.post_updateSupplier);


module.exports = router;