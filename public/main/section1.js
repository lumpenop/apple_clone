
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


const changeHandler = () => {
    console.log(window.innerHeight);
    document.querySelector(".video-container > .startframe").style.backgroundSize=`${window.innerHeight*1.3}px ${window.innerHeight}px`;
    document.querySelector(".video-container > video").style.height=String(window.innerHeight)+"px";
    document.querySelector(".video-container > .endframe").style.backgroundSize=`${window.innerHeight*1.3}px ${window.innerHeight}px`;
    document.querySelector(".video-container > .endframe").style.height=`${window.innerHeight}px`;
    document.querySelector(".video-container > .endframe").style.width=`${window.innerHeight * 1.3}px`;

  };
  
  window.addEventListener("resize", changeHandler);
