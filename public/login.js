const input = document.querySelectorAll(".inputFocus");
let loginBtn = document.querySelector('#loginBtn');
loginBtn.addEventListener('click', loginFn);
let chatBtn = document.querySelector('#chatBtn');
chatBtn.addEventListener('click', chatFn);


for (var i = 0; i < input.length; i++) {
    input[i].addEventListener('focus', inputFocus);
    input[i].addEventListener('focusout', inputFocusOut);
}

function inputFocus() {
    const span = this.parentNode.querySelector('span');
    span.classList.remove('inputFocusOut');
    span.classList.add('inputFocus');
}

function inputFocusOut() {
    const span = this.parentNode.querySelector('span');
    if (this.value == '') {
        span.classList.remove('inputFocus');
        span.classList.add('inputFocusOut');
    }
}

// 핸드폰 번호 형식 /^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$/
// 생년 월일 /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/

async function loginFn() {
    let loginForm = document.querySelector('#loginForm');
    let userid = document.querySelector('#userid');
    let userpw = document.querySelector('#userpw');

    if (userid.value == '') { swal('이메일 주소를 입력해주세요.'); userid.focus(); return 0; };
    if (userpw.value == '') { swal('비밀번호를 입력해주세요.'); userpw.focus(); return 0; };

    let url = `http://localhost:3000/user/logincheck`;
    let options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            userid: userid.value, userpw: userpw.value,
        })
    }
    let response = await fetch(url, options);
    let res_body = await response.json();
    let { result, msg } = res_body;
    alert(msg);

    if (result) {
        loginForm.submit();
    } else {
        userid.value = '';
        userpw.value = '';
        userid.focus();
    }
}


//  GOOGLE LOGIN API 

async function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    let url = `http://localhost:3000/user/googlelogin`;
    let options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            userid: profile.getEmail(),
            username: profile.getName(),
        })
    }
    let response = await fetch(url, options);
    let res_body = await response.json();
    let { msg } = res_body;
    alert(msg)
    location.href = 'http://localhost:3000'
}


// const googleLogin = document.querySelector('#googleLogin');
// googleLogin.addEventListener('click',signOut());

// function signOut(){
//     console.log('d')
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         location.href = 'http://localhost:3000/user/logout';
//         console.log('GOOGLE User signed out.');
//     });
// } 
/// 위의 JS 는 메인 페이지에서 아직 로딩 안된 상태다. 그래서 함수 onclick이 안된다. 


// function chatFn() {
//     var chatWidth = 565;
//     var chatHeight = 817;
//     var chatLeft = 90;
//     var chatTop = 100;
//     // xPos = (document.body.offsetWidth) - w; // 오른쪽 정렬
//     // xPos += window.screenLeft; // 듀얼 모니터일 때
//     // var yPos = (document.body.offsetHeight/2) - (h/2);
//     window.open('chat', 'a', `width = ${chatWidth}px, height = ${chatHeight}px,left = ${chatLeft}%,top = ${chatTop}`);
// }





