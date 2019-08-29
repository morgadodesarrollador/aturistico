

import Server from './clases/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';

const server = new Server();
const DB = 'mongodb://localhost:27017/aturistico';
//Especificación a los archivos de rutas
server.app.use('/user', userRoutes);

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
