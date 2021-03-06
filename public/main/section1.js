

const timer2 = ms => new Promise(res => setTimeout(res,ms));

async function imgVideo(){
    await timer2(300);
    document.querySelector('.section-hero .video-container').classList.add('loaded');
    await timer2(300);
    // document.querySelector('.section-hero .video-container .startframe').classList.add('hidden');
    
    await timer2(4600);
    document.querySelector('.section-hero .video-container .endframe').classList.remove('hidden');
    document.querySelector('.section-hero .video-container .endframe').classList.add('show');
    await timer2(300);
    document.querySelector('.section-hero .video-container video').style.display = 'none';
}

imgVideo();

let beforeWindowHeight = window.innerHeight;
const endFrame = document.querySelector(".video-container > .endframe");
const stickyWrap = document.querySelector(".section-hero .video-container");
endFrame.style.height=`${endFrame.offsetWidth*0.77}px`;


const changeHandler = () => {
    let afterWindowHeight = window.innerHeight;
    
    plusHeight = (afterWindowHeight - beforeWindowHeight)/afterWindowHeight;

    // const startFrame = document.querySelector(".video-container > .startframe");
    const video = document.querySelector(".section-hero .video-container > video");
    const videoContainer = document.querySelector(".section-hero .video-container");
    const stickyWrap = document.querySelector(".section-hero .sticky-wrapper");

    // startFrame.style.backgroundSize=`${window.innerHeight*1.3}px ${window.innerHeight}px`;
    video.style.height=String(window.innerHeight)+"px";

    endFrame.style.height=`${endFrame.offsetWidth*0.77}px`;
    // endFrame.style.width=`${window.innerHeight * 1.3}px`;
    videoContainer.style.height=`${window.innerHeight*0.7}px`;


  };
  
  window.addEventListener("resize", changeHandler);


const eyebrowText = document.querySelector('.hero-eyebrow-text');
const heroHeadline = document.querySelector('.typography-hero-headline');
const heroIntro = document.querySelector('.typography-hero-intro');
const heroCopy = document.querySelector('.typography-hero-copy');
const filmIphone12 = document.querySelector('#film-iphone12');

function sigmoid(z) {
    if(z>=1){
        return 1;
    }else if(z<1){
        return 0;
    }
    return z;
}

function sigmoid70(z) {
    if(z>=40){
        return 1;
    }else if(z<40){
        return 0;
    }
    return z;
}

function sigmoid30(z) {
    if(z>=1){
        return 30;
    }else if(z<=0){
        return 0;
    }
    return z*30;
}

function eyebrowScroll(text){

    textTop = text.getBoundingClientRect().top;

    opa = (window.innerHeight - textTop-100)/300

    text.style.opacity = sigmoid(opa)

    switch(text){
        case document.querySelector('.hero-eyebrow-text'):
            heroHeadline.style.transform = `matrix(1, 0, 0, 1, 0, ${45 - (sigmoid30(opa)*1.5)})`;
            heroIntro.style.transform = `matrix(1, 0, 0, 1, 0, ${90 - (sigmoid30(opa)*3)})`;
            break;
        case document.querySelector('.typography-hero-headline'):
            heroCopy.style.transform = `matrix(1, 0, 0, 1, 0, ${90 - (sigmoid30(opa)*3)})`;
            break;

        case document.querySelector('.typography-hero-intro'):
            document.querySelector('.film-copy').style.transform = `matrix(1, 0, 0, 1, 0, ${90 - (sigmoid30(opa)*3)})`;
            break;
    }
}
  



const hiddenUl = document.querySelector('.canvas-hidden .hidden-ul');
const hiddenTop = document.querySelector('.canvas-hidden .hidden-ul').getBoundingClientRect().top;
const lis = document.querySelectorAll('.canvas-hidden .hidden-ul li');
var beforePosition;
const sectionDesignRow = document.querySelector('.section-design .device-wrapper').getBoundingClientRect();

function canvasHidden(){
    
    const scrollTop = html.scrollTop;

    if(scrollTop>=sectionDesignRow.top && scrollTop<=sectionDesignRow.bottom){

        // console.log(scrollTop);
        const gap = (sectionDesignRow.bottom - sectionDesignRow.top) / 5;
        let num2 = Math.floor((scrollTop - sectionDesignRow.top) / gap);

        let devide = (sectionDesignRow.bottom-sectionDesignRow.top)/5;
        let minus = devide * num2;
        
        if(num2>=5){
            num2 = 4
        }
        console.log(scrollTop-minus-sectionDesignRow.top);
        lis[num2].style.opacity = sigmoid70((scrollTop-minus-sectionDesignRow.top));

        
    }
    beforePosition = scrollTop;
    
}




window.onscroll = () =>{
    canvasHidden();
    eyebrowScroll(eyebrowText);
    eyebrowScroll(heroHeadline);
    eyebrowScroll(heroIntro);
    eyebrowScroll(heroCopy);
    eyebrowScroll(filmIphone12);
    
};
 



