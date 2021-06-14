const chatBtn = document.querySelector('#chatBtn');
const chatPlace = document.querySelector('#chatPlace');
let flag = undefined;

chatBtn.addEventListener('click', () => {
    chatBtn.style.marginTop = "0px";
    chatBtn.style.transition = "0.5s ease-in-out";
    chatBtn.style.fontSize = "17px";

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
    let res_result = await response.text();

    if (isJson(res_result)) {
        let { result, msg } = JSON.parse(res_result);
        if (result == false) {
            const msg_res = confirm(msg);
            if (msg_res == true) {
                opener.parent.location = '/user/login';
                window.close();
            } else {
                window.location.reload();
                return;
            }
        };
        return;
    } else {
        chatPlace.innerHTML = res_result;
        chatBtn.innerHTML = '환영합니다!';
        const time = document.querySelector('#time');
        let now = new Date();
        time.innerHTML = now.toLocaleString();
        socketChat();

        const chatInput = document.querySelector('#msg');
        const chatSend = document.querySelector('.chatSend');
        chatInput.addEventListener('keydown', function (event) {
            if (event.keyCode == 13) {
                send();
                chatSend.style.backgroundColor = '#EEE';
                chatSend.style.color = '#9AA7B4';
            }
        })

        // inputbox에 글자 있으면 버튼 색 변화
        chatInput.addEventListener('input', () => {
            if (chatInput.value != '') {
                chatSend.style.backgroundColor = '#4D9DCB'
                chatSend.style.color = '#fff'
            } else {
                chatSend.style.backgroundColor = '#EEE'
                chatSend.style.color = '#9AA7B4'
            }
        })

        // send 버튼 클릭 시 버튼 색 돌아오기 
        chatSend.addEventListener('click', () => {
            chatSend.style.backgroundColor = '#EEE'
            chatSend.style.color = '#9AA7B4'
        })
    }
}

function scrollFn() {
    let chat = document.querySelector('#chat');
    // let chat_scroll = chat.scrollTop;

    // console.log(chat_scroll)
    // console.log(chat.style.height)
    // if (chat_scroll>0){
    //     chat.style.marginTop=`-${chat_scroll}px`;
    // }
    // console.log(chat.style)
    // console.log(chat_scroll)

}

function isJson(str) {
    try {
        let json = JSON.parse(str)
        return (typeof json == 'object');
    } catch (e) { return false; }
}

//        s o c k e t s        //

const socket = io();

function socketChat() {
    socket.on('connect', () => { })
    let chat_count = parseInt(chatBtn.dataset.value);
    socket.on('msg', data => {
        chat_count++;
        if (flag == false) {
            chatBtn.innerHTML = `답변이 도착했습니다! <span> ${chat_count}`;
        }
        msgAdd(data, 'you');
    });
};

function send() {
    const msg = document.querySelector('#msg');
    if (msg.value == '') {
        return;
    } else {
        socket.emit('send', msg.value);
        msgAdd(msg.value, 'me');
        msg.value = '';
        let chat = document.querySelector('#chat');
        // let chat_height = chat.getBoundingClientRect().height;
        // console.log('chat _ height', chat_height);
        // console.log('scrolltop',chat.scrollTop)

        // if (chat_height>0) {
        //     chat.scrollTop = chat_height;
        // }

        chat.scrollTop = chat.scrollHeight;


    }
}

function msgAdd(msgValue, who) {
    const ul_time = document.createElement('ul');
    const ul_msg = document.createElement('ul');
    const li_time = document.createElement('li');
    const li_msg = document.createElement('li');
    const div = document.createElement('div');
    const chat = document.querySelector('#chat');
    const B = document.querySelectorAll('.time_clocking');

    let T = new Date();
    let H = T.getHours();
    let M = ('00' + T.getMinutes()).slice(-2);
    let now = (H >= 12 && H <= 24) ? '오후' : '오전';
    H = H >= 12 ? H - 12 : H;
    H = ('00' + H).slice(-2);
    let clock = `${now} ${H}:${M}`

    div.innerHTML = msgValue;
    li_msg.appendChild(div);
    li_msg.classList.add(who);
    li_time.innerHTML = clock;
    li_time.classList.add('time_clocking');
    if (who == 'you') li_time.classList.add('time_you');
    else li_time.classList.add('time_me');
    ul_msg.appendChild(li_msg);
    chat.appendChild(ul_msg);

    if (B.length == 0 || B[B.length - 1].textContent != clock) {
        ul_time.appendChild(li_time);
        chat.appendChild(ul_time);
    }
}



















