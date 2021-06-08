require('dotenv').config();
const crypto = require('crypto');
const {createToken}=require('../JWT');

module.exports=(req,res,next)=>{
    let login_userid = req.session.userid;
    let [header,payload, signature] = createToken(login_userid).split('.');
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
            redirect('/msg=토큰만료');
            return 0; 
        }
        
        req.userid = userid;
        next();
    }else{
        console.log('검증 실패');
        res.redirect('/msg=해킹이요')
    }
}