alert('d')
let loginBtn = document.querySelector('#loginBtn');
console.log(loginBtn)
loginBtn.addEventListener('click',loginFn);

function loginFn(){
    alert('ddd');
    let loginForm = document.querySelector('#loginForm');
    let userid = document.querySelector('#userid');
    let userpw = document.querySelector('#userpw');
    
    // if(userid.value==''){alert('이메일 주소를 입력해주세요.'); userid.focus(); return 0;};
    // if(userpw.value==''){alert('비밀번호를 입력해주세요.'); userpw.focus(); return 0;};

    // let url = `http://localhost:3000/user/login`;
    // let options = {
    //     method:'POST',
    //     headers:{
    //         'content-type':'application/json',
    //     },
    //     body:JSON.stringify({
    //         userid:userid.value, userpw:userpw.value,
    //     })
    // }
    // let response = await fetch(url,options);
    // let res_body = await response.json();

    loginForm.submit();
}
