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
    console.log(req.cookies)
    let {userid,username, loginsite} = req.cookies;

    res.render('index.html',{
        msg, username, loginsite,
    });
});

<<<<<<< HEAD

module.exports = router;
=======
module.exports = router;

// <!-- {% else if website == 'google' %}
// <a href="#" onclick="signOut();">Sign out</a> -->
>>>>>>> c284a415592b9461e177f1cb96d063ff1e27196c
