//comunicacion con el servidor
const socket = io();

socket.emit('message', 'Mensaje desde el cliente');
socket.on('evento_socket_individual', data => {
    console.log(data);
});
socket.on('evento_todo_menos_actual', data => {
    console.log(data);
});
socket.on('evento_todos', data => {
    console.log(data);
});