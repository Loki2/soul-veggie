const express = require('express');
const router = express.Router();
const HomeController = require('../Controllers/Home.Controller');


router.get('/', HomeController.get_Home);

router.get('/veggies', HomeController.get_allVeggie);

router.get('/veggies/:id', HomeController.get_VeggieId);


router.get('/sidebar-veggies', HomeController.get_allSidebarVeggie);

router.get('/sidebar-veggies/:id', HomeController.get_VeggieId);

router.get('/blogs', HomeController.get_allBlogs);

router.get('/blogs/:id', HomeController.get_BlogId);

router.get('/members', HomeController.get_allMembers)

router.get('/members/:id', HomeController.get_storeMembers)

module.exports = router;