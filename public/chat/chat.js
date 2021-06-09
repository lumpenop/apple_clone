const chatBtn = document.querySelector('#chatBtn');
const chatPlace = document.querySelector('#chatPlace');
let flag = undefined;

chatBtn.addEventListener('click', () => {
    switch (flag) {
        case true:
            flag = false;
            chatPlace.style.display = 'none';
            chatBtn.innerHTML = '채팅 시작하기';
            break;
        case false:
            flag = true;
            chatPlace.style.display = 'block';
            chatBtn.innerHTML = '환영합니다!';
            chatBtn.dataset.value = 0;
            break;
        case undefined:
            flag = true;
            getChatRoom();
            break;
    }
});

async function getChatRoom() {
    let url = `http://localhost:3000/user/chatRoom`;
    let options = {
        method: 'get'
    }
    let response = await fetch(url, options);
    let result = await response.text();
    console.log(result)
    if (isJson(result)) {
        let json = JSON.parse(result);
        if (json.result == false) alert(json.msg);
        return;
    } else {
        chatPlace.innerHTML = result;
        chatBtn.innerHTML = '환영합니다!';
        const time = document.querySelector('#time');
        let now = new Date();
        time.innerHTML = now.toLocaleString();
        socketChat();
    }
}

function isJson(str) {
    try {
        let json = JSON.parse(str)
        return (typeof json == 'object');
    } catch (e) { return false;}
}



//        s o c k e t s        //

const socket = io();

function socketChat() {
    socket.on('connect', () => { })
    socket.on('msg', data => {
        chatBtn.dataset.value = parseInt(chatBtn.dataset.value) + 1;
        if (flag == false) {
            chatBtn.innerHTML = `답변이 도착했습니다! <span> ${chatBtn.dataset.value}`;
        }
        msgAdd(data, 'you');
    })
}

function send() {
    const msg = document.querySelector('#msg');
    if (msg.value == '') { }

    socket.emit('send', msg.value);
    msgAdd(msg.value, 'me');
    msg.value = '';
}

function msgAdd(msgValue, who) {
    const ul_time = document.createElement('ul');
    const ul_msg = document.createElement('ul');
    const li_time = document.createElement('li');
    const li_msg = document.createElement('li');
    const chat = document.querySelector('#chat');

    let T = new Date()
    let H = T.getHours();
    let M = ('00'+T.getMinutes()).slice(-2);
    let now = (H >= 12 && H <= 24) ? '오후' : '오전';
    H = H >= 12 ? H - 12 : H;
    H = ('00'+ H).slice(-2);
    let clock = `${now} ${H}:${M}`

    const B = document.querySelectorAll('.timeClass')
    li_time.innerHTML = clock;
    li_time.classList.add('timeClass');
    li_msg.innerHTML = msgValue;
    li_msg.classList.add(who);

    if (B.length == 0 || B[B.length - 1].textContent != clock) {
        ul_time.appendChild(li_time);
        ul_msg.appendChild(li_msg);
        chat.appendChild(ul_time);
        chat.appendChild(ul_msg);
    } else {
        if (B[B.length - 1].textContent == clock) {
            ul_msg.appendChild(li_msg);
            chat.appendChild(ul_msg);
        }
    }
}




















