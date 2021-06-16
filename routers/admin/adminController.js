const {users,items,buy,valuation} = require('../../models');
const sequelize = require("sequelize")
const ctoken = require('./jwt'); 
const chash = require('./chash')
const Op = sequelize.Op
let main = (req,res)=>{
    res.render('./admin/main.html',{
        userid:req.session.uid
    })
}

let login = (req,res)=>{

    let msg = req.query.msg
    res.render('./admin/login_join/login.html',{
        msg:msg
    })

}

let logout = (req,res)=>{

    delete req.session.uid
    res.clearCookie('AccessToken')

    req.session.save(()=>{
        res.redirect('/admin/login')
    })
}

let login_success = async (req,res)=>{
    let userid = req.body.userid
    let userpw = req.body.userpw
    let token = chash(userpw)
    let token2 = ctoken(userid)
    let result = await users.findOne({ where: {userid:userid, userpw:token}})

    if(result != undefined){
        res.cookie('AccessToken',token2,{httpOnly:true,secure:true,})
        req.session.uid = userid
        req.session.save(()=>{
            res.redirect('/admin/main')
        })
    }else{
        res.redirect('/admin/login?msg="다시"&boolean="false"')
    }
}

let join = (req,res)=>{
    res.render('./admin/login_join/join.html',{})
}

let userid_check = async (req,res)=>{
    userid = req.query.userid
    result = await users.findOne({
        where:{userid}
    })
    if (result == undefined){
        check = true;
    } else{
        check = false;
    }
    res.json({check})
}


let join_success = async (req,res)=>{

    let userid = req.body.userid
    let userpw = req.body.userpw
    let username = req.body.username
    let image = req.file.path
    let useremail = req.body.useremail
    let mobile = req.body.mobile
    let address = req.body.address
    let admin = req.body.admin
    let userbirth = req.body.userbirth
    let split_img = image.split('\\')[1]
    let token = chash(userpw)

    let result = await users.create({
        userid:userid,
        userpw:token,
        username:username,
        image:split_img,
        mobile:mobile,
        address:address,
        userbirth:userbirth,
        email:useremail,
        admin:admin
    })
    console.log(result)
    
    res.redirect('/admin/login')
}

let admin_info = (req,res)=>{
    res.render('./admin/admin_info/admin_info.html',{
        userid:req.session.uid
    })
}

let product_view = async (req,res)=>{
    let idx = req.query.idx
    let result = await items.findOne({ where: {id:idx}})
    console.log(result)
    res.render('./admin/product/product_view.html',{
        result:result,
        userid:req.session.uid
    })
}
let value_view = async (req,res)=>{
    let idx = req.query.idx
    let result = await valuation.findOne({ where: {id:idx}})
    console.log(result)
    res.render('./admin/valuation/value_view.html',{
        result:result,
        userid:req.session.uid
    })
}
let product_view2 = async (req,res)=>{
    let id = req.body.id
    let item_serial_number = req.body.item_serial_number
    let item_name = req.body.item_name
    let item_price = req.body.item_price
    let item_image = req.file.path
    let item_category = req.body.item_category
    let item_skill1 = req.body.item_skill1
    let item_skill2 = req.body.item_skill2
    let item_skill3 = req.body.item_skill3
    let maximum_number = req.body.maximum_number
    let item_tag1 = req.body.item_tag1
    let item_tag2 = req.body.item_tag2
    let item_tag3 = req.body.item_tag3
    let split_img = item_image.split('\\')[1]
    console.log(id)

    let result = await items.update({
            item_serial_number:item_serial_number,
            item_name:item_name,
            item_price:item_price,
            item_image:split_img,
            item_category:item_category,
            item_skill1:item_skill1,
            item_skill2:item_skill2,
            item_skill3:item_skill3,
            item_skill1:item_skill1,
            maximum_number:maximum_number,
            item_tag1:item_tag1,
            item_tag2:item_tag2,
            item_tag3:item_tag3,
    },{where:{id:id}})

    let result2 = await items.findAll({})

    console.log(result)
    res.render('./admin/product/product_list.html',{list:result2})
}

