const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Test:1234test@cluster0.qjthb.mongodb.net/contactDb?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open', function(){console.log('Estamos conectados a mongodb')});