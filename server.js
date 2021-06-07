require('dotenv').config();
const express=require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3000; 
const main= require('./routers/index.js')
const mysql = require('mysql');
const {sequelize} = require('./models');
const {users,items,buy} = require('./models');
const auth = require('./middleware/auth.js');
const {createPW, createToken} = require('./JWT');
const session = require('express-session'); 
const socket = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socket(server);

sequelize.sync({force:false,})
.then(()=>{console.log('접속완료')})
.catch(()=>{console.log('접속 실패')})


nunjucks.configure('views', {
    express:app,
})
app.set('view engine', 'html');
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(express.json());
app.use(session({
    secret:'any',
    resave:true,
    secure:false,
    saveUninitialized:false,
}))
app.use(express.static('node_modules'));

// io.sockets.on('connection',(socket)=>{

// })

app.use('/', main)

//DB 잘 연결되는지 확인 완료 , users, items, buy 모두ㅇㅋㅇㅋ
app.get('/asdf',async (req,res)=>{
    let result = await buy.findAll();
    console.log(result);
    res.json({result});
})

server.listen(port,()=>{
    console.log(`server start port : ${port}`)
})