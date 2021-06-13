
// const {users} = require('./models'); 질문 : 여기에 못쓰는 이유가 궁금 server쪽이아닌 html과 연결된 js라서?? 
// import swal from 'sweetalert';

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
    let pwCheck = userpw.value.split('')
    let pwCount = [];
    pwCheck.forEach(v=>{
        let c = v.charCodeAt()
        if (48<=c && c <=57) pwCount[0] = 1;
        if ((65<=c && c <=90) || (97<= c && c <= 122)) pwCount[1] = 1;
        if ((33<=c && c<=47) || (58<=c && c<=64) || (91<=c && c<=96) || (123<=c && c<=126)) pwCount[2] = 1;
    })
    if (pwCount.length<3) {swal('패스워드에 영문, 숫자, 기호를 모두 사용해주세요.'); return 0;};
    

    //  모든 절차 통과 후 회원가입 완료
    joinform.submit(); swal(msg);
}





