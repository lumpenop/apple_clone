const {users,items,buy,question,valuation,answer} = require('../../models');
const sequelize = require("sequelize")
const Op = sequelize.Op
const axios = require("axios");
const cheerio = require("cheerio");
const { json } = require('sequelize');
const qs = require('qs');
const session = require('express-session');
const nodemailer = require('nodemailer');
const smtpTransporter = require('nodemailer-smtp-transport');

let search_error = (req,res)=>{
    res.render('./search/error.html',{

    })
}
let question_view = async (req,res)=>{
  let result = await question.findAll({})
  res.render('./search/question.html',{
      result,
  })
}

let question_write_success = async (req,res)=>{
  let question_subject = req.body.question_subject
  let question_id = req.body.question_id
  let question_content = req.body.question_content
  let result2 = await question.create({question_subject:question_subject,question_id:question_id,question_content:question_content})
  let result = await question.findAll({})
  res.render('./search/question.html',{
    result,
  })
}

let question_oneview = async (req,res)=>{
  let name = req.query.subject
  let question_subject = req.query.question_subject
  let result = await question.findOne({where:{id:name}})
  let result2 = await answer.findAll({where:{question_subject:question_subject}})
  // let result = await question.create({})
  console.log(result)
  res.render('./search/question_view.html',{
    result,result2
  })
}

let answer_write_success = async (req,res)=>{
  let question_id = req.body.question_id
  let question_subject = req.body.question_subject
  let answer_subject = req.body.answer_subject
  let answer_id = req.body.answer_id
  let answer_content = req.body.answer_content
  let result3 = await answer.create({question_id:question_id,question_subject:question_subject,answer_subject:answer_subject,answer_id:answer_id,answer_content:answer_content})
  let result2 = await answer.findAll({where:{question_subject:question_subject}})
  // let result = await question.findAll({where:{id:name}})
  res.redirect(`/search/question_oneview?subject=${question_id}&question_subject=${question_subject}`)
}

let professor = (req,res)=>{
  res.render('./search/professor.html',{

  })
}

let professor_submit = (req,res)=>{
  let transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GoogleID,
        pass: process.env.GooglePW
    }
  })

  let mailOption = {
      from: "Sender : 지식",
      to: `${req.body.email}`,
      subject: `${req.body.oname}님 지식 공유자로 참여해주셔서 감사드립니다`,
      text: `지원해 주신 분야는 ${req.body.category}입니다.
            3일 이내에 강의 개설 여부 계획을 다시 알려드리겠습니다.
            지원해주셔서 감사드립니다.`,
  }

  transport.sendMail(mailOption, function (error) {
      if (error) {
          console.log(error);
      } else {
          console.log('메세지 전송 완료');
      }
  })

  res.render('./search/professor.html',{

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
    let result = await items.findAll({where:{item_name:{[Op.like]:"%"+body+"%"}}})
    console.log(result)
    if(result.length != 0){

      console.log(result)
      res.render('./search/db.html',{
          result,
      })   

    }else{
      const getHtml = async () => {
        try {
          return await axios.get(`https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=${body}&oquery=${body}`);
        } catch (error) {
          console.error(error);
        }
      };
    
      getHtml()
        .then(html => {
          let ulList = [];
          const $ = cheerio.load(html.data);
          const $bodyList = $("div.total_area")
    
          $bodyList.each(function(i, elem) {
            ulList[i] = {
                title: $(this).find('a.total_tit').text(),
                content: $(this).find('div.total_group').text(),
                tag: $(this).find('div.total_info').text()
            };
          });

          const data = ulList.filter(n => n.title);
          const data2 = ulList.filter(v => v.content)
          const data3 = ulList.filter(s => s.tag)
          return data
        })
        .then((text) => {
          console.log(text)


          res.render('./search/db.html',{
              result2:text
          })
        }
          
      
        )   
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
      return await axios.get("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=friend&oquery=yerin&tqi=hLaeqlp0J1ssskVsHYGssssss%2BG-514962");
    } catch (error) {
      console.error(error);
    }
  };

  getHtml()
    .then(html => {
      let ulList = [];
      const $ = cheerio.load(html.data);
      const $bodyList = $("ul.lst_total")

      $bodyList.each(function(i, elem) {
        ulList[i] = {
            title: $(this).find('li').text(),
        };
      });

      const data = ulList.filter(n => n.title);
      return data;
    })
    .then((text) => {
      console.log(text)
      json = JSON.stringify(text)
      res.render('./search/otherSite.html',{json:json})
    }
      
  
    );
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
    question_view,
    question_write_success,
    question_oneview,
    answer_write_success,
    professor,
    professor_submit,
}; 