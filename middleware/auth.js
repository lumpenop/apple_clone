require('dotenv').config();
const crypto = require('crypto');
const {createToken}=require('../JWT');

module.exports=(req,res,next)=>{
    let {AccessToken} = req.cookies;
    console.log('Auth.js의 AccessToken 은 : ',AccessToken)
    if(AccessToken == undefined) {
        console.log('AccessToken이 undefined입니다.');
        res.json({result:false, msg:'로그인이 필요합니다.'})
        return;
    }
    console.log(req.session)
    let login_userid = req.session.userid;
    console.log('auth의 login_userid야', login_userid);
    let [header,payload, signature] = AccessToken.split('.'); //토큰 값
    let signatureToCheck = signatureCheck();
    
    function signatureCheck(){
        const signatureChecked = crypto.createHmac('sha256', Buffer.from(process.env.salt))
                                .update(`${header}.${payload}`)
                                .digest('base64').replace('==','').replace('=','');
        return signatureChecked;
    }

    if(signature==signatureToCheck){
        console.log('검증 완료');
        let {userid,exp} = JSON.parse(Buffer.from(payload,'base64').toString());
        let now = new Date().getTime();
        if (now>exp){
            console.log('토큰 만료 ');
            redirect('/msg=토큰이 만료되었습니다.');
            return 0; 
        } 
        req.userid = userid;
        next();
    }else{
        console.log('검증 실패');
        res.redirect('/msg=토큰 검증에 실패하였습니다.')
    }
}