let loginBtn = document.querySelector('#loginBtn');
loginBtn.addEventListener('click',loginFn);
let chatBtn = document.querySelector('#chatBtn');
chatBtn.addEventListener('click', chatFn);

async function loginFn(){
    let loginForm = document.querySelector('#loginForm');
    let userid = document.querySelector('#userid');
    let userpw = document.querySelector('#userpw');
    
    if(userid.value==''){alert('이메일 주소를 입력해주세요.'); userid.focus(); return 0;};
    if(userpw.value==''){alert('비밀번호를 입력해주세요.'); userpw.focus(); return 0;};

    let url = `http://localhost:3000/user/logincheck`;
    let options = {
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({
            userid:userid.value, userpw:userpw.value,
        })
    }
    let response = await fetch(url,options);
    let res_body = await response.json();
    let {result, msg} = res_body;
    alert(msg);

    if(result){
        loginForm.submit();
    }else{
        userid.value='';
        userpw.value='';
        userid.focus();
    }
}

function chatFn(){
    window.open('chat','a','width=450,height=820,left=90%,top=100');
}