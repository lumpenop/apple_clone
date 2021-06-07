require('dotenv').config();
const express=require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3000; 
const main= require('./routers/index.js')



nunjucks.configure('views', {
    express:app,
})
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));


app.get('/', main)

app.listen(port,()=>{
    console.log(`server start port : ${port}`)
})