const express = require('express');
const router = express.Router();
const controller = require('./searchController')
const sequelize = require("sequelize")

router.get('/error',controller.search_error);
router.get('/iphone',controller.search_iphone);
router.get('/ipad',controller.search_ipad);
router.post('/search',controller.search_view);
router.get('/db',controller.db);
router.post('/search',controller.search);

module.exports = router;