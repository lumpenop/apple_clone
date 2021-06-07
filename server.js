const express=require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');



nunjucks.configure('views', {
    express:app,
})
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    res.render('index.html');
})

app.listen(3000,()=>{
    console.log('server start port : 3000')
})