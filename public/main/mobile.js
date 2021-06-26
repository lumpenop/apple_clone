




const main = document.querySelector('#main');
const footer = document.querySelector('.footer');
const localNav = document.querySelector('#ac-localnav');
const smallList = document.querySelector('.ac-gn-small-list');
const acSearch = document.querySelector('.ac-gn-search');
const searchView = document.querySelector('#ac-gn-searchview');
const searchVeiwBar = document.querySelector('.ac-gn-searchview-bar');
const searchViewRst = document.querySelector('.ac-gn-searchview-results');
const acGlobalNav = document.querySelector('#ac-globalnav');
const searchViewContent = document.querySelector('.ac-gn-searchview-content');

let hambugFlag = false;
function hambugOn(){

    if(!hambugFlag){
        main.classList.add('displayNone');
        footer.classList.add('displayNone');
        searchViewRst.classList.add('displayNone');
        acSearch.classList.add('displayNone');
        localNav.classList.add('displayNone');
        smallList.classList.add('displayBlock');
        searchView.classList.add('displayBlock');
        searchVeiwBar.classList.remove('displayNone');
        searchViewContent.classList.remove('displayNone');
        acGlobalNav.classList.add('backBlack');
        hambugFlag = true;
    }else{
        main.classList.remove('displayNone');
        footer.classList.remove('displayNone');
        searchViewRst.classList.remove('displayNone');
        acSearch.classList.remove('displayNone');
        localNav.classList.remove('displayNone');
        smallList.classList.remove('displayBlock');
        searchView.classList.remove('displayBlock');
        searchVeiwBar.classList.add('displayNone');
        searchViewContent.classList.add('displayNone');
        acGlobalNav.classList.remove('backBlack');
        hambugFlag = false;
    }  
}

const hambug = document.querySelector('.ac-gn-hambug');

hambug.addEventListener('click',hambugOn);

