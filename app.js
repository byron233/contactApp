const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
var port = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

//Inicializaciones
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
require('./Database');

//Variables de las rutas
const indexRoute = require('./Routes/index');
const contactsRoute = require('./Routes/contacts');

//Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, '/public')));

//Motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'layout',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname:'.hbs',
    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');


//Rutas
app.use('/', indexRoute);
app.use('/contact', contactsRoute);

//Iniciando servidor
app.listen(port, ()=>console.log(`Listenig on port ${port}`));