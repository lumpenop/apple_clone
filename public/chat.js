const chatBtn = document.querySelector('#chatBtn');
const chatRoom = document.querySelector('#chatRoom');
let flag=undefined

chatBtn.addEventListener('click', (req, res) => {

})

async function getChatRoom(){
    let url = `http://localhost:3000/user/chatRoom`;
    let options = {
        method: 'get'
    }
    let response = await fetch(url, options);
    let res_body = await response.text();
    console.log(res_body);
    chatRoom.innerHTML = res_body;
    chatBtn.innerHTML='돌아가기'
}
















