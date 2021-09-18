const express = require('express');
const router = express.Router();
const ManageController = require('../Controllers/Manage.Controller');
const BlogController = require('../Controllers/Blog.Controller');
const BadVegetableController = require('../Controllers/Bad.Controller');
const { authenticated, authRoles } = require('../Middleware/auth');//checkUser

const { roles } = require('../Utils/constants');


// router.use('*', checkUser)

router.get('/', authenticated, authRoles(roles.manager),  ManageController.get_userVegetable);

router.get('/view/:id', authenticated, authRoles(roles.manager),  ManageController.get_sellerVegetable);

router.get('/user/add/:id', authenticated, authRoles(roles.manager),  ManageController.get_addSellerVegetable);

router.post('/user/add/:id', authenticated, authRoles(roles.manager),  ManageController.post_addSellerVegetable);

router.get('/user/vegetable/update/:id', authenticated, authRoles(roles.manager),  ManageController.get_updateSellerVegetable);

router.post('/user/vegetable/update/:id', authenticated, authRoles(roles.manager),  ManageController.post_updateSellerVegetable);

router.get('/user/vegetable/delete/:id', authenticated, authRoles(roles.manager),  ManageController.get_deleteSellerVegetable);

router.get('/seller-vegetable', authenticated, authRoles(roles.manager), ManageController.get_userVegetable); 

router.get('/members', authenticated, authRoles(roles.manager), ManageController.get_allMember); 

router.get('/members/:id', authenticated, authRoles(roles.manager), ManageController.get_memberVegetable);

router.get('/members/vegetable/add/:id', authenticated, authRoles(roles.manager), ManageController.get_addMemberVegetable);

router.post('/members/vegetable/add/:id', authenticated, authRoles(roles.manager), ManageController.post_addMemberVegetable);

router.get('/members/vegetable/update/:id', authenticated, authRoles(roles.manager), ManageController.get_updateMemberVegetable);

router.get('/members/vegetable/delete/:id', authenticated, authRoles(roles.manager), ManageController.get_deleteMemberVegetable);

//Manage Banners Router
router.get('/banners', authenticated, authRoles(roles.manager), ManageController.get_allBanner);

router.get('/banners/add', authenticated, authRoles(roles.manager), ManageController.get_addBanner);

router.post('/banners/add', authenticated, authRoles(roles.manager), ManageController.post_addBanner);

router.get('/banners/edit/:id', authenticated, authRoles(roles.manager), ManageController.get_updateBanner);

router.post('/banners/edit/:id', authenticated, authRoles(roles.manager), ManageController.post_updateBanner);

router.get('/banners/delete/:id', authenticated, authRoles(roles.manager), ManageController.get_deleteBanner);

//Manage Blog Routes
router.get('/blogs', authenticated, authRoles(roles.manager), BlogController.get_allBlogs);

router.get('/blogs/add', authenticated, authRoles(roles.manager), BlogController.get_addBlog);

router.post('/blogs/add', authenticated, authRoles(roles.manager), BlogController.post_addBlog);

router.get('/blogs/edit/:id', authenticated, authRoles(roles.manager), BlogController.get_updateBlog);

router.post('/blogs/edit/:id', authenticated, authRoles(roles.manager), BlogController.post_updateBlog);

router.get('/blogs/delete/:id', authenticated, authRoles(roles.manager), BlogController.get_deleteBlog);

//Bad Vegetables Operation
router.get('/bads', authenticated, authRoles(roles.manager), BadVegetableController.get_allBads);

router.get('/bads/add', authenticated, authRoles(roles.manager), BadVegetableController.get_addBads);

router.post('/bads/add', authenticated, authRoles(roles.manager), BadVegetableController.post_addBads);

router.get('/bads/edit/:id', authenticated, authRoles(roles.manager), BadVegetableController.get_updateBads);

router.post('/bads/edit/:id', authenticated, authRoles(roles.manager), BadVegetableController.post_updateBads);

router.get('/bads/delete/:id', authenticated, authRoles(roles.manager), BadVegetableController.get_deleteBads);

module.exports = router;