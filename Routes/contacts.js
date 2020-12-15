const express = require('express');
const router = express.Router();
const contacts = require('../Models/contactSchema');

router.get('/', async(req,res)=>{
    var contact = await contacts.find(function(err,ans){
        if(err) console.error(err);
        return ans;
    });
    res.render('myContact', {contact})
});
router.post('/new', async (req, res)=>{
    var {name, lastname, phone, address, email, description} = req.body;

    var newContact = new contacts({
        name,
        lastname,
        phone,
        address,
        email,
        description
    });

    await newContact.save(function(err, ans){
        if(err) return console.error(err);
        console.log('Contacto guradado');
    });
    res.render('index', {'success':true});
});
router.delete('/delete/:_id', async(req, res)=>{
    var {_id} = req.params;
    await contacts.deleteOne({'_id': _id});
    var contact;
    setTimeout(async()=>{
        contact = await contacts.find(function(err,ans){
            if(err) console.error(err);
            return ans;
        });
        res.json(contact);
    },300);
    console.log('se elimino el contacto')

});

router.get('/edit/:_id', async(req, res)=>{
    var {_id} = req.params;
    var contact = await contacts.findOne({'_id':_id}, function(err, ans){
        if(err) console.log(err);
        return ans;
    }).then(function(v){
        res.render('edit', {'contact': v});
    }).catch(function(e){
        console.log('Error en la promesa')
    });
    
    
});

router.post('/edit/:_id', async(req,res)=>{
    var {_id} = req.params;
    var {name, lastname, phone, address, email, description} = req.body;

    await contacts.updateOne({'_id':_id}, {
        name,
        lastname,
        phone,
        address,
        email,
        description
    }, function(err, ans){
        if(err) console.log('No se pudo actualizar');
        console.log('Se modifico el contacto');
    }).then(function(){
        res.redirect('/contact')
    });

});

module.exports = router;