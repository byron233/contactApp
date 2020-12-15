
var deleteModal = document.getElementById('deleteModal');
var closeMod = document.getElementById('closeModal');
var noDelete = document.getElementById('noDelete');
var yesDelete = document.getElementById('yesDelete');
var darkBg = document.getElementById('darkBg')
var deleteBtn = document.getElementsByClassName('deleteBtn');
var template = Handlebars.compile('{{#each contact}}<div class="row"><div class="col-sm-6"><div class="card"><div class="card-body"><h3 class="card-title">{{name}} {{lastname}}</h3><p class="card-text"><strong>Phone number: </strong>{{phone}}</p><p class="card-text"><strong>Address: </strong>{{address}}</p><p class="card-text"><strong>Email: </strong>{{email}}</p><p class="card-text"><strong>Description: </strong>{{description}}</p><a href="/contact/edit/{{_id}}" class="btn btn-primary editBtn">Edit</a> <button class="btn btn-danger deleteBtn" name="/contact/delete/{{_id}}">Delete</button></div></div></div></div>{{/each}}');
var contactsContent = document.getElementById('contactsContent');
var result = [];

var i = 0;
while(i < deleteBtn.length){
    deleteBtn[i].addEventListener('click',(e)=>{
        openModal();
        yesDelete.name = e.target.name;
    });
    i++;
}

yesDelete.addEventListener('click', ()=>{
    request('DELETE', yesDelete.name);
    setTimeout(()=>{
        if(result.length > 0){
            contactsContent.style.height = '';
            contactsContent.innerHTML = template({'contact':result});
            updateDelete(deleteBtn);
        }else{
            contactsContent.style.height = 'max-content';
            template = Handlebars.compile('<div class="firstCard card"><div class=" card-body">En esta pestaña se veran todos los contactos que tengas agregados, lastimosamente aún no tienes ninguno,pero no te preocupes, preciona el boton de abajo para crear uno :D</div></div><a href="/"  class="btn btn-primary btnA">Create a contact</a>');
            contactsContent.innerHTML = template();
        }
        closeModal();
    },700);
});

closeMod.addEventListener('click', ()=>{
    closeModal();
});

noDelete.addEventListener('click', ()=>{
    closeModal();
});


function updateDelete(arr){
    var d = 0;
    while(d < arr.length){
        arr[d].addEventListener('click',(e)=>{
            openModal();
            yesDelete.name = e.target.name;
            updateDelete();
        });
        d++;
    }
}

function openModal(){
    darkBg.style.visibility = 'visible';
    darkBg.style.backgroundColor = 'rgba(0,0,0,0.8)';
    deleteModal.style.bottom = '90vh';
}

function closeModal(){
    darkBg.style.visibility = '';
    darkBg.style.backgroundColor = '';
    deleteModal.style.bottom = '';
}

function request(met, url){
    var httpReq = new XMLHttpRequest();
    httpReq.onreadystatechange = ()=>{
        if((httpReq.readyState == 4) && httpReq.status == 200){
            result = JSON.parse(httpReq.responseText); 
        }else if(httpReq.status != 200){
            console.log('Hubo un problema con la peticion');
        }
    }
    httpReq.open(met, url, true);
    httpReq.send();
}
