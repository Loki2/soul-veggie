const express = require('express');
const router = express.Router();
const { authenticated } = require('../Middleware/auth'); //checkUser
const MyInfoController = require('../Controllers/MyInfo.Controller');

router.get('/', authenticated, MyInfoController.get_myInfo);


router.post('/add-card/:id', authenticated, MyInfoController.post_addCart);


router.post('/sales/create-sale/:id', authenticated, MyInfoController.post_createSale);


router.get('/sales', authenticated, MyInfoController.get_mySales);


router.get('/invoice/:id', authenticated, MyInfoController.get_myInvoice);


router.get('/invoice-mobile/:id', authenticated, MyInfoController.get_myMobileInvoice);



module.exports = router;