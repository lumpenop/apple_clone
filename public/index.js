
const linkSearch = document.querySelector('.ac-gn-link.ac-gn-link-search');
const searchCloseBtn = document.querySelector('.ac-gn-searchview-close-wrapper');
const curtain = document.querySelector('#ac-gn-curtain');
const globalNav = document.querySelector('#ac-globalnav');
const bagBtn = document.querySelector('.ac-gn-link-bag > span');
const bagView = document.querySelector('.ac-gn-bagview');
const bagViewMessage = document.querySelector('.ac-gn-bagview-message');
const itemLink = document.querySelector('.item-link');
const appleSide = document.querySelector('.side-apple');
const sideDiv = document.querySelector('.side-div');

linkSearch.addEventListener('click', searchOnClick);
searchCloseBtn.addEventListener('click', searchClose);
curtain.addEventListener('click', event => layerClose(event, curtain));
globalNav.addEventListener('click', event => layerClose(event, globalNav));
bagBtn.addEventListener('click', bagViewOn);
appleSide.addEventListener('click', sideAppleOn);
window.addEventListener('click', event => appleSideOff(event, sideDiv, appleSide));




window.addEventListener('click', event => windowClick(event));

function windowClick (event){

    if(event.target!=bagViewMessage && event.target.className != 'item-link' && event.target != bagBtn){
        document.querySelector('.ac-gn-bagview').classList.remove('displayBlock');
        document.querySelector('.caret').classList.remove('displayBlock');
        bagViewFlag = true;    
    }
}


let bagViewFlag = true;
function bagViewOn(){
    if(bagViewFlag){
        document.querySelector('.ac-gn-bagview').classList.add('displayBlock');
        document.querySelector('.caret').classList.add('displayBlock');
        bagViewFlag = false;

    }else{
        document.querySelector('.ac-gn-bagview').classList.remove('displayBlock');
        document.querySelector('.caret').classList.remove('displayBlock');
        bagViewFlag = true;
    }  
}



const timer = ms => new Promise(res => setTimeout(res,ms));


async function searchOnClick(){
    const items = document.querySelectorAll('.ac-gn-item');
    const itemLogo = document.querySelectorAll('.ac-gn-item span');
    await timer(45);
    
    // for(var i = items.length-1; i > 0; i--){
    //     items[i].classList.add('sizeDown');
       
    // }
    for(var i = items.length-1; i > 0; i--){
        items[i].classList.add('displayNone');
        itemLogo[i].classList.add('displayNone');
        await timer(45);
    }
    
    const gnbsub = document.querySelector('.ac-gn-list');
    const searchView = document.querySelector('#ac-gn-searchview');
    const subnav = document.querySelector('.subnav');
    const curtain = document.querySelector('#ac-gn-curtain');
    const appleLogo = document.querySelector('.ac-gn-link-apple');
    const input = document.querySelector('.ac-gn-searchform-input');
    const resultLink = document.querySelectorAll('.ac-gn-searchresults-link');
    const xBox = document.querySelector('.ac-gn-searchview-close-wrapper');
    const searchImg = document.querySelector('.ac-gn-searchform-submit');

    appleLogo.classList.add('anApple');
    await timer(440);
    

    items[0].classList.add('displayNone');
    gnbsub.classList.add('displayNone');
    searchView.classList.add('displayBlock');
    subnav.classList.add('displayNone');
    curtain.classList.add('ac-gn-curtain');

    await timer(40);
    for(var i=0; i<resultLink.length; i++){
        resultLink[i].classList.remove('displayNone');
        resultLink[i].classList.add('slidingText4');
        
        await timer(10);
    }
    await timer(220);
    input.classList.add('slidingText8');
    searchImg.classList.add('slidingText8');
    xBox.classList.add('slidingText4');
    input.classList.remove('displayNone');
    searchImg.classList.remove('displayNone');
    xBox.classList.remove('displayNone');
    input.focus();
}


async function searchClose(){
    const gnbsub = document.querySelector('.ac-gn-list');
    const searchView = document.querySelector('#ac-gn-searchview');
    const subnav = document.querySelector('.subnav');
    const curtain = document.querySelector('#ac-gn-curtain');
    const items = document.querySelectorAll('.ac-gn-item');
    const searchInput = document.querySelector('#ac-gn-searchform-input');
    const appleLogo = document.querySelector('.ac-gn-link-apple');
    const itemLogo = document.querySelectorAll('.ac-gn-item span');
    const resultLink = document.querySelectorAll('.ac-gn-searchresults-link');
    const input = document.querySelector('.ac-gn-searchform-input');
    const searchImg = document.querySelector('.ac-gn-searchform-submit');
    const xBox = document.querySelector('.ac-gn-searchview-close-wrapper');

    input.classList.add('displayNone');
    searchImg.classList.add('displayNone');
    xBox.classList.remove('slidingText4');
    xBox.classList.add('displayNone');
    


    for(var i=0; i<resultLink.length; i++){
        resultLink[i].classList.remove('slidingText4');
        resultLink[i].classList.add('displayNone');
        
    }

    curtain.classList.remove('ac-gn-curtain');

    gnbsub.classList.remove('displayNone');
    searchView.classList.remove('displayBlock')
    subnav.classList.remove('displayNone');
    items[0].classList.remove('displayNone');
    appleLogo.classList.remove('anApple');
    await timer(60);
    for(var i = 1; i < items.length; i++){
        items[i].classList.remove('displayNone');
    }
    await timer(50);
    for(var i = 1; i < items.length; i++){
        if(i==7){
            itemLogo[i].classList.add('sizeUpForSearch');
        }
        itemLogo[i].classList.add('sizeUp');
        itemLogo[i].classList.remove('displayNone');
        await timer(20)   
    }
    
    searchInput.value = '';
    
}

function layerClose(event, layer){
    
    if(event.target == layer&&document.querySelector('#ac-gn-curtain').className=='ac-gn-curtain'){
        searchClose();
    }
}

// 아래 클릭하면 닫히는 기능 추가 했습니다 ! by Seyeon 
let sideAppleFlag = false;
function sideAppleOn(){
    const sideMenus = document.querySelectorAll('.side_menu_box');
    const sideAs = document.querySelectorAll('.side-a');
    if(!sideAppleFlag){
        for(var i=0; i<sideMenus.length;i++){
            sideMenus[i].classList.add('displayOpa1');
            sideAs[i].classList.remove('displayNone');
        }
        sideAppleFlag = true;
    }else{
        for(var i=0; i<sideMenus.length;i++){
            sideMenus[i].classList.remove('displayOpa1');
            sideAs[i].classList.add('displayNone');
        }
        sideAppleFlag = false;
    }
}

function appleSideOff(event, layer , layer2){
    console.log(event.target)
    if(event.target != layer && sideAppleFlag){
        console.log('?')
        const sideMenus = document.querySelectorAll('.displayOpa1');
        const sideAs = document.querySelectorAll('.side-a');
        
        if(sideMenus != null){
            for(var i=0; i<sideMenus.length;i++){
                sideMenus[i].classList.remove('displayOpa1');
                sideAs[i].classList.add('displayNone');
            }
            sideAppleFlag = false;
        }
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

var beforePosition = document.documentElement.scrollTop

function scrollNav(){

    var afterPosition = document.documentElement.scrollTop;


    if (afterPosition > 50) {

      if(beforePosition < afterPosition ){
        // 스크롤 위로 

      } else {
        // 스크롤 아래로
      }

    } else {
        // 평상 시

    }
    beforePosition = afterPosition;
}


document.addEventListener('scroll',scrollNav);