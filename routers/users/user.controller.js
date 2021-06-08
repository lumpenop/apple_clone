const {users, items, buy} = require('../../models');
const { createToken, createPW } = require("../../JWT");

let join = async (req, res) =>{
    res.render('join.html');
}

let join_success = (req,res)=>{
    let {username, userbirth, userid, userpw, mobile} = req.body; 
    userpw = createPW(userpw);

    users.create({userid,userpw,username,userbirth,mobile})
    res.redirect('/');
}

let login = (req,res)=>{
    let {userid,userpw} = req.body;
    userpw = createPW(userpw);//고객이 로그인할 때 쓴 비번을 암호화 
    
    let result = {result:false,}
    let pick = users.findOne({where:{userid}});
    if (pick==undefined){
        result.msg='이메일이 존재하지 않습니다.'
    }
    let userpwfromDB = pick.userpw
    if(userpw!=userpwfromDB){
        result.msg='비밀번호가 일치하지 않습니다.'
    }
    

}

module.exports= {
    join,join_success,login,
}