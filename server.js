require('dotenv').config();
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
// const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3000;
const socket = require('socket.io');
const http = require('http');
const cookieParser = require('cookie-parser');
const server = http.createServer(app)
const io = socket(server)
// const mysql = require('mysql');
const { users, items, buy, bag, history } = require('./models');
const { sequelize } = require('./models');
const session = require("express-session");
const auth = require('./middleware/auth.js');
const router = require('./routers/index');
const cors = require('cors')
const { fstat } = require('fs');
const axios = require("axios");
const cheerio = require("cheerio");

app.use(cors());


app.use(cookieParser())
app.use(session({
    secret: 'asdf',
    resave: false,
    secure: false,
    saveUninitialized: false,
}));
sequelize.sync({ force: false, })
    .then(() => { console.log('접속완료') })
    .catch(() => { console.log('접속 실패') });

nunjucks.configure('views', {
    express: app,
})
app.set('view engine', 'html');
app.use(express.static('node_modules'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('images'));
app.use('/', router)

// socket 고유 id 가 생성됨 handshake 할 때 
let id; // 전역변수 선언
let user_array = [];
let admin_array = [];
io.sockets.on('connection', (socket) => {

    // 맨 처음 handshake 이후 userid 로 admin or user check -> array 담기 
    let cookies = socket.handshake.headers.cookie;
    if (cookies != undefined) {
        let cookieArr = cookies.split(';');
        cookieArr.forEach(async v => {
            let [key, value] = v.trim().split('=');
            if (key == 'AccessToken') {
                let payload = value.split('.')[1];
                let { userid, exp } = JSON.parse(Buffer.from(payload, 'base64').toString());
                
                // id = userid/ admin_check => 관리자이면 return 0 아니면 NULL 
                let admin_check = await areYouAdmin(userid)
                console.log('admin_check', admin_check)
                if (admin_check==1){
                    admin_array.push({socketID:socket.id, userid,}); console.log('is admin');
                } else {
                    user_array.push({socketID:socket.id, userid,}); console.log('is user');
                   
                    // sockek 연결 후 해당 브라우저 userid, sockt.id 를 담아서 관리자들한테 보냄 
                    let data = {socketID:socket.id, userid,}
                    if (admin_array.length > 0){
                        admin_array.forEach(v =>{
                            //0-0. 일단 접속을 한다 E 이 때 어드민 한테만 접속 정보를 넘긴다.
                            socket.to(v.socketID).emit('Userin',data)
                        })
                    }
                }
                console.log('user_array=',user_array)
                console.log('admin_array=',admin_array)
            }
        })

        // 대기 user div 클릭하면 해당 user id, socket ID 보내기 / 변수에 담기
        let chat_user;
        let chat_socketID
        //0-1. 클릭 시 정보를 보낸다
        socket.on('Please', data=>{
            console.log('Please를 통해 온 userid, socketID',data.userid, data.socketID)
            chat_user = data.userid;
            chat_socketID = data.socketID;
        })

        //2. 자기가 쓴 글이 뜨게 한다
        // 메세지 받기 ---------------222222222
        socket.on('send',async (data) => {
            console.log('보낸 메세지 받은 data', data);
            // 메세지 보내는 사람의 정보 (관리자도 되고 , user도 됨 )
            let {msg, socketID} = data;
            let ADMIN = admin_array[admin_array.length-1].socketID;
            let userid;

            for (let i = 0; i <user_array.length; i++){
                console.log('socketID==', socketID)
                console.log('user_arry==',user_array[i])
                if ( user_array[i].socketID == socketID ){
                    // userid == user 일 때 
                    userid = user_array[i].userid
                    break;
                    // 아래처럼 해당 userid(메세지 보낸) 의 socketID를 구하려고 했지만
                    // socketID 가 계속 바뀌어서 위의 chat_socketID 로 대체 
                    // 바뀐 이유 !!! -> 아직 delete 전이라 userid 중복 가능 해서 
                    // 계속 userid의 여러개 socket 존재해서 달랐음 ㅠㅠ 
                    // socketID = user_array[i].socketID
                } else {
                    // userid == 관리자 일 때 
                    userid = admin_array[0].userid
                }
            }

            //3. 서로가 서로한테 보낸다 E
            let admin_check = await areYouAdmin(userid)
            if (admin_check==1){
                //관리자 -> 사용자 
                console.log('admin_check=1일떄ㅒㅒ ')
                socket.to(chat_socketID).emit('msg',msg)
            } else {
                // 사용자 -> 관리자 
                console.log('admin_check=1 아닐 떄 ㅒㅒ ')
                console.log('admin 한테 메세지 보내기-->',ADMIN)
                socket.to(ADMIN).emit('msg', msg);
            }
        })

        // socket.on('disconnect',async ()=>{
            
        //     let admin_check = await areYouAdmin(id)
        //     if (admin_check==0){
        //         console.log('admin is out')
        //         admin_array.splice(admin_array.indexOf(socket.id),1)
        //     } else {
        //         console.log('user id out')
        //         user_array.splice(user_array.indexOf(socket.id),1)
        //         let data = {socketID:socket.id, userid,}
        //         if (admin_array.length > 0){
        //             admin_array.forEach(v =>{
        //                 socket.to(v).emit('sendForDelete',data)
        //             })
        //         }
        //     }
        //     console.log('disconnected soket_id = ', socket.id)
        //     console.log('disconnected socket_arr =', user_array)
        //     console.log('disconnected admin_arr =', admin_array)
        // })
    }
    
})

// Admin 인지 check Function
async function areYouAdmin(userid){
    let user_level = await users.findOne({where:{userid,}})
    return user_level.dataValues.admin;
}

const chat = io.of('/chat')
chat.on('connection', socket=>{

})



server.listen(port, () => {
    console.log(`server start port : ${port}`)
})