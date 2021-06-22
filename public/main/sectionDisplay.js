
const imageHardware = document.querySelector('.section-display');
const hardwareTop = imageHardware.getBoundingClientRect().top;
const hardwareBottom = imageHardware.getBoundingClientRect().bottom;
const hardware = document.querySelector('.section-display .hardware');
function displayMoving(){
    const scrollTop = html.scrollTop;
    
    
    const gap = hardwareBottom - hardwareTop;
    // ${1020-((scrollTop - solidTop) / gap)*2000}
    if (scrollTop >= hardwareTop && scrollTop<=hardwareBottom){
        
        const sliding = ((hardwareTop - scrollTop) / gap) * 3000;
        if(sliding<=-1700){
            sliding = -1700;
        }
        hardware.style.transform = `matrix(1 , 0, 0, 1 , ${sliding}, 0)`;

    }else{
 
        
    }
}


window.addEventListener('scroll', displayMoving); 
