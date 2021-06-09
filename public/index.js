const input = document.getElementsByTagName("input");
const linkSearch = document.querySelector('.ac-gn-link.ac-gn-link-search');
const searchCloseBtn = document.querySelector('.ac-gn-searchview-close-wrapper');
const curtain = document.querySelector('#ac-gn-curtain');


linkSearch.addEventListener('click', searchOnClick);
searchCloseBtn.addEventListener('click', searchClose);
curtain.addEventListener('click', event => layerClose(event, curtain));


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
        console.log('bin')
        span.classList.remove('inputFocus');
        span.classList.add('inputFocusOut');    
    }
}

const timer = ms => new Promise(res => setTimeout(res,ms));


async function searchOnClick(){
    const items = document.querySelectorAll('.ac-gn-item');
    await timer(45);
    
    for(var i = items.length-1; i > 0; i--){
        items[i].classList.add('sizeDown');
       
    }

    for(var i = items.length-1; i > 0; i--){
        items[i].classList.add('displayNone');
        await timer(45);
    }
    
    
    const gnbsub = document.querySelector('.ac-gn-list');
    const searchView = document.querySelector('#ac-gn-searchview');
    const subnav = document.querySelector('.subnav');
    const curtain = document.querySelector('#ac-gn-curtain');
    const appleLogo = document.querySelector('.ac-gn-link-apple');
    
    appleLogo.classList.add('anApple');
    await timer(440);
    
    items[0].classList.add('displayNone');
    gnbsub.classList.add('displayNone');
    searchView.classList.add('displayBlock');
    subnav.classList.add('displayNone');
    
    curtain.classList.add('ac-gn-curtain');
}

async function searchClose(){
    const gnbsub = document.querySelector('.ac-gn-list');
    const searchView = document.querySelector('#ac-gn-searchview');
    const subnav = document.querySelector('.subnav');
    const curtain = document.querySelector('#ac-gn-curtain');
    const items = document.querySelectorAll('.ac-gn-item');
    const searchInput = document.querySelector('#ac-gn-searchform-input');
    const appleLogo = document.querySelector('.ac-gn-link-apple');


    curtain.classList.remove('ac-gn-curtain');

    gnbsub.classList.remove('displayNone');
    searchView.classList.remove('displayBlock')
    subnav.classList.remove('displayNone');
    items[0].classList.remove('displayNone');
    appleLogo.classList.remove('anApple');
    await timer(60);
    for(var i = 1; i < items.length; i++){
        
        items[i].classList.remove('displayNone');
        items[i].classList.add('fromNavSlowly')
        await timer(20);
    }
    searchInput.value = '';
}

function layerClose(event, layer){
    
    if(event.target == layer){
        searchClose();
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