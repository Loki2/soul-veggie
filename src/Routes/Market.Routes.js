const express = require('express');
const router = express.Router();
const { authenticated, authRoles } = require('../Middleware/auth'); //checkUser
const { roles } = require('../Utils/constants');
const MarketController = require('../Controllers/Market.Controller');

// router.use('*', checkUser)

router.get('/', authenticated, authRoles(roles.admin), MarketController.get_allMarket);

router.get('/add', authenticated, authRoles(roles.admin), MarketController.get_addMarket);

router.post('/add', authenticated, authRoles(roles.admin), MarketController.post_addMarket);

router.get('/edit/:id', authenticated, authRoles(roles.admin), MarketController.get_updateMarket);

router.post('/edit/:id', authenticated, authRoles(roles.admin), MarketController.post_updateMarket);

router.get('/delete/:id', authenticated, authRoles(roles.admin), MarketController.get_deleteMarket);


module.exports = router;