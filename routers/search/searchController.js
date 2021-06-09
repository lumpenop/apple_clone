const {users,items,buy,valuation} = require('../../models');
const sequelize = require("sequelize")


let search_error = (req,res)=>{
    res.render('./search/search_error.html',{

    })
}

let search_iphone = (req,res)=>{
    res.render('./search/search_iphone.html',{

    })
}

let search_view = (req,res)=>{
    res.render('./search/search.html',{
    })
}

let search = (req,res)=>{
    let searchValue = req.body.AppleSearch
    res.render('./search/search.html',{searchValue:searchValue,})
    console.log(searchValue)
}

module.exports = { 
    search_error,
    search,
    search_view,
    search_iphone
}; 