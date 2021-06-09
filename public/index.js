const input = document.getElementsByTagName("input");
const linkSearch = document.querySelector('.ac-gn-link ac-gn-link-search');


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
    console.log(this.value)
    if(this.value == ''){
        console.log('bin')
        span.classList.remove('inputFocus');
        span.classList.add('inputFocusOut');    
    }
}

const timer = ms => new Promise(res => setTimeout(res,ms));


async function searchOnClick(){
    const items = document.querySelectorAll('.ac-gn-item');
    console.log(items);
    await timer(300);
    for(var i = items.length-1; i > 0; i--){
        console.log(items[i])
        items[i].style.display = 'none';
        await timer(100);
    }
    await timer(1000);
    items[0].style.display = 'none';
    const gnbsub = document.querySelector('.ac-gn-list');
    gnbsub.style.display = 'none';
    const searchView = document.querySelector('#ac-gn-searchview');
    searchView.style.display = 'block';
}


// const url = 'http://localhost:3000/user/bag'
// const options = {method: 'POST', headers: {Accept: 'application/json'}};

// let fet = await fetch(url, options)
// .then(result=>{
//     return result.json()
// })
// .then(json=>{
//     console.log(json)
// })