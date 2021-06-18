const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const auth = require('../../middleware/auth.js');

// router.get('/bags', controller.bags);

router.get('/join', controller.join);
router.post('/join_success', controller.join_success);

router.get('/login', controller.login);
router.post('/userid_check', controller.userid_check);
router.post('/logincheck', controller.logincheck);
<<<<<<< HEAD

// router.post('/login', controller.login_cookie);
=======
>>>>>>> c284a415592b9461e177f1cb96d063ff1e27196c
router.get('/logout', controller.logout)
router.get('/deleteID', controller.deleteID)

router.get('/kakaologin', controller.kakaologin);
router.get('/kakao_login', controller.kakao_login);
router.post('/googlelogin', controller.googlelogin);
router.post('/google_logout', controller.google_logout);

router.get('/info', controller.info);
router.get('/info_view', controller.info_view);
router.get('/info_modify', controller.info_modify);


router.get('/chat', controller.chat);
router.get('/chatHelp', controller.chatHelp);
router.get('/chatBtn', controller.chatBtn);
router.get('/chatRoom',auth, controller.chatRoom);

router.post('/pwFind',controller.pwFind);
router.get('/pwFind_middleware',controller.pwFind_middleware);
module.exports = router;