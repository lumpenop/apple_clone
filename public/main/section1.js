
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
const lis = document.querySelectorAll('.canvas-hidden .hidden-ul li');
function canvasHidden(){
    

    const scrollTop = html.scrollTop;
    

    if(scrollTop>=4526){
        console.log(scrollTop)

        
        const gap = (5153 - 4526) / 5;
        const num2 = Math.floor((scrollTop - 4526) / gap);
        
        lis[num2].style.opacity = sigmoid(Math.floor(gap/100));

        console.log(sigmoid(gap/100))
        
    }
    


}


window.onscroll = () =>{
    eyebrowScroll(eyebrowText);
    eyebrowScroll(heroHeadline);
    eyebrowScroll(heroIntro);
    eyebrowScroll(heroCopy);
    eyebrowScroll(filmIphone12);
    canvasHidden();
};
 



