require('dotenv').config();
const crypto = require('crypto');

module.exports=(req,res,next)=>{
    let {AccessToken} = req.cookies;
    
    if(AccessToken == undefined) {
        console.log('AccessToken이 undefined입니다.');
        res.json({result:false, msg:'로그인이 필요합니다. 로그인 하시겠습니까?'})
        return;
    }
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
            res.json({result:false,msg:'토큰이 만료되었습니다. 다시 로그인을 진행해주세요.'});
            return 0; 
        } 
        req.userid = userid;
        next();
    }else{
        console.log('검증 실패');
        res.json({result:false,msg:'토큰 검증에 실패하였습니다. 다시 로그인을 진행해주세요.'});
    }
}