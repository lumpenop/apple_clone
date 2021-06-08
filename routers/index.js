const express = require('express');
const router = express.Router();
const admin = require('./admin/index')

const userRouter = require('./users/index.js');

router.use('/user', userRouter);
router.use('/',(req,res)=>{
    res.render('index.html');
})
router.use('/admin',admin)

module.exports = router;