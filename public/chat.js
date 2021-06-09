const chatBtn = document.querySelector('#chatBtn');
const chatPlace = document.querySelector('#chatPlace');
let flag = undefined;

chatBtn.addEventListener('click',()=>{
    switch(flag){
        case true:
            flag=false;
            chatPlace.style.display='none';
            chatBtn.innerHTML='채팅 시작하기';
        break;
        case false:
            flag = true;
            chatPlace.style.display='block';
            chatBtn.innerHTML='환영합니다!';
        break;
        case undefined:
            flag=true;
            getChatRoom();
        break;
    }
});

async function getChatRoom(){
    let url = `http://localhost:3000/user/chatRoom`;
    let options = {
        method: 'get'
    }
    let response = await fetch(url, options);
    let result = await response.text();
    console.log(result)
    if(isJson(result)){
        let json = JSON.parse(result);
        if(json.result==false) alert(json.msg);
        return;
    }else{
        chatPlace.innerHTML=result;
        chatBtn.innerHTML='환영합니다!';
    }
}

function isJson(str){
    try{
        let json = JSON.parse(str)
        return (typeof json =='object');
    }catch(e){
        return false;
    }
}
























