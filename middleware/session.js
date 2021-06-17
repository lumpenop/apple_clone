module.exports=(req,res,next)=>{
    let {authData} = req.session;

    if(authData == undefined) {
        res.json({result:false, msg:'로그인이 필요합니다. 로그인 하시겠습니까?'})
        return;
    }


    next();

}