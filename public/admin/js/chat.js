const chatBtn = document.querySelector('#chatBtn');
const chatRoom = document.querySelector('#chatRoom');
let flag = undefined;


chatBtn.addEventListener('click' ,async ()=>{

//     switch(flag){
//         case true:
//             flag = false
//             chatRoom.style.display = 'none'
//         break
//         case false:
//             flag = true
//             chatBtn.innerHTML = '채팅'
//             chatBtn.dataset.value = 0;
//             chatRoom.style.display = 'block'
//         break
//         case undefined:
//             flag = true;
//             getChatRoom()
//         break
//     }
// })

// async function getChatRoom(){
    
//     let url = "http://localhost:3000/admin/chat_view"
//     let options = {method:'GET'}
//     let response = await fetch(url,options)
//     let result = await response.text()
    
//     try{
//         let json = JSON.parse(result)
//         alert(json.msg)
//         return
//     }catch(e){
//         chatRoom.innerHTML = result
//         socketChat()
//     }
// }

// async function socketChat(){
//     socket = io();
//     socket.on('connect',()=>{})
//     // socket.on('userid',data=>{
//     //     userId = data   
//     // })
//     socket.on('msg',data=>{
//         chatBtn.dataset.value = parseInt(chatBtn.dataset.value)+1
//         if(flag==false){
//             chatBtn.innerHTML = `채팅<sapn style="color:red; padding:2px;">${chatBtn.dataset.value}</span>`
//         }
//         addCard(data.data,'you')
//         // addCard(data.userid,data.data,'you')
//     })
// }



// function send(){
//     const msg = document.querySelector('#msg')
//     socket.emit('send',msg.value)
//     addCard(msg.value,'my')
//    // addCard(userId,msg.value,'my')
// }

// function addCard(text,type){
//     const div = document.createElement('div')
//     const span = document.createElement('span')
//     // span.innerHTML = id +"<br>"
//     span.innerHTML = span.innerHTML + text 
//     span.innerHTML = span.innerHTML + "<br>"
//     span.classList.add(type)
//     div.appendChild(span)
//     const chat = document.querySelector('#chat')
//     chat.appendChild(div)
// }
