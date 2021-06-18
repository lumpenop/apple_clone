const { users, items, buy, bag , history} = require('../../models');
const { createToken, createPW } = require("../../JWT");
const axios = require('axios');
const qs = require('qs');
const session = require('express-session');
const nodemailer = require('nodemailer');


//     JOIN     //
let join = async (req, res) => {
    res.render('join.html');
}

let login = async (req, res) => {
    res.render('login.html',{
        msg:req.query.msg
    });
}
// let login_cookie = async (req,res) => {
//     res.clearCookie('username')
//     res.clearCookie('item_name')
//     res.clearCookie('AccessToken')
//     res.render('login.html')
// }
// let bags = async (req, res) => {
//     // console.log(req.cookies['Access_token'])
//     // res.render('index.html');

//     // let payload = Buffer.from(req.cookies['Access_token'].split('.')[1],'base64').toString();
//     // console.log(payload)
//     // var {userid} = JSON.parse(payload)
//     // console.log(userid)
//     // let userList= await bag.findAll({
//     //     where:{
//     //         users_id:req.id
//     //     }
//     // });
//     // res.json({
        
//     // })
// }

let join_success = (req, res) => {
    let { username, userbirth, userid, userpw, mobile } = req.body;
    userpw = createPW(userpw);
    users.create({ userid, userpw, username, userbirth, mobile })
    res.redirect('/user/login');
}

//       LOGIN     //
<<<<<<< HEAD
// let login = async (req, res) => {
//     res.render('login.html');
// }
=======
let login = async (req, res) => {
    //login 상태면 main.html / logout - login.html 
    let {userid} = req.cookies;
    if (userid == undefined){
        res.render('login.html');    
    }else{
        res.redirect('/');
    }
    
}
>>>>>>> c284a415592b9461e177f1cb96d063ff1e27196c

let userid_check = async (req,res) =>{
    let {userid} = req.body;
    let rst = {result:false, msg:'해당 email은 기존 등록된 아이디입니다. 다른 email 주소를 입력해주세요.'};
    let idCheckfromDB = await users.findOne({ where:{userid}})
    if (idCheckfromDB==undefined){
        res.json({result:true,msg:'Apple 회원이 되신 것을 축하합니다!'})
    }else{ 
        res.json(rst)
    }
}

let logincheck = async (req, res) => {
    let { userid, userpw } = req.body;
    userpw = createPW(userpw);//고객이 로그인할 때 쓴 비번을 암호화 
    let result = { result: false, }
    let pick = await users.findOne({where:{userid}});

    if (pick == undefined) {
        result.msg = '이메일이 존재하지 않습니다.';
    } else {
        let userpwfromDB = pick.dataValues.userpw;
        let useridfromDB = pick.dataValues.userid;
        let usernamefromDB = pick.dataValues.username;
        if (userpw != userpwfromDB) {
            result.msg = '비밀번호가 일치하지 않습니다.';
        } else if (userpw == userpwfromDB && userid == useridfromDB) {
            result.result = true;
            result.msg = `Welcome back ${usernamefromDB}!`;
            res.cookie('username', usernamefromDB); 
        }
    }
    let Token = createToken(userid);
    
    res.cookie('AccessToken', Token, {httpOnly:true, secure:true}); 
    res.cookie('userid',userid); 
    res.cookie('loginsite','local')
    //session에 local 로 로그인한 user의 정보 (users table의 모든 fields) 담음 
    req.session.authData={
        ['local']:pick.dataValues,
    }
    req.session.save(()=>{
        res.json(result);
    })
}

let login_success = (req, res) => {
    res.redirect('/')
}





//      KAKAO API   
const kakao ={
    clientID : 'e1ef284bc8b05427f0b2f54b68a6ac8e',
    clientSecret : 'XYPooCWLt0E4JD29DzovS53JRh6paOh6',
    redirectUri : 'http://localhost:3000/user/kakao_login',
}

