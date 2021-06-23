



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

           
        }

        if((422-(positionHeight/2))/422 <= -0.1){
            const manifestoTop = manifesto.getBoundingClientRect().top;
            const manifestoBottom = manifesto.getBoundingClientRect().bottom;
            const scrolledTopLength = window.pageYOffset; // 스크롤된 길이
            const maniTop = scrolledTopLength + manifestoTop-80; // 절대좌표
            const maniBottom = scrolledTopLength + manifestoBottom;

          
            manifesto.classList.remove('displayNone');
            manifesto.style.transform = `matrix(1, 0, 0, 1, 0, ${422-(positionHeight/2)})`
            let videoConOpa = 1+(422-(positionHeight/2))/422*5
            if(videoConOpa<=0.1){
                videoConOpa = 0.1
            }
            videoContainer.style.opacity = videoConOpa;
           
            
            if(scrollTop >= maniTop){
                videoContainer.style.opacity = (scrollTop - maniTop)/40;
            }

            
            if(manifestoBottom >= 0){
                videoPerTop = scrollTop;
            }
            if(manifestoBottom < 0){
                
               


                videoSectionVideo.pause();

               

                let videoPer = (sectionVideoBottom - scrollTop) / (sectionVideoBottom - videoPerTop)*100;
                let leftPer = (sectionVideoBottom - scrollTop) / (sectionVideoBottom - videoPerTop)*102;
                if(videoPer <= 65){
                    videoPer = 65;
                }
                if(leftPer <= 69){
                    leftPer = 69
                }

                frameWidth = document.querySelector('.video-ui-frame').clientWidth;
                frameHeight = document.querySelector('.video-ui-frame').clientHeight;;
               
               
                videoDeviceWrapper.style.left = 50+'%';
                videoDeviceWrapper.style.top = 50+'%';
                videoDeviceWrapper.style.transform = 'translate(-50%, -50%)';
                
                videoDeviceWrapper.style.width = `${100+(manifestoBottom/3.8)}%`
                videoDeviceWrapper.style.height = `${100+(manifestoBottom/4)}%`


                document.querySelector('.section-video .device').style.opacity='1';
                document.querySelector('.section-video .device-screen').style.opacity='1';


            }else{
                videoSectionVideo.play();
            
                videoDeviceWrapper.style.width = `100%`;
                videoDeviceWrapper.style.height = `100%`;
                document.querySelector('.section-video .device').style.opacity='0';
                document.querySelector('.section-video .device-screen').style.opacity='0';
            }

        }else{
            manifesto.classList.add('displayNone');
        }

    }else{
        videoWrapper.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
        videoWrapper.style.opacity = 0;
    }
}

window.addEventListener('scroll', videoScroll);