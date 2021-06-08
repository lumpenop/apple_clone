const express = require('express');
const router = express.Router();
const controller = require('./adminController')
const multer = require('multer')
const sequelize = require("sequelize")
const Op = sequelize.Op
const path = require('path')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
        },
        filename:(req,file,cb)=>{
            cb(null,file.originalname)
        }
})
const upload = multer({storage:storage})

router.get('/main',controller.main);
router.get('/login',controller.login);
router.get('/logout',controller.logout);
router.get('/join',controller.join);
router.post('/join_success',upload.single('img'),controller.join_success);
router.get('/admin_info',controller.admin_info);
router.get('/product_view',controller.product_view);
router.post('/product_list',upload.single('img'),controller.product_view2);
router.get('/product_list',controller.product_list);
router.get('/product_modify',controller.product_modify);
router.get('/product_add',controller.product_add);
router.get('/chat_list',controller.chat_list);
router.get('/chat_view',controller.chat_view);
router.post('/login_success',controller.login_success)
router.post('/delete_success',controller.delete_success);
router.post('/search_success',controller.search_success);
router.post('/product_list/success',upload.single('img'),controller.create_list);
router.get('/userid_check',controller.userid_check);

router.get('/valuation',controller.value_list);

module.exports = router;