const {users, items, buy} = require('../../models');
const { createToken, createPW } = require("../../JWT");

let join = async (req, res) =>{
    res.render('join.html');
}

let join_success = (req,res)=>{
    // 맞으면 pw 암호화 -> 
    //받은 내용들 db에 넣기
    let {username, userbirth, userid, userpw, pwcheck, mobile} = req.body; 

    let encrypted_userpw = createPW(userpw);
    console.log(encrypted_userpw)

    
    res.redirect('/');
}

module.exports= {
    join,join_success,
}