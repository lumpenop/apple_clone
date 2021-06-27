// const {users} = require('./models'); 질문 : 여기에 못쓰는 이유가 궁금 server쪽이아닌 html과 연결된 js라서?? 
// 요 JS 는 client 브라우저가 해석하는 중 / server는 node.js 가 해석 중 


// 요 해석하는 client 브라우저연결된js는 DB해석할수 없음 
const input = document.querySelectorAll(".inputFocus");
for(var i=0; i<input.length; i++){
    input[i].addEventListener('focus', inputFocus);
    input[i].addEventListener('focusout', inputFocusOut);
}

function inputFocus(){
    const span = this.parentNode.querySelector('span');
    span.classList.remove('inputFocusOut');
    span.classList.add('inputFocus'); 
}

function inputFocusOut(){
    const span = this.parentNode.querySelector('span');
    if(this.value == ''){
        span.classList.remove('inputFocus');
        span.classList.add('inputFocusOut');    
    }
}

//  EMAIL (userid) 형식 유효성 검사 
let userid = document.querySelector('#userid')
userid.addEventListener('change',(e)=>{  // html 의 onchange="validEmail(this)"와 동일 
    validEmail(e.target)
    console.log(e.target)
})
function validEmail(obj){
    if(validEmailCheck(obj)==false){
        alert('올바른 이메일 주소를 입력해주세요.')
        obj.value='';
        obj.focus();
        return false;
    }
}
function validEmailCheck(obj){
    var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return (obj.value.match(pattern)!=null)
}

//  Mobile  - 하이픈 자동 생성 
function mobile_keyup(obj){
    let mobile_len=obj.value.length;
    console.log(mobile_len)
    if(event.keyCode==8){
        obj.value=obj.value.slice(0,mobile_len); 
        return 0; 
    }else if (mobile_len==3 || mobile_len==8){
        obj.value += '-';
    }
}

//  생년월일 - 하이픈 자동 생성
function birth_keyup(obj){
    let birth_len = obj.value.length;
    if (event.keyCode==8){
        obj.value = obj.value.slice(0,birth_len)
        return 0;
    }else if(birth_len==4 || birth_len==7){
        obj.value += '-';
    }
}

let joinBtn = document.querySelector('#joinBtn');
joinBtn.addEventListener('click',joinFn)

async function joinFn(){
    let joinform=document.querySelector('#joinform');
    let username = document.querySelector('#username');
    let userbirth = document.querySelector('#userbirth');
    let userid = document.querySelector('#userid');
    let userpw = document.querySelector('#userpw');
    let pwcheck = document.querySelector('#pwcheck');
    let mobile = document.querySelector('#mobile');

    if (username.value==""){swal('이름을 입력해주세요'); username.focus(); return 0;};
    if (userbirth.value==""){swal('생년월일을 입력해주세요'); userbirth.focus(); return 0;};
    if (userid.value==""){swal('이메일을 입력해주세요'); userid.focus(); return 0;};
    if (userpw.value==""){swal('패스워드를 입력해주세요'); userpw.focus(); return 0;};
    if (mobile.value==""){swal('핸드폰 번호를 입력해주세요'); mobile.focus(); return 0;};
    if (userpw.value!=pwcheck.value){swal('비밀번호가 서로 다릅니다.'); userpw.focus(); return 0;};
    

    // 전화번호 유효성 검사  
    let mobile_pattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/
    if(!mobile_pattern.test(mobile.value)) {swal('핸드폰 번호를 확인해주세요.'); mobile.value=''; mobile.focus(); return 0; }
    // 생년월일 유효성 검사
    let birth_pattern = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
    if(!birth_pattern.test(userbirth.value)){swal('생년월일 8자리를 입력해주세요'); userbirth.value=''; userbirth.focus(); return 0; }

    //  ID (email) 중복 JS 
    let url = `http://localhost:3000/user/userid_check`;
    let options = {
        method:'post',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({userid:userid.value})
    }
    let idfromDB = await fetch(url,options);
    let {result,msg} = await idfromDB.json();
    if (result==false) {swal(msg); return 0;}


    //  Password 영문,숫자,기호 JS 
    let pwCheck = userpw.value.split('');
    let pwCount = []; 
    pwCheck.forEach(v=>{
        let c = v.charCodeAt()
        if (48<=c && c <=57) pwCount[0] = 1;
        if ((65<=c && c <=90) || (97<= c && c <= 122)) pwCount[1] = 1;
        if ((33<=c && c<=47) || (58<=c && c<=64) || (91<=c && c<=96) || (123<=c && c<=126)) pwCount[2] = 1;
    })
    if (pwCount.length<3) {swal('패스워드에 영문, 숫자, 기호를 모두 사용해주세요.'); return 0;};
    

    //  모든 절차 통과 후 회원가입 완료
    alert(msg);
    joinform.submit(); 
}
