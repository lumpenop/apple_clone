
const solid = document.querySelector('.section-camera .solid');

const solidTop = solid.getBoundingClientRect().top;
function cameraZoom(){
    const scrollTop = html.scrollTop;
    
    console.log(scrollTop, solidTop);

    if (scrollTop >= solidTop){
        console.log(html.scrollTop);
    }
}


window.onscroll = cameraZoom();
console.log('dsadfsa')