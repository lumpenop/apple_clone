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
let id;
let socket_array = [];
io.sockets.on('connection', socket => {
    socket_array.push(socket.id)
    console.log('after Push socketarr = ',socket_array)
    let cookies = socket.handshake.headers.cookie;
    if (cookies != undefined) {
        let cookieArr = cookies.split(';');
        cookieArr.forEach(v => {
            let [key, value] = v.trim().split('=');
            if (key == 'AccessToken') {
                let payload = value.split('.')[1];
                let { userid, exp } = JSON.parse(Buffer.from(payload, 'base64').toString());
                id = userid;
            }
        })
        socket.on('send', data => {
            console.log(data)
            let {msg, socketID} = data;
            socket.to('YO4QGA8Tmn8VXXgpAAAR').emit('msg', msg);
            
        })
        socket.on('disconnect',()=>{
            for (let i =0; i<socket_array.length; i++){
                if(socket_array[i]==socket.id){
                    socket_array.splice(i,1);
                    break;
                }
            }
            console.log('disconnected socket_arr =', socket_array)
        })
    }
})

const chat = io.of('/chat')
chat.on('connection', socket=>{

})



server.listen(port, () => {
    console.log(`server start port : ${port}`)
})