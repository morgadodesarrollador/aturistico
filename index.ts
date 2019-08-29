

import Server from './clases/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const server = new Server();
const DB = 'mongodb://localhost:27017/aturistico';
//Creamos un middleware Body Parser que que coge el objeto del POST y lo transforma en un objeto
//JS necesario para el resto de la app. Aceptar peticiones x-www-urlencoded
server.app.use( bodyParser.urlencoded({ extended: true}));
server.app.use ( bodyParser.json()); //la info la pasa a json

//Especificación a los archivos de rutas
//para pasa la info del POST hemos de pasar el middleware (funcion que se ejecuta
//antes q otras.
server.app.use('/user', userRoutes); //Middleware de Usuario

//Conenctamos con la DB Aturistico, si no existe la crea
mongoose.connect(DB,
    { useNewUrlParser: true, useCreateIndex: true}, (err) => {
        if (err)
            console.log ('BD error');
        console.log ('BD OnLine');
    });
/*
mongoose.connect(DB, { useNewUrlParser: true, useCreateIndex: true});
mongoose.connection.once('open', () => {
    console.log('conexión con BD');
});
mongoose.connection.on('error', (err) => {
    console.error('Unable to connect to Mongo via Mongoose', err);
});
*/
server.start( () => {
    console.log ( `Servidor ejecutando, en ${server.port} `);
});
