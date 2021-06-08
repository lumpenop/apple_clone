const express = require('express');
const router = express.Router();
const userRouter = require('./users/index.js');

router.use('/user', userRouter);
router.use('/',(req,res)=>{
    res.render('index.html');
})

module.exports=router;