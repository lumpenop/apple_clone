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
    res.cookie('itemName',name,{httpOnly:true,secure:true,})
    console.log(req.session.itemName)
    res.render('./buy/shopping_basket.html',{
        list:result,
    })
}

let shopping_form = (req,res)=>{
    let name = req.query.name
    res.render('./buy/shopping_form.html',{
        name:name
    })
}


let shopping_end_middle = async (req,res)=>{
    let name = req.session.uid
    res.redirect(`/buy/shopping_end`,{})
}

let shopping_end = async (req,res)=>{
    // let name = req.query.name
    // let result = await items.findOne({where:{item_name:name}})
    console.log(itemName)
    res.render('./buy/shopping_end.html',{
        itemName:itemName
    })
}

let shopping_form_success = async (req,res)=>{
    let name = req.body.name
    req.session.uid = name
    let name1 = req.body.name1
    let name2 = req.body.name2
    let address1 = req.body.address1
    let address2 = req.body.address2
    let addressnumber = req.body.addressnumber
    let nation = req.body.nation
    let email = req.body.email
    let phone = req.body.phone
    let result = await history.create({
        name1, name2, address1, address2, addressnumber, nation, email, phone 
    })
    res.render('./buy/shopping_end.html',{name:name})
}

module.exports = { 
    buy_show,
    shopping_basket,
    shopping_form,
    shopping_form_success,
    shopping_end_middle,
    shopping_end
}; 