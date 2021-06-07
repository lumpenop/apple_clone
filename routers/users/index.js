const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.get('/', controller.join);
router.post('/success', controller.join_success)

module.exports = router;