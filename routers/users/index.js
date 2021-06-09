const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const auth = require('../../middleware/auth.js');

router.get('/bags', controller.bags);
router.get('/join', controller.join);
router.post('/join_success', controller.join_success);
router.get('/login', controller.login);
router.post('/logincheck', controller.logincheck);
router.get('/chat', controller.chat);
router.get('/chatRoom', controller.chatRoom);
router.get('/chatHelp', controller.chatHelp)

module.exports = router;