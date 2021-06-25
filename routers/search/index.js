
const express = require('express');
const router = express.Router();
const controller = require('./searchController')
const sequelize = require("sequelize")

router.get('/error',controller.search_error);
router.get('/iphone',controller.search_iphone);
router.get('/question',controller.question_view);
router.post('/question',controller.question_write_success);
router.post('/question2',controller.question_search_success);
router.post('/question_oneview',controller.answer_write_success);
router.get('/question_oneview',controller.question_oneview);
router.get('/professor',controller.professor);
router.post('/professor',controller.professor_submit);
router.get('/ipad',controller.search_ipad);
router.post('/search',controller.search_view);
router.post('/db',controller.db);
router.post('/category',controller.category);
router.get('/valuation',controller.value);
router.post('/search',controller.search);
router.get('/otherSite',controller.otherSite);

module.exports = router;