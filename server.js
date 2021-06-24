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
let userid ; 
    let cookies = socket.handshake.headers.cookie;
    if (cookies != undefined) {
        let cookieArr = cookies.split(';');
        cookieArr.forEach(async v => {
            let [key, value] = v.trim().split('=');
            if (key == 'AccessToken') {
                let payload = value.split('.')[1];
                let { userid, exp } = JSON.parse(Buffer.from(payload, 'base64').toString());
                // id = userid
                // admin_check => 관리자이면 return 0 아니면 NULL 
                let admin_check = await areYouAdmin(userid)
                if (admin_check==0){
                    admin_array.push({socketID:socket.id, userid,}); console.log('is admin');
                } else {
                    user_array.push({socketID:socket.id, userid,}); console.log('is user');

                    // sockek 연결 후 해당 브라우저 userid, sockt.id 를 담아서 관리자들한테 보냄 
                    let data = {socketID:socket.id, userid,}
                    if (admin_array.length > 0){
                        admin_array.forEach(v =>{
                            socket.to(v.socketID).emit('send',data)
                        })
                    }
                }
                console.log('user_array=',user_array)
                console.log('admin_array=',admin_array)
            }
        })
    
        socket.on('send',async (data) => {
            console.log(data);
            // 메세지 보내는 사람의 정보 (관리자도 되고 , user도 됨 )
            let {msg, socketID} = data;
            let ADMIN = admin_array[admin_array.length-1].socketID;
            let userid ;
            for (let i = 0; i <user_array.length; i++){
                console.log('socketID : ',user_array[i].socketID,socketID)
                // user채팅일땐 admin userid
                // admin채팅일땐 admin userid
                if ( user_array[i].socketID == socketID ){
                    // 관리자 userid 구할때와 userid 구할때 구분값 구하기
                    userid = user_array[i].userid
                    socketID = user_array[i].socketID
                } else {
                    userid = admin_array[0].userid
                }
            }
            let admin_check = await areYouAdmin(userid)
            if (admin_check==0){
                //관리자 -> 사용자 
                socket.to(socketID).emit('msg',msg)
            } else {
                // 사용자 -> 관리자 
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