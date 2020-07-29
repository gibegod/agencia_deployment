//Importar Express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');

require('dotenv').config({path: 'variables.env'})

//Testeo de la DB
//const db = require('./config/database');
// db.authenticate()
//     .then(() => console.log('DB conectada'))
//     .catch(error => console.log(error))

//Configurar Express
const app = express();

//Habilitar pug
app.set('view engine', 'pug');

//Agregar las vistas
app.set('views', path.join(__dirname, './views'));

//Cargar la carpeta estatica public
app.use(express.static('public'));

//Validar si estamos en desarrollo o produccion
const config = configs[app.get('env')];
//Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

//Muestra el anio actual y genera la ruta
app.use((req, res, next) => {
    //Crear una nueva fecha
    const fecha = new Date();
    res.locals.yearActual = fecha.getFullYear();
   
    res.locals.ruta = req.path;

    //console.log(res.locals);
    return next();
});

//Ejecutar el body-parser
app.use(bodyParser.urlencoded({extended: true}));

//Cargar rutas
app.use('/', routes());

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0'; //Si existe usa localhost, sino heroku(servidor) asigna una
const port = process.env.PORT || 3000;
app.listen(port, host, () => {
    console.log('El server esta funcionando');
});