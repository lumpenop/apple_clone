const {users,items,buy,valuation} = require('../../models');
const sequelize = require("sequelize")
const Op = sequelize.Op
const axios = require("axios");
const cheerio = require("cheerio");

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
    let body = req.body.AppleSearch

    if(result != undefined){
      let result = await items.findAll({where:{item_name:{[Op.like]:"%"+body+"%"}}})
      console.log(result)
      res.render('./search/db.html',{
          result,
      })      
    } else{

      // const getHtml = async () => {
      //   try {
      //     return await axios.get(`https://www.google.com/search?q=${body}`);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };
      
      // let result = getHtml()
      //   .then(html => {
      //     let ulList = [];
      //     const $ = cheerio.load(html.data);
      //     const $bodyList = $("div.GyAeWb")
      //     $bodyList.each(function(i, elem) {
      //       ulList[i] = {
      //           article: $(this).find('div').text()
      //       };
      //     });
      
      //     const data = ulList.filter(n => n.article);
      //     return data;
      //   })
      //   .then(json => {
      //     console.log(json)
      //     string = JSON.stringify(json)
      //     res.render('./search/db.html',{
      //       result:result
      //     })
      //   });
    }

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

let otherSite = (req,res)=>{

  const getHtml = async () => {
    try {
      return await axios.get("https://www.yna.co.kr/sports/all");
    } catch (error) {
      console.error(error);
    }
  };

  //https://book.naver.com/search/search.nhn?sm=sta_hty.book&sug=&where=nexearch&query=gone
  getHtml()
    .then(html => {
      let ulList = [];
      const $ = cheerio.load(html.data);
      const $bodyList = $("div.headline-list ul").children("li.section02");

      $bodyList.each(function(i, elem) {
        ulList[i] = {
            title: $(this).find('strong.news-tl a').text(),
            url: $(this).find('strong.news-tl a').attr('href'),
            image_url: $(this).find('p.poto a img').attr('src'),
            image_alt: $(this).find('p.poto a img').attr('alt'),
            summary: $(this).find('p.lead').text().slice(0, -11),
            date: $(this).find('span.p-time').text()
        };
      });

      const data = ulList.filter(n => n.title);
      return data;
    })
    .then(res => console.log(res));
}

module.exports = { 
    search_error,
    search,
    search_view,
    search_iphone,
    search_ipad,
    db,
    value,
    otherSite,
}; 