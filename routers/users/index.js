const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const auth = require('../../middleware/auth.js');

// router.get('/bags', controller.bags);

router.get('/join', controller.join);
router.get('/confirmEmail', controller.confirmEmail)
router.post('/join_success', controller.join_success);

router.get('/login', controller.login);
router.post('/userid_check', controller.userid_check);
router.post('/logincheck', controller.logincheck);
router.get('/logout', controller.logout)
router.get('/deleteID', controller.deleteID)

router.get('/kakaologin', controller.kakaologin);
router.get('/kakao_login', controller.kakao_login);
router.post('/googlelogin', controller.googlelogin);
router.post('/google_logout', controller.google_logout);

router.get('/info', controller.info);
router.post('/info', controller.info_modify);
router.get('/info_view', controller.info_view);


router.get('/chat', controller.chat);
router.get('/chatHelp', controller.chatHelp);
router.get('/chatBtn', controller.chatBtn);
//chatRoom 에 middleware auth 잠시 제거 -> google, kakao accesstoken 필요 
router.get('/chatRoom', controller.chatRoom);
router.post('/socketID', controller.socketID);

router.post('/pwFind',controller.pwFind);
router.get('/pwFind_middleware',controller.pwFind_middleware);

router.get('/map', controller.map);

module.exports = router;