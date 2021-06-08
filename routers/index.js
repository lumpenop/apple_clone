const express = require('express');
const router = express.Router();
const admin = require('./admin/index')

router.use('/admin',admin)

module.exports = router;