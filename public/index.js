const input = document.getElementsByTagName("input");
const linkSearch = document.querySelector('.ac-gn-link.ac-gn-link-search');
const searchCloseBtn = document.querySelector('.ac-gn-searchview-close-wrapper');

linkSearch.addEventListener('click', searchOnClick);
searchCloseBtn.addEventListener('click', searchClose)


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
    await timer(100);
    for(var i = items.length-1; i > 0; i--){
        console.log(items[i])
        items[i].style.display = 'none';
        await timer(100);
    }
    await timer(1000);
    const gnbsub = document.querySelector('.ac-gn-list');
    const searchView = document.querySelector('#ac-gn-searchview');
    const subnav = document.querySelector('.subnav');
    const curtain = document.querySelector('#ac-gn-curtain');
    
    items[0].style.display = 'none';
    gnbsub.style.display = 'none';
    searchView.style.display = 'block';
    subnav.style.display = 'none';
    curtain.classList.add('ac-gn-curtain');
}

async function searchClose(){
    const gnbsub = document.querySelector('.ac-gn-list');
    const searchView = document.querySelector('#ac-gn-searchview');
    const subnav = document.querySelector('.subnav');
    const curtain = document.querySelector('#ac-gn-curtain');
    const items = document.querySelectorAll('.ac-gn-item');


    curtain.classList.remove('ac-gn-curtain');
    gnbsub.style.display = 'flex';
    searchView.style.display = 'none';
    subnav.style.display = 'block';
    items[0].style.display = 'inline-block';
    await timer(100);
    for(var i = 1; i < items.length; i++){
        console.log(items[i])
        items[i].style.display = 'inline-block';
        await timer(100);
    }
}

// .ac-gn-searchview-close


// const url = 'http://localhost:3000/user/bag'
// const options = {method: 'POST', headers: {Accept: 'application/json'}};

// let fet = await fetch(url, options)
// .then(result=>{
//     return result.json()
// })
// .then(json=>{
//     console.log(json)
// })