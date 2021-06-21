const express = require('express');
const router = express.Router();
const admin = require('./admin/index')
const search = require('./search/index')
const buy = require('./buy/index')
const userRouter = require('./users/index.js');
const { users, items, bag , history} = require('../models');

router.use('/buy',buy)
router.use('/search',search)
router.use('/user', userRouter);
router.use('/admin',admin)

router.use('/', async (req,res)=>{
    let {msg} = req.query;
    console.log(req.cookies)
    let {userid,username, loginsite} = req.cookies;

    let result = await bag.findAll({where:{users_name:userid}})
    res.render('index.html',{
        msg, username, loginsite, result
    });
});

module.exports = router;

// <!-- {% else if website == 'google' %}
// <a href="#" onclick="signOut();">Sign out</a> -->
