const express = require('express');
const router = express.Router();
const admin = require('./admin/index')
const search = require('./search/index')
const buy = require('./buy/index')
const userRouter = require('./users/index.js');

router.use('/buy',buy)
router.use('/search',search)
router.use('/user', userRouter);
router.use('/admin',admin)

router.use('/',(req,res)=>{
    let {msg} = req.query;
    let {userid,username} = req.cookies;

    res.render('index.html',{
        msg, username,
        loginornot:req.session.authData,
    });
})


module.exports = router;