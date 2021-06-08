const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.get('/login', controller.login);
router.get('/join', controller.join);
router.post('/success', controller.join_success)

module.exports = router;