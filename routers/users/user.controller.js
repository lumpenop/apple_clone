let join = async (req, res) =>{
    res.render('join.html');
}

let join_success = (req,res)=>{
    //받은 내용들 db에 넣기 
    console.log(req.body)

    console.log('d')
    
    res.redirect('/');
}

module.exports= {
    join,join_success,
}