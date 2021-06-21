

const html = document.documentElement;
const canvas = document.getElementById("flow-canvas-iphone-12");
const context = canvas.getContext("2d");

const frameCount = 148;
const currentFrame = index => (
  `/main/image/AirPodsPro/${index.toString().padStart(4, '0')}.jpg`
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
        if(Math.floor(maxScrollTop/(num)) >= 147){
            frameIndex = 147;
        }else if(Math.floor(maxScrollTop/(num)) <= 0){
            frameIndex = 0;
        }else{
            frameIndex = Math.floor(maxScrollTop/(num) * 4);
        }

        if(frameIndex >= 147){
            frameIndex = 147
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



const deviceWrapper= document.querySelector('.design-content .device-wrapper');
const leftFrame = document.querySelector('.section-design-materials .frame-left');
const rightFrame = document.querySelector('.section-design-materials .frame-right');
const topFrame = document.querySelector('.section-design-materials .frame-top');
const bottomFrame = document.querySelector('.section-design-materials .frame-bottom');


const sectionMini = document.querySelector('.section-mini').getBoundingClientRect();
const hiddenUlBottom = document.querySelector('.section-mini').getBoundingClientRect().bottom;
function forMiniSection(){
    const deviceWrapperBottom = deviceWrapper.getBoundingClientRect().bottom-250;
    const scrolledTopLength = window.pageYOffset; 
    const absoluteTop = scrolledTopLength + deviceWrapperBottom; 

    const scrollTop = html.scrollTop;
    // if(absoluteTop < scrollTop){
        

        const gap= Math.round(scrollTop) - Math.round(absoluteTop)
        const headLine = document.querySelector('div.design-materials.section-mini div.content-wrapper h4.section-headline.typography-section-headline');
        

        const num = gap/370
        
        headLine.style.opacity = sigmoid2(num);
        
        // locateY = Math.round(70 - (70*(gap/400)))
        headLine.style.transform =  `matrix(1, 0, 0, 1, 0, ${90 - (sigmoid2(num)*90)})`;;
    // }

    
    if(hiddenUlBottom*0.8 < scrollTop && sectionMini.bottom > scrollTop){
        
        console.log(bottomFrame);
        bottomFrame.classList.add('will-change');
        leftFrame.classList.add('will-change');
        rightFrame.classList.add('will-change');
        topFrame.classList.add('will-change');
        

        console.log(sigmoid2(num/1.5));
       
        leftFrame.style.transform =  `matrix(${sigmoid2(num/1.5)}, 0, 0, 1, 0, 0)`;
        rightFrame.style.transform =  `matrix(${sigmoid2(num/1.5)}, 0, 0, 1, 0, 0)`;
        topFrame.style.transform =  `matrix(1, 0, 0, ${sigmoid2(num/1.5)}, 0, 0)`;
        bottomFrame.style.transform =  `matrix(1, 0, 0, ${sigmoid2(num/1.5)}, 0, 0)`;

    }else{
        leftFrame.classList.remove('will-change');
        rightFrame.classList.remove('will-change');
        topFrame.classList.remove('will-change');
        bottomFrame.classList.remove('will-change');
    }
}

window.addEventListener('scroll', forMiniSection); 