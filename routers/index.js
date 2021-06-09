const express = require('express');
const router = express.Router();
const admin = require('./admin/index')

const userRouter = require('./users/index.js');

router.use('/user', userRouter);
router.use('/admin',admin)
router.use('/',(req,res)=>{
    res.render('index.html');
})
router.use('/search',(req,res)=>{
    res.render('search.html');
})

module.exports = router;