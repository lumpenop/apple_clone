require('dotenv').config();
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3000;
const socket = require('socket.io');
const http = require('http');
const cookieParser = require('cookie-parser');
const server = http.createServer(app)
const io = socket(server)
const mysql = require('mysql');
const { sequelize } = require('./models');
const session = require("express-session");
const {users,items,buy,valuation} = require('./models');
const auth = require('./middleware/auth.js');
const { createPW, createToken } = require('./JWT');
const router = require('./routers/index');
const swal = require("sweetalert");

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
app.use(express.static('node_modules'));
app.use(express.json());
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('images'));
app.use('/', router)

let id;
io.sockets.on('connection', socket => {
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
        socket.on('send', date => {
            socket.broadcast.emit('msg', date);
        })
    }
})



server.listen(port, () => {
    console.log(`server start port : ${port}`)
})