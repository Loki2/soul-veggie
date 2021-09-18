const express = require('express');
const router = express.Router();
const { authenticated, authRoles } = require('../Middleware/auth'); //checkUser
const { roles } = require('../Utils/constants');
const VegetableController = require('../Controllers/Vegetable.Controller');

// router.use('*', checkUser)

router.get('/', authenticated, authRoles(roles.admin), VegetableController.get_allVegetable);

router.get('/add', authenticated, authRoles(roles.admin), VegetableController.get_addVegetable);

router.post('/add', authenticated, authRoles(roles.admin), VegetableController.post_addVegetable);

router.get('/view/:id', authenticated, authRoles(roles.admin), VegetableController.get_VegetableId);

router.get('/edit/:id', authenticated, authRoles(roles.admin), VegetableController.get_updateVegetable);

router.post('/edit/:id', authenticated, authRoles(roles.admin), VegetableController.post_updateVegetable);


module.exports = router;