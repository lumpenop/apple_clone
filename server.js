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

sequelize.sync({force:false,})
.then(()=>{console.log('접속완료')})
.catch(()=>{console.log('접속 실패')})

app.use(express.static(__dirname + 'public'));

nunjucks.configure('views', {
    express:app,
})
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

app.get('/', main)

//DB 잘 연결되는지 확인 환료 , users, items, buy 모두ㅇㅋㅇㅋ
app.get('/asdf',async (req,res)=>{
    let result = await buy.findAll();
    console.log(result);
    res.json({result});
})

app.listen(port,()=>{
    console.log(`server start port : ${port}`)
})