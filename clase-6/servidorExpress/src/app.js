import express from 'express';


const app = express();
const usuarios = [
    { id: 1, nombre: 'Alex', apellido: 'Pinaida', edad: 28, genero: 'M' },
    { id: 2, nombre: 'Alejandro', apellido: 'Resk', edad: 25, genero: 'M' },
    { id: 3, nombre: 'Nora', apellido: 'Saucedo', edad: 22, genero: 'F' }
];

app.get('/saludo', (req, res) => {
    res.send('este es un endpoint desde express');
});
app.get('/bienvenida', (req, res) => {
    res.send(`<h1>Bienvenido a mi primer servidor de ExpressJS</h1>`)
});
app.get('/usuario/:nombre', (req, res) => {
    res.send(`Bienvenido ${req.params.nombre}`);
});
app.get('/usuario-completo/:nombre/:apellido', (req, res) => {
    res.send(`Bienvenido ${req.params.nombre} ${req.params.apellido}`);
});
//servicio para obtener usuarios por id
app.get('/usuario-id/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = usuarios.find((u) => u.id === userId);
    if(!user) return res.send({error: 'usuario no encontrado'});
    res.send(user);
}); //
app.get('/usuario-query', (req, res) => {
    const queryParams = req.query;
    res.send(queryParams);
});
app.get('/usuario-busqueda', (req, res) => {
    const genero = req.query.genero;
    if(!genero || (genero!=='M' && genero!=='F')) return res.send({usuarios});
    const usuariosFiltrados = user.filter((u) => u.genero === genero);
    res.send({usuarios: usuariosFiltrados});
});

app.listen(8080, () => {console.log('listening on port 8080')});