const input = document.getElementsByTagName("input");

for(var i=0; i<input.length; i++){
    input[i].addEventListener('focus', inputFocus);
    input[i].addEventListener('focusout', inputFocusOut);
}


function inputFocus(){
    const span = this.parentNode.querySelector('span');
    span.classList.remove('inputFocusOut');
    span.classList.add('inputFocus'); 
}

function inputFocusOut(){
    const span = this.parentNode.querySelector('span');
    console.log(this.value)
    if(this.value == ''){
        console.log('bin')
        span.classList.remove('inputFocus');
        span.classList.add('inputFocusOut');    
    }
}

function searchOnClick(){
    
}


// const url = 'http://localhost:3000/user/bag'
// const options = {method: 'POST', headers: {Accept: 'application/json'}};

// let fet = await fetch(url, options)
// .then(result=>{
//     return result.json()
// })
// .then(json=>{
//     console.log(json)
// })