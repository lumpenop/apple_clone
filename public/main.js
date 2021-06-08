document.addEventListener('DOMContentLoaded',init)
function init(){
    let joinBtn = document.querySelector('#joinBtn');
    joinBtn.addEventListener('click',joinFn)
    //로그인 버튼 변수 저장
    // click하면 함수 실행 
}

function joinFn(){
    let joinform=document.querySelector('#joinform');
    let username = document.querySelector('#username');
    let userbirth = document.querySelector('#userbirth');
    let userid = document.querySelector('#userid');
    let userpw = document.querySelector('#userpw');
    let pwcheck = document.querySelector('#pwcheck');
    let mobile = document.querySelector('#mobile');

    if (username.value==""){alert('이름을 입력해주세요'); username.focus(); return 0;};
    if (userbirth.value==""){alert('생년월일을 입력해주세요'); userbirth.focus(); return 0;};
    if (userid.value==""){alert('이메일을 입력해주세요'); userid.focus(); return 0;};
    if (userpw.value==""){alert('패스워드를 입력해주세요'); userpw.focus(); return 0;};
    if (mobile.value==""){alert('핸드폰 번호를 입력해주세요'); mobile.focus(); return 0;};
    if (userpw.value!=pwcheck.value){alert('비밀번호가 서로 다릅니다.'); userpw.focus(); return 0;};
    
    joinform.submit();
}

async function loginFn(){
    let userid = document.querySelector('#userid');
    let userpw = document.querySelector('#userpw');
    
    if(userid.value==''){alert('이메일 주소를 입력해주세요.'); userid.focus(); return 0;};
    if(userpw.value==''){alert('비밀번호를 입력해주세요.'); userpw.focus(); return 0;};


    
    let url = `http://localhost:3000/user/login`;
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


}
