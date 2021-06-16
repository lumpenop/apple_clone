const {users,skills,items,buy,valuation,bag,history} = require('../../models');
const sequelize = require("sequelize");
const { NUMBER } = require('sequelize');


let buy_show = async (req,res)=>{
    res.cookie('username','test')
    let name = req.query.name
    let result = await items.findOne({where:{item_name:name}})
    res.render('./buy/buy_show.html',{
        list:result,
    })
}

let history_show = async (req,res)=>{
    let username = req.cookies.username
    let result = await history.findAll({where:{name1:username}})
    res.render('./buy/buy_history.html',{
        result:result,
        name1:username,
    })
}

let lecture_render = async (req,res)=>{
    let item_name = req.query.item_name
    let result = await items.findOne({where:{item_name:item_name}})
    let skill1 = result.item_skill1
    let skill2 = result.item_skill2
    let skill3 = result.item_skill3

    let result1 = await skills.findAll({where:{skill_name:skill1}})
    let result2 = await skills.findAll({where:{skill_name:skill2}})
    let result3 = await skills.findAll({where:{skill_name:skill3}})
    res.render('./buy/lecture_render.html',{
        result:result,
        result1:result1,
        result2:result2,
        result3:result3,
    })
}

let shopping_basket_send = async (req,res)=>{
    let users_name = req.cookies.username
    let item_name = req.body.item_name
    let item_category = req.body.item_category
    let item_price = req.body.item_price
    let item_image = req.body.item_image
    let item_skill1 = req.body.item_skill1
    let item_skill2 = req.body.item_skill2
    let item_skill3 = req.body.item_skill3
    let maximum_number = req.body.maximum_number

    
    let result = await bag.create({users_name, item_name, item_category, item_price, item_image, item_skill1, item_skill2, item_skill3 , maximum_number})
    let result2 = await bag.findOne({where:{users_name:users_name}})
    res.cookie('item_name',`${result.item_name}`)
    res.render('./buy/shopping_basket_success.html',{
        list:result,
        item_name:result2.item_name,
    })
}
let shopping_basket = async (req,res)=>{

    let username = req.cookies.username
    console.log(username)
    //let result = await bag.findOne({where:{item_name:name}})
    let result = await bag.findAll({where:{users_name:username}})
    let result2 = await bag.findOne({where:{users_name:username}})
    if(result==null || result2==null){
        res.redirect('/user/login?msg="장바구니가 비었습니다"')
    }else{
        total_cost = 0
        for(i=0; i<result.length; i++){
            total_cost = total_cost + Number(result[i].dataValues.item_price)
        }
        res.render('./buy/shopping_basket.html',{
            result:result,
            item_name:result2.item_name,
            total_cost:total_cost
        })        
    }

}

let shopping_form = async (req,res)=>{
    let username = req.cookies.username
    let result = await bag.findAll({where:{users_name:username}})
    let msg = req.query.msg
   
    total_cost = 0
    for(i=0; i<result.length; i++){
        total_cost = total_cost + Number(result[i].dataValues.item_price)
    }
   
    res.render('./buy/shopping_form.html',{
        name:username,
        item_serial_number:result.item_name,
        item_price:result.item_price,
        item_image:result.item_image,
        item_category:result.item_category,
        item_skill:result.item_skill,
        total_cost:total_cost,
        msg:msg,
    })
}


let shopping_end = async (req,res)=>{

    let username = req.cookies.username
    res.render('./buy/shopping_end.html',{

    })
}

let shopping_form_success = async (req,res)=>{
    let name1 = req.cookies.username 
    let item_skill1 = []
    let item_skill2 = []
    let item_skill3 = []
    let item_price = []
    let item_name = []
    let item_image = []
    let item_category = []
    let maximum_number = []

    let result4 = await bag.findAll({where:{users_name:name1}})


    total_cost = 0
    for(i=0; i<result4.length; i++){
        total_cost = total_cost + Number(result4[i].dataValues.item_price)
    }

    for(i=0; i<result4.length; i++){

        item_skill1.push(result4[i].dataValues.item_skill1)
        item_skill2.push(result4[i].dataValues.item_skill2)
        item_skill3.push(result4[i].dataValues.item_skill3)
        item_price.push(result4[i].dataValues.item_price)
        item_name.push(result4[i].dataValues.item_name)
        item_image.push(result4[i].dataValues.item_image)
        item_category.push(result4[i].dataValues.item_category)
        maximum_number.push(result4[i].dataValues.maximum_number)

    }

  
    let name2 = req.body.name2
    let address1 = req.body.address1
    let address2 = req.body.address2
    let addressnumber = req.body.addressnumber
    let nation = req.body.nation
    let email = req.body.email
    let phone = req.body.phone

    let result5 = await history.findOne({
        where:{item_name:item_name}
    })
    

        
        if(result5 == undefined){    
            for(j=0; j<result4.length; j++){
                let result = await history.create({
                    name1, name2, address1, address2, addressnumber, nation, email, phone, item_skill1:item_skill1[j], item_skill3:item_skill3[j], item_skill2:item_skill2[j], item_name:item_name[j], item_price:item_price[j], item_image:item_image[j], item_category:item_category[j]
                })  
                let update_number = Number(maximum_number[j]) - Number('1')
                let result2 = await items.update({maximum_number: update_number},{where:{item_name:item_name[j]}}) 
            }

            res.render('./buy/shopping_end.html',{
                result4:result4,
                name:name1,
                phone:phone,
                addressnumber:addressnumber,
                result4:result4,
                total_cost:total_cost,
            })
            let result3 = await bag.destroy({where:{users_name:name1}})
        }else{
            res.redirect('/buy/shopping_form?msg=이미 구매하신 제품입니다')
        }
       
}

module.exports = { 
    buy_show,
    shopping_basket,
    shopping_form,
    shopping_form_success,
    shopping_end,
    history_show,
    lecture_render,
    shopping_basket_send,
}; 