require('dotenv').config();
const express=require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3000; 
const socket = require('socket.io')
const http = require('http')
const cookieParser = require('cookie-parser')
const server = http.createServer(app)
const io = socket(server)
const mysql = require('mysql');
const {sequelize} = require('./models');
const session = require("express-session")
const {users,items,buy} = require('./models');
const auth = require('./middleware/auth.js');
const {createPW, createToken} = require('./JWT');
const router = require('./routers/index')

app.use(cookieParser())
app.use(session({
    secret:'asdf', 
    resave:false,
    secure:false,
    saveUninitialized:false,
}))
sequelize.sync({force:false,})
.then(()=>{console.log('접속완료')})
.catch(()=>{console.log('접속 실패')});


nunjucks.configure('views', {
    express:app,
})

app.set('view engine', 'html');
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/',router)

// //DB 잘 연결되는지 확인 환료 , users, items, buy 모두ㅇㅋㅇㅋ
// app.get('/asdf',async (req,res)=>{
//     let result = await buy.findAll();
//     console.log(result);
//     res.json({result});
// })


io.sockets.on('connection',socket=>{
    
    // let cookie = socket.handshake.headers.cookie
    
    // if(cookie != undefined){
    //     let cookie_array = cookie.split('; ')
    //     let obj = new Object
    //     cookie_array.forEach(v=>{
    //         [name, value] = v.split('=')
    //         obj[name] = value
    //     })
    //     let {AccessToken} = obj
    //     let payload = Buffer.from(AccessToken.split('.')[1],'base64').toString();
    //     var {userid} = JSON.parse(payload)
    // }
    // socket.emit('userid',userid)

    socket.on('send',data=>{
        socket.broadcast.emit('msg',{data:data})
        //socket.broadcast.emit('msg',{userid:userid,data:data})
    })
})
app.use(express.static('node_modules'));
app.use(express.json());
app.use(session({
    secret:'any',
    resave:true,
    secure:false,
    saveUninitialized:false,
}))

// io.sockets.on('connection',(socket)=>{})


//DB 잘 연결되는지 확인 완료 , users, items, buy 모두ㅇㅋㅇㅋ

server.listen(port,()=>{
    console.log(`server start port : ${port}`)
})