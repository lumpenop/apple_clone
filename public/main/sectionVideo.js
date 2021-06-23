



const videoWrapper = document.querySelector('.section-video .video-intro-wrapper');
const videoWrapperTop = videoWrapper.getBoundingClientRect().top;
const videoWrapperBottom = videoWrapper.getBoundingClientRect().bottom;
const sectionVideo = document.querySelector('.section-video');
const sectionVideoTop = sectionVideo.getBoundingClientRect().top;
const sectionVideoBottom = sectionVideo.getBoundingClientRect().bottom;
const videoContainer = document.querySelector('.section-video .video-container');
const manifesto = document.querySelector('.section-video .video-manifesto-wrapper');
const videoDeviceWrapper = document.querySelector('.section-video .video-container');
const videoSectionVideo = document.querySelector('.section-video .video-container video');
let videoPerTop; 

const deviceWrap = document.querySelector('.section-video .device-wrapper');
const uiFrame = document.querySelector('.section-video .video-ui-frame');

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
            videoContainer.style.opacity = 1;
        }else if((422-(positionHeight/2))/422 <= 0.65){
            intro1.classList.remove('hidden');
            videoContainer.style.opacity = 0.5;
        }else{
            intro1.classList.add('hidden');
            intro2.classList.add('hidden');
            videoContainer.style.opacity = 0;
        }
        if((422-(positionHeight/2))/422 <= 0.1){
            document.querySelector('.section-video .video-intro-0').style.opacity = (422-(positionHeight/2))/422*10;
            document.querySelector('.section-video .typography-section-headline-elevated-alt-2').style.opacity = (422-(positionHeight/2))/422*10;
            intro1.style.opacity = (422-(positionHeight/2))/422*10;
            intro2.style.opacity = (422-(positionHeight/2))/422*10;

            // videoDeviceWrapper.style.transform = `matrix(3.1, 0, 0, 3,1, -490, ${-242-(positionHeight/2)})`
        }

        if((422-(positionHeight/2))/422 <= -0.1){
            const manifestoTop = manifesto.getBoundingClientRect().top;
            const manifestoBottom = manifesto.getBoundingClientRect().bottom;
            const scrolledTopLength = window.pageYOffset; // 스크롤된 길이
            const maniTop = scrolledTopLength + manifestoTop-80; // 절대좌표
            const maniBottom = scrolledTopLength + manifestoBottom;

            // console.log(22-(positionHeight/2)/4)
            // console.log('matrix', 422+(422-(positionHeight/2))*10)
            // console.log('opacity',(-(422-(positionHeight/2)))/422*10)
            // manifesto.style.transform = `matrix(1, 0, 0, 1, 0, ${422+(422-(positionHeight/2))*10})`
            // manifesto.style.opacity = (-(422-(positionHeight/2)))/422*10;
            manifesto.classList.remove('displayNone');
            manifesto.style.transform = `matrix(1, 0, 0, 1, 0, ${422-(positionHeight/2)})`
            let videoConOpa = 1+(422-(positionHeight/2))/422*5
            if(videoConOpa<=0.1){
                videoConOpa = 0.1
            }
            videoContainer.style.opacity = videoConOpa;
            // videoDeviceWrapper.style.transform = `matrix(3.1, 0, 0, 3,1, -490, ${-242-(positionHeight/2)})`

            
            // console.log(scrollTop , maniTop)
            // console.log('maniBottom', maniBottom);
            
            if(scrollTop >= maniTop){
                videoContainer.style.opacity = (scrollTop - maniTop)/40;
            }

            
            if(manifestoBottom >= 0){
                videoPerTop = scrollTop;
            }
            if(manifestoBottom < 0){
                
                console.log(videoPerTop);
                console.log('sectionBottom - perTop',sectionVideoBottom - videoPerTop);
                console.log('sectionBottom - scrollTop', sectionVideoBottom - scrollTop);
                console.log((sectionVideoBottom - scrollTop) / (sectionVideoBottom - videoPerTop)*100 +'%');
                // videoDeviceWrapper.style.width = `${100+(manifestoBottom/2)}%`
                // videoDeviceWrapper.style.height = `${100+(manifestoBottom/2)}%`
                videoSectionVideo.pause();

                // videoDeviceWrapper.style.setProperty("--device-width",videoDeviceWrapper.offsetWidth);
                // videoDeviceWrapper.style.setProperty("--device-height",videoDeviceWrapper.offsetHeight);
                console.log(sectionVideoBottom-manifestoBottom)

                let videoPer = (sectionVideoBottom - scrollTop) / (sectionVideoBottom - videoPerTop)*100;
                if(videoPer <= 65){
                    videoPer = 65;
                }
                videoDeviceWrapper.style.left = 100-videoPer-3+'%';
                videoDeviceWrapper.style.top = 100-videoPer+'%';
                
                videoDeviceWrapper.style.width = `${100+(manifestoBottom/4.71)}%`
                videoDeviceWrapper.style.height = `${100+(manifestoBottom/4.18)}%`

                document.querySelector('.section-video .device').style.opacity='1';
                document.querySelector('.section-video .device-screen').style.opacity='1';

                // videoDeviceWrapper.style.transform = `matrix(1, 0, 0, 1, -490, ${-484-(positionHeight/2)})`
                // deviceWrap.style.transform = `matrix(4, 0, 0, 4, -220, ${-242-(positionHeight/2)})`
                // uiFrame.style.transform = `matrix(1, 0, 0, 1, -220, ${-242-(positionHeight/2)})`
            }else{
                videoSectionVideo.play();
                videoDeviceWrapper.style.left = '0';
                videoDeviceWrapper.style.top = '0';
                videoDeviceWrapper.style.width = `100%`;
                videoDeviceWrapper.style.height = `100%`;
                document.querySelector('.section-video .device').style.opacity='0';
                document.querySelector('.section-video .device-screen').style.opacity='0';
            }

        }else{
            manifesto.classList.add('displayNone');
        }

    }
}

window.addEventListener('scroll', videoScroll);