let product_list = async (req,res)=>{
    let result = await items.findAll({})
    console.log(result)
    res.render('./admin/product/product_list.html',{list:result, userid:req.session.uid})
}

let value_list = async (req,res)=>{
    let result = await valuation.findAll({})
    console.log(result)
    res.render('./admin/valuation/value_list.html',{list:result, userid:req.session.uid})
}

let delete_success = async (req,res)=>{
    let id = req.query.idx
    let result = await items.destroy({where:{id}})
    console.log(result)
    res.redirect('/admin/product_list')
}

let delete_success2 = async (req,res)=>{
    let id = req.query.idx
    let result = await users.destroy({where:{id}})
    console.log(result)
    res.redirect('/admin/user_list')
}

let delete_success3 = async (req,res)=>{
    let id = req.query.idx
    let result = await valuation.destroy({where:{id}})
    console.log(result)
    res.redirect('/admin/valuation')
}

let product_add = (req,res)=>{
    res.render('./admin/product/product_add.html',{
        userid:req.session.uid
    })
}

let product_modify = async (req,res)=>{
    let idx = req.query.idx
    let result = await items.findOne({ where: {id:idx}})
    res.render('./admin/product/product_modify.html',{
        result:result,
        userid:req.session.uid,
    })
}

let chat_list = async (req,res)=>{
    res.render('./admin/chating/chat_list.html',{userid:req.session.uid})
}

let chat_view = (req,res)=>{
    res.render('./admin/chating/chat_view.html',{})
}
let search_success = async (req,res) => {
    let search = req.body.search
    let result = await items.findAll({where:{item_name:{[Op.like]:"%"+search+"%"}}})
    res.render('./admin/product/product_list.html',{list:result,})


    console.log(result)
}
let search_success2 = async (req,res) => {
    let search = req.body.search
    let result = await users.findAll({where:{userid:{[Op.like]:"%"+search+"%"}}})
    res.render('./admin/user/user_list.html',{list:result,})


    console.log(result)
}
let search_success3 = async (req,res) => {
    let search = req.body.search
    let result = await valuation.findAll({where:{value_subject:{[Op.like]:"%"+search+"%"}}})
    res.render('./admin/valuation/value_list.html',{list:result,})


    console.log(result)
}
let create_list = async (req,res)=>{

    let item_serial_number = req.body.item_serial_number
    let item_name = req.body.item_name
    let item_price = req.body.item_price
    let item_image = req.file.path
    let item_category = req.body.item_category
    let item_skill1 = req.body.item_skill1
    let item_skill2 = req.body.item_skill2
    let item_skill3 = req.body.item_skill3
    let maximum_number = req.body.maximum_number
    let item_tag1 = req.body.item_tag1
    let item_tag2 = req.body.item_tag2
    let item_tag3 = req.body.item_tag3
    console.log(item_image)

    let split_img = item_image.split('\\')[1]
    console.log(split_img)
    let result = await items.create({
        item_serial_number:item_serial_number,
        item_name:item_name,
        item_price:item_price,
        item_image:split_img,
        item_category:item_category,
        item_skill1:item_skill1,
        item_skill2:item_skill2,
        item_skill3:item_skill3,
        maximum_number:maximum_number,
        item_tag1:item_tag1,
        item_tag2:item_tag2,
        item_tag3:item_tag3,
    })

    res.redirect('/admin/product_list')
}

let user_list = async (req,res) => {
    let result = await users.findAll({})
    console.log(result)
    res.render('./admin/user/user_list.html',{list:result, userid:req.session.uid})
}

module.exports = { 
    main,
    login,
    join,
    admin_info,
    product_view,
    product_view2,
    product_list,
    product_add,
    product_modify,
    chat_list,
    chat_view,
    create_list,
    search_success,
    delete_success,
    delete_success2,
    delete_success3,
    join_success,
    login_success,
    logout,
    userid_check,
    value_list,
    user_list,
    search_success2,
    search_success3,
    value_view,
}; 