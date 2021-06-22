



const videoWrapper = document.querySelector('.section-video .video-intro-wrapper');
const videoWrapperTop = videoWrapper.getBoundingClientRect().top;
const videoWrapperBottom = videoWrapper.getBoundingClientRect().bottom;
const sectionVideo = document.querySelector('.section-video');
const sectionVideoTop = sectionVideo.getBoundingClientRect().top;
const sectionVideoBottom = sectionVideo.getBoundingClientRect().bottom;
const videoDeviceWrapper = document.querySelector('.section-video .device-wrapper');
function videoScroll(){
    
    const scrollTop = html.scrollTop;
    if(scrollTop>=sectionVideoTop){
        const intro1 = document.querySelector('.section-video .video-intro-1');
        const intro2 = document.querySelector('.section-video .video-intro-2');

        const positionHeight = scrollTop - sectionVideoTop;
        videoWrapper.style.transform = `matrix(1, 0, 0, 1, 0, ${422-(positionHeight/2)})`
        videoWrapper.style.opacity = positionHeight/211
        if((422-(positionHeight/2))/422 <= 0.35){
            
            intro2.classList.remove('hidden');
        }else if((422-(positionHeight/2))/422 <= 0.65){
            
            intro1.classList.remove('hidden');
        }else{
            intro1.classList.add('hidden');
            intro2.classList.add('hidden');
        }
        if((422-(positionHeight/2))/422 <= 0.1){
            console.log((422-(positionHeight/2))/422)
            document.querySelector('.section-video .video-intro-0').style.opacity = (422-(positionHeight/2))/422*10;
            document.querySelector('.section-video .typography-section-headline-elevated-alt-2').style.opacity = (422-(positionHeight/2))/422*10;
            intro1.style.opacity = (422-(positionHeight/2))/422*10;
            intro2.style.opacity = (422-(positionHeight/2))/422*10;
            videoDeviceWrapper.style.transform = `matrix(3.1, 0, 0, 3,1, -490, ${-242-(positionHeight/2)})`
        }

    }
}

window.addEventListener('scroll', videoScroll);