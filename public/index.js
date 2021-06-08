
function inputFocus(){
    console.log(this)
    console.log(this.parentNode)
    const span = this.parentNode.querySelector('span');
    span.classList.remove('inputFocusOut');
    span.classList.add('inputFocus'); 

       
}
function inputFocusOut(){
    const span = this.parentNode.querySelector('span');
    span.classList.remove('inputFocus');
    if(this.value != ''){
        span.classList.add('inputFocusOut');    
    }
        
}
inputFocusOut
const input = document.getElementsByTagName("input");

for(var i=0; i<input.length; i++){
    input[i].addEventListener('focus', inputFocus);
    input[i].addEventListener('focusout', inputFocusOut);
}