let kakaologin = (req,res)=>{
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile,account_email,gender,talk_message`;
    res.redirect(kakaoAuthURL);
}

let kakao_login=async(req,res)=>{
    let token;
    try{
        token = await axios({
            method:'POST',
            url:'https://kauth.kakao.com/oauth/token',
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:qs.stringify({
                grant_type:'authorization_code',
                client_id:kakao.clientID,
                client_secret:kakao.clientSecret,
                redirectUri:kakao.redirectUri,
                code:req.query.code,
            })
        })
    }catch(e){ res.json(e.data)}

    let user;
    try{
        user = await axios({
            method:'GET',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                Authorization:`Bearer ${token.data.access_token}`
            }
        })
    } catch(e) {res.json(e.data)}

    let authData = {
        ...token.data,
        ...user.data,
    }
    req.session.authData={
        ['kakao']:authData,
    }

    res.cookie('userid',user.data.kakao_account.email); 
    res.cookie('username', user.data.properties.nickname); 
    res.cookie('loginsite','kakao');
    res.redirect('/');
}


//  G O O G L E    A   P   I
// API KEY AIzaSyyiGImaDPyY
// Client ID 62944fjfoqhd6j5glpjf4o6stnn.apps.googleusercontent.com
// Client secret 9rSNXnc_BWybXiH

let googlelogin = (req,res)=>{ 
    let { userid, username } = req.body;
    let result = {msg:`Welcome back ${username}!`}
    
    res.cookie('userid',userid);
    res.cookie('username',username); 
    res.cookie('loginsite', 'google');
    req.session.authData={
        ['google']:{userid,username}
    }

    req.session.save(()=>{
        res.json(result);
    })
}




//     LOG OUT    &    DeleteID   //
let logout = (req,res)=>{
    const {userid,username,loginsite} = req.cookies;
    delete req.session.authData;    
    res.cookie('userid',userid,{maxAge:0});
    res.cookie('username',username,{maxAge:0});
    res.cookie('loginsite',loginsite,{maxAge:0});

    let result = {msg: `${username}님 로그아웃 되었습니다. ${loginsite}`};
    switch(loginsite){
        case 'local':
            res.redirect(`/?msg= ${username}님 로그아웃 되었습니다. ${loginsite}`);
        break;
        case 'kakao':
            res.redirect(`/?msg= ${username}님 로그아웃 되었습니다. ${loginsite}`);
        break;  
    }
}

let google_logout =(req,res)=>{
    const {userid,username,loginsite} = req.cookies;
    delete req.session.authData;    
    res.cookie('userid',userid,{maxAge:0});
    res.cookie('username',username,{maxAge:0});
    res.cookie('loginsite',loginsite,{maxAge:0});

    let result = {msg: `${username}님 로그아웃 되었습니다. ${loginsite}`};
    res.json(result);
}

let deleteID = (req,res) =>{
    const {userid,username,loginsite} = req.cookies;
    // const site = Object.keys(req.session.authData)[0];
    if (loginsite=='google'){
        res.redirect(`/?msg=${username}님 google계정 삭제는 Google 웹사이트에서만 가능합니다.`)
        return 0;
    }
    delete req.session.authData; 
    console.log(userid,username,loginsite)   
    res.cookie('userid',userid,{maxAge:0});
    res.cookie('username',username,{maxAge:0});
    res.cookie('loginsite',loginsite,{maxAge:0});
    users.destroy({where:{userid,}})
    switch(loginsite){
        case 'local':
            res.redirect(`/?msg=${username}님 그동안 Apple과 함께해주셔서 감사합니다.(local)`)
        break;
        case 'kakao':
            res.redirect(`/?msg=${username}님 그동안 Apple과 함께해주셔서 감사합니다. (kakao)`)
        break;  
    }
} 




//        INFO         //
let info = (req,res) =>{
    res.render('./info/info.html')
}

let info_view = (req,res) =>{
    res.render('./info/info_view.html');
}

let info_modify = (req,res) =>{
    res.render('./info/info_modify.html')
}





//      CHATTING      //
let chat = (req,res)=>{
    res.render('./chat/chat.html');
}

let chatHelp = (req,res)=>{
    res.render('./chat/chatHelp.html');
}

let chatBtn = (rea,res)=>{
    res.render('./chat/chatBtn.html');
}

let chatRoom = (req,res)=>{
    res.render('./chat/chatRoom.html');
}




//        BAGS        //
let bags = async (req, res) => {
    // console.log(req.cookies['Access_token'])
    // res.render('index.html');

    // let payload = Buffer.from(req.cookies['Access_token'].split('.')[1],'base64').toString();
    // console.log(payload)
    // var {userid} = JSON.parse(payload)
    // console.log(userid)
    // let userList= await bag.findAll({
    //     where:{
    //         users_id:req.id
    //     }
    // });
    // res.json({
        
    // })
}

let pwFind_middleware = async (req,res) => {
    res.render('./pwFind_middleware.html')
}
let pwFind = async (req,res) => {
    let userid = req.body.userid
    var arr = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,~,`,!,@,#,$,%,^,&,*,(,),-,+,|,_,=,\,[,],{,},<,>,?,/,.,;".split(",");
    var randomPw = createCode(arr, 10);

    function createCode(objArr, iLength) {
    var arr = objArr;
    var randomStr = "";
    for (var j=0; j<iLength; j++) {
    randomStr += arr[Math.floor(Math.random()*arr.length)];
    }
    return randomStr
    }

    let transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "simbianartist@gmail.com",
            pass: "rlatjdud2019"
        }
    })
    
    let mailOption = {
        from: "simbianartist@gmail.com",
        to: "simbianartist@gmail.com",
        subject: "제목",
        text: `랜덤 비밀번호 발급 : ${randomPw}`,
    }
    let userpw = createPW(randomPw);
    let result = await users.update({userpw:userpw},{where:{userid:userid}})
    transport.sendMail(mailOption, function(error, info){
        if(error){
            console.log(error)
        } else {
            console.log('메세지 전송 완료')
        }
    })

    res.render('./pwFind.html')
}

module.exports = {
    join, join_success, userid_check, login, logincheck, login_success, 
    kakaologin, kakao_login, logout, deleteID, googlelogin, google_logout,
    info, info_view, info_modify,
    chat, chatRoom, chatHelp, chatBtn,
    bags, 
    pwFind, pwFind_middleware
}