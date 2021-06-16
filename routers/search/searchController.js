const {users,items,buy,valuation} = require('../../models');
const sequelize = require("sequelize")
const Op = sequelize.Op


let search_error = (req,res)=>{
    res.render('./search/error.html',{

    })
}

let search_iphone = (req,res)=>{
    res.render('./search/iphone.html',{

    })
}

let search_ipad = (req,res)=>{
    res.render('./search/ipad.html',{

    })
}
let db = async (req,res)=>{

    let result = await items.findAll({})
    console.log(result)
    res.render('./search/db.html',{
        result,
    })
}
let search_view = (req,res)=>{
    let searchValue = req.body.AppleSearch
    res.redirect(`/search/${searchValue}`)
}

let search = (req,res)=>{
    let searchValue = req.body.AppleSearch

    res.render(`./search/${searchValue}.html`,{searchValue:searchValue,})
    console.log(searchValue)
}
let value = async (req,res)=>{
    let result1 = await valuation.findAll({where:{value_content:{[Op.like]:"%"+'blockchain'+"%"}}, limit: 3})
    let result11 = await valuation.findAll({where:{value_content:{[Op.like]:"%"+'blockchain'+"%"}}})
    let result2 = await valuation.findAll({where:{value_content:{[Op.like]:"%"+'AR/VR'+"%"}}, limit: 3})
    let result3 = await valuation.findAll({where:{value_content:{[Op.like]:"%"+'producer'+"%"}}, limit: 3})
    let result4 = await valuation.findAll({where:{value_content:{[Op.like]:"%"+'machine'+"%"}}, limit: 3})
    let result44 = await valuation.findAll({where:{value_content:{[Op.like]:"%"+'machine'+"%"}}})
    let result5 = await valuation.findAll({where:{value_content:{[Op.like]:"%"+'frontback'+"%"}}, limit: 3})
    let result55 = await valuation.findAll({where:{value_content:{[Op.like]:"%"+'frontback'+"%"}}})
    let result6 = await valuation.findAll({where:{value_content:{[Op.like]:"%"+'computer'+"%"}}, limit: 3})
    let result66 = await valuation.findAll({where:{value_content:{[Op.like]:"%"+'computer'+"%"}}})

    res.render('./search/valuation.html',{
        result1:result1,
        result11:result11,
        result2:result2,
        result3:result3,
        result4:result4,
        result44:result44,
        result5:result5,
        result55:result55,
        result6:result6,
        result66:result66,
    })
}

module.exports = { 
    search_error,
    search,
    search_view,
    search_iphone,
    search_ipad,
    db,
    value,
}; 