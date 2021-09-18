const express = require('express');
const router = express.Router();
const { authenticated, authRoles } = require('../Middleware/auth'); //checkUser
const { roles } = require('../Utils/constants');
const MemberController = require('../Controllers/Member.Controller');


// router.use('*', checkUser);

router.get('/', authenticated, authRoles(roles.admin), MemberController.get_allMember);

router.get('/add', authenticated, authRoles(roles.admin), MemberController.get_addMember);

router.post('/add', authenticated, authRoles(roles.admin), MemberController.post_addMember);

router.get('/view/:id', authenticated, authRoles(roles.admin), MemberController.get_memberInfo);

router.get('/edit/:id', authenticated, authRoles(roles.admin), MemberController .get_updateMember);

router.post('/edit/:id', authenticated, authRoles(roles.admin), MemberController.post_updateMember);

router.get('/delete/:id', authenticated, authRoles(roles.admin), MemberController .get_deleteMember);

//Delete All Member

//Member Vegetable CRUD Modifier


module.exports = router;