var alertMsg = document.getElementsByClassName('alert');
var closeBtn = document.getElementsByClassName('btn-close');

if(alertMsg[0] != undefined){
    var y = setTimeout(()=>{
        alertMsg[0].style.top = '-13vh';
    },7000);
    
    closeBtn[0].addEventListener('click', ()=>{
        alertMsg[0].style.top = '-13vh';
        clearTimeout(y);
    });
}