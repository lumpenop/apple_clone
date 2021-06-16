
const timer2 = ms => new Promise(res => setTimeout(res,ms));

async function imgVideo(){
    await timer2(300);
    document.querySelector('.section-hero .video-container').classList.add('loaded');
    await timer2(300);
    document.querySelector('.section-hero .video-container .startframe').classList.add('hidden');
    
    await timer2(4600);
    document.querySelector('.section-hero .video-container .endframe').classList.remove('hidden');
    document.querySelector('.section-hero .video-container .endframe').classList.add('show');
    await timer2(300);
    document.querySelector('.section-hero .video-container video').style.display = 'none';
}

imgVideo();

let beforeWindowHeight = window.innerHeight;
const changeHandler = () => {
    let afterWindowHeight = window.innerHeight;
    
    plusHeight = (afterWindowHeight - beforeWindowHeight)/afterWindowHeight;

    const startFrame = document.querySelector(".video-container > .startframe");
    const video = document.querySelector(".video-container > video");
    const endFrame = document.querySelector(".video-container > .endframe");
    const videoContainer = document.querySelector(".video-container");
    const stickyContent = document.querySelector(".sticky-content");

    startFrame.style.backgroundSize=`${window.innerHeight*1.3}px ${window.innerHeight}px`;
    video.style.height=String(window.innerHeight)+"px";
    endFrame.style.backgroundSize=`${window.innerHeight*1.3}px ${window.innerHeight}px`;
    endFrame.style.height=`${window.innerHeight}px`;
    endFrame.style.width=`${window.innerHeight * 1.3}px`;
    videoContainer.style.height=`${window.innerHeight}px`;
    
    stickyContent.style.height=String(window.innerHeight)+"px";

  };
  
  window.addEventListener("resize", changeHandler);


// const options = {
// threshold : [0, 0.5, 1]
// }
// const eyebrowText = document.querySelector('.hero-eyebrow-text');
// const eyebrowTop = eyebrowText.getBoundingClientRect().top; 

// const io = new IntersectionObserver((entries, observer)=>{
// entries.forEach(entry => {
//     console.log(entry.intersectionRatio)
//     console.log(eyebrowTop)
//     console.log(window.innerHeight)
//     console.log(document.body.scrollTop)
//     console.log(window.pageYOffset)

//     if (entry.intersectionRatio <= 1){
//         eyebrowText.style.opacity = '0';
        
//     } else if (entry.intersectionRatio > 1){
//         eyebrowText.style.opacity = String(entry.intersectionRatio)*10;
//     } else{
//         eyebrowText.style.opacity = '1';
//     }
//     });},options);

// const imgBox = document.querySelector('.endframe');
// io.observe(imgBox);

const eyebrowText = document.querySelector('.hero-eyebrow-text');
const heroHeadline = document.querySelector('.typography-hero-headline');
const heroIntro = document.querySelector('.typography-hero-intro');
const heroCopy = document.querySelector('.typography-hero-copy');
const filmIphone12 = document.querySelector('#film-iphone12');


function sigmoid(z) {
    if(z>=1){
        return 1;
    }else if(z<=0){
        return 0;
    }
    return z;
}

function eyebrowScroll(text){
    // var currentScrollValue = document.documentElement.scrollTop;

    textTop = text.getBoundingClientRect().top;
    
    
    // if(textTop<=window.innerHeight){
    console.log(window.innerHeight - textTop);
    
    opa = (window.innerHeight - textTop - 100)/100
    text.style.opacity = sigmoid(opa)
    // }
}

window.onscroll = () =>{
    eyebrowScroll(eyebrowText, eyebrowTop);
    eyebrowScroll(heroHeadline, heroHeadlineTop);
    eyebrowScroll(heroIntro, heroIntroTop);
    eyebrowScroll(heroCopy, heroCopyTop);
    eyebrowScroll(filmIphone12, filmIphone12Top);
};
 



