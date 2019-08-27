
import Server from './clases/Server';
import userRoutes from './routes/usuario';

const server = new Server();

server.app.use('/user', userRoutes);
server.start( () => {
    console.log ( `Servidor ejecutandose en ${server.port} `);
});
