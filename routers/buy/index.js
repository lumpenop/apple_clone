const express = require('express');
const router = express.Router();
const controller = require('./buyController')
const sequelize = require("sequelize")


router.post('/shopping_end',controller.shopping_form_success);
router.get('/buy_show',controller.buy_show);
router.get('/shopping_basket',controller.shopping_basket);
router.get('/shopping_form',controller.shopping_form);
router.get('/shopping_end',controller.shopping_end);

module.exports = router;