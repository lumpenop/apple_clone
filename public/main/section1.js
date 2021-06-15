
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