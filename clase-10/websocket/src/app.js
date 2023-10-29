import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.router.js'

const app = express();

//static files
app.use(express.static(`${__dirname}/public`));

//motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//routes
app.use('/', viewsRouter);

//socket.io
const server = app.listen(8080, () => console.log('Listening on port 8080'));
const io = new Server(server);
// io.on('connection', socket => {
//     console.log('Nuevo cliente conectado');
//     socket.on('message', data => {
//         console.log(data);
//     });
    
//     //mensaje individual unicamente al socket conectado
//     socket.emit('evento_socket_individual', 'Mensaje para el socket');
//     //todos menos el que envio el mensaje
//     socket.broadcast.emit('evento_todos_menos_acual', 'Mensaje para todos menos el emisor');
//     //todos
//     io.emit('evento_todos', 'Mensaje para todos');
// });

const logs = [];

io.on('connection', socket => {
    socket.on('message1', data => {
        io.emit('log', data);
    });
    socket.on('message2', data => {
        logs.push({ socketid: socket.id, message: data});
        io.emit('log', { logs });
    });
});