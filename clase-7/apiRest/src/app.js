import express from 'express';

const app = express();
//middleware (poder recibir peticiones en formato JSON)
app.use(express.json()); //
const users = [];

//obtener usuarios
app.get('/users', (req, res) => {
    res.send(users);
});

//crear usuario
app.post('/users', (req, res) => {
    const user = req.body;
    if(!user.first_name || !user.last_name) {
        return res.status(400).send({status: 'error', error: 'incomplete values'});
    };
    if(users.length === 0) {
        user.id = 1;
    } else {
        user.id = users[users.length - 1].id + 1;
    };
    users.push(user);
    res.send({status: 'success', message: 'user created'});
});

//actualizar usuario
app.put('/users/:id', (req, res) => {
    const user = req.body;
    const userId = Number(req.params.id);
    if(!user.first_name || !user.last_name) {
        return res.status(400).send({status: 'error', error: 'incomplete values'});
    };
    const index = users.findIndex((user) => user.id === userId);
    if(index !== -1) {
        users[index] = user;
    } else {
        res.status(404).send({status: 'error', error: 'user not found'});
    };
    res.send({status: 'success', message: 'user updated'});
});

//eliminar usuario
app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const index = users.findIndex((user) => user.id === userId);
    if(index !== -1) {
        users.splice(index, 1);
        res.send({status: 'success', message: 'user deleted'});
    } else {
        res.status(404).send({status: 'error', error: 'user not found'});
    };
});

app.listen(8080);