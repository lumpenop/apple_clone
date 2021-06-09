const express = require('express');
const router = express.Router();
const controller = require('./searchController')
const sequelize = require("sequelize")

router.get('/search_error',controller.search_error);
router.get('/search_iphone',controller.search_iphone);
router.get('/search',controller.search_view);
router.post('/search',controller.search);

module.exports = router;