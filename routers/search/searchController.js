const {users,items,buy,valuation} = require('../../models');
const sequelize = require("sequelize")


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

module.exports = { 
    search_error,
    search,
    search_view,
    search_iphone,
    search_ipad,
    db,
}; 