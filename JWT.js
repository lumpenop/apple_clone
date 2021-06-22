require('dotenv').config();
const crypto = require('crypto');

function createToken(userid){
    let header = {'tpy':'JWT', 'alg':'HS256'}
    let exp = new Date().getTime()+(1000*60*60*2);
    let payload = {userid, exp,}
    
    const encodingHeader = Buffer.from(JSON.stringify(header)).toString('base64')
                        .replace('==','').replace('=','');
    const encodingPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
                        .replace('==','').replace('=','');
    const signature = crypto.createHmac('sha256', Buffer.from(process.env.salt))
                        .update(encodingHeader+'.'+encodingPayload)
                        .digest('base64').replace('==','').replace('=','');
                        
    let jwt = `${encodingHeader}.${encodingPayload}.${signature}`;
    return jwt;
}

function createPW(userpw){

    const cryptoPassword = crypto.createHmac('sha256', Buffer.from(process.env.salt))
                        .update(userpw)
                        .digest('base64')
                        .replace('==', '').replace('=','');
    return cryptoPassword;
}

function verifying_key(){
    let key_one = crypto.randomBytes(256).toString('hex').substr(100,5);
    let key_two = crypto.randomBytes(256).toString('base64').substr(50,5);
    let verifying_key = key_one + key_two;
    return verifying_key; 
}

module.exports = {
    createToken, createPW, verifying_key,
}