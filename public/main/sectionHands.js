

const html = document.documentElement;
const canvas = document.getElementById("flow-canvas-iphone-12");
const context = canvas.getContext("2d");

const frameCount = 148;
const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
)


const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=600;
canvas.height=400;
img.onload=function(){
  context.drawImage(img, 0, 0, 600, 400);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0, 600, 400);
}

const flowCanvasTop = document.querySelector('#flow-canvas-iphone-12').getBoundingClientRect().top;
const designSectionTop = document.querySelector('.section-design').getBoundingClientRect().bottom;
window.addEventListener('scroll', () => {  
  
    const scrollTop = html.scrollTop;
    if(scrollTop > flowCanvasTop && scrollTop <= designSectionTop){

        
        const maxScrollTop = (scrollTop - flowCanvasTop).toFixed(2);
        const range = (designSectionTop - flowCanvasTop).toFixed(2);
        const num = Math.floor(range/(frameCount));


        let frameIndex;
        if(Math.floor(maxScrollTop/(num)) >= 146){
            frameIndex = 146;
        }else if(Math.floor(maxScrollTop/(num)) <= 0){
            frameIndex = 0;
        }else{
            frameIndex = Math.floor(maxScrollTop/(num) * 4);
        }

        if(frameIndex >= 146){
            frameIndex = 146
        }
   

        if(scrollTop>=4044){

        }
   
        // console.log(scrollFraction,frameCount,Math.ceil(scrollFraction * frameCount)-28, frameCount, frameIndex)
        
        requestAnimationFrame(() => updateImage(frameIndex + 1))
    }

});

preloadImages()



function sigmoid2(z) {
    if(z>=1){
        return 1;
    }else if(z<=0){
        return 0;
    }
    return z;
}



 