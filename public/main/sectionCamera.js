
const solid = document.querySelector('.section-camera .solid');
const solidTop = solid.getBoundingClientRect().top;
const solidBottom = solid.getBoundingClientRect().bottom;

const gradient = document.querySelector('.section-camera .gradient');
const gradientTop = gradient.getBoundingClientRect().top;
const gradientBottom = gradient.getBoundingClientRect().bottom;

const iamgeCamera = document.querySelector('.section-camera .image-camera-array');
const cameraTop = iamgeCamera.getBoundingClientRect().top;
const cameraBottom = iamgeCamera.getBoundingClientRect().bottom;

function cameraZoom(){
    const scrollTop = html.scrollTop;
    
    
    const gap = solidBottom - cameraTop;
    // ${1020-((scrollTop - solidTop) / gap)*2000}
    if (scrollTop >= cameraTop && scrollTop<=solidBottom){
        solid.style.opacity = ((scrollTop - cameraTop) / gap)*1.5;
        iamgeCamera.style.transform = `matrix(${1 + ((scrollTop - cameraTop) / gap)*1.8} , 0, 0, ${1 + ((scrollTop - cameraTop) / gap)*1.5}, 0, 0)`;
        gradient.style.transform = `matrix(1, 0, 0, 1, 0, ${1300-((scrollTop - cameraTop) / gap)*2000})`;
    }else{
        iamgeCamera.style.transform = `matrix(1 , 0, 0, 1, 0, 0)`;
        
    }
}



window.addEventListener('scroll', cameraZoom); 
