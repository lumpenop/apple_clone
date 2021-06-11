const {users,items,buy,valuation,history} = require('../../models');
const sequelize = require("sequelize")


let buy_show = async (req,res)=>{
    let name = req.query.name
    let result = await items.findOne({where:{item_name:name}})
    res.render('./buy/buy_show.html',{
        list:result,
    })
}

let shopping_basket = async (req,res)=>{
    let name = req.query.name
    let result = await items.findOne({where:{item_name:name}})
    console.log(req.session.itemName)
    res.render('./buy/shopping_basket.html',{
        list:result,
    })
}

let shopping_form = async (req,res)=>{
    let name = req.query.name
    let result = await items.findOne({where:{item_name:name}})
    res.render('./buy/shopping_form.html',{
        name:name,
        item_serial_number:result.item_name,
        item_price:result.item_price,
        item_image:result.item_image,
        item_category:result.item_category,
        item_skill:result.item_skill,
    })
}


let shopping_end = async (req,res)=>{
    let name = req.query.name
    let result = await items.findOne({where:{item_name:name}})

    console.log(result)
    res.render('./buy/shopping_end.html',{
        item_name:result.item_name
    })
}

let shopping_form_success = async (req,res)=>{
    let item_skill = req.body.item_skill
    let item_price = req.body.item_price
    let item_name = req.body.item_name
    let item_image = req.body.item_image
    let item_category = req.body.item_category
    let name1 = req.body.name1
    let name2 = req.body.name2
    let address1 = req.body.address1
    let address2 = req.body.address2
    let addressnumber = req.body.addressnumber
    let nation = req.body.nation
    let email = req.body.email
    let phone = req.body.phone
    
    
    let result = await history.create({
        name1, name2, address1, address2, addressnumber, nation, email, phone, item_skill, item_name, item_price, item_image, item_category
    })
    res.render('./buy/shopping_end.html',{
        name:`${name1}${name2}`,
        phone:phone,
        addressnumber:addressnumber,
        item_name:item_name,
        item_category:item_category,
        item_price:item_price,
        item_image:item_image,
    })
}

module.exports = { 
    buy_show,
    shopping_basket,
    shopping_form,
    shopping_form_success,
    shopping_end
}